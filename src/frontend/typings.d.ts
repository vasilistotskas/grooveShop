import { Store } from '@/store'

declare module '*.md' {
  const value: string
  export default value
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
  }
}

declare module 'swiper/vue' {
  import { DefineComponent } from 'vue'
  export const Swiper: DefineComponent<any, any, any>
  export const SwiperSlide: DefineComponent<any, any, any>
}

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}
