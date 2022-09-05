/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: string
  readonly MODE: string
  readonly PROD: string
  readonly SSR: string
  readonly BASE_URL: string
  readonly VITE_APP_URL: string
  readonly VITE_APP_I18N_LOCALE: string
  readonly VITE_APP_I18N_FALLBACK_LOCALE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_GRAPHQL_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
