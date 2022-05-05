<template>
  <div class="navbar-main-collapse-menu">
    <div
      ref="headerNavbarMenu"
      :class="{'wrapper': Object.keys(categories).length === 0 }"
      class="container navbar-menu-grid-container"
    >
      <ul
        v-if="categories && Object.keys(categories).length > 0"
        class="navbar-menu-grid-head"
      >
        <li
          v-for="(category, key) in categories"
          :key="category.id"
        >
          <h3>
            <RouterLink
              :id="category.children ? `id-${category.id}` : '' "
              :key="category.id"
              :class="{'has-children': category?.children }"
              :title="category.name"
              :to="({ name: 'Category', params: { category_slug: category.slug } })"
              :toggle="category.children ? 'toggle' : '' "
              aria-current="page"
              aria-expanded="false"
              class="navbar-menu-grid-head-item"
              role="button"
              @mouseleave="categoryBoxHovered = null"
              @mouseover="categoryBoxHovered = key"
            >
              <img
                :alt="category.name"
                :src="categoryBoxHovered === key ?
                  mediaStreamImage(ImageTypeOptions.CATEGORIES, category.category_menu_image_two_filename, '80', '83') :
                  mediaStreamImage(ImageTypeOptions.CATEGORIES, category.category_menu_image_one_filename, '80', '83')"
                height="83"
                width="80"
                loading="lazy"
              >
              <span>{{ category.name }}</span>
            </RouterLink>
          </h3>
        </li>
      </ul>

      <div
        class="navbar-menu-grid-body"
        style="display: none"
      >
        <div class="navbar-menu-grid-body-item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { cloneDeep } from 'lodash'
import { onClickOutside } from '@vueuse/core'
import { Options, Vue } from 'vue-class-component'
import CategoryModel from '@/state/category/CategoryModel'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

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
    headerNavbarMenu: HTMLElement
  }
  categoryBoxHovered = null
  categoriesTree: Array<CategoryModel> = []
  categories: Array<CategoryModel> = []
  mainToggleButton!: HTMLElement
  navbarProductsButton!: HTMLElement

  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions

  imageUrl: string = ''

  get isLoading(): boolean {
    return store.getters['app/getLoading']
  }

  mounted(): void {
    this.categories = cloneDeep(this.categoriesTree)
    onClickOutside(this.$refs.headerNavbarMenu, (e) => {
      if (!e.composedPath().includes(this.navbarProductsButton)) {
        this.menuOpenHandle()
      }
    })
  }

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string | (() => string) {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }

    const imageModel = new ImageUrlModel(mediaStreamImageData)

    imageModel.buildMediaStreamImageUrl()
        .then((finalUrl: string) => {
          this.imageUrl = finalUrl
        })

    return this.imageUrl

  }

  public menuOpenHandle(): void {
    this.mainToggleButton.classList.toggle('opened')
    this.mainToggleButton.setAttribute('aria-expanded', this.mainToggleButton.classList.contains('opened') as unknown as string)
    store.commit('app/setNavbarMenuHidden', true)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Navbar/NavbarCategories"

</style>