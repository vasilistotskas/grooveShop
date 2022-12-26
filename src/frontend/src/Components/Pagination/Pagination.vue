<template>
	<div class="col-12 mb-3 mt-3 pagination-grid-content">
		<div class="pagination-buttons">
			<RouterLink
				:disabled="isInFirstPage"
				:to="{
					name: route,
					query: pageQueryFirst
				}"
				@click.native="onClickFirstPage"
				aria-label="Go to first page"
				class="btn-outline-primary-one"
				title="Go to first page"
				type="button"
			>
				<span>First</span>
			</RouterLink>

			<RouterLink
				:disabled="isInFirstPage"
				:to="{
					name: route,
					query: pageQueryPrevious
				}"
				@click.native="onClickPreviousPage"
				aria-label="Go to previous page"
				class="btn-outline-primary-one"
				title="Go to previous page"
				type="button"
			>
				<span>Previous</span>
			</RouterLink>

			<RouterLink
				v-for="page in pages"
				:key="page.number"
				:to="{ name: route, query: pageQuery(page.number) }"
				:aria-label="`Go to page number ${page.number}`"
				:class="{ active: isPageActive(page.number) }"
				:disabled="page.isDisabled"
				:title="`Go to page number ${page.number}`"
				class="btn-outline-primary-one"
				type="button"
				@click.native="onClickPage(page.number)"
			>
				<span>{{ page.number }}</span>
			</RouterLink>

			<RouterLink
				:disabled="isInLastPage"
				:to="{
					name: route,
					query: pageQueryNext
				}"
				@click.native="onClickNextPage"
				aria-label="Go to next page"
				class="btn-outline-primary-one"
				title="Go to next page"
				type="button"
			>
				<span>Next</span>
			</RouterLink>

			<RouterLink
				:disabled="isInLastPage"
				:to="{ name: route, query: pageQueryLast }"
				@click.native="onClickLastPage"
				aria-label="Go to last page"
				class="btn-outline-primary-one"
				title="Go to Last page"
				type="button"
			>
				<span>Last</span>
			</RouterLink>
		</div>
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { isEmpty } from 'lodash'
import { LocationQueryValue } from 'vue-router'
import { getModule } from 'vuex-module-decorators'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import { Options as Component, Vue } from 'vue-class-component'
import PaginationModule from '@/State/Pagination/PaginationModule'
import { QueryParamsType } from '@/State/Pagination/Type/PaginationTypes'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import PaginationPageInterface from '@/State/Pagination/Interface/PaginationPageInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
	name: 'Pagination',
	props: {
		maxVisibleButtons: {
			type: Number,
			required: false,
			default: 3
		},
		totalPages: {
			type: Number,
			required: true
		},
		route: {
			type: String,
			required: true
		},
		endpointUrl: {
			type: String,
			required: true
		},
		routerReplace: {
			type: Boolean,
			default: true,
			required: false
		},
		namespace: {
			type: String,
			default: false,
			required: true
		}
	}
})
export default class Pagination extends Vue {
	paginationModule = getModule(PaginationModule)
	query?: Record<string, string | LocationQueryValue[] | number>
	uri = window.location.search.substring(1)
	params = router.currentRoute.value.query
	maxVisibleButtons!: number
	totalPages!: number
	route!: string
	endpointUrl!: string
	routerReplace!: boolean
	namespace!: PaginationNamespaceTypesEnum

	get startPage(): number {
		if (this.currentPageNumber === 1) {
			return 1
		}
		if (this.currentPageNumber === this.totalPages) {
			if (this.totalPages - this.maxVisibleButtons + 1 === 0) {
				return 1
			}
			return this.totalPages - this.maxVisibleButtons + 1
		}
		return this.currentPageNumber - 1
	}

	get endPage(): number {
		return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
	}

	get pages(): Array<PaginationPageInterface> {
		const range = []

		let endPageNumber: number
		if (this.totalPages < this.maxVisibleButtons) {
			endPageNumber = this.totalPages
		} else {
			endPageNumber = this.endPage
		}

		for (let i = this.startPage; i <= endPageNumber; i += 1) {
			range.push({
				number: i as never,
				isDisabled: (this.currentPageNumber === i) as never
			} as never)
		}

		return range
	}

	get isInFirstPage(): boolean {
		return this.currentPageNumber === 1
	}

