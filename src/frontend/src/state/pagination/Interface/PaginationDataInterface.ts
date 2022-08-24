import NamespacedDataRecord from '@/state/common/Interface/NamespacedDataRecord'
import { QueryParamsType } from '@/state/pagination/Type/PaginationTypes'

export default interface PaginationDataInterface {
  [key: string]: {
    results: Array<NamespacedDataRecord>
    results_count: number
    results_next_page: string
    results_previous_page: string
    results_total_pages: number
    alternativeToken: string
    current_page_number: number
    current_query: QueryParamsType
    show_next_button: boolean
    show_previous_button: boolean
  }
}
