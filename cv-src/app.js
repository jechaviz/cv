(function () {
  const componentFiles = {
    ProfessionalCv: './cv-src/ProfessionalCv.vue',
    CvSidebar: './cv-src/components/CvSidebar.vue',
    CvMainContent: './cv-src/components/CvMainContent.vue',
    CvQuickNav: './cv-src/components/CvQuickNav.vue',
    ContactList: './cv-src/components/ContactList.vue',
    ExperienceTimeline: './cv-src/components/ExperienceTimeline.vue',
    SideBlock: './cv-src/components/SideBlock.vue',
    TagList: './cv-src/components/TagList.vue'
  };

  function renderLoadError(error) {
    console.error(error);
    document.getElementById('app').innerHTML = [
      '<main class="min-h-screen grid place-items-center p-6 font-sans text-ink">',
      '<section class="max-w-[560px] rounded-[8px] bg-paper p-6 soft-border">',
      '<h1 class="m-0 text-2xl font-800">CV could not load</h1>',
      '<p class="mt-3 text-ink/70">Serve this folder over HTTP so the Vue SFC loader can fetch component files.</p>',
      '</section>',
      '</main>'
    ].join('');
  }

  async function loadComponents(loadModule, options) {
    const loaded = {};
    for (const [name, url] of Object.entries(componentFiles)) {
      loaded[name] = await loadModule(url, options);
    }
    return loaded;
  }

  async function bootstrap() {
    const loader = window['vue3-sfc-loader'];
    const options = {
      moduleCache: { vue: Vue },
      async getFile(url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${url} ${response.status} ${response.statusText}`);
        }
        return response.text();
      },
      addStyle(textContent) {
        const style = document.createElement('style');
        style.textContent = textContent;
        document.head.appendChild(style);
      },
      log(type, ...args) {
        if (type === 'error') {
          console.error(...args);
        }
      }
    };

    const components = await loadComponents(loader.loadModule, options);
    const app = Vue.createApp(components.ProfessionalCv);

    Object.entries(components).forEach(([name, component]) => {
      if (name !== 'ProfessionalCv') {
        app.component(name, component);
      }
    });

    app.mount('#app');
  }

  bootstrap().catch(renderLoadError);
})();
