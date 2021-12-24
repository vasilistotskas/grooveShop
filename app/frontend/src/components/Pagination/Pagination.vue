<template>
  <div class="col-12 mb-3 mt-3 product-listing-grid-header">
    <div class="pagination-buttons">

        <button
            type="button"
            class="btn btn-outline-primary"
            @click="onClickFirstPage"
            :disabled="isInFirstPage"
            aria-label="Go to first page"
        >
          First
        </button>


        <button
            class="btn btn-outline-primary"
            type="button"
            @click="onClickPreviousPage"
            :disabled="isInFirstPage"
            aria-label="Go to previous page"
        >
          Previous

        </button>

        <button v-for="page in pages"
            class="btn btn-outline-primary"
            type="button"
            @click="onClickPage(page.name)"
            :disabled="page.isDisabled"
            :class="{ active: this.isPageActive(page.name) }"
            :aria-label="`Go to page number ${page.name}`"

        >
          {{ page.name }}
        </button>

        <button
            class="btn btn-outline-primary"
            type="button"
            @click="onClickNextPage"
            :disabled="isInLastPage"
            aria-label="Go to next page"
        >
          Next
        </button>

        <button
            class="btn btn-outline-primary"
            type="button"
            @click="onClickLastPage"
            :disabled="isInLastPage"
            aria-label="Go to last page"
        >
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
    }
  }
})

export default class Pagination extends Vue {
  query: string | null = ''
  uri = window.location.search.substring(1)
  params = new URLSearchParams(this.uri)
  maxVisibleButtons!: number
  totalPages!: number
  route!: string
  endpointUrl!: string

  public isPageActive(page: number): boolean {
    return this.currentPageNumber === page;
  }

  get startPage(): number {
    if (this.currentPageNumber === 1) {
      return 1
    }
    if (this.currentPageNumber === this.totalPages) {
      return this.totalPages - this.maxVisibleButtons + 1
    }
    return this.currentPageNumber - 1
  }

  get endPage(): number {
    return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
  }

  get pages(): any {
    const range = []

    for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
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
    await store.dispatch(`pagination/getPaginatedResults`, { 'pageNumber': this.currentPageNumber, 'endpointUrl': `${ this.endpointUrl }`, 'query': this.currentPageQuery })
    await router.replace({ name: `${ this.route }`, query: { ...this.$route.query, 'query': this.params.get('query'), 'page': this.currentPageNumber }})
  }

  async onClickPreviousPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', this.currentPageNumber - 1)
    await store.dispatch(`pagination/getPaginatedResults`, { 'pageNumber': this.currentPageNumber, 'endpointUrl': `${ this.endpointUrl }`, 'query': this.currentPageQuery })
    await router.replace({ name: `${ this.route }`, query: { ...this.$route.query, 'query': this.params.get('query'), 'page': this.currentPageNumber }})
  }

  async onClickPage(n: number) {
    await store.commit('pagination/setCurrentPageNumber', n)
    await store.dispatch(`pagination/getPaginatedResults`, { 'pageNumber': n, 'endpointUrl': `${ this.endpointUrl }`, 'query': this.currentPageQuery })
    await router.replace({ name: `${ this.route }`, query: { ...this.$route.query, 'query': this.params.get('query'), 'page': n }})
  }

  async onClickFirstPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', 1)
    await store.dispatch(`pagination/getPaginatedResults`, { 'pageNumber': this.currentPageNumber, 'endpointUrl': `${ this.endpointUrl }`, 'query': this.currentPageQuery })
    await router.replace({name: `${ this.route }`, query: { ...this.$route.query, 'query': this.params.get('query'), 'page': this.currentPageNumber }})
  }

  async onClickLastPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', this.totalPages)
    await store.dispatch(`pagination/getPaginatedResults`, { 'pageNumber': this.totalPages, 'endpointUrl': `${ this.endpointUrl }`, 'query': this.currentPageQuery })
    await router.replace({ name: `${ this.route }`, query: { ...this.$route.query, 'query': this.params.get('query'), 'page': this.totalPages }})
  }

}

</script>

<style lang="scss" scoped>
  .pagination {
    list-style-type: none;
  }

  .pagination-item {
    display: inline-block;
  }

  .active {
    background-color: #4AAE9B;
    color: #ffffff;
  }
</style>