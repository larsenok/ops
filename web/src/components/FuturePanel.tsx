import type { Copy, FuturePoint } from '../types'
import { currencyFormatter } from '../utils/finance'

type FuturePanelProps = {
  copy: Copy
  future: FuturePoint[]
}

export function FuturePanel({ copy, future }: FuturePanelProps) {
  const maxFutureValue = Math.max(
    1,
    ...future.map((point) => Math.max(point.buffer, point.debt)),
  )

  return (
    <article className="window-panel category future-card category--future">
      <h2>{copy.optimisticFuture}</h2>
      <div className="future-list">
        {future.map((point) => (
          <div className="future-row" key={point.month}>
            <span>
              {point.month}. {copy.month}
            </span>
            <div className="bar-track" aria-hidden="true">
              <i style={{ width: `${(point.buffer / maxFutureValue) * 100}%` }} />
            </div>
            <small>
              {currencyFormatter.format(point.buffer)} {copy.projectedBuffer} ·{' '}
              {currencyFormatter.format(point.debt)} {copy.projectedDebt}
            </small>
          </div>
        ))}
      </div>
    </article>
  )
}
