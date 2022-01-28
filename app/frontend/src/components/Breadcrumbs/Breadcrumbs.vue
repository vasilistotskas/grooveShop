<template>
  <div class="container mt-4 mb-4 breadcrumb-container">
    <ul class="breadcrumb">
      <li class="breadcrumb__item">
        <RouterLink :to="{ name: 'Home' }" title="Home" aria-label="Home" class="btn-w-effect">
          <span class="breadcrumb__inner">
            <span class="breadcrumb__title">Home</span>
          </span>
        </RouterLink>
        <span class="breadcrumb__seperator">/</span>
      </li>
      <li v-for="breadcrumb in breadCrumbPath" :key="breadcrumb.id" class="breadcrumb__item">
        <RouterLink :to="'/' + breadcrumb.to.full_path" :title="breadcrumb.name" aria-label="Blog" class="btn-w-effect">
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
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'Breadcrumbs',
  props: {
    breadCrumbPath: {}
  }
})

export default class Breadcrumbs extends Vue {

  breadCrumbPath!: Record<string, unknown>;

}

</script>

<style lang="scss" scoped>

.breadcrumb {
  display: flex;
  top: 0;
  padding-bottom: 0;
  padding-top: 0;
  font-size: 13px;
  border: 0;
  justify-content: center!important;
  flex-wrap: wrap;
  margin-bottom: 0;
  list-style: none;
  background-color: transparent;
  border-radius: 0.25rem;

  &__item {
    cursor: pointer;
    display: inline-flex;
    &:hover {
      color: var(--cp-palette-main-fifth);
    }
    a {
      color: var(--cp-palette-main-third)!important;
    }
    a.router-link-exact-active {
      span.breadcrumb__title {
        font-weight: 500;
      }
    }
    &:last-child {
      span.breadcrumb__seperator {
        display: none;
      }
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    margin: auto;
    z-index: 2;
  }

  &__title {
    font-size: 13px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__seperator {
    margin-left: 8px;
    margin-right: 8px;
  }

}

@media all and (max-width: 1000px) {
  .breadcrumb {
    height: 35px;
  }
  .breadcrumb__title{
    font-size: 10px;
  }
  .breadcrumb__item {
    padding: 0 30px;
  }
}

@media all and (max-width: 710px) {
  .breadcrumb {
    height: 30px;
  }
  .breadcrumb__item {
    padding: 0 20px;
  }
}

</style>