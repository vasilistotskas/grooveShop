import { LocationQuery } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import PaginationModule from '@/State/Pagination/PaginationModule'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

type UsePaginationOptions = {
	routerQueryParams: LocationQuery
	namespace: PaginationNamespaceTypesEnum
	endpointUrl: string
}

export const UsePagination = <T>(options: UsePaginationOptions): PaginatedModel<T> => {
	const paginationModule = getModule<PaginationModule<T>>(PaginationModule)

	if (options.routerQueryParams) {
		paginationModule.setCurrentQuery({
			queryParams: options.routerQueryParams,
			namespace: options.namespace
		})
	}

	paginationModule.setCurrentPageNumber({
		pageNumber: 1,
		namespace: options.namespace
	})

	if (options.routerQueryParams.page) {
		paginationModule.setCurrentPageNumber({
			pageNumber: Number(options.routerQueryParams.page),
			namespace: options.namespace
		})
	}

	const currentPageNumber = computed(() => {
		const storedPageNumber = paginationModule.getCurrentPageNumber(options.namespace)
		if (storedPageNumber) {
			return paginationModule.getCurrentPageNumber(options.namespace)
		}
		return 1
	})

	const paginationQuery = PaginationModel.createPaginationModel({
		pageNumber: currentPageNumber.value,
		endpointUrl: options.endpointUrl,
		method: ApiBaseMethods.GET
	})

	const paginationResults = paginationModule.fetchPaginatedResults<T>({
		params: paginationQuery,
		namespace: options.namespace
	})

	if (paginationResults instanceof PaginatedModel<T>) {
		return paginationResults
	} else {
		return new PaginatedModel<T>({
			count: 0,
			links: {
				next: null,
				previous: null
			},
			results: [],
			total_pages: 0
		})
	}
}
