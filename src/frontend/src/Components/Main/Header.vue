<template>
	<header id="main-header" :class="{ 'pre-header-hidden': !showPreHeader }">
		<div class="preheader" :class="{ 'preheader--hidden': !showPreHeader }">
			<p>
				Groove
				<a :href="appModule.backendBaseUrl">
					<span style="text-decoration: underline">Here</span>!</a
				>
			</p>
		</div>
		<Navbar />
	</header>
</template>

<script lang="ts">
import AppModule from '@/State/App/AppModule'
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
	appModule = getModule(AppModule)
	showPreHeader = true
	lastScrollPosition = 0

	mounted(): void {
		window.addEventListener('scroll', this.onScroll)
	}

	beforeDestroy(): void {
		window.removeEventListener('scroll', this.onScroll)
	}

	onScroll(): void {
		const currentScrollPosition = window.scrollY || document.documentElement.scrollTop
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
@import '@/Assets/Styles/Components/Main/Header.scss';
</style>
