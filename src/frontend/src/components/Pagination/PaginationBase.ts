import store from '@/store'
import router from '@/routes'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'PaginationBase'
})
export default class PaginationBase<TPaginatedModel> extends Vue  {

	protected paginationNamespace!: string;

	uri = window.location.search.substring(1)
	params = router.currentRoute.value.query

	get currentPageQuery(): string {
		return store.getters['pagination/getCurrentQuery'](this.paginationNamespace)
	}

	get allPaginatedResults(): Array<TPaginatedModel> {
		return <Array<TPaginatedModel>>store.getters['pagination/getResultData'](this.paginationNamespace)
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