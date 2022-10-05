import { RouteParams } from 'vue-router'
import BreadcrumbItemInterface from '@/Routes/Interface/BreadcrumbItemInterface'

export type BreadcrumbItemType = {
  name: string
  to: {
    full_path: string
  }
  id: string | number
}
export type RouteMetaBreadcrumbFunction = (route: RouteParams) => Array<BreadcrumbItemType>
export type RouteMetaBreadcrumb =
  | Array<BreadcrumbItemInterface>
  | ((route: RouteParams) => Array<BreadcrumbItemInterface>)
