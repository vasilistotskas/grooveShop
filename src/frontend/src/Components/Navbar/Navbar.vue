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

				<div
					v-if="
						categoryModule.getCategories &&
						categoryModule.getCategories.length > 0
					"
					:class="{ wrapper: categoryModule.getCategories.length === 0 }"
					class="navbar-categories-loading"
				>
					<div
						:class="{
							'content wrapper-cell': categoryModule.getCategories.length === 0
						}"
						class="products-header"
						@click="menuToggle"
					>
						<div ref="navbarProductsButton" class="products-a btn">
							<button
								id="burgerButton"
								ref="mainToggleButton"
								aria-label="Main Menu"
								class="menu"
								title="Toggle Menu"
							>
								<svg height="65" viewBox="0 0 100 100" width="65">
									<path
										class="line line-one"
										d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
									/>
									<path class="line line-two" d="M 20,50 H 80" />
									<path
										class="line line-three"
										d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
									/>
								</svg>
							</button>
							<h2 class="title">PRODUCTS</h2>
						</div>
					</div>
				</div>

				<div class="blog-header">
					<RouterLink aria-label="Blog" class="btn-w-effect" title="Blog" to="/blog">
						<FontAwesomeIcon v-if="appModule.isMobile" :icon="blogIcon" />
						<FontAwesomeIcon v-else :icon="blogIcon" size="2x" />
						<h3 class="navbar-blog-title">BLOG</h3>
					</RouterLink>
				</div>
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
					<li class="navigation-header-part">
						<RouterLink
							v-if="authModule.isAuthenticated"
							:to="{ name: 'Favourites' }"
							aria-label="Favourites"
							title="Favourites"
						>
							<FontAwesomeIcon
								v-if="appModule.isMobile"
								:icon="heartIcon"
								:style="{ color: 'rgba(200,60,60,0.79)' }"
							/>
							<FontAwesomeIcon
								v-else
								:icon="heartIcon"
								:style="{ color: 'rgba(200,60,60,0.79)' }"
								size="2x"
							/>
						</RouterLink>
						<RouterLink v-else aria-label="Log In" title="Log In" to="/log-in">
							<FontAwesomeIcon v-if="appModule.isMobile" :icon="heartIcon" />
							<FontAwesomeIcon v-else :icon="heartIcon" size="2x" />
						</RouterLink>
					</li>
					<li class="navigation-header-part">
						<RouterLink
							v-if="authModule.isAuthenticated"
							aria-label="My Account"
							title="My Account"
							to="/user-account"
						>
							<FontAwesomeIcon
								v-if="appModule.isMobile"
								:icon="userIcon"
								:style="{ color: 'rgba(200,60,60,0.79)' }"
							/>
							<FontAwesomeIcon
								v-else
								:icon="userIcon"
								:style="{ color: 'rgba(200,60,60,0.79)' }"
								size="2x"
							/>
						</RouterLink>
						<RouterLink v-else aria-label="Log In" title="Log In" to="/log-in">
							<FontAwesomeIcon v-if="appModule.isMobile" :icon="userIcon" />
							<FontAwesomeIcon v-else :icon="userIcon" size="2x" />
						</RouterLink>
					</li>
					<li class="navigation-header-part">
						<RouterLink aria-label="Cart" title="Cart" to="/cart">
							<FontAwesomeIcon v-if="appModule.isMobile" :icon="shoppingCartIcon" />
							<FontAwesomeIcon v-else :icon="shoppingCartIcon" size="2x" />
							<span class="cart-total-length">{{ cartModule.getCartTotalLength }}</span>
						</RouterLink>
					</li>
					<ThemeModeSwitcher />
				</ul>
			</div>
			<transition name="fade">
				<NavbarCategories
					v-if="
						categoryModule.getCategories &&
						categoryModule.getCategories.length > 0 &&
						!appModule.getNavbarMenuHidden
					"
					:categories-tree="categoryModule.getCategories"
					:main-toggle-button="$refs.mainToggleButton"
					:navbar-products-button="$refs.navbarProductsButton"
				/>
			</transition>
		</nav>
	</section>
</template>

<script lang="ts">
import AppCore from '@/Core/AppCore'
import AuthCore from '@/Core/AuthCore'
import ImageCore from '@/Core/ImageCore'
import CartModule from '@/State/Cart/CartModule'
import { getModule } from 'vuex-module-decorators'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import CategoryModule from '@/State/Category/CategoryModule'
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
		mainToggleButton: HTMLElement
		navbarProductsButton: HTMLElement
	}
	cartModule = getModule(CartModule)
	categoryModule = getModule(CategoryModule)
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

		this.appModule.setNavbarMenuHidden(!this.appModule.getNavbarMenuHidden)
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Navbar/Navbar.scss';
</style>
