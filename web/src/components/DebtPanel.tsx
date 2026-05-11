import type { Copy, MoneyLine } from '../types'
import { MoneyComposer } from './Composers'
import { MoneyList } from './MoneyList'

type DebtPanelProps = {
  amountDraft: string
  copy: Copy
  debts: MoneyLine[]
  draft: string
  onAddDebt: () => void
  onAmountDraftChange: (value: string) => void
  onDraftChange: (value: string) => void
}

export function DebtPanel({
  amountDraft,
  copy,
  debts,
  draft,
  onAddDebt,
  onAmountDraftChange,
  onDraftChange,
}: DebtPanelProps) {
  return (
    <article className="window-panel category debt-card category--debt">
      <h2>{copy.debt}</h2>
      {debts.length > 0 ? <MoneyList lines={debts} /> : <p className="empty">{copy.emptyList}</p>}
      <MoneyComposer
        amountDraft={amountDraft}
        copy={copy}
        draft={draft}
        onAmountDraftChange={onAmountDraftChange}
        onDraftChange={onDraftChange}
        onSubmit={onAddDebt}
        placeholder={copy.debtPlaceholder}
      />
    </article>
  )
}
