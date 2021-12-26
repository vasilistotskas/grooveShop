<template>
  <router-link :to="`/author/${author.user.email}`" aria-label="Blog Author">{{ displayName }}</router-link>
</template>

<script>
export default {
  name: 'AuthorLink',
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
  computed: {
    displayName () {
      return (this.author.user.firstName && this.author.user.lastName && `${this.author.user.firstName} ${this.author.user.lastName}`) || `${this.author.user.email}`
    },
  },
}
</script>