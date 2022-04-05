<template>
  <div
    v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0"
    class="user-order-history"
  >
    <div
      v-for="order in allPaginatedResults"
      :key="order.id"
      class="mb-4"
      :order="order"
    >
      <h3 class="is-size-4 mb-3">
        Order #{{ order.id }}
      </h3>
      <div class="box">
        <div class="card">
          <UserOrderHistoryContainer
            :order="order"
            class="col-sm-3"
          />
        </div>
      </div>
    </div>
    <Pagination
      v-if="Object.keys(allPaginatedResults).length !== 0"
      :endpoint-url="'orders'"
      :max-visible-buttons="3"
      :route="PaginationRoutesEnum.ORDERS"
      :total-pages="allPaginatedResultsTotalPages"
    />
  </div>
  <div
    v-else
    class="user_profile-no-data"
  >
    <h1>NO ORDERS</h1>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options } from 'vue-class-component'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import UserOrderModel from '@/state/user/order/UserOrderModel'
import Pagination from '@/components/Pagination/Pagination.vue'
import PaginationBase from '@/components/Pagination/PaginationBase'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import UserOrderHistoryContainer from '@/components/User/UserOrderHistoryContainer.vue'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Options({
  name: 'UserOrderHistory',
  extends: PaginationBase,
  components: {
    Pagination,
    UserOrderHistoryContainer
  }
})

export default class UserOrderHistory extends PaginationBase<UserOrderModel> implements PaginatedInterface<UserOrderModel> {

  PaginationRoutesEnum = PaginationRoutesEnum

  async created(): Promise<void> {

    document.title = 'My Orders'

    if (this.params.get('query')) {
      await store.commit('pagination/setCurrentQuery', this.params.get('query'))
    }

    await store.commit('pagination/setCurrentPageNumber', 1)

    if (this.params.get('page')) {
      await store.commit('pagination/setCurrentPageNumber', Number(this.params.get('page')))
    }

    await this.fetchPaginationData()

  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults')
  }

  async fetchPaginationData(): Promise<void> {

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': `orders`,
          'queryParams': this.currentPageQuery,
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', paginationQuery)
  }

}
</script>

<style lang="scss">
@import "@/assets/styles/pages/User/UserOrderHistory"

</style>