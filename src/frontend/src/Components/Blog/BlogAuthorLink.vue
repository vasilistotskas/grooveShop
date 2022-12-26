<template>
	<RouterLink
		:title="author.user.email"
		:to="`/author/${author.id}`"
		aria-label="Blog Author"
	>
		{{ displayName }}
	</RouterLink>
</template>

<script lang="ts">
import { PropType } from 'vue'
import BlogAuthorModel from '@/State/Blog/BlogAuthorModel'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'BlogAuthorLink',
	props: {
		author: {
			type: Object as PropType<BlogAuthorModel>,
			required: true
		}
	}
})
export default class BlogAuthorLink extends Vue {
	author!: BlogAuthorModel

	get displayName(): string {
		return (
			(this.author.user?.firstName &&
				this.author.user?.lastName &&
				`${this.author.user?.firstName} ${this.author.user?.lastName}`) ||
			`${this.author.user?.email}`
		)
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Blog/BlogAuthorLink.scss';
</style>
