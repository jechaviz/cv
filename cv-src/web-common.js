(function (global) {
  function createContentRepository(locales, fallbackLocale) {
    return {
      fallbackLocale: fallbackLocale,
      hasLocale: function (code) {
        return Boolean(locales[code]);
      },
      listLocales: function () {
        return Object.keys(locales).map(function (code) {
          return Object.assign({ code: code }, locales[code].localeMeta);
        });
      },
      get: function (code) {
        return locales[code] || locales[fallbackLocale];
      }
    };
  }

  function createSafeStorage(key) {
    return {
      read: function () {
        try {
          return global.localStorage.getItem(key);
        } catch (error) {
          return null;
        }
      },
      write: function (value) {
        try {
          global.localStorage.setItem(key, value);
        } catch (error) {
          return false;
        }
        return true;
      }
    };
  }

  function syncDocumentMeta(locale, meta) {
    if (!global.document || !meta) return;
    global.document.documentElement.lang = locale;
    global.document.title = meta.title || global.document.title;

    var description = global.document.querySelector('meta[name="description"]');
    if (description && meta.description) {
      description.setAttribute('content', meta.description);
    }
  }

  global.WebCommon = Object.freeze({
    createContentRepository: createContentRepository,
    createSafeStorage: createSafeStorage,
    syncDocumentMeta: syncDocumentMeta
  });
})(window);
