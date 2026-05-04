/*
 * Docsify plugin: keeps the browser title branded on every route.
 */
(function () {
  'use strict';

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(
    function pluginTitle(hook) {
      hook.doneEach(function () {
        const cfg = window.$docsify.titlePlugin || {};
        const brand = cfg.brand || '';
        const prefix = brand ? brand + ' |' : '';
        const title = document.title || '';

        if (prefix && title && !title.startsWith(prefix)) {
          document.title = prefix + ' ' + title;
        }
      });
    }
  );
})();
