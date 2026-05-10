import { useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import './App.css'

type Lang = 'no' | 'en'
type Stream = {
  name: string
  monthly: number
}
type Entry = {
  id: number
  text: string
  amount?: number
  status?: string
}

type Copy = {
  title: string
  subtitle: string
  languageAction: string
  monthlyIncome: string
  burnRate: string
  runway: string
  subscriptions: string
  incomeStreams: string
  todos: string
  debt: string
  notes: string
  calendar: string
  add: string
  active: string
  none: string
  placeholder: string
  amountPlaceholder: string
  debtPlaceholder: string
  calendarPlaceholder: string
  days: string[]
}

const copy: Record<Lang, Copy> = {
  no: {
    title: 'Single-player operations center',
    subtitle:
      'Privat kontrollrom for inntekt, abonnementer, gjeld, gjøremål og små ting du må huske.',
    languageAction: 'English',
    monthlyIncome: 'Månedlig inntekt',
    burnRate: 'Burn rate',
    runway: 'Netto etter faste trekk',
    subscriptions: 'Abonnementer',
    incomeStreams: 'Aktive inntektsstrømmer',
    todos: 'Gjøremål',
    debt: 'Gjeld',
    notes: 'Innboks',
    calendar: 'Kalender',
    add: 'Legg til',
    active: 'aktiv',
    none: 'Ingen tall delt i repoet. Legg dem i .env lokalt.',
    placeholder: 'Skriv inn en ting',
    amountPlaceholder: 'Beløp',
    debtPlaceholder: 'Kredittkort, studielån, venn ...',
    calendarPlaceholder: 'Ikke-penger: trening, frist, avtale ...',
    days: ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'],
  },
  en: {
    title: 'Single-player operations center',
    subtitle:
      'Private control room for income, subscriptions, debt, to-dos, and the small things you need to remember.',
    languageAction: 'Norsk',
    monthlyIncome: 'Monthly income',
    burnRate: 'Burn rate',
    runway: 'Net after fixed costs',
    subscriptions: 'Subscriptions',
    incomeStreams: 'Active income streams',
    todos: 'To-dos',
    debt: 'Debt',
    notes: 'Inbox',
    calendar: 'Calendar',
    add: 'Add',
    active: 'active',
    none: 'No private numbers are shared in the repo. Add them to .env locally.',
    placeholder: 'Write one thing',
    amountPlaceholder: 'Amount',
    debtPlaceholder: 'Credit card, student loan, friend ...',
    calendarPlaceholder: 'Non-money: workout, deadline, appointment ...',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
}

const parseMoney = (value: string | undefined) => {
  if (!value) return 0

  const parsed = Number(value.replace(/[^0-9.-]+/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

const parseStreams = (value: string | undefined): Stream[] => {
  if (!value) return []

  return value
    .split(';')
    .map((stream) => {
      const [name, monthly] = stream.split(':')
      return {
        name: name?.trim() ?? '',
        monthly: parseMoney(monthly),
      }
    })
    .filter((stream) => stream.name && stream.monthly > 0)
}

const currencyFormatter = new Intl.NumberFormat('nb-NO', {
  style: 'currency',
  currency: import.meta.env.VITE_CURRENCY || 'NOK',
  maximumFractionDigits: 0,
})

const initialSubscriptions: Entry[] = [
  { id: 1, text: 'Telefon', amount: 399 },
  { id: 2, text: 'Musikk', amount: 129 },
  { id: 3, text: 'Skylagring', amount: 29 },
]

const initialTodos: Entry[] = [
  { id: 1, text: 'Sorter kvitteringer', status: 'i dag' },
  { id: 2, text: 'Sjekk neste regning', status: 'snart' },
]

const initialDebt: Entry[] = [
  { id: 1, text: 'Kredittkort', amount: 4200 },
  { id: 2, text: 'Studielån', amount: 182000 },
]

const initialNotes: Entry[] = [
  { id: 1, text: 'Forsikring: sammenlign pris før fornyelse' },
  { id: 2, text: 'Matbudsjett: sett ukesramme' },
]

const initialCalendar: Entry[] = [
  { id: 1, text: 'Tirsdag: løp 30 min' },
  { id: 2, text: 'Fredag: rydd skrivebord' },
]

function App() {
  const [lang, setLang] = useState<Lang>('no')
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
  const [todos, setTodos] = useState(initialTodos)
  const [debts, setDebts] = useState(initialDebt)
  const [notes, setNotes] = useState(initialNotes)
  const [calendar, setCalendar] = useState(initialCalendar)
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [amountDrafts, setAmountDrafts] = useState<Record<string, string>>({})

  const t = copy[lang]
  const incomeStreams = useMemo(
    () => parseStreams(import.meta.env.VITE_INCOME_STREAMS),
    [],
  )
  const monthlyIncome = incomeStreams.reduce(
    (sum, stream) => sum + stream.monthly,
    0,
  )
  const fixedCosts = parseMoney(import.meta.env.VITE_MONTHLY_FIXED_COSTS)
  const subscriptionBurn = subscriptions.reduce(
    (sum, entry) => sum + (entry.amount ?? 0),
    0,
  )
  const burnRate = fixedCosts + subscriptionBurn
  const net = monthlyIncome - burnRate

  const addEntry = (
    key: string,
    setter: Dispatch<SetStateAction<Entry[]>>,
    withAmount = false,
  ) => {
    const text = drafts[key]?.trim()
    if (!text) return

    const amount = withAmount ? parseMoney(amountDrafts[key]) : undefined
    setter((items) => [
      ...items,
      {
        id: Date.now(),
        text,
        ...(withAmount && amount > 0 ? { amount } : {}),
      },
    ])
    setDrafts((current) => ({ ...current, [key]: '' }))
    setAmountDrafts((current) => ({ ...current, [key]: '' }))
  }

  const renderEntry = (entry: Entry) => (
    <li key={entry.id}>
      <span>{entry.text}</span>
      {entry.status ? <small>{entry.status}</small> : null}
      {entry.amount ? <strong>{currencyFormatter.format(entry.amount)}</strong> : null}
    </li>
  )

  const renderComposer = (
    key: string,
    setter: Dispatch<SetStateAction<Entry[]>>,
    placeholder = t.placeholder,
    withAmount = false,
  ) => (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault()
        addEntry(key, setter, withAmount)
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
      {withAmount ? (
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
      ) : null}
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

      <section className="hero-panel window-panel">
        <div>
          <p className="eyebrow">PUBLIC REPO / PRIVATE .ENV</p>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="meter-stack" aria-label="summary">
          <span>{t.monthlyIncome}: {currencyFormatter.format(monthlyIncome)}</span>
          <span>{t.burnRate}: {currencyFormatter.format(burnRate)}</span>
          <span>{t.runway}: {currencyFormatter.format(net)}</span>
        </div>
      </section>

      <section className="dashboard-grid" aria-label="operations categories">
        <article className="window-panel category finance">
          <h2>{t.incomeStreams}</h2>
          {incomeStreams.length > 0 ? (
            <ul>
              {incomeStreams.map((stream) =>
                renderEntry({
                  id: stream.name.charCodeAt(0) + stream.monthly,
                  text: stream.name,
                  amount: stream.monthly,
                }),
              )}
            </ul>
          ) : (
            <p className="empty">{t.none}</p>
          )}
        </article>

        <article className="window-panel category danger">
          <h2>{t.burnRate}</h2>
          <div className="big-number">{currencyFormatter.format(burnRate)}</div>
          <p>{subscriptions.length} {t.subscriptions.toLowerCase()} + fixed .env costs</p>
        </article>

        <article className="window-panel category">
          <h2>{t.subscriptions}</h2>
          <ul>{subscriptions.map(renderEntry)}</ul>
          {renderComposer('subscriptions', setSubscriptions, t.placeholder, true)}
        </article>

        <article className="window-panel category debt-card">
          <h2>{t.debt}</h2>
          <ul>{debts.map(renderEntry)}</ul>
          {renderComposer('debt', setDebts, t.debtPlaceholder, true)}
        </article>

        <article className="window-panel category">
          <h2>{t.todos}</h2>
          <ul>{todos.map(renderEntry)}</ul>
          {renderComposer('todos', setTodos)}
        </article>

        <article className="window-panel category">
          <h2>{t.notes}</h2>
          <ul>{notes.map(renderEntry)}</ul>
          {renderComposer('notes', setNotes)}
        </article>

        <article className="window-panel category calendar-card">
          <h2>{t.calendar}</h2>
          <div className="calendar-grid">
            {t.days.map((day, index) => (
              <span key={day} className={index === 2 ? 'today' : ''}>{day}</span>
            ))}
          </div>
          <ul>{calendar.map(renderEntry)}</ul>
          {renderComposer('calendar', setCalendar, t.calendarPlaceholder)}
        </article>
      </section>
    </main>
  )
}

export default App
