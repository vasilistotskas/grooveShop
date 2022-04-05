import store from '@/store'
import { Options, Vue } from 'vue-class-component'

@Options({
	name: 'PaginationBase'
})
export default class PaginationBase<RM> extends Vue  {

	uri = window.location.search.substring(1)
	params = new URLSearchParams(this.uri)

	get currentPageQuery(): string {
		return store.getters['pagination/getCurrentQuery']
	}

	get allPaginatedResults(): Array<RM> {
		return store.getters['pagination/getResultData']
	}

	get allPaginatedResultsCount(): number {
		return store.getters['pagination/getResultCountData']
	}

	get allPaginatedResultsNextPageUrl(): URL {
		return store.getters['pagination/getResultNextPageUrl']
	}

	get allPaginatedResultsPreviousPageUrl(): URL {
		return store.getters['pagination/getResultPreviousPageUrl']
	}

	get allPaginatedResultsTotalPages(): number {
		return store.getters['pagination/getResultTotalPages']
	}

	get currentPageNumber(): number {
		let storedPageNumber = store.getters['pagination/getCurrentPageNumber']
		if (storedPageNumber) {
			return store.getters['pagination/getCurrentPageNumber']
		}
		return 1
	}

}