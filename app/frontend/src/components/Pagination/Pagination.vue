<template>
  <div class="col-12 mb-3 mt-3 pagination-grid-content">
    <div class="pagination-buttons">
        <button
            type="button"
            class="btn-outline-primary-one"
            @click="onClickFirstPage"
            :disabled="isInFirstPage"
            aria-label="Go to first page">
          First
        </button>

        <button
            class="btn-outline-primary-one"
            type="button"
            @click="onClickPreviousPage"
            :disabled="isInFirstPage"
            aria-label="Go to previous page">
          Previous
        </button>

        <button v-for="page in pages"
            class="btn-outline-primary-one"
            type="button"
            @click="onClickPage(page.name)"
            :disabled="page.isDisabled"
            :class="{ active: this.isPageActive(page.name) }"
            :aria-label="`Go to page number ${page.name}`">
          {{ page.name }}
        </button>

        <button
            class="btn-outline-primary-one"
            type="button"
            @click="onClickNextPage"
            :disabled="isInLastPage"
            aria-label="Go to next page">
          Next
        </button>

        <button
            class="btn-outline-primary-one"
            type="button"
            @click="onClickLastPage"
            :disabled="isInLastPage"
            aria-label="Go to last page">
          Last
        </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store"
import router from "@/routes"
import { Options, Vue } from "vue-class-component"

@Options({
  name: "Pagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    endpointUrl: {
      type: String,
      required: true
    },
    routerReplace: {
      type: Boolean,
      default: true,
      required: false
    }
  }
})

export default class Pagination extends Vue {

  query: any
  uri = window.location.search.substring(1)
  params = new URLSearchParams(this.uri)
  maxVisibleButtons!: number
  totalPages!: number
  route!: string
  endpointUrl!: string
  routerReplace!: boolean

  async mounted(): Promise<void> {
    await this.initializeRouterQuery()
  }

  async updated(): Promise<void> {
    await this.initializeRouterQuery()
  }

  private initializeRouterQuery(): void {
    if (this.params.get('query')) {
      this.query = { ...this.$route.query, 'query': this.params.get('query'), 'page': this.currentPageNumber }
    } else {
      this.query = { ...this.$route.query, 'page': this.currentPageNumber }
    }
  }

  public isPageActive(page: number): boolean {
    return this.currentPageNumber === page;
  }

  get startPage(): number {
    if (this.currentPageNumber === 1) {
      return 1
    }
    if (this.currentPageNumber === this.totalPages) {
      if (this.totalPages - this.maxVisibleButtons + 1 === 0) {
        return 1
      }
      return this.totalPages - this.maxVisibleButtons + 1
    }
    return this.currentPageNumber - 1
  }

  get endPage(): number {
    return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
  }

  get pages(): any {
    const range = []

    let endPageNumber: number
    if (this.totalPages < this.maxVisibleButtons) {
      endPageNumber = this.totalPages
    } else {
      endPageNumber = this.endPage
    }

    for (let i = this.startPage; i <= endPageNumber; i+= 1 ) {
      range.push({
        name: i,
        isDisabled: this.currentPageNumber === i
      })
    }

    return range
  }

  get isInFirstPage(): boolean {
    return this.currentPageNumber === 1;
  }

  get isInLastPage(): boolean {
    return this.currentPageNumber === this.totalPages;
  }

  get currentPageNumber(): number {
    return store.getters['pagination/getCurrentPageNumber']
  }

  get currentPageQuery(): string {
    return store.getters['pagination/getCurrentQuery']
  }

  async onClickNextPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', this.currentPageNumber + 1)

    await store.dispatch(`pagination/getPaginatedResults`, {
      'pageNumber': this.currentPageNumber,
      'endpointUrl': `${ this.endpointUrl }`,
      'query': this.currentPageQuery
    })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

  async onClickPreviousPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', this.currentPageNumber - 1)

    await store.dispatch(`pagination/getPaginatedResults`, {
      'pageNumber': this.currentPageNumber,
      'endpointUrl': `${ this.endpointUrl }`,
      'query': this.currentPageQuery
    })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

  async onClickPage(n: number) {
    await store.commit('pagination/setCurrentPageNumber', n)

    await store.dispatch(`pagination/getPaginatedResults`, {
      'pageNumber': n,
      'endpointUrl': `${ this.endpointUrl }`,
      'query': this.currentPageQuery
    })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

  async onClickFirstPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', 1)

    await store.dispatch(`pagination/getPaginatedResults`, {
      'pageNumber': this.currentPageNumber,
      'endpointUrl': `${ this.endpointUrl }`,
      'query': this.currentPageQuery
    })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

  async onClickLastPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', this.totalPages)

    await store.dispatch(`pagination/getPaginatedResults`, {
      'pageNumber': this.totalPages,
      'endpointUrl': `${ this.endpointUrl }`,
      'query': this.currentPageQuery
    })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

}

</script>

<style lang="scss" scoped>
  .pagination-grid-content {
    display: grid;
  }
  .pagination {
    list-style-type: none;
  }
  .pagination-item {
    display: inline-block;
  }
  .active {
    background-color: $primary-color-1;
    color: $primary-color-4;
  }
</style>