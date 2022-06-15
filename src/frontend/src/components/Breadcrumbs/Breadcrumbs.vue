<template>
  <div class="container mt-2 mb-4 breadcrumb-container">
    <ul class="breadcrumb">
      <li class="breadcrumb__item">
        <RouterLink :to="{ name: 'Home' }" aria-label="Home" class="btn-w-effect" title="Home">
          <span class="breadcrumb__inner">
            <span class="breadcrumb__title">Home</span>
          </span>
        </RouterLink>
        <span class="breadcrumb__seperator">/</span>
      </li>
      <li v-for="breadcrumb in breadCrumbPath" :key="breadcrumb.id" class="breadcrumb__item">
        <RouterLink :title="breadcrumb.name" :to="'/' + breadcrumb.to.full_path" aria-label="Blog" class="btn-w-effect">
          <span class="breadcrumb__inner">
            <span class="breadcrumb__title">{{ breadcrumb.name }}</span>
          </span>
        </RouterLink>
        <span class="breadcrumb__seperator">/</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options as Component, Vue } from 'vue-class-component'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'

@Component({
  name: 'Breadcrumbs',
  props: {
    breadCrumbPath: {},
  },
})
export default class Breadcrumbs extends Vue {
  breadCrumbPath!: Array<BreadcrumbItemInterface>
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Breadcrumbs/Breadcrumbs';
</style>
