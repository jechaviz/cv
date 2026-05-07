/*
 * Docsify plugin: custom theme toggle synchronized with docsify-darklight.
 */
(function () {
  'use strict';

  function syncToHtml() {
    const saved = window.localStorage.getItem('docsify-darklight-theme') || 'dark';
    const isDark = saved === 'dark';
    const theme = isDark ? 'dark' : 'light';
    const html = document.documentElement;

    html.classList.toggle('dark', isDark);
    html.classList.toggle('light', !isDark);
    html.setAttribute('data-theme', theme);

    if (document.body) {
      document.body.classList.toggle('dark', isDark);
      document.body.classList.toggle('light', !isDark);
    }

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      const label = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
      themeBtn.innerHTML = isDark ? '<span aria-hidden="true">&#9790;</span>' : '<span aria-hidden="true">&#9728;</span>';
      themeBtn.setAttribute('title', label);
      themeBtn.setAttribute('aria-label', label);
      themeBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }
  }

  document.addEventListener('click', function (event) {
    if (!event.target.closest('#theme-toggle')) return;

    const current = window.localStorage.getItem('docsify-darklight-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('docsify-darklight-theme', next);
    syncToHtml();

    const pluginBtn = document.getElementById('docsify-darklight-theme');
    if (pluginBtn) pluginBtn.setAttribute('aria-hidden', 'true');
  });

  window.addEventListener('storage', function (event) {
    if (event.key === 'docsify-darklight-theme') syncToHtml();
  });

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(
    function pluginTheme(hook) {
      hook.init(syncToHtml);
      hook.doneEach(syncToHtml);
    }
  );
})();
