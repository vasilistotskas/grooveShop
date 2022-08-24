import { LocationQueryValue } from 'vue-router'
import NamespacedDataRecord from '@/state/common/Interface/NamespacedDataRecord'

export default interface PaginatedDataInterface {
  readonly namespace: string
  readonly count: number
  readonly nextPageUrl: string
  readonly previousPageUrl: string
  readonly totalPages: number
  readonly currentQuery: string | LocationQueryValue[]
  readonly results: Array<NamespacedDataRecord>
  pageNumber: number
  showNextButton: boolean
  showPreviousButton: boolean

  fetchPaginationData(): Promise<void> | undefined
}
