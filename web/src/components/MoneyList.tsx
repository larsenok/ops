import type { MoneyLine } from '../types'
import { currencyFormatter } from '../utils/finance'

type MoneyListProps = {
  lines: MoneyLine[]
}

export function MoneyList({ lines }: MoneyListProps) {
  return (
    <ul>
      {lines.map((line) => (
        <li key={line.id}>
          <span>{line.name}</span>
          {line.note ? <small>{line.note}</small> : null}
          <strong>{currencyFormatter.format(line.amount)}</strong>
        </li>
      ))}
    </ul>
  )
}
