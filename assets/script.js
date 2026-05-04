/*
 * CV site bootstrap.
 * Centralizes Docsify configuration, language routing, presentation order
 * and small site-level helpers.
 */

(function () {
  let saved = window.localStorage.getItem('docsify-darklight-theme');
  if (!saved) {
    saved = 'dark';
    window.localStorage.setItem('docsify-darklight-theme', saved);
  }

  const isDark = saved === 'dark';
  const html = document.documentElement;
  html.classList.toggle('dark', isDark);
  html.classList.toggle('light', !isDark);
  html.setAttribute('data-theme', saved);

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('light', !isDark);
  });
})();

window.getSiteRouteInfo = function (rawHash) {
  const hash = typeof rawHash === 'string' ? rawHash : (window.location.hash || '');
  const normalizedHash = hash.replace(/^#/, '');
  const hashParts = normalizedHash.split('?');
  const pathPart = (hashParts[0] || '/').replace(/^\/+/, '');
  const query = hashParts.length > 1 ? '?' + hashParts.slice(1).join('?') : '';
  const segments = pathPart ? pathPart.split('/').filter(Boolean) : [];

  let lang = 'es';
  let pathSegments = segments;

  if (segments[0] === 'en' || segments[0] === 'es') {
    lang = segments[0];
    pathSegments = segments.slice(1);
  }

  return {
    lang: lang,
    docPath: pathSegments.join('/') || 'README',
    query: query
  };
};

window.getSiteLang = function (rawHash) {
  return window.getSiteRouteInfo(rawHash).lang;
};

window.getSiteBaseHash = function (lang) {
  return '#/' + (lang === 'en' ? 'en' : 'es') + '/';
};

window.buildSiteLangHash = function (targetLang, rawHash) {
  const info = window.getSiteRouteInfo(rawHash);
  const base = window.getSiteBaseHash(targetLang);
  const docPath = info.docPath === 'README' ? '' : info.docPath;
  return docPath ? base + docPath + info.query : base + info.query;
};

window.prefixSiteLangHref = function (href, targetLang) {
  if (!href || !href.startsWith('#/')) return href;
  if (/^#\/(en|es)(\/|$|\?)/.test(href)) return href;

  const lang = targetLang === 'en' ? 'en' : 'es';
  const hrefParts = href.slice(2).split('?');
  const pathPart = (hrefParts[0] || '').replace(/^\/+/, '');
  const query = hrefParts.length > 1 ? '?' + hrefParts.slice(1).join('?') : '';

  if (!pathPart || pathPart === 'README') {
    return window.getSiteBaseHash(lang) + query;
  }

  return window.getSiteBaseHash(lang) + pathPart + query;
};

window.rewriteLanguageScopedLinks = function (root) {
  const lang = window.getSiteLang();
  const scope = root || document;
  const anchors = scope.querySelectorAll('a[href^="#/"]');

  anchors.forEach(function (anchor) {
    const currentHref = anchor.getAttribute('href');
    const nextHref = window.prefixSiteLangHref(currentHref, lang);
    if (nextHref !== currentHref) {
      anchor.setAttribute('href', nextHref);
    }
  });
};

window.syncDocumentLang = function (rawHash) {
  document.documentElement.setAttribute('lang', window.getSiteLang(rawHash));
};

window.syncDocumentLang();
window.addEventListener('hashchange', function () {
  window.syncDocumentLang();
});

if (!window.location.hash || window.location.hash === '#/') {
  window.location.hash = '#/es/';
}

window.SITE_CONFIG = {
  branding: {
    brand: 'JCG CV',
    person: 'Jesús Chávez Galaviz',
    company: 'Jesús Chávez Galaviz',
    presentationNotice: {
      es: 'CV profesional',
      en: 'Professional CV'
    },
    footerPrefix: {
      es: 'CV interactivo -',
      en: 'Interactive CV -'
    }
  }
};

window.$docsify = {
  name: `<div class="sidebar-brand">
      <span style="font-family:Outfit;font-weight:900;color:var(--heading-h1-color);font-size:1.25rem;display:block;">CV JESÚS CHÁVEZ</span>
      <div class="contact-card">
        <div class="contact-item"><span>Mail</span> jesus.cgalaviz@gmail.com</div>
        <div class="contact-item"><span>Tel</span> +52 4421896413</div>
        <div class="contact-item"><span>Git</span> github.com/jechaviz</div>
        <div class="contact-item"><span>Loc</span> Querétaro, México</div>
      </div>
    </div>`,
  repo: '',
  loadSidebar: true,
  loadNavbar: true,
  subMaxLevel: 3,
  auto2top: true,
  fallbackLanguages: ['es', 'en'],

  alias: {
    '/(es|en)/.*/_sidebar.md': '/$1/_sidebar.md',
    '/(es|en)/.*/_navbar.md': '/$1/_navbar.md',
    '^/(?!en|es)(.*)': '/es/$1'
  },

  themeable: {
    readyTransition: true,
    responsiveTables: true
  },

  darklightTheme: {
    siteFont: 'Inter, sans-serif',
    defaultTheme: 'dark',
    codeFontFamily: 'Roboto Mono, monospace',
    bodyFontSize: '16px',
    dark: {
      accent: '#14b8a6',
      background: '#09090b',
      textColor: '#d4d4d8',
      sidebarSublink: '#a1a1aa'
    },
    light: {
      accent: '#0f766e',
      background: '#fbfaf7',
      textColor: '#18181b',
      sidebarSublink: '#52525b'
    }
  },

  titlePlugin: {
    brand: 'JCG CV'
  },

  mermaidZoom: {
    theme: 'dark',
    securityLevel: 'loose'
  },

  presentation: {
    sections: [
      { id: 'README', label: { es: 'Inicio', en: 'Home' }, next: 'resumen', prev: null },
      { id: 'resumen', label: { es: 'Resumen profesional', en: 'Professional summary' }, next: 'logros', prev: 'README' },
      { id: 'logros', label: { es: 'Logros seleccionados', en: 'Selected achievements' }, next: 'habilidades', prev: 'resumen' },
      { id: 'habilidades', label: { es: 'Habilidades técnicas', en: 'Technical skills' }, next: 'educacion', prev: 'logros' },
      { id: 'educacion', label: { es: 'Educación', en: 'Education' }, next: 'exp/algotrading', prev: 'habilidades' },
      { id: 'exp/algotrading', label: { es: 'Algotrading y quant', en: 'Algotrading and quant' }, next: 'exp/persistent', prev: 'educacion' },
      { id: 'exp/persistent', label: { es: 'Persistent Systems', en: 'Persistent Systems' }, next: 'exp/freelance', prev: 'exp/algotrading' },
      { id: 'exp/freelance', label: { es: 'Freelance architect', en: 'Freelance architect' }, next: 'exp/petco', prev: 'exp/persistent' },
      { id: 'exp/petco', label: { es: 'Petco Mexico', en: 'Petco Mexico' }, next: 'exp/morgan_stanley', prev: 'exp/freelance' },
      { id: 'exp/morgan_stanley', label: { es: 'Morgan Stanley', en: 'Morgan Stanley' }, next: 'exp/bny_mellon', prev: 'exp/petco' },
      { id: 'exp/bny_mellon', label: { es: 'BNY Mellon', en: 'BNY Mellon' }, next: 'exp/terapixel', prev: 'exp/morgan_stanley' },
      { id: 'exp/terapixel', label: { es: 'Terapixel', en: 'Terapixel' }, next: 'exp/tralix_dev', prev: 'exp/bny_mellon' },
      { id: 'exp/tralix_dev', label: { es: 'Tralix desarrollo', en: 'Tralix development' }, next: 'exp/tralix_edu', prev: 'exp/terapixel' },
      { id: 'exp/tralix_edu', label: { es: 'Tralix educación', en: 'Tralix education' }, next: 'exp/teaching', prev: 'exp/tralix_dev' },
      { id: 'exp/teaching', label: { es: 'Docencia', en: 'Teaching' }, next: null, prev: 'exp/tralix_edu' }
    ]
  },

  toc: {
    headings: 'h2, h3',
    title: '',
    position: 'top-right'
  },

  plugins: [
    function (hook) {
      hook.afterEach(function (html, next) {
        const lang = window.getSiteLang();
        const conf = window.SITE_CONFIG.branding;
        const footer = `<div class="site-footer">${conf.footerPrefix[lang]} <strong>${conf.company}</strong></div>`;
        next(html + footer);
      });
    },
    function (hook) {
      hook.doneEach(function () {
        setTimeout(function () {
          window.rewriteLanguageScopedLinks();
        }, 50);
      });
    }
  ]
};

sq(function () {
  const langToggle = sq('#lang-toggle');
  const presentToggle = sq('#present-toggle');

  function updateLabels() {
    const isEn = window.getSiteLang() === 'en';
    langToggle.html(isEn ? 'ES' : 'EN');
    langToggle.attr('title', isEn ? 'Switch to Spanish' : 'Cambiar a inglés');
    presentToggle.html(
      isEn
        ? '<span aria-hidden="true">&#9654;</span><span class="present-label">PRESENT</span>'
        : '<span aria-hidden="true">&#9654;</span><span class="present-label">PRESENTAR</span>'
    );
    presentToggle.attr('title', isEn ? 'Present CV' : 'Presentar CV');
  }

  langToggle.on('click', function () {
    const nextLang = window.getSiteLang() === 'en' ? 'es' : 'en';
    window.location.hash = window.buildSiteLangHash(nextLang);
  });

  window.addEventListener('hashchange', updateLabels);
  updateLabels();
});
