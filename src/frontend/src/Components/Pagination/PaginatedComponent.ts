import {
	PaginationResults,
	QueryParamsType
} from '@/State/Pagination/Type/PaginationTypes'
import router from '@/Routes'
import { getModule } from 'vuex-module-decorators'
import PaginationModule from '@/State/Pagination/PaginationModule'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import { Options as Component, setup, Vue } from 'vue-class-component'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
	name: 'PaginatedComponent'
})
export default class PaginatedComponent<TPaginatedModel>
	extends Vue
	implements PaginatedComponentInterface<TPaginatedModel>
{
	PaginationNamespaceTypesEnum = PaginationNamespaceTypesEnum
	clearPagination = false
	paginationModule = getModule<PaginationModule<TPaginatedModel>>(PaginationModule)
	protected paginationNamespace!: PaginationNamespaceTypesEnum
	uri = window.location.search.substring(1)
	params = router.currentRoute.value.query

	get currentPageQuery(): QueryParamsType {
		return this.paginationModule.getCurrentQuery(this.paginationNamespace)
	}

	get allPaginatedResults(): PaginationResults<TPaginatedModel> {
		return this.paginationModule.getResultData(this.paginationNamespace)
	}

	get allPaginatedResultsCount(): number {
		return this.paginationModule.getResultCountData(this.paginationNamespace)
	}

	get allPaginatedResultsNextPageUrl(): string | null {
		return this.paginationModule.getResultNextPageUrl(this.paginationNamespace)
	}

	get allPaginatedResultsPreviousPagesUrl(): string | null {
		return this.paginationModule.getResultPreviousPageUrl(this.paginationNamespace)
	}

	get allPaginatedResultsTotalPages(): number {
		return this.paginationModule.getResultTotalPages(this.paginationNamespace)
	}

	get currentPageNumber(): number {
		const storedPageNumber = this.paginationModule.getCurrentPageNumber(
			this.paginationNamespace
		)
		if (storedPageNumber) {
			return this.paginationModule.getCurrentPageNumber(this.paginationNamespace)
		}
		return 1
	}

	fetchPaginationData<T>(): Promise<void | PaginatedModel<T>> | undefined {
		return
	}

	unmounted() {
		if (this.clearPagination) {
			this.paginationModule.clearPagination(this.paginationNamespace)
		}
	}
}
