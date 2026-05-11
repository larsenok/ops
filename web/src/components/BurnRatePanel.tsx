import type { Copy } from '../types'
import { currencyFormatter } from '../utils/finance'

type BurnRatePanelProps = {
  burnRate: number
  copy: Copy
  subscriptionCount: number
}

export function BurnRatePanel({ burnRate, copy, subscriptionCount }: BurnRatePanelProps) {
  return (
    <article className="window-panel category danger category--burn">
      <h2>{copy.burnRate}</h2>
      <div className="big-number">{currencyFormatter.format(burnRate)}</div>
      <p>
        {subscriptionCount} {copy.subscriptions.toLowerCase()}
      </p>
    </article>
  )
}
