/*
 * Docsify plugin: Mermaid initialization plus slide rendering helper.
 */
(function () {
  'use strict';

  function getMermaidTheme() {
    const saved = window.localStorage.getItem('docsify-darklight-theme') || 'dark';
    return saved === 'light' ? 'neutral' : 'dark';
  }

  if (window.mermaid) {
    const cfg = (window.$docsify && window.$docsify.mermaidZoom) || {};
    mermaid.initialize({
      startOnLoad: false,
      theme: cfg.theme || getMermaidTheme(),
      securityLevel: cfg.securityLevel || 'loose',
      gantt: { useMaxWidth: true, axisFormat: '%d/%m' },
      flowchart: { useMaxWidth: true, htmlLabels: true }
    });
  }

  async function renderMermaidSlides(scope) {
    if (!window.mermaid) {
      console.warn('[mermaid] Mermaid is not available.');
      return;
    }

    const rootEl = typeof scope === 'string'
      ? document.querySelector(scope)
      : (scope instanceof Element ? scope : document.querySelector('.reveal'));

    if (!rootEl) return;

    const elements = rootEl.querySelectorAll('.mermaid:not([data-mermaid-done])');

    for (const el of elements) {
      const code = el.textContent.trim();
      if (!code) continue;

      try {
        const id = 'cv-mermaid-' + Math.random().toString(36).slice(2, 10);
        const result = await window.mermaid.render(id, code);
        el.innerHTML = result.svg;
        el.setAttribute('data-mermaid-done', '1');

        const svg = el.querySelector('svg');
        if (svg) {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
          svg.style.width = '100%';
          svg.style.height = '100%';

          el.addEventListener('mousemove', function (event) {
            const rect = el.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            svg.style.transformOrigin = x + '% ' + y + '%';
          });

          el.addEventListener('mouseleave', function () {
            svg.style.transformOrigin = 'center';
          });
        }
      } catch (error) {
        console.error('[mermaid] Render error:', error, '\nSource:', code);
      }
    }
  }

  window.renderMermaidSlides = renderMermaidSlides;
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = window.$docsify.plugins || [];
})();
