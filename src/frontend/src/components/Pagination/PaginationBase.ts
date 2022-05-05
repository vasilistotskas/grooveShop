import store from '@/store'
import { Options, Vue } from 'vue-class-component'

@Options({
	name: 'PaginationBase'
})
export default class PaginationBase<RM> extends Vue  {

	protected paginationNamespace!: string;

	uri = window.location.search.substring(1)
	params = new URLSearchParams(this.uri)

	get currentPageQuery(): string {
		return store.getters['pagination/getCurrentQuery'](this.paginationNamespace)
	}

	get allPaginatedResults(): Array<RM> {
		return store.getters['pagination/getResultData'](this.paginationNamespace)
	}

	get allPaginatedResultsCount(): number {
		return store.getters['pagination/getResultCountData'](this.paginationNamespace)
	}

	get allPaginatedResultsNextPageUrl(): URL {
		return store.getters['pagination/getResultNextPageUrl'](this.paginationNamespace)
	}

	get allPaginatedResultsPreviousPageUrl(): URL {
		return store.getters['pagination/getResultPreviousPageUrl'](this.paginationNamespace)
	}

	get allPaginatedResultsTotalPages(): number {
		return store.getters['pagination/getResultTotalPages'](this.paginationNamespace)
	}

	get currentPageNumber(): number {
		let storedPageNumber = store.getters['pagination/getCurrentPageNumber'](this.paginationNamespace)
		if (storedPageNumber) {
			return store.getters['pagination/getCurrentPageNumber'](this.paginationNamespace)
		}
		return 1
	}

}