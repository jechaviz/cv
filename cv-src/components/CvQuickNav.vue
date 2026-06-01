<template>
  <nav class="mb-8 flex flex-wrap items-center justify-between gap-3 print-hidden">
    <div class="flex flex-wrap gap-2">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="chip hover:border-moss hover:text-moss"
      >
        <i :class="link.icon" aria-hidden="true"></i>
        {{ link.label }}
      </a>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <div
        class="flex gap-1 rounded-[6px] bg-white/70 p-1 soft-border"
        role="group"
        :aria-label="languageLabel"
      >
        <button
          v-for="option in localeOptions"
          :key="option.code"
          type="button"
          class="rounded-[5px] px-2.5 py-1 text-xs font-800 transition"
          :class="locale === option.code ? 'bg-ink text-paper' : 'text-ink/70 hover:text-moss'"
          :aria-pressed="locale === option.code"
          @click="$emit('set-locale', option.code)"
        >
          {{ option.short }}
        </button>
      </div>

      <button
        type="button"
        class="chip cursor-pointer bg-ink text-paper hover:bg-moss"
        @click="$emit('print')"
      >
        <i class="fa-solid fa-print" aria-hidden="true"></i>
        {{ printLabel }}
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'CvQuickNav',
  emits: ['print', 'set-locale'],
  props: {
    languageLabel: { type: String, required: true },
    links: { type: Array, required: true },
    locale: { type: String, required: true },
    localeOptions: { type: Array, required: true },
    printLabel: { type: String, required: true }
  }
};
</script>
