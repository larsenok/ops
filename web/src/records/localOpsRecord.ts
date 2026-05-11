import type { OpsRecord, TextLine } from '../types'
import { parseMoney, parseMoneyLines, parsePercent } from '../utils/finance'

const initialCalendar: TextLine[] = [
  { id: 1, text: 'Tirsdag: løp 30 min' },
  { id: 2, text: 'Fredag: rydd skrivebord' },
]

export const loadLocalOpsRecord = (): OpsRecord => ({
  yearlySalary: parseMoney(import.meta.env.VITE_YEARLY_SALARY),
  expectedTax: parsePercent(import.meta.env.VITE_EXPECTED_TAX_PERCENT),
  subscriptions: parseMoneyLines(import.meta.env.VITE_SUBSCRIPTIONS),
  debts: parseMoneyLines(import.meta.env.VITE_DEBTS),
  extraIncomeStreams: parseMoneyLines(import.meta.env.VITE_INCOME_STREAMS),
  calendar: initialCalendar,
})
