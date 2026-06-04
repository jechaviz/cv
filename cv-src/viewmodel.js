(function () {
  function createCvViewModel() {
    const { computed, ref, watchEffect } = Vue;
    const { shared, locales, fallbackLocale, storageKey } = window.CV_DATA;
    const common = window.WebCommon;
    const repository = common.createContentRepository(locales, fallbackLocale);
    const storage = common.createSafeStorage(storageKey);

    const normalizeLocale = (code) => repository.hasLocale(code) ? code : fallbackLocale;
    const locale = ref(normalizeLocale(storage.read() || fallbackLocale));
    const copy = computed(() => repository.get(locale.value));

    function setLocale(code) {
      locale.value = normalizeLocale(code);
      storage.write(locale.value);
    }

    const stack = computed(() => shared.stack.map((group) => ({
      label: copy.value.stackLabels[group.id],
      items: group.items
    })));

    const quickLinks = computed(() => shared.links.map((link) => ({
      ...link,
      label: copy.value.linkLabels[link.id]
    })));

    const experience = computed(() => shared.experienceBase.map((job) => ({
      ...job,
      current: Boolean(job.current),
      location: copy.value.locations[job.locationId],
      to: job.current ? copy.value.labels.present : job.to,
      ...copy.value.experience[job.id]
    })));

    watchEffect(() => {
      common.syncDocumentMeta(locale.value, copy.value.meta);
    });

    return {
      applicationSkills: shared.skills,
      caseStudies: computed(() => copy.value.caseStudies),
      contact: shared.contact,
      copy,
      experience,
      locale,
      localeOptions: repository.listLocales(),
      metrics: computed(() => copy.value.metrics),
      printCv: () => window.print(),
      quickLinks,
      setLocale,
      stack,
      strengths: computed(() => copy.value.strengths)
    };
  }

  window.createCvViewModel = createCvViewModel;
})();
