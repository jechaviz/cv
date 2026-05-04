/*
 * Docsify plugin: floating in-page table of contents.
 */
(function () {
  'use strict';

  const PANEL_ID = 'doc-toc';
  let currentObserver = null;

  function getOrCreatePanel() {
    let panel = document.getElementById(PANEL_ID);

    if (!panel) {
      panel = document.createElement('nav');
      panel.id = PANEL_ID;

      const toggle = document.createElement('button');
      toggle.className = 'toc-toggle';
      toggle.type = 'button';
      toggle.innerHTML = '<span aria-hidden="true">&#9776;</span>';
      toggle.addEventListener('click', function () {
        panel.classList.toggle('toc-collapsed');
      });

      const inner = document.createElement('div');
      inner.className = 'toc-inner';

      panel.appendChild(toggle);
      panel.appendChild(inner);
      document.body.appendChild(panel);
    }

    panel.setAttribute('aria-label', window.getSiteLang && window.getSiteLang() === 'en' ? 'Table of contents' : 'Tabla de contenido');
    return panel;
  }

  function setActive(id) {
    const links = document.querySelectorAll('#' + PANEL_ID + ' .toc-link');
    links.forEach(function (link) {
      link.classList.toggle('toc-active', link.getAttribute('data-toc-id') === id);
    });
  }

  function startScrollSpy(headings) {
    if (currentObserver) currentObserver.disconnect();

    currentObserver = new IntersectionObserver(function (entries) {
      const visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });

      if (visible.length) setActive(visible[0].target.id);
    }, {
      rootMargin: '0px 0px -60% 0px',
      threshold: 0
    });

    headings.forEach(function (heading) {
      currentObserver.observe(heading);
    });
  }

  function buildToc() {
    const cfg = (window.$docsify && window.$docsify.toc) || {};
    const selector = cfg.headings || 'h2, h3';
    const title = cfg.title !== undefined ? cfg.title : '';
    const panel = getOrCreatePanel();
    const content = document.querySelector('.markdown-section');

    if (!content) {
      panel.classList.remove('toc-visible');
      return;
    }

    const headings = Array.from(content.querySelectorAll(selector));
    if (headings.length < 2) {
      panel.classList.remove('toc-visible');
      const inner = panel.querySelector('.toc-inner');
      if (inner) inner.innerHTML = '';
      return;
    }

    headings.forEach(function (heading, index) {
      if (!heading.id) heading.id = 'toc-heading-' + index;
    });

    let html = '';
    if (title) html += '<div class="toc-title">' + title + '</div>';
    html += '<ul>';
    headings.forEach(function (heading) {
      const level = parseInt(heading.tagName[1], 10);
      const text = heading.textContent.trim();
      html += '<li class="toc-item toc-h' + level + '">' +
        '<a href="#' + heading.id + '" class="toc-link" data-toc-id="' + heading.id + '">' + text + '</a>' +
        '</li>';
    });
    html += '</ul>';

    panel.querySelector('.toc-inner').innerHTML = html;
    panel.classList.add('toc-visible');

    Array.from(panel.querySelectorAll('.toc-link')).forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = link.getAttribute('data-toc-id');
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActive(targetId);
        }
      });
    });

    startScrollSpy(headings);
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(
    function pluginToc(hook) {
      hook.doneEach(function () {
        setTimeout(buildToc, 60);
      });
    }
  );
})();
