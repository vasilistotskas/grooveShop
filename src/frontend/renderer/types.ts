export type { PageContextServer }
export type { PageContextClient }
export type { PageContextCommon }
export type { PageProps }

import type { PageContextBuiltIn } from 'vite-plugin-ssr'
// import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router' // When using Client Routing
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client' // When using Server Routing
import type { ComponentPublicInstance } from 'vue'

type Page = ComponentPublicInstance // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086
type PageProps = Record<string, unknown>

export type PageContextCustom = {
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type PageContextCommon = PageContextClient | PageContextServer
