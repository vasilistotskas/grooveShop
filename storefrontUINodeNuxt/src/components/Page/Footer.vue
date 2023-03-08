<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import p from './../../package.json'
const app = useAppConfig() as AppConfigInput
</script>

<template>
	<footer class="border-t lg:border-gray-900/10 dark:border-gray-50/[0.2]">
		<section class="max-w-8xl mx-auto px-4 lg:px-8 flex-1 flex w-full space-x-20">
			<div class="w-full py-4 text-center md:text-left">
				<div class="mb-1">
					<span class="text-gray-700 dark:text-gray-200">{{ app.name }}</span>
				</div>
				<div>
					<span class="text-gray-700 dark:text-gray-200">Copyright © 2022</span>
					<a
						class="text-gray-700 dark:text-gray-200"
						:aria-label="app.author.name"
						:href="app.author.github_url"
						>{{ app.author.name }}</a
					>.
					<span class="text-gray-700 dark:text-gray-200"
						>All rights reserved. Made with <span class="text-red-500">❤</span></span
					>
					<div class="flex flex-col md:flex-row space-x-2 items-center md:float-right">
						<span class="text-gray-700 dark:text-gray-200 text-center md:text-right">
							design by
							<a
								class="text-gray-700 dark:text-gray-200"
								aria-label="vasilistotskas"
								href="https://github.com/vasilistotskas"
								>vasilistotskas</a
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
