<template>
  <ul class="mt-4 grid gap-3 text-[0.92rem] text-ink/82">
    <li v-for="item in items" :key="item.id" class="flex gap-3">
      <i :class="[item.icon, 'mt-1 w-4 text-moss']" aria-hidden="true"></i>
      <a
        v-if="item.href"
        class="break-all hover:text-moss"
        :href="item.href"
        :target="item.external ? '_blank' : null"
        :rel="item.external ? 'noreferrer' : null"
      >
        {{ item.text }}
      </a>
      <span v-else>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ContactList',
  props: {
    contact: {
      type: Object,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  computed: {
    items() {
      return [
        { id: 'location', icon: 'fa-solid fa-location-dot', text: this.location },
        { id: 'email', icon: 'fa-solid fa-envelope', text: this.contact.email, href: `mailto:${this.contact.email}` },
        { id: 'phone', icon: 'fa-solid fa-mobile-screen-button', text: this.contact.phone, href: this.contact.phoneHref },
        { id: 'github', icon: 'fa-brands fa-github', text: this.contact.github.text, href: this.contact.github.url, external: true },
        { id: 'linkedin', icon: 'fa-brands fa-linkedin', text: this.contact.linkedin.text, href: this.contact.linkedin.url, external: true }
      ];
    }
  }
};
</script>
