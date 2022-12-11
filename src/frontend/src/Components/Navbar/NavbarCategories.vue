<template>
	<div class="navbar-main-collapse-menu">
		<div
			ref="headerNavbarMenu"
			:class="{ wrapper: Object.keys(categories).length === 0 }"
			class="container navbar-menu-grid-container"
		>
			<ul
				v-if="categories && Object.keys(categories).length > 0"
				class="navbar-menu-grid-head"
			>
				<li v-for="(category, key) in categories" :key="category.id">
					<h3>
						<RouterLink
							:id="category.children ? `id-${category.id}` : ''"
							:key="category.id"
							:class="{ 'has-children': category?.children }"
							:title="category.name"
							:to="{ name: 'Category', params: { category_slug: category.slug } }"
							:toggle="category.children ? 'toggle' : ''"
							aria-current="page"
							aria-expanded="false"
							class="navbar-menu-grid-head-item"
							role="button"
							@mouseleave="categoryBoxHovered = null"
							@mouseover="categoryBoxHovered = key"
						>
							<GrooveImage
								:alt="category.name"
								:file-name="
									categoryBoxHovered === key
										? category.category_menu_image_two_filename
										: category.category_menu_image_two_filename
								"
								:use-media-stream="true"
								:img-type="ImageTypeOptions.CATEGORIES"
								:img-width="80"
								:img-height="83"
							/>
							<span>{{ category.name }}</span>
						</RouterLink>
					</h3>
				</li>
			</ul>

			<div class="navbar-menu-grid-body" style="display: none">
				<div class="navbar-menu-grid-body-item" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { cloneDeep } from 'lodash'
import { onClickOutside } from '@vueuse/core'
import AppModule from '@/State/App/AppModule'
import { getModule } from 'vuex-module-decorators'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import CategoryModel from '@/State/Category/CategoryModel'
import { Options as Component, Vue } from 'vue-class-component'
import { ImageTypeOptions } from '@/Helpers/MediaStream/ImageUrlEnum'

@Component({
	name: 'NavbarCategories',
	components: {
		GrooveImage
	},
	props: {
		categoriesTree: Array as PropType<Array<CategoryModel>>,
		mainToggleButton: typeof HTMLElement,
		navbarProductsButton: typeof HTMLElement
	}
})
export default class NavbarCategories extends Vue {
	declare $refs: {
		headerNavbarMenu: HTMLElement
	}
	appModule = getModule(AppModule, this.$store)
	categoryBoxHovered: null | number = null
	categoriesTree: Array<CategoryModel> = []
	categories: Array<CategoryModel> = []
	mainToggleButton!: HTMLElement
	navbarProductsButton!: HTMLElement
	ImageTypeOptions = ImageTypeOptions

	mounted(): void {
		this.categories = cloneDeep(this.categoriesTree)
		onClickOutside(this.$refs.headerNavbarMenu, (e) => {
			if (!e.composedPath().includes(this.navbarProductsButton)) {
				this.menuOpenHandle()
			}
		})
	}

	public menuOpenHandle(): void {
		this.mainToggleButton.classList.toggle('opened')
		this.mainToggleButton.setAttribute(
			'aria-expanded',
			this.mainToggleButton.classList.contains('opened') as unknown as string
		)
		this.appModule.setNavbarMenuHidden(true)
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Navbar/NavbarCategories.scss';
</style>
