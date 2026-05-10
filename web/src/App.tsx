import { useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import './App.css'

type Lang = 'no' | 'en'
type MoneyLine = {
  id: number
  name: string
  amount: number
  note?: string
}
type TextLine = {
  id: number
  text: string
  status?: string
}
type MonthDay = {
  date: Date
  day: number
  isToday: boolean
}

type Copy = {
  languageAction: string
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

const copy: Record<Lang, Copy> = {
  no: {
    languageAction: 'English',
    monthlyIncome: 'Månedlig inntekt',
    yearlySalary: 'Årslønn',
    expectedTax: 'Forventet skatt',
    disposable: 'Tilgjengelig etter skatt',
    burnRate: 'Forbruk',
    subscriptions: 'Abonnementer',
    incomeStreams: 'Inntektsstrømmer',
    debt: 'Gjeld',
    calendar: 'Kalender',
    monthOverview: 'Månedsoversikt',
    optimisticFuture: 'Optimistisk fremtid',
    add: 'Legg til',
    emptyEnv: 'Legg private tall i web/.env lokalt.',
    emptyList: 'Ingen linjer ennå.',
    placeholder: 'Skriv inn en ting',
    amountPlaceholder: 'Beløp',
    debtPlaceholder: 'Kredittkort, studielån, venn ...',
    calendarPlaceholder: 'Ikke-penger: trening, frist, avtale ...',
    selectedDay: 'Valgt dag',
    projectedBuffer: 'mulig buffer',
    projectedDebt: 'mulig gjeld',
    month: 'måned',
    days: ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'],
  },
  en: {
    languageAction: 'Norsk',
    monthlyIncome: 'Monthly income',
    yearlySalary: 'Yearly salary',
    expectedTax: 'Expected tax',
    disposable: 'Available after tax',
    burnRate: 'Burn rate',
    subscriptions: 'Subscriptions',
    incomeStreams: 'Income streams',
    debt: 'Debt',
    calendar: 'Calendar',
    monthOverview: 'Month overview',
    optimisticFuture: 'Optimistic future',
    add: 'Add',
    emptyEnv: 'Add private numbers to web/.env locally.',
    emptyList: 'No lines yet.',
    placeholder: 'Write one thing',
    amountPlaceholder: 'Amount',
    debtPlaceholder: 'Credit card, student loan, friend ...',
    calendarPlaceholder: 'Non-money: workout, deadline, appointment ...',
    selectedDay: 'Selected day',
    projectedBuffer: 'potential buffer',
    projectedDebt: 'potential debt',
    month: 'month',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
}

const parseMoney = (value: string | undefined) => {
  if (!value) return 0

  const parsed = Number(value.replace(/[^0-9.-]+/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

const parsePercent = (value: string | undefined) => {
  const parsed = parseMoney(value)
  if (parsed <= 0) return 0
  return parsed > 1 ? parsed / 100 : parsed
}

const makeId = (text: string, amount = 0, index = 0) =>
  text.split('').reduce((sum, char) => sum + char.charCodeAt(0), index) + amount

const parseMoneyLines = (value: string | undefined): MoneyLine[] => {
  if (!value) return []

  return value
    .split(';')
    .map((line, index) => {
      const [name, amount, note] = line.split(':')
      const cleanName = name?.trim() ?? ''
      const parsedAmount = parseMoney(amount)
      return {
        id: makeId(cleanName, parsedAmount, index),
        name: cleanName,
        amount: parsedAmount,
        note: note?.trim(),
      }
    })
    .filter((line) => line.name && line.amount > 0)
}

const currencyFormatter = new Intl.NumberFormat('nb-NO', {
  style: 'currency',
  currency: import.meta.env.VITE_CURRENCY || 'NOK',
  maximumFractionDigits: 0,
})

const percentFormatter = new Intl.NumberFormat('nb-NO', {
  style: 'percent',
  maximumFractionDigits: 1,
})


const initialCalendar: TextLine[] = [
  { id: 1, text: 'Tirsdag: løp 30 min' },
  { id: 2, text: 'Fredag: rydd skrivebord' },
]

const getCurrentMonthDays = (): MonthDay[] => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    const date = new Date(year, month, day)
    return {
      date,
      day,
      isToday: day === today.getDate(),
    }
  })
}

function App() {
  const [lang, setLang] = useState<Lang>('no')
  const subscriptions = useMemo(
    () => parseMoneyLines(import.meta.env.VITE_SUBSCRIPTIONS),
    [],
  )
  const [debts, setDebts] = useState<MoneyLine[]>(() =>
    parseMoneyLines(import.meta.env.VITE_DEBTS),
  )
  const [calendar, setCalendar] = useState(initialCalendar)
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate())
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [amountDrafts, setAmountDrafts] = useState<Record<string, string>>({})

  const t = copy[lang]
  const monthDays = useMemo(getCurrentMonthDays, [])
  const extraIncomeStreams = useMemo(
    () => parseMoneyLines(import.meta.env.VITE_INCOME_STREAMS),
    [],
  )
  const yearlySalary = parseMoney(import.meta.env.VITE_YEARLY_SALARY)
  const expectedTax = parsePercent(import.meta.env.VITE_EXPECTED_TAX_PERCENT)
  const salaryAfterTax = (yearlySalary * (1 - expectedTax)) / 12
  const incomeStreams: MoneyLine[] = [
    ...(salaryAfterTax > 0
      ? [{ id: 1, name: t.yearlySalary, amount: salaryAfterTax }]
      : []),
    ...extraIncomeStreams,
  ]
  const monthlyIncome = incomeStreams.reduce((sum, line) => sum + line.amount, 0)
  const burnRate = subscriptions.reduce((sum, line) => sum + line.amount, 0)
  const net = monthlyIncome - burnRate
  const totalDebt = debts.reduce((sum, line) => sum + line.amount, 0)
  const future = Array.from({ length: 6 }, (_, index) => {
    const month = index + 1
    const optimisticExtra = Math.max(0, net) * month
    const debtPaydown = Math.min(totalDebt, optimisticExtra * 0.35)
    return {
      month,
      buffer: optimisticExtra - debtPaydown,
      debt: Math.max(0, totalDebt - debtPaydown),
    }
  })
  const maxFutureValue = Math.max(
    1,
    ...future.map((point) => Math.max(point.buffer, point.debt)),
  )

  const addMoneyLine = (
    key: string,
    setter: Dispatch<SetStateAction<MoneyLine[]>>,
  ) => {
    const name = drafts[key]?.trim()
    const amount = parseMoney(amountDrafts[key])
    if (!name || amount <= 0) return

    setter((items) => [...items, { id: Date.now(), name, amount }])
    setDrafts((current) => ({ ...current, [key]: '' }))
    setAmountDrafts((current) => ({ ...current, [key]: '' }))
  }

  const addTextLine = (
    key: string,
    setter: Dispatch<SetStateAction<TextLine[]>>,
  ) => {
    const text = drafts[key]?.trim()
    if (!text) return

    setter((items) => [...items, { id: Date.now(), text }])
    setDrafts((current) => ({ ...current, [key]: '' }))
  }

  const renderMoneyLine = (line: MoneyLine) => (
    <li key={line.id}>
      <span>{line.name}</span>
      {line.note ? <small>{line.note}</small> : null}
      <strong>{currencyFormatter.format(line.amount)}</strong>
    </li>
  )

  const renderTextLine = (line: TextLine) => (
    <li key={line.id}>
      <span>{line.text}</span>
      {line.status ? <small>{line.status}</small> : null}
    </li>
  )

  const renderMoneyComposer = (
    key: string,
    setter: Dispatch<SetStateAction<MoneyLine[]>>,
    placeholder = t.placeholder,
  ) => (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault()
        addMoneyLine(key, setter)
      }}
    >
      <input
        aria-label={placeholder}
        value={drafts[key] ?? ''}
        onChange={(event) =>
          setDrafts((current) => ({ ...current, [key]: event.target.value }))
        }
        placeholder={placeholder}
      />
      <input
        aria-label={t.amountPlaceholder}
        inputMode="decimal"
        value={amountDrafts[key] ?? ''}
        onChange={(event) =>
          setAmountDrafts((current) => ({
            ...current,
            [key]: event.target.value,
          }))
        }
        placeholder={t.amountPlaceholder}
      />
      <button type="submit">{t.add}</button>
    </form>
  )

  const renderSummaryItem = (label: string, value: string, accent = false) => (
    <span className={`summary-item${accent ? ' accent' : ''}`}>
      <small>{label}</small>
      <strong>{value}</strong>
    </span>
  )

  const renderTextComposer = (
    key: string,
    setter: Dispatch<SetStateAction<TextLine[]>>,
    placeholder = t.placeholder,
  ) => (
    <form
      className="composer text-composer"
      onSubmit={(event) => {
        event.preventDefault()
        addTextLine(key, setter)
      }}
    >
      <input
        aria-label={placeholder}
        value={drafts[key] ?? ''}
        onChange={(event) =>
          setDrafts((current) => ({ ...current, [key]: event.target.value }))
        }
        placeholder={placeholder}
      />
      <button type="submit">{t.add}</button>
    </form>
  )

  return (
    <main className="shell">
      <header className="title-bar">
        <div>
          <span className="app-icon" aria-hidden="true" />
          <strong>OPS.EXE</strong>
        </div>
        <button type="button" onClick={() => setLang(lang === 'no' ? 'en' : 'no')}>
          {t.languageAction}
        </button>
      </header>

      <section className="summary-strip window-panel" aria-label="summary">
        {renderSummaryItem(t.yearlySalary, currencyFormatter.format(yearlySalary))}
        {renderSummaryItem(t.expectedTax, percentFormatter.format(expectedTax))}
        {renderSummaryItem(t.monthlyIncome, currencyFormatter.format(monthlyIncome))}
        {renderSummaryItem(t.burnRate, currencyFormatter.format(burnRate))}
        {renderSummaryItem(t.disposable, currencyFormatter.format(net), true)}
      </section>

      <section className="dashboard-grid" aria-label="operations categories">
        <article className="window-panel category finance">
          <h2>{t.incomeStreams}</h2>
          {incomeStreams.length > 0 ? (
            <ul>{incomeStreams.map(renderMoneyLine)}</ul>
          ) : (
            <p className="empty">{t.emptyEnv}</p>
          )}
        </article>

        <article className="window-panel category danger">
          <h2>{t.burnRate}</h2>
          <div className="big-number">{currencyFormatter.format(burnRate)}</div>
          <p>{subscriptions.length} {t.subscriptions.toLowerCase()}</p>
        </article>


        <article className="window-panel category">
          <h2>{t.subscriptions}</h2>
          {subscriptions.length > 0 ? (
            <ul>{subscriptions.map(renderMoneyLine)}</ul>
          ) : (
            <p className="empty">{t.emptyList}</p>
          )}
        </article>

        <article className="window-panel category debt-card">
          <h2>{t.debt}</h2>
          {debts.length > 0 ? (
            <ul>{debts.map(renderMoneyLine)}</ul>
          ) : (
            <p className="empty">{t.emptyList}</p>
          )}
          {renderMoneyComposer('debt', setDebts, t.debtPlaceholder)}
        </article>

        <article className="window-panel category month-card">
          <h2>{t.monthOverview}</h2>
          <div className="month-grid">
            {monthDays.map((day) => (
              <button
                type="button"
                key={day.day}
                className={`${day.isToday ? 'today' : ''} ${selectedDay === day.day ? 'selected' : ''}`}
                onClick={() => setSelectedDay(day.day)}
              >
                {day.day}
              </button>
            ))}
          </div>
          <p className="selected-day">
            {t.selectedDay}: {selectedDay}. {monthDays[0]?.date.toLocaleString(lang === 'no' ? 'nb-NO' : 'en-US', { month: 'long' })}
          </p>
        </article>


        <article className="window-panel category calendar-card">
          <h2>{t.calendar}</h2>
          <div className="calendar-grid">
            {t.days.map((day, index) => (
              <span key={day} className={index === 2 ? 'today' : ''}>{day}</span>
            ))}
          </div>
          <ul>{calendar.map(renderTextLine)}</ul>
          {renderTextComposer('calendar', setCalendar, t.calendarPlaceholder)}
        </article>

        <article className="window-panel category future-card">
          <h2>{t.optimisticFuture}</h2>
          <div className="future-list">
            {future.map((point) => (
              <div className="future-row" key={point.month}>
                <span>{point.month}. {t.month}</span>
                <div className="bar-track" aria-hidden="true">
                  <i style={{ width: `${(point.buffer / maxFutureValue) * 100}%` }} />
                </div>
                <small>{currencyFormatter.format(point.buffer)} {t.projectedBuffer} · {currencyFormatter.format(point.debt)} {t.projectedDebt}</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