	get isInLastPage(): boolean {
		return this.currentPageNumber === this.totalPages
	}

	get currentPageNumber(): number {
		return this.paginationModule.getCurrentPageNumber(this.namespace)
	}

	get currentPageQuery(): QueryParamsType {
		return this.paginationModule.getCurrentQuery(this.namespace)
	}

	get pageQueryFirst() {
		return {
			query: this.params?.query,
			page: 1
		}
	}

	get pageQueryPrevious() {
		if (this.currentPageNumber === 1) {
			return {}
		}
		return {
			query: this.params?.query,
			page: this.currentPageNumber - 1
		}
	}

	get pageQueryNext() {
		if (this.currentPageNumber === this.totalPages) {
			return {
				query: this.params?.query,
				page: this.currentPageNumber
			}
		}
		return {
			query: this.params?.query,
			page: this.currentPageNumber + 1
		}
	}

	get pageQueryLast() {
		return {
			query: this.params?.query,
			page: this.totalPages
		}
	}

	get getQueryParams(): QueryParamsType {
		return isEmpty(this.currentPageQuery)
			? { query: this.params?.query, page: '1' }
			: this.currentPageQuery
	}

	created(): void {
		this.initializeRouterQuery()
		this.$watch(
			() => this.$route,
			(route) => {
				this.paginationModule.setCurrentQuery({
					queryParams: route.query,
					namespace: this.namespace
				})
			}
		)
	}

	mounted(): void {
		this.initializeRouterQuery()
	}

	updated(): void {
		this.initializeRouterQuery()
	}

	public isPageActive(page: number): boolean {
		return this.currentPageNumber === page
	}

	onClickNextPage(): void {
		this.paginationModule.setCurrentPageNumber({
			pageNumber: this.currentPageNumber + 1,
			namespace: this.namespace
		})

		const paginationQuery = PaginationModel.createPaginationModel({
			pageNumber: this.currentPageNumber,
			endpointUrl: `${this.endpointUrl}`,
			queryParams: this.getQueryParams,
			method: ApiBaseMethods.GET
		})

		this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.namespace
		})
	}

	onClickPreviousPage(): void {
		this.paginationModule.setCurrentPageNumber({
			pageNumber: this.currentPageNumber - 1,
			namespace: this.namespace
		})

		const paginationQuery = PaginationModel.createPaginationModel({
			pageNumber: this.currentPageNumber,
			endpointUrl: `${this.endpointUrl}`,
			queryParams: this.getQueryParams,
			method: ApiBaseMethods.GET
		})

		this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.namespace
		})
	}

	onClickPage(pageNumber: number) {
		this.paginationModule.setCurrentPageNumber({
			pageNumber: pageNumber,
			namespace: this.namespace
		})

		const paginationQuery = PaginationModel.createPaginationModel({
			pageNumber: pageNumber,
			endpointUrl: `${this.endpointUrl}`,
			queryParams: this.getQueryParams,
			method: ApiBaseMethods.GET
		})

		this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.namespace
		})
	}

	onClickFirstPage(): void {
		this.paginationModule.setCurrentPageNumber({
			pageNumber: 1,
			namespace: this.namespace
		})

		const paginationQuery = PaginationModel.createPaginationModel({
			pageNumber: this.currentPageNumber,
			endpointUrl: `${this.endpointUrl}`,
			queryParams: this.getQueryParams,
			method: ApiBaseMethods.GET
		})

		this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.namespace
		})
	}

	onClickLastPage(): void {
		this.paginationModule.setCurrentPageNumber({
			pageNumber: this.totalPages,
			namespace: this.namespace
		})

		const paginationQuery = PaginationModel.createPaginationModel({
			pageNumber: this.totalPages,
			endpointUrl: `${this.endpointUrl}`,
			queryParams: this.getQueryParams,
			method: ApiBaseMethods.GET
		})

		this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.namespace
		})
	}

	pageQuery(pageNumber: number) {
		return {
			query: this.params?.query,
			page: pageNumber
		}
	}

	public initializeRouterQuery(): void {
		if (this.params.query) {
			this.query = {
				...this.$route.query,
				query: this.params.query,
				page: this.currentPageNumber
			}
		} else {
			this.query = { ...this.$route.query, page: this.currentPageNumber }
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Components/Pagination/Pagination.scss';
</style>
