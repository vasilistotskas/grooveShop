<template>
	<section>
		<nav class="main-navbar">
			<div class="grid-header container">
				<div class="logo-header">
					<h1>
						<RouterLink
							aria-label="DeepWeb.gr - Home Page"
							class="navbar-brand"
							title="DeepWeb.gr - Home Page"
							to="/"
						>
							<GrooveImage
								:alt="'Website Logo'"
								:file-name="'websiteLogo'"
								:path-type="ImagePathOptions.static"
								:img-class="'main-logo img-fluid'"
								:img-height="85"
								:img-width="175"
								:loading="'eager'"
								:img-fit="ImageFitOptions.outside"
								:img-position="ImagePositionOptions.center"
								:img-format="ImageFormatOptions.png"
								:fetch-priority="'high'"
							/>
						</RouterLink>
					</h1>
				</div>

				<div class="blog-header"></div>
				<div class="search-header">
					<div class="search-buttons-container">
						<input
							v-model="searchQuery.query"
							aria-label="Search"
							class="form-control search-form-control me-2"
							name="query"
							placeholder="Search"
							type="search"
						/>
						<button
							aria-label="search"
							class="btn-outline-primary-main"
							title="Search"
							type="submit"
						>
							<FontAwesomeIcon
								:icon="searchIcon"
								:style="{ color: '#3b3b3b' }"
								size="lg"
							/>
						</button>
					</div>
				</div>
				<LocaleChanger></LocaleChanger>
				<ul class="navigation-header">
					<li class="navigation-header-part"></li>
					<li class="navigation-header-part"></li>
					<li class="navigation-header-part"></li>
					<ThemeModeSwitcher />
				</ul>
			</div>
			<transition name="fade"> </transition>
		</nav>
	</section>
</template>

<script lang="ts">
import AppCore from '@/Core/AppCore'
import AuthCore from '@/Core/AuthCore'
import ImageCore from '@/Core/ImageCore'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import LocaleChanger from '@/Components/I18n/LocaleChanger.vue'
import ThemeModeSwitcher from '@/Utilities/ThemeModeSwitcher.vue'
import { faBlog } from '@fortawesome/free-solid-svg-icons/faBlog'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { mixins, Options as Component } from 'vue-class-component'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import NavbarCategories from '@/Components/Navbar/NavbarCategories.vue'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'

@Component({
	name: 'Navbar',
	mixins: [AppCore, AuthCore, ImageCore],
	components: {
		NavbarCategories,
		GrooveImage,
		ThemeModeSwitcher,
		LocaleChanger
	}
})
export default class Navbar extends mixins(AppCore, AuthCore, ImageCore) {
	declare $refs: {
		mainToggleButton: any
		navbarProductsButton: any
	}
	endpointUrl = 'search-product'
	searchQuery = {
		query: ''
	}
	blogIcon = faBlog
	userIcon = faUser
	heartIcon = faHeart
	searchIcon = faSearch
	shoppingCartIcon = faShoppingCart

	public menuToggle(): void {
		this.$refs.mainToggleButton.classList.toggle('opened')
		this.$refs.mainToggleButton.setAttribute(
			'aria-expanded',
			this.$refs.mainToggleButton.classList.contains('opened') as unknown as string
		)
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Navbar/Navbar.scss';
</style>
