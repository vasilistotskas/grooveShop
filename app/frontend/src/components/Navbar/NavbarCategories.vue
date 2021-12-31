<template>
  <div class="navbar-main-collapse-menu">
    <div class="container navbar-menu-grid-container" v-bind:class="{'wrapper': Object.keys(this.categories).length === 0 }">
      <div class="navbar-menu-grid-head"
           ref="target">
        <router-link v-for="(category, key) in this.categories" class="navbar-menu-grid-head-item"
             @mouseover="categoryBoxHovered = key"
             @mouseleave="categoryBoxHovered = null"
             v-bind:class="{'has-children': category?.children }"
             v-bind:id="category.children ? `id-${category.id}` : '' "
             v-bind:key="category.id"
             v-bind:toggle="category.children ? 'toggle' : '' "
             role="button"
             aria-expanded="false"
             aria-current="page"
             :to="({ name: 'Category', params: { category_slug: category.slug } })">
          <img alt="category.name"
               :src="categoryBoxHovered === key ? category.menu_image_two : category.menu_image_one"
               >
          <span>{{ category.name }}</span>
        </router-link>
      </div>

      <div class="navbar-menu-grid-body" style="display: none">
        <div class="navbar-menu-grid-body-item"></div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store"
import { cloneDeep } from 'lodash'
import { onClickOutside } from '@vueuse/core'
import { Options, Vue } from "vue-class-component"

@Options({
  name: "NavbarCategories",
  props: {
    categoriesTree: Array,
    mainToggleButton: HTMLElement,
    navbarProductsButton: HTMLElement
  },
})
export default class NavbarCategories extends Vue {
  $refs!: {
    target: HTMLElement
  }
  categoryBoxHovered = null
  categoriesTree = []
  categories = []
  mainToggleButton!: HTMLElement
  navbarProductsButton!: HTMLElement

  get isLoading(): boolean {
    return store.getters['app/getLoading']
  }

  mounted() : void {
    this.categories = cloneDeep(this.categoriesTree)

    onClickOutside(this.$refs.target, (e) => {
      if(!e.composedPath().includes(this.navbarProductsButton)) {
        this.menuOpenHandle()
      }
    })
  }

  public menuOpenHandle(): void {
    this.mainToggleButton.classList.toggle('opened');
    this.mainToggleButton.setAttribute('aria-expanded', this.mainToggleButton.classList.contains('opened') as unknown as string)
    store.commit('app/setNavbarMenuHidden', true)
  }
}
</script>

<style lang="scss" scoped>
  .navbar-main-collapse-menu {
    position: absolute;
    width: 100%;
    z-index: 10;
    background-color: $primary-color-4;
    .navbar-menu-grid {
      &-head {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        max-height: 160px;
        background-color: $primary-color-4;
        border-radius: 5px;
        &-item {
          display: grid;
          grid-template-rows: repeat(2, 1fr);
          grid-gap: 15px 0;
          max-height: 160px;
          width: 100%;
          align-items: center;
          justify-items: center;
          height: 100%;
          &:hover {
            background-color: $primary-color-4;
          }
          img {
            max-width: 100px;
            width: 100%;
            height: auto;
            padding: 10px;
          }
          span {
            text-align: center;
            font-weight: 500;
          }
        }
      }
    }

  }

</style>