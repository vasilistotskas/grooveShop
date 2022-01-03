<template>
  <div class="container mt-4 mb-4">
    <ul class="breadcrumb">
      <li class="breadcrumb__item">
        <router-link :to="{ name: 'Home' }" class="btn-w-effect" aria-label="Home">
          <span class="breadcrumb__inner">
            <span class="breadcrumb__title">Home</span>
          </span>
        </router-link>
        <span class="breadcrumb__seperator">/</span>
      </li>
      <li v-for="breadcrumb in breadCrumbPath" class="breadcrumb__item">
        <router-link :to="'/' + breadcrumb.to.full_path" class="btn-w-effect" aria-label="Blog">
          <span class="breadcrumb__inner">
            <span class="breadcrumb__title">{{ breadcrumb.to.param }}</span>
          </span>
        </router-link>
        <span class="breadcrumb__seperator">/</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"

@Options({
  name: "Breadcrumbs",
  props: {
    breadCrumbPath: {}
  }
})

export default class Breadcrumbs extends Vue {

  breadCrumbPath!: {}

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
      color: $primary-color-4;
    }
    a {
      color: $primary-color-3!important;
    }
    a.router-link-active {
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