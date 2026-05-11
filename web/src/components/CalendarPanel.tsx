import type { Copy, TextLine } from '../types'
import { TextComposer } from './Composers'
import { TextList } from './TextList'

type CalendarPanelProps = {
  calendar: TextLine[]
  copy: Copy
  draft: string
  onAddItem: () => void
  onDraftChange: (value: string) => void
}

export function CalendarPanel({ calendar, copy, draft, onAddItem, onDraftChange }: CalendarPanelProps) {
  return (
    <article className="window-panel category calendar-card category--calendar">
      <h2>{copy.calendar}</h2>
      <div className="calendar-grid">
        {copy.days.map((day, index) => (
          <span key={day} className={index === 2 ? 'today' : ''}>
            {day}
          </span>
        ))}
      </div>
      <TextList lines={calendar} />
      <TextComposer
        copy={copy}
        draft={draft}
        onDraftChange={onDraftChange}
        onSubmit={onAddItem}
        placeholder={copy.calendarPlaceholder}
      />
    </article>
  )
}
