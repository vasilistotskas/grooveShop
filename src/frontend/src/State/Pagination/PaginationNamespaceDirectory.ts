import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

const PaginationNamespaceDirectory = () => {
	let newObject = {}
	Object.values(PaginationNamespaceTypesEnum).forEach((key) => {
		newObject = {
			...newObject,
			[key]: {
				results: [],
				resultsCount: 0,
				resultsNextPage: '',
				resultsPreviousPages: '',
				resultsTotalPages: 0,
				currentPageNumber: 1,
				currentQuery: '',
				showNextButton: false,
				showPreviousButton: false
			}
		}
	})
	return newObject
}

export default PaginationNamespaceDirectory
