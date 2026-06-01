<template>
  <section class="side-block mt-8">
    <h2 class="section-kicker">{{ title }}</h2>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'SideBlock',
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
