<template>
  <div class="navbar-main-collapse-menu">
    <div :class="{'wrapper': Object.keys(categories).length === 0 }" class="container navbar-menu-grid-container">
      <div v-if="categories && Object.keys(categories).length > 0"
           ref="target"
           class="navbar-menu-grid-head"
      >
        <RouterLink v-for="(category, key) in categories"
                     :id="category.children ? `id-${category.id}` : '' "
                     :key="category.id"
                     :class="{'has-children': category?.children }"
                     :to="({ name: 'Category', params: { category_slug: category.slug } })"
                     :toggle="category.children ? 'toggle' : '' "
                     aria-current="page"
                     aria-expanded="false"
                     class="navbar-menu-grid-head-item"
                     role="button"
                     @mouseleave="categoryBoxHovered = null"
                     @mouseover="categoryBoxHovered = key"
        >
          <img :alt="category.name"
               :src="categoryBoxHovered === key ?
                 mediaStreamImage('categories', category.category_menu_image_two_filename, '80', '83') :
                 mediaStreamImage('categories', category.category_menu_image_one_filename, '80', '83')"
               height="83"
               width="80"
          />
          <span>{{ category.name }}</span>
        </RouterLink>
      </div>

      <div class="navbar-menu-grid-body" style="display: none">
        <div class="navbar-menu-grid-body-item"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { cloneDeep } from 'lodash';
import { onClickOutside } from '@vueuse/core';
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'NavbarCategories',
  props: {
    categoriesTree: Array,
    mainToggleButton: HTMLElement,
    navbarProductsButton: HTMLElement
  }
})
export default class NavbarCategories extends Vue {
  $refs!: {
    target: HTMLElement;
  };
  categoryBoxHovered = null;
  categoriesTree = [];
  categories = [];
  mainToggleButton!: HTMLElement;
  navbarProductsButton!: HTMLElement;

  get isLoading(): boolean {
    return store.getters['app/getLoading'];
  }

  mounted(): void {
    this.categories = cloneDeep(this.categoriesTree);

    onClickOutside(this.$refs.target, (e) => {
      if (!e.composedPath().includes(this.navbarProductsButton)) {
        this.menuOpenHandle();
      }
    });
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/';
    const imageNameFileTypeRemove = imageName.substring(0, imageName.lastIndexOf('.')) || imageName;
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/' + imageNameFileTypeRemove + '/' + width + '/' + height;
  }

  public menuOpenHandle(): void {
    this.mainToggleButton.classList.toggle('opened');
    this.mainToggleButton.setAttribute('aria-expanded', this.mainToggleButton.classList.contains('opened') as unknown as string);
    store.commit('app/setNavbarMenuHidden', true);
  }
}
</script>

<style lang="scss" scoped>
  .navbar-main-collapse-menu {
    position: absolute;
    width: 100%;
    z-index: 10;
    background-color: var(--cp-palette-main-fourth);
    .navbar-menu-grid {
      &-head {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        max-height: 162px;
        box-shadow: 0 2px 4px rgb(153 153 153 / 33%);
        background-color: var(--cp-palette-main-secondary);
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
          border-left: 1px solid var(--cp-palette-main-third);
          border-right: 1px solid var(--cp-palette-main-third);
          &:hover {
            background-color: var(--cp-palette-main-fifth);
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