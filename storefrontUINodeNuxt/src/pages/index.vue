<script lang="ts" setup>
// composable
const { t } = useLang()

// meta
definePageMeta({
	layout: 'page'
})
useHead(() => ({
	title: t('pages.index.title'),
	meta: [
		{
			name: 'description',
			content: t('pages.index.description')
		},
		{
			name: 'keywords',
			content: t('pages.index.keywords')
		}
	]
}))
useServerSeoMeta({
	title: t('pages.index.title'),
	description: t('pages.index.description')
})
// vars
const titlesText = computed<string[]>(() => t('pages.index.title').split('[]'))
const leadingText = computed(() => [
	{
		text: titlesText.value[0],
		startColor: '#bb3939',
		endColor: '#231a1a',
		delay: 0
	},
	{
		text: titlesText.value[1],
		startColor: '#7928CA',
		endColor: '#FF0080',
		delay: 2
	},
	{
		text: titlesText.value[2],
		startColor: '#FF4D4D',
		endColor: '#F9CB28',
		delay: 4
	}
])
const tooltip = ref(false)

// const
const cancelTooltip = () => {
	tooltip.value = false
	const tt = document.querySelector('.tooltiptext')
	if (tt) tt.innerHTML = `Copy to clipboard`
}
const copyBash = () => {
	const bash =
		'git clone https://github.com/vasilistotskas/grooveShop/storefrontUINodeNuxt'
	navigator.clipboard.writeText(bash)
	tooltip.value = true
	const tt = document.querySelector('.tooltiptext')
	if (tt) tt.innerHTML = `Copied!!!`
}
</script>

<template>
	<PageWrapper>
		<PageBody>
			<PageSection>
				<div class="main-banner">
					<nuxt-img
						src="/assets/images/dummy/1920x640.png"
						alt="Main Banner"
						class="w-full h-full object-cover"
					/>
				</div>
				<div
					class="usps container-small flex flex-wrap items-center justify-center gap-8 my-16 text-center brand lg:justify-between"
				>
					<nuxt-img
						v-for="i in 6"
						:key="i"
						src="/assets/images/dummy/80x40.png"
						alt="Usp"
						class="w-auto h-auto object-cover"
					/>
				</div>
			</PageSection>
		</PageBody>
	</PageWrapper>
</template>

<style lang="scss">
@keyframes anim-fg-1 {
	0%,
	16.667%,
	100% {
		opacity: 1;
	}

	33.333%,
	83.333% {
		opacity: 0;
	}
}

@keyframes anim-fg-2 {
	0%,
	16.667%,
	66.667%,
	100% {
		opacity: 0;
	}

	33.333%,
	50% {
		opacity: 1;
	}
}

@keyframes anim-fg-3 {
	0%,
	50%,
	100% {
		opacity: 0;
	}

	66.667%,
	83.333% {
		opacity: 1;
	}
}

.animated-text-bg {
	position: relative;
	display: block;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	content: var(--content);
	display: block;
	width: 100%;
	color: theme('colors.slate.800');
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 0;
	padding-left: 0.05em;
	padding-right: 0.05em;
	&:before {
		content: var(--content);
		position: absolute;
		display: block;
		width: 100%;
		color: theme('colors.slate.800');
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 0;
		padding-left: 0.05em;
		padding-right: 0.05em;
	}
}
.animated-text-fg {
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	padding-left: 0.05em;
	padding-right: 0.05em;
	background-image: linear-gradient(90deg, var(--start-color), var(--end-color));
	position: relative;
	opacity: 0;
	z-index: 1;
	animation: var(--animation-name) 8s infinite;
}

html.dark {
	.animated-text-bg {
		color: theme('colors.gray.100');
		&:before {
			color: theme('colors.gray.100');
		}
	}
}

.triangle-shape {
	width: 0;
	height: 0;
	border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	border-bottom: 40px solid theme('colors.green.600');
	transform: translate(-15rem, -6rem) rotate(45deg);
}

.tooltip {
	position: relative;
	display: inline-block;
}

.tooltip .tooltiptext {
	visibility: hidden;
	width: 140px;
	background-color: #555;
	color: #fff;
	text-align: center;
	border-radius: 6px;
	padding: 5px;
	position: absolute;
	z-index: 1;
	bottom: 150%;
	left: 50%;
	margin-left: -75px;
	opacity: 0;
	transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
	visibility: visible;
	opacity: 1;
}
</style>
