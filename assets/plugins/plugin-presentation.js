/*
 * Docsify plugin: Reveal.js presentation mode for the CV.
 */
(function () {
  'use strict';

  let deck = null;
  let isInitializing = false;
  let currentMarkdown = '';

  const SPINNER_SLIDE = '<section class="title-slide"><h2>Loading...</h2></section>';

  function getRevealSlides() {
    return document.querySelector('#reveal-container .slides');
  }

  function showSpinner() {
    const slidesEl = getRevealSlides();
    if (slidesEl) slidesEl.innerHTML = SPINNER_SLIDE;
    if (deck) deck.sync();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createSlideHtml(markdown, isTitleSlide, isOverview) {
    const cls = isTitleSlide ? 'title-slide' : (isOverview ? 'overview-slide' : '');
    return '<section class="' + cls + '" data-markdown>\n' +
      '<textarea data-template class="data-template">\n' +
      markdown +
      '\n</textarea>\n</section>';
  }

  function getNoticeText() {
    if (!window.SITE_CONFIG || !window.getSiteLang) return '';
    const lang = window.getSiteLang();
    const branding = window.SITE_CONFIG.branding || {};
    const notice = branding.presentationNotice ? branding.presentationNotice[lang] : '';
    const person = branding.person || branding.company || '';
    return [person, notice].filter(Boolean).join(' - ');
  }

  function processSingleSlide(markdown, breadcrumb, sectionName) {
    breadcrumb = breadcrumb || '';
    sectionName = sectionName || '';

    const lines = markdown.split('\n');
    const mainContent = [];
    const noteContent = [];
    const mermaidContent = [];

    let inMermaidBlock = false;
    let inCodeBlock = false;
    let hasH1 = false;
    let hasOtherContent = false;
    let hasMermaid = false;

    const hasVisual = lines.some(function (line) {
      const text = line.trim();
      return /^[\-\*\+]\s/.test(text) ||
        /^\d+\.\s/.test(text) ||
        text.startsWith('![') ||
        text.startsWith('```mermaid') ||
        text.startsWith('>') ||
        text.startsWith('<div');
    });

    for (const line of lines) {
      const text = line.trim();

      if (text.startsWith('# ')) {
        hasH1 = true;
      } else if (text && !text.startsWith('Note:')) {
        hasOtherContent = true;
      }

      if (text.startsWith('```mermaid')) {
        inMermaidBlock = true;
        hasMermaid = true;
        continue;
      }

      if (inMermaidBlock) {
        if (text === '```') {
          inMermaidBlock = false;
          continue;
        }
        mermaidContent.push(line);
        continue;
      }

      if (text.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        mainContent.push(line);
        continue;
      }

      if (inCodeBlock) {
        mainContent.push(line);
        continue;
      }

      if (!text) continue;

      const isHeader = text.startsWith('#');
      const isVisualElem = /^[\-\*\+]\s/.test(text) ||
        /^\d+\.\s/.test(text) ||
        text.startsWith('![') ||
        text.startsWith('>') ||
        text.startsWith('<div');

      if (isHeader || isVisualElem) {
        if (text.startsWith('>')) {
          noteContent.push(line.substring(1).trim());
        } else {
          mainContent.push(line);
        }
      } else if (!hasVisual && !text.startsWith('Note:')) {
        mainContent.push(line);
      } else {
        noteContent.push(line);
      }
    }

    const noticeText = getNoticeText();
    const notice = noticeText ? '<div class="presentation-notice">' + escapeHtml(noticeText) + '</div>' : '';
    const breadcrumbText = [sectionName, breadcrumb].filter(Boolean).join(' / ');
    const breadcrumbHtml = breadcrumbText ? '<div class="breadcrumb">' + escapeHtml(breadcrumbText) + '</div>\n\n' : '';

    if (hasMermaid) {
      const headerHtml = mainContent
        .filter(function (line) { return line.trim().startsWith('#'); })
        .map(function (line) {
          const level = line.match(/^(#+)/)[1].length;
          const text = escapeHtml(line.replace(/^#+\s*/, ''));
          return '<h' + level + '>' + text + '</h' + level + '>';
        })
        .join('');
      const mermaidId = 'mermaid-' + Math.random().toString(36).slice(2, 10);
      const noteHtml = noteContent.length ? '<aside class="notes">' + escapeHtml(noteContent.join(' ')) + '</aside>' : '';

      return '<section class="mermaid-slide"><div class="slide-inner">' +
        notice + breadcrumbHtml + headerHtml +
        '<div class="mermaid" id="' + mermaidId + '">' + escapeHtml(mermaidContent.join('\n')) + '</div>' +
        '</div>' + noteHtml + '</section>';
    }

    const isTitleSlide = hasH1 && !hasOtherContent;
    let slideMarkdown = '';

    if (!isTitleSlide) {
      slideMarkdown += notice + breadcrumbHtml;
    } else if (breadcrumbText) {
      slideMarkdown += '<div class="breadcrumb">' + escapeHtml(breadcrumbText) + '</div>\n\n';
    }

    slideMarkdown += mainContent.join('\n');
    if (noteContent.length) slideMarkdown += '\n\nNote: ' + noteContent.join(' ');

    return createSlideHtml(slideMarkdown, isTitleSlide, false);
  }

  function buildSlides(markdown, sectionLabel) {
    const rawSlides = markdown.split(/^(?=#{1,2}\s)/gm);
    const processedSlides = [];
    let currentParent = '';

    for (const rawSlide of rawSlides) {
      if (!rawSlide.trim()) continue;

      const lines = rawSlide.split('\n');
      const h2Line = lines.find(function (line) { return line.trim().startsWith('## '); });
      if (h2Line) currentParent = h2Line.replace(/^##\s+/, '').trim();

      const h3Indices = [];
      lines.forEach(function (line, index) {
        if (line.trim().startsWith('### ')) h3Indices.push(index);
      });

      if (h3Indices.length === 0) {
        processedSlides.push(processSingleSlide(rawSlide, '', sectionLabel));
        continue;
      }

      const h3Titles = h3Indices.map(function (index) { return lines[index].trim(); });
      let overviewMd = '<div class="breadcrumb">' + escapeHtml(sectionLabel) + '</div>\n\n';
      overviewMd += (h2Line ? h2Line + '\n\n' : '') + h3Titles.join('\n\n');
      processedSlides.push(createSlideHtml(overviewMd, false, true));

      for (let i = 0; i < h3Indices.length; i++) {
        const start = h3Indices[i];
        const end = h3Indices[i + 1] || lines.length;
        const h3Section = lines.slice(start, end).join('\n');
        processedSlides.push(processSingleSlide(h3Section, currentParent, sectionLabel));
      }
    }

    return processedSlides;
  }

  function getCurrentSectionInfo() {
    const cfg = window.$docsify.presentation || {};
    const sectionOrder = cfg.sections || [];
    const route = window.getSiteRouteInfo ? window.getSiteRouteInfo() : { lang: 'en', docPath: 'README' };
    const currentDoc = route.docPath || 'README';
    const sectionIndex = sectionOrder.findIndex(function (section) {
      return section.id === currentDoc || (currentDoc === '' && section.id === 'README');
    });

    if (sectionIndex >= 0) {
      return {
        index: sectionIndex,
        info: sectionOrder[sectionIndex],
        route: route
      };
    }

    return {
      index: -1,
      info: { id: currentDoc, next: null, prev: null, label: { es: 'CV', en: 'CV' } },
      route: route
    };
  }

  function attachAutoNav(sectionInfo) {
    if (window.activeAutoNav) {
      window.removeEventListener('keydown', window.activeAutoNav);
    }

    let lastSlideTime = 0;
    deck.on('ready', function () {
      if (deck.isLastSlide()) lastSlideTime = Date.now();
    });
    deck.on('slidechanged', function () {
      lastSlideTime = deck.isLastSlide() ? Date.now() : 0;
    });

    window.activeAutoNav = function (event) {
      const lang = window.getSiteLang();
      const base = window.getSiteBaseHash(lang);
      const now = Date.now();
      const forward = event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter';
      const back = event.key === 'ArrowLeft';

      if (event.key === 'Escape') {
        stopPresentation();
        return;
      }

      if (forward && deck.isLastSlide() && sectionInfo.next && (now - lastSlideTime > 300)) {
        window.sessionStorage.setItem('restart-presentation', 'true');
        window.location.hash = base + sectionInfo.next;
        showSpinner();
        window.removeEventListener('keydown', window.activeAutoNav);
        window.activeAutoNav = null;
      } else if (back && deck.getState().indexh === 0 && sectionInfo.prev) {
        window.sessionStorage.setItem('restart-presentation', 'true');
        window.sessionStorage.setItem('start-at-last-slide', 'true');
        window.location.hash = base + sectionInfo.prev;
        showSpinner();
        window.removeEventListener('keydown', window.activeAutoNav);
        window.activeAutoNav = null;
      }
    };

    window.addEventListener('keydown', window.activeAutoNav);
  }

  function handlePresentationClick(event) {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    if (href.startsWith('#/')) {
      event.preventDefault();
      window.sessionStorage.setItem('restart-presentation', 'true');
      window.location.hash = href;
      showSpinner();
      return;
    }

    if (!href.startsWith('#')) {
      event.preventDefault();
      const base = window.getSiteBaseHash(window.getSiteLang());
      window.sessionStorage.setItem('restart-presentation', 'true');
      window.location.hash = base + href.replace(/\.md$/, '');
      showSpinner();
    }
  }

  async function startPresentation() {
    if (!currentMarkdown || isInitializing) return;
    isInitializing = true;

    try {
      document.getElementById('reveal-css')?.removeAttribute('disabled');
      document.getElementById('reveal-theme')?.removeAttribute('disabled');
      await new Promise(function (resolve) { setTimeout(resolve, 100); });

      const current = getCurrentSectionInfo();
      const lang = current.route.lang;
      const sectionInfo = current.info;
      const labelCfg = sectionInfo.label || {};
      const sectionLabel = labelCfg[lang] || labelCfg.es || sectionInfo.id || 'CV';
      const slides = buildSlides(currentMarkdown, sectionLabel);

      const slidesEl = getRevealSlides();
      const revealContainer = document.getElementById('reveal-container');
      if (slidesEl) slidesEl.innerHTML = slides.join('\n');
      if (revealContainer) revealContainer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-presenting');

      if (deck) {
        deck.destroy();
        deck = null;
      }

      const revealEl = document.querySelector('#reveal-container .reveal');
      if (!revealEl) throw new Error('#reveal-container .reveal not found');

      deck = new Reveal(revealEl, {
        plugins: [RevealMarkdown, RevealNotes],
        embedded: false,
        hash: false,
        respondToHashChanges: false,
        history: false,
        center: false,
        transition: 'slide',
        backgroundTransition: 'fade',
        width: '100%',
        height: '100%',
        margin: 0.1,
        minScale: 0.2,
        maxScale: 2.0
      });

      await deck.initialize();

      if (window.sessionStorage.getItem('start-at-last-slide') === 'true') {
        window.sessionStorage.removeItem('start-at-last-slide');
        deck.slide(Math.max(deck.getTotalSlides() - 1, 0));
      }

      function runMermaid() {
        if (typeof window.renderMermaidSlides === 'function') {
          setTimeout(function () { window.renderMermaidSlides('.reveal'); }, 200);
        }
      }

      deck.on('ready', runMermaid);
      deck.on('slidechanged', runMermaid);
      runMermaid();
      attachAutoNav(sectionInfo);
    } catch (error) {
      console.error('[presentation] Failed to start:', error);
    } finally {
      isInitializing = false;
    }
  }

  function stopPresentation() {
    document.body.classList.remove('is-presenting');
    document.getElementById('reveal-container')?.setAttribute('aria-hidden', 'true');
    document.getElementById('reveal-css')?.setAttribute('disabled', 'true');
    document.getElementById('reveal-theme')?.setAttribute('disabled', 'true');
    window.sessionStorage.removeItem('restart-presentation');

    if (window.activeAutoNav) {
      window.removeEventListener('keydown', window.activeAutoNav);
      window.activeAutoNav = null;
    }
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(
    function pluginPresentation(hook) {
      hook.beforeEach(function (markdown) {
        currentMarkdown = markdown;
        return markdown;
      });

      hook.doneEach(function () {
        if (window.sessionStorage.getItem('restart-presentation') === 'true') {
          window.sessionStorage.removeItem('restart-presentation');
          setTimeout(startPresentation, 500);
        }
      });
    }
  );

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('present-toggle')?.addEventListener('click', startPresentation);
    document.getElementById('close-present')?.addEventListener('click', stopPresentation);
    document.getElementById('reveal-container')?.addEventListener('click', handlePresentationClick);
  });
})();
