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
		<Navbar
			:cart-total-length="cartTotalLength"
			:pre-head-hidden="!showPreHeader"
			:navbar-menu-hidden="navbarMenuHidden"
			:categories-tree-data="categoriesTreeData"
			:is-authenticated="isAuthenticated"
			:is-mobile="isMobile"
		/>
	</header>
</template>

<script lang="ts">
import Navbar from '@/Components/Navbar/Navbar.vue'
import { Options as Component, Vue } from 'vue-class-component'
import { PropType } from 'vue'
import CategoryModel from '@/State/Category/CategoryModel'

@Component({
	name: 'Header',
	components: {
		Navbar
	},
	props: {
		cartTotalLength: {
			type: Number,
			default: 0
		},
		backendBaseUrl: {
			type: String,
			default: ''
		},
		navbarMenuHidden: {
			type: Boolean,
			default: false
		},
		isMobile: {
			type: Boolean,
			default: false
		},
		categoriesTreeData: {
			type: Array as PropType<Array<CategoryModel>>
		},
		isAuthenticated: {
			type: Boolean,
			default: false
		},
		isLoading: {
			type: Boolean,
			default: true
		}
	}
})
export default class Header extends Vue {
	cartTotalLength = 0
	backendBaseUrl = ''
	showPreHeader = true
	navbarMenuHidden = false
	isMobile = false
	categoriesTreeData!: Array<CategoryModel>
	isAuthenticated = false
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
@import '@/Assets/Styles/Components/Main/Header';
</style>
