<template>
  <div class="mt-6 grid gap-5">
    <article
      v-for="job in experience"
      :key="job.company + job.from"
      class="timeline-item grid gap-4 border-l-3 border-black/10 pl-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:pl-0"
    >
      <div class="sm:border-r sm:border-black/10 sm:pr-5">
        <p class="font-mono text-[0.78rem] font-700 text-moss">{{ job.from }} - {{ job.to }}</p>
        <p class="mt-2 text-sm text-ink/58">{{ job.location }}</p>
        <span
          v-if="job.current"
          class="mt-3 inline-flex rounded-[6px] bg-moss/10 px-2 py-1 text-[0.7rem] font-800 uppercase text-moss"
        >
          {{ currentLabel }}
        </span>
      </div>

      <div class="pb-1 sm:pl-5">
        <h3 class="text-lg font-800 leading-tight text-ink">{{ job.title }}</h3>
        <p class="mt-1 font-700 text-copper">{{ job.company }}</p>
        <p class="mt-3 leading-7 text-ink/76">{{ job.summary }}</p>
        <TagList
          v-if="job.tags?.length"
          :tags="job.tags"
          wrapper-class="mt-3 flex flex-wrap gap-2"
          tag-class="rounded-[6px] bg-[#eef3ee] px-2 py-1 text-[0.72rem] font-800 text-ink/68 soft-border"
        />
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ExperienceTimeline',
  props: {
    currentLabel: { type: String, required: true },
    experience: { type: Array, required: true }
  }
};
</script>
