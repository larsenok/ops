export type Lang = 'no' | 'en'

export type MoneyLine = {
  id: number
  name: string
  amount: number
  note?: string
}

export type TextLine = {
  id: number
  text: string
  status?: string
}

export type MonthDay = {
  date: Date
  day: number
  isToday: boolean
}

export type FuturePoint = {
  month: number
  buffer: number
  debt: number
}

export type Copy = {
  languageAction: string
  languageName: string
  languageFlag: string
  monthlyIncome: string
  yearlySalary: string
  expectedTax: string
  disposable: string
  burnRate: string
  subscriptions: string
  incomeStreams: string
  debt: string
  calendar: string
  monthOverview: string
  optimisticFuture: string
  add: string
  emptyEnv: string
  emptyList: string
  placeholder: string
  amountPlaceholder: string
  debtPlaceholder: string
  calendarPlaceholder: string
  selectedDay: string
  projectedBuffer: string
  projectedDebt: string
  month: string
  days: string[]
}

export type OpsRecord = {
  yearlySalary: number
  expectedTax: number
  subscriptions: MoneyLine[]
  debts: MoneyLine[]
  extraIncomeStreams: MoneyLine[]
  calendar: TextLine[]
}
