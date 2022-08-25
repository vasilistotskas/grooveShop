import NamespacedDataRecord from '@/state/common/Interface/NamespacedDataRecord'
import { QueryParamsType } from '@/state/pagination/Type/PaginationTypes'

export default interface PaginationDataInterface {
  [key: string]: {
    results: Array<NamespacedDataRecord>
    resultsCount: number
    resultsNextPage: string
    resultsPreviousPages: string
    resultsTotalPages: number
    alternativeToken: string
    currentPageNumber: number
    currentQuery: QueryParamsType
    showNextButton: boolean
    showPreviousButton: boolean
  }
}
