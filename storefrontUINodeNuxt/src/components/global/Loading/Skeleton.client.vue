<script lang="ts" setup>
defineProps({
	showImage: {
		type: Boolean,
		default: true
	},
	showBodyImage: {
		type: Boolean,
		default: false
	},
	imageWidth: {
		type: [Number, String],
		default: '100%'
	},
	imageHeight: {
		type: [Number, String],
		default: '100%'
	},
	isCircle: {
		type: Boolean,
		default: false
	},
	showHeading: {
		type: Boolean,
		default: true
	},
	showParagraph: {
		type: Boolean,
		default: true
	},
	showFooter: {
		type: Boolean,
		default: true
	},
	replicas: {
		type: Number,
		default: 1
	},
	cardWidth: {
		type: [Number, String],
		default: '100%'
	},
	cardHeight: {
		type: [Number, String],
		default: 'auto'
	}
})
</script>

<template>
	<div
		:class="{
			wrapper: true,
			'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4': replicas > 1
		}"
	>
		<div v-for="i in replicas" :key="i" class="container">
			<a
				id="card-link"
				aria-label="skeleton"
				class="card"
				target="_blank"
				:style="`width:${cardWidth}; height:${cardHeight};`"
			>
				<div class="card__header gap-2">
					<div v-if="showImage">
						<div
							id="logo-img"
							class="header__img skeleton"
							:style="{ borderRadius: isCircle ? '50%' : 'none' }"
						/>
					</div>
					<h3 v-if="showHeading" id="card-title" class="card__header header__title">
						<span class="skeleton skeleton-text"></span>
						<span class="skeleton skeleton-text"></span>
					</h3>
				</div>

				<div class="card__body">
					<div v-if="showParagraph" id="card-details" class="card__body body__text">
						<div
							v-for="n in 10"
							:key="n"
							class="skeleton skeleton-text skeleton-text__body"
						></div>
					</div>

					<div v-if="showBodyImage" class="card__body body__img">
						<div
							id="cover-img"
							class="skeleton"
							:style="{ borderRadius: isCircle ? '50%' : 'none' }"
						/>
					</div>
				</div>

				<div v-if="showFooter" id="card-footer" class="card__footer">
					<div class="skeleton skeleton-text skeleton-footer"></div>
				</div>
			</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
//Hides the broken image icon
img[alt] {
	text-indent: -10000px;
}

.container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 600px) {
		margin: -0.5rem;
	}
}

.card {
	@apply bg-gray-50 dark:bg-gray-900;
	box-shadow: 0 0 transparent, 0 0 transparent,
		0 0.375rem 0.375rem -0.125rem rgba(168, 179, 207, 0.4);
	padding: 0.5rem;
	border-radius: 1rem;
	border: 1px solid rgba(82, 88, 102, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	transition: all 0.2s ease;

	&__header {
		display: flex;
		flex-direction: column;
		margin: 0.5rem 0 0.5rem 0.5rem;

		.header__img {
			height: 2rem;
			width: 2rem;
			object-fit: cover;
			border-radius: 50%;
		}

		.header__title {
			font-size: 1.0625rem;
			line-height: 1.375rem;
			color: #0e1217;
			font-weight: 700;
			margin: 0.5rem;
		}
	}

	&__body {
		margin: 0 0.5rem;

		.body__text {
			color: #525866;
			font-size: 0.8125rem;
		}

		.body__img {
			height: 10rem;
			margin: 0.5rem 0;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				margin: auto;
				border-radius: 0.75rem;
			}
		}
	}

	&__footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0.5rem;
	}

	&:hover {
		border-color: rgba(82, 88, 102, 0.4);
	}
}

.skeleton {
	animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
	0% {
		background-color: hsl(200, 20%, 80%);
	}
	100% {
		background-color: hsl(200, 20%, 95%);
	}
}

.skeleton-text {
	width: 100%;
	height: 0.7rem;
	margin-bottom: 0.5rem;
	border-radius: 0.25rem;
}

.skeleton-text__body {
	width: 75%;
}

.skeleton-footer {
	width: 30%;
}
</style>
