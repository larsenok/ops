import type { MoneyLine } from '../types'
import { MoneyList } from './MoneyList'

type MoneyPanelProps = {
  className?: string
  emptyMessage: string
  lines: MoneyLine[]
  title: string
}

export function MoneyPanel({ className = '', emptyMessage, lines, title }: MoneyPanelProps) {
  return (
    <article className={`window-panel category ${className}`}>
      <h2>{title}</h2>
      {lines.length > 0 ? <MoneyList lines={lines} /> : <p className="empty">{emptyMessage}</p>}
    </article>
  )
}
