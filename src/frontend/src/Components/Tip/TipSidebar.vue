<template>
	<section v-if="tips && tips.length > 0" id="tips" class="tip-sidebar-section">
		<div class="tip-sidebar-head">
			<span class="tip-sidebar-head-title"> Η Ασφαλής πλευρά του WEB </span>
		</div>
		<div class="tip-sidebar-wrapper">
			<div class="tip-sidebar-content">
				<TipCard v-for="tip in tips" :key="tip.id" :tip="tip" />
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { PropType } from 'vue'
import TipModel from '@/State/Tip/TipModel'
import TipCard from '@/Components/Tip/TipCard.vue'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'TipSidebar',
	components: {
		TipCard
	},
	props: {
		tips: {
			type: Array as PropType<Array<TipModel>>,
			required: true
		}
	}
})
export default class TipSidebar extends Vue {
	tips!: Array<TipModel>
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Tip/TipSidebar.scss';
</style>
