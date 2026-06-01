<template>
  <aside class="bg-[#f0f5ef] p-6 sm:p-8 lg:p-9 print:p-5">
    <header class="flex items-center gap-4 lg:block">
      <div class="grid h-20 w-20 shrink-0 place-items-center rounded-[8px] bg-ink text-paper shadow-[inset_0_-10px_30px_rgba(15,95,74,0.32)] lg:h-24 lg:w-24">
        <span class="font-mono text-2xl font-700">JCG</span>
      </div>
      <div class="min-w-0 lg:mt-6">
        <p class="eyebrow text-copper">{{ copy.identity.role }}</p>
        <h1 class="mt-2 text-2xl font-800 leading-[1.02] text-ink sm:text-3xl lg:text-[2.18rem]">
          {{ copy.identity.name }}
        </h1>
      </div>
    </header>

    <SideBlock :title="copy.sections.contact">
      <ContactList :contact="contact" :location="copy.identity.location" />
    </SideBlock>

    <SideBlock :title="copy.sections.strengths">
      <TagList :tags="strengths" wrapper-class="mt-4 flex flex-wrap gap-2" />
    </SideBlock>

    <SideBlock :title="copy.sections.stack">
      <div class="mt-4 grid gap-4">
        <div v-for="group in stack" :key="group.label">
          <h3 class="text-[0.78rem] font-800 uppercase text-ink/62">{{ group.label }}</h3>
          <p class="mt-1 text-[0.9rem] leading-6 text-ink/80">{{ group.items.join(' / ') }}</p>
        </div>
      </div>
    </SideBlock>

    <section class="side-block mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
      <div>
        <h2 class="section-kicker">{{ copy.sections.education }}</h2>
        <div class="mt-4 border-l-3 border-moss/70 pl-4">
          <p class="font-800">{{ copy.education.degree }}</p>
          <p class="mt-1 text-sm text-ink/70">{{ copy.education.period }}</p>
          <p class="mt-1 text-sm font-700 text-copper">{{ copy.education.gpa }}</p>
        </div>
      </div>
      <div>
        <h2 class="section-kicker">{{ copy.sections.language }}</h2>
        <div class="mt-4 flex items-center justify-between gap-3 border-l-3 border-plum/70 pl-4">
          <span class="font-800">{{ copy.language.name }}</span>
          <span class="rounded-[6px] bg-white px-2.5 py-1 text-xs font-800 text-plum soft-border">
            {{ copy.language.level }}
          </span>
        </div>
      </div>
    </section>
  </aside>
</template>

<script>
export default {
  name: 'CvSidebar',
  props: {
    contact: { type: Object, required: true },
    copy: { type: Object, required: true },
    stack: { type: Array, required: true },
    strengths: { type: Array, required: true }
  }
};
</script>
