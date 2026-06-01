<template>
  <main class="cv-shell min-h-screen px-4 py-6 text-ink sm:px-6 lg:px-8 print:px-0 print:py-0">
    <article class="cv-sheet mx-auto grid max-w-[1180px] overflow-hidden soft-border bg-paper shadow-[0_26px_80px_rgba(21,23,24,0.16)] lg:grid-cols-[340px_minmax(0,1fr)] print:max-w-none">
      <CvSidebar
        :contact="contact"
        :copy="copy"
        :stack="stack"
        :strengths="strengths"
      />
      <CvMainContent
        :application-skills="applicationSkills"
        :case-studies="caseStudies"
        :copy="copy"
        :experience="experience"
        :locale="locale"
        :locale-options="localeOptions"
        :metrics="metrics"
        :quick-links="quickLinks"
        @print="printCv"
        @set-locale="setLocale"
      />
    </article>
  </main>
</template>

<script>
export default {
  name: 'ProfessionalCv',
  setup() {
    return window.createCvViewModel();
  }
};
</script>
