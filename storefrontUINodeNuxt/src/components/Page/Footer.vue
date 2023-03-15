<script lang="ts" setup>
import p from './../../package.json'
const config = useRuntimeConfig()
</script>

<template>
	<footer class="border-t lg:border-gray-900/10 dark:border-gray-50/[0.2]">
		<section class="max-w-8xl mx-auto px-4 lg:px-8 flex-1 flex w-full space-x-20">
			<div class="w-full py-4 text-center md:text-left">
				<div class="mb-1">
					<span class="text-gray-700 dark:text-gray-200">{{
						config.public.appTitle
					}}</span>
				</div>
				<div>
					<span class="text-gray-700 dark:text-gray-200">{{
						$t('components.page.footer.copyright')
					}}</span>
					<a
						class="text-gray-700 dark:text-gray-200"
						:aria-label="config.public.author.name"
						:href="config.public.author.github_url"
						>{{ config.public.author.name }}</a
					>.
					<span class="text-gray-700 dark:text-gray-200"
						>{{ $t('components.page.footer.rights') }}
						<span class="text-red-500">❤</span></span
					>
					<div class="flex flex-col md:flex-row space-x-2 items-center md:float-right">
						<span class="text-gray-700 dark:text-gray-200 text-center md:text-right">
							{{ $t('components.page.footer.design_by') }}
							<a
								class="text-gray-700 dark:text-gray-200"
								:aria-label="config.public.author.name"
								href="https://github.com/vasilistotskas"
								>{{ config.public.author.name }}</a
							>
						</span>
						<span
							class="block bg-blue-700 rounded px-1 py-0.5 text-white text-xs text-gray-700 dark:text-gray-200"
						>
							{{ p.devDependencies.nuxt }}
						</span>
					</div>
				</div>
			</div>
		</section>
	</footer>
</template>
