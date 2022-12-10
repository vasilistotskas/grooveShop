<template>
	<div
		v-if="tip && Object.keys(tip).length > 0"
		class="tip-card-container"
		:style="{ background: tipBackground(tip.kind) }"
	>
		<div class="tip-card-wrapper">
			<div class="tip-card-icon">
				<GrooveImage
					:alt="tip.title"
					:src="tip.mainImageAbsoluteUrl"
					:use-media-stream="false"
					:img-height="36"
					:img-width="36"
					:class="'tip-card-icon-image'"
				/>
			</div>
			<h4 class="tip-card-title">
				{{ tip.title }}
			</h4>
			<div class="tip-card-content">
				{{ contentShorten(tip.content) }}
			</div>
			<div class="tip-card-bottom">
				<FontAwesomeIcon class="tip-card-bottom-icon" :icon="globeIcon" />
				<span class="tip-card-bottom-text">webpage</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { helpers } from '@/Helpers/main'
import TipModel from '@/State/Tip/TipModel'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import { TipKindEnum } from '@/State/Tip/Enum/TipEnum'
import { Options as Component, Vue } from 'vue-class-component'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'

@Component({
	name: 'TipSidebar',
	components: {
		GrooveImage
	},
	props: {
		tip: {
			type: Object as PropType<TipModel>,
			required: true
		}
	}
})
export default class TipCard extends Vue {
	tip!: TipModel
	globeIcon = faGlobe

	public contentShorten(content: string): string {
		return helpers.contentShorten(content, 0, 50)
	}

	public tipBackground(kind: TipKindEnum): string {
		switch (kind) {
			case TipKindEnum.SUCCESS: {
				return 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(115,0,0,0.7483368347338936) 90%)'
			}
			case TipKindEnum.INFO: {
				return 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(115,0,0,0.7483368347338936) 90%)'
			}
			case TipKindEnum.ERROR: {
				return 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(115,0,0,0.7483368347338936) 90%)'
			}
			case TipKindEnum.WARNING: {
				return 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(115,0,0,0.7483368347338936) 90%)'
			}
			default: {
				return ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Tip/TipCard.scss';
</style>
