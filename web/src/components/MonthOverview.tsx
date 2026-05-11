import type { Copy, Lang, MonthDay } from '../types'
import { monthLocale } from '../utils/calendar'

type MonthOverviewProps = {
  copy: Copy
  lang: Lang
  monthDays: MonthDay[]
  onSelectDay: (day: number) => void
  selectedDay: number
}

export function MonthOverview({ copy, lang, monthDays, onSelectDay, selectedDay }: MonthOverviewProps) {
  return (
    <article className="window-panel category month-card category--month">
      <h2>{copy.monthOverview}</h2>
      <div className="month-grid">
        {monthDays.map((day) => (
          <button
            type="button"
            key={day.day}
            className={`${day.isToday ? 'today' : ''} ${selectedDay === day.day ? 'selected' : ''}`}
            onClick={() => onSelectDay(day.day)}
          >
            {day.day}
          </button>
        ))}
      </div>
      <p className="selected-day">
        {copy.selectedDay}: {selectedDay}.{' '}
        {monthDays[0]?.date.toLocaleString(monthLocale(lang), { month: 'long' })}
      </p>
    </article>
  )
}
