/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CURRENCY?: string
  readonly VITE_YEARLY_SALARY?: string
  readonly VITE_EXPECTED_TAX_PERCENT?: string
  readonly VITE_INCOME_STREAMS?: string
  readonly VITE_SUBSCRIPTIONS?: string
  readonly VITE_DEBTS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
