import { useMemo, useState } from 'react'
import './App.css'
import { AppHeader } from './components/AppHeader'
import { BurnRatePanel } from './components/BurnRatePanel'
import { CalendarPanel } from './components/CalendarPanel'
import { DebtPanel } from './components/DebtPanel'
import { FuturePanel } from './components/FuturePanel'
import { MoneyPanel } from './components/MoneyPanel'
import { MonthOverview } from './components/MonthOverview'
import { SummaryStrip } from './components/SummaryStrip'
import { copy } from './copy'
import { loadLocalOpsRecord } from './records/localOpsRecord'
import type { Lang, MoneyLine } from './types'
import { getCurrentMonthDays } from './utils/calendar'
import {
  buildFutureProjection,
  currencyFormatter,
  parseMoney,
  percentFormatter,
  sumMoneyLines,
} from './utils/finance'

const localRecord = loadLocalOpsRecord()

function App() {
  const [lang, setLang] = useState<Lang>('no')
  const [debts, setDebts] = useState(localRecord.debts)
  const [calendar, setCalendar] = useState(localRecord.calendar)
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate())
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [amountDrafts, setAmountDrafts] = useState<Record<string, string>>({})

  const t = copy[lang]
  const monthDays = useMemo(getCurrentMonthDays, [])
  const salaryAfterTax = (localRecord.yearlySalary * (1 - localRecord.expectedTax)) / 12
  const incomeStreams: MoneyLine[] = [
    ...(salaryAfterTax > 0
      ? [{ id: 1, name: t.yearlySalary, amount: salaryAfterTax }]
      : []),
    ...localRecord.extraIncomeStreams,
  ]
  const monthlyIncome = sumMoneyLines(incomeStreams)
  const burnRate = sumMoneyLines(localRecord.subscriptions)
  const net = monthlyIncome - burnRate
  const totalDebt = sumMoneyLines(debts)
  const future = buildFutureProjection(net, totalDebt)

  const updateDraft = (key: string, value: string) => {
    setDrafts((current) => ({ ...current, [key]: value }))
  }

  const updateAmountDraft = (key: string, value: string) => {
    setAmountDrafts((current) => ({ ...current, [key]: value }))
  }

  const addDebt = () => {
    const name = drafts.debt?.trim()
    const amount = parseMoney(amountDrafts.debt)
    if (!name || amount <= 0) return

    setDebts((items) => [...items, { id: Date.now(), name, amount }])
    updateDraft('debt', '')
    updateAmountDraft('debt', '')
  }

  const addCalendarItem = () => {
    const text = drafts.calendar?.trim()
    if (!text) return

    setCalendar((items) => [...items, { id: Date.now(), text }])
    updateDraft('calendar', '')
  }

  return (
    <main className="shell">
      <AppHeader
        copy={t}
        onToggleLanguage={() => setLang((current) => (current === 'no' ? 'en' : 'no'))}
      />

      <SummaryStrip
        items={[
          { label: t.yearlySalary, value: currencyFormatter.format(localRecord.yearlySalary) },
          { label: t.expectedTax, value: percentFormatter.format(localRecord.expectedTax) },
          { label: t.monthlyIncome, value: currencyFormatter.format(monthlyIncome) },
          { label: t.burnRate, value: currencyFormatter.format(burnRate) },
          { label: t.disposable, value: currencyFormatter.format(net), accent: true },
        ]}
      />

      <section className="dashboard-grid" aria-label="operations categories">
        <MoneyPanel
          className="finance category--income"
          emptyMessage={t.emptyEnv}
          lines={incomeStreams}
          title={t.incomeStreams}
        />
        <BurnRatePanel
          burnRate={burnRate}
          copy={t}
          subscriptionCount={localRecord.subscriptions.length}
        />
        <MoneyPanel
          className="category--subscriptions"
          emptyMessage={t.emptyList}
          lines={localRecord.subscriptions}
          title={t.subscriptions}
        />
        <DebtPanel
          amountDraft={amountDrafts.debt ?? ''}
          copy={t}
          debts={debts}
          draft={drafts.debt ?? ''}
          onAddDebt={addDebt}
          onAmountDraftChange={(value) => updateAmountDraft('debt', value)}
          onDraftChange={(value) => updateDraft('debt', value)}
        />
        <MonthOverview
          copy={t}
          lang={lang}
          monthDays={monthDays}
          onSelectDay={setSelectedDay}
          selectedDay={selectedDay}
        />
        <CalendarPanel
          calendar={calendar}
          copy={t}
          draft={drafts.calendar ?? ''}
          onAddItem={addCalendarItem}
          onDraftChange={(value) => updateDraft('calendar', value)}
        />
        <FuturePanel copy={t} future={future} />
      </section>
    </main>
  )
}

export default App
