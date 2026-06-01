<template>
  <div :class="wrapperClass">
    <span
      v-for="tag in tags"
      :key="tag"
      :class="tagClass"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TagList',
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    wrapperClass: {
      type: String,
      default: 'flex flex-wrap gap-2'
    },
    tagClass: {
      type: String,
      default: 'chip'
    }
  }
};
</script>
