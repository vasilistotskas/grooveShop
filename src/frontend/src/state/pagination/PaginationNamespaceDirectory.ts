import { PaginationNamespaceDataEnum } from '@/state/pagination/Enum/PaginationNamespaceDataEnum'

const PaginationNamespaceDirectory = () => {
  let newObject = {}
  Object.values(PaginationNamespaceDataEnum).forEach((key) => {
    newObject = {
      ...newObject,
      [key]: {
        results: [],
        results_count: 0,
        results_next_page: '',
        results_previous_page: '',
        results_total_pages: 0,
        current_page_number: 1,
        current_query: '',
        show_next_button: false,
        show_previous_button: false,
      },
    }
  })
  return newObject
}

export default PaginationNamespaceDirectory
