<template>
  <div
    v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0"
    class="user-order-history"
  >
    <div v-for="order in allPaginatedResults" :key="order.id" class="mb-4">
      <h3 class="is-size-4 mb-3">Order #{{ order.id }}</h3>
      <div class="box">
        <div class="card">
          <UserOrderHistoryContainer :order="order" class="col-sm-3" />
        </div>
      </div>
    </div>
    <Pagination
      v-if="Object.keys(allPaginatedResults).length !== 0"
      :endpoint-url="'orders'"
      :max-visible-buttons="3"
      :route="PaginationRoutesEnum.ORDERS"
      :total-pages="allPaginatedResultsTotalPages"
      :namespace="paginationNamespace"
    />
  </div>
  <div v-else class="user_profile-no-data">
    <h1>NO ORDERS</h1>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios'
import { getModule } from 'vuex-module-decorators'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import UserOrderModel from '@/State/User/Order/UserOrderModel'
import Pagination from '@/Components/Pagination/Pagination.vue'
import PaginationModule from '@/State/Pagination/PaginationModule'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import UserFavouriteModel from '@/State/User/Favourite/UserFavouriteModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import UserOrderHistoryContainer from '@/Components/User/UserOrderHistoryContainer.vue'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
  name: 'UserOrderHistory',
  extends: PaginatedComponent,
  components: {
    Pagination,
    UserOrderHistoryContainer,
  },
})
export default class UserOrderHistory
  extends PaginatedComponent<UserOrderModel>
  implements PaginatedComponentInterface<UserOrderModel>
{
  paginationModule = getModule<PaginationModule<UserOrderModel>>(PaginationModule)
  PaginationRoutesEnum = PaginationRoutesEnum
  paginationNamespace = PaginationNamespaceTypesEnum.USER_ORDER_HISTORY

  created(): void {
    document.title = 'My Orders'

    if (this.params.query) {
      this.paginationModule.setCurrentQuery({
        queryParams: this.params.query,
        namespace: this.paginationNamespace,
      })
    }

    this.paginationModule.setCurrentPageNumber({
      pageNumber: 1,
      namespace: this.paginationNamespace,
    })

    if (this.params.page) {
      this.paginationModule.setCurrentPageNumber({
        pageNumber: Number(this.params.page),
        namespace: this.paginationNamespace,
      })
    }

    this.fetchPaginationData<UserFavouriteModel>()
  }

  fetchPaginationData<T>(): Promise<void | AxiosResponse<Partial<PaginatedModel<T>>>> {
    const paginationQuery = PaginationModel.createPaginationModel({
      pageNumber: this.currentPageNumber,
      endpointUrl: `orders`,
      method: ApiBaseMethods.GET,
    })

    return this.paginationModule.fetchPaginatedResults({
      params: paginationQuery,
      namespace: this.paginationNamespace,
    })
  }
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Pages/User/UserOrderHistory';
</style>
