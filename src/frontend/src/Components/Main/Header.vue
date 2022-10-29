<template>
	<header id="main-header" :class="{ 'pre-header-hidden': !showPreHeader }">
		<div class="preheader" :class="{ 'preheader--hidden': !showPreHeader }">
			<p>
				Groove
				<a :href="backendBaseUrl">
					<span style="text-decoration: underline">Here</span>!</a
				>
			</p>
		</div>
		<Navbar :cart-total-length="cartTotalLength" :pre-head-hidden="!showPreHeader" />
	</header>
</template>

<script lang="ts">
import AppModule from '@/State/App/AppModule'
import CartModule from '@/State/Cart/CartModule'
import { getModule } from 'vuex-module-decorators'
import Navbar from '@/Components/Navbar/Navbar.vue'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'Header',
	components: {
		Navbar
	}
})
export default class Header extends Vue {
	cartModule = getModule(CartModule)
	appModule = getModule(AppModule)
	showPreHeader = true
	lastScrollPosition = 0

	get backendBaseUrl(): string | undefined {
		return this.appModule.backendBaseUrl
	}

	get cartTotalLength(): number {
		return this.cartModule.getCartTotalLength
	}

	mounted(): void {
		window.addEventListener('scroll', this.onScroll)
	}

	beforeDestroy(): void {
		window.removeEventListener('scroll', this.onScroll)
	}

	onScroll(): void {
		const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
		if (currentScrollPosition < 0) {
			return
		}
		// Stop executing this function if the difference between
		// current scroll position and last scroll position is less than some offset
		if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
			return
		}
		this.showPreHeader = currentScrollPosition < this.lastScrollPosition
		this.lastScrollPosition = currentScrollPosition
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Main/Header';
</style>
