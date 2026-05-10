/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CURRENCY?: string
  readonly VITE_INCOME_STREAMS?: string
  readonly VITE_MONTHLY_FIXED_COSTS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
