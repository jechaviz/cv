<template>
  <section class="p-6 sm:p-8 lg:p-10 print:p-5">
    <CvQuickNav
      :language-label="copy.actions.languageLabel"
      :links="quickLinks"
      :locale="locale"
      :locale-options="localeOptions"
      :print-label="copy.actions.print"
      @print="$emit('print')"
      @set-locale="$emit('set-locale', $event)"
    />

    <header class="border-b border-black/10 pb-7">
      <div class="flex flex-wrap items-center gap-2">
        <span class="chip border-moss/20 bg-moss/8 text-moss">{{ copy.hero.badges[0] }}</span>
        <span class="chip border-copper/20 bg-copper/8 text-copper">{{ copy.hero.badges[1] }}</span>
      </div>

      <h2 class="mt-5 max-w-[850px] text-3xl font-800 leading-[1.06] text-ink sm:text-4xl lg:text-[3.2rem]">
        {{ copy.hero.title }}
      </h2>
      <p class="mt-5 max-w-[790px] text-[1.04rem] leading-8 text-ink/76">
        {{ copy.hero.summary }}
      </p>

      <div class="mt-6 grid gap-3 sm:grid-cols-3">
        <div v-for="metric in metrics" :key="metric.label" class="soft-border bg-white/65 p-4">
          <p class="text-2xl font-800 text-ink">{{ metric.value }}</p>
          <p class="mt-1 text-sm leading-5 text-ink/65">{{ metric.label }}</p>
        </div>
      </div>
    </header>

    <section id="case-studies" class="mt-8">
      <p class="section-kicker">{{ copy.sections.caseStudies }}</p>
      <div class="mt-4 grid gap-4">
        <article v-for="study in caseStudies" :key="study.title" class="soft-border bg-white/65 p-4">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="min-w-0">
              <h3 class="text-lg font-800 leading-tight text-ink">{{ study.title }}</h3>
              <p class="mt-2 leading-6 text-ink/76">{{ study.context }}</p>
            </div>
            <div class="grid gap-1 font-mono text-[0.68rem] font-800 uppercase text-moss">
              <span v-for="metric in study.metrics" :key="metric">{{ metric }}</span>
            </div>
          </div>
          <p class="mt-3 leading-6 text-ink/76">{{ study.impact }}</p>
          <TagList
            :tags="study.tags"
            wrapper-class="mt-3 flex flex-wrap gap-2"
            tag-class="rounded-[6px] bg-[#eef3ee] px-2 py-1 text-[0.72rem] font-800 text-ink/68 soft-border"
          />
        </article>
      </div>
    </section>

    <section id="experience" class="mt-8">
      <div>
        <p class="section-kicker">{{ copy.sections.experience }}</p>
        <h2 class="mt-2 text-xl font-800 text-ink">{{ copy.sections.timeline }}</h2>
      </div>
      <ExperienceTimeline :current-label="copy.labels.current" :experience="experience" />
    </section>

    <section id="skills" class="mt-9 border-t border-black/10 pt-7">
      <p class="section-kicker">{{ copy.sections.skills }}</p>
      <TagList
        :tags="applicationSkills"
        wrapper-class="mt-4 flex flex-wrap gap-2"
        tag-class="rounded-[6px] bg-white/72 px-2.5 py-1.5 text-[0.78rem] font-700 text-ink/72 soft-border"
      />
    </section>
  </section>
</template>

<script>
export default {
  name: 'CvMainContent',
  emits: ['print', 'set-locale'],
  props: {
    applicationSkills: { type: Array, required: true },
    caseStudies: { type: Array, required: true },
    copy: { type: Object, required: true },
    experience: { type: Array, required: true },
    locale: { type: String, required: true },
    localeOptions: { type: Array, required: true },
    metrics: { type: Array, required: true },
    quickLinks: { type: Array, required: true }
  }
};
</script>
