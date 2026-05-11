import type { Copy } from '../types'

type ComposerProps = {
  copy: Copy
  draft: string
  placeholder?: string
  onDraftChange: (value: string) => void
  onSubmit: () => void
}

type MoneyComposerProps = ComposerProps & {
  amountDraft: string
  onAmountDraftChange: (value: string) => void
}

export function MoneyComposer({
  amountDraft,
  copy,
  draft,
  onAmountDraftChange,
  onDraftChange,
  onSubmit,
  placeholder,
}: MoneyComposerProps) {
  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <input
        aria-label={placeholder ?? copy.placeholder}
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder={placeholder ?? copy.placeholder}
      />
      <input
        aria-label={copy.amountPlaceholder}
        inputMode="decimal"
        value={amountDraft}
        onChange={(event) => onAmountDraftChange(event.target.value)}
        placeholder={copy.amountPlaceholder}
      />
      <button type="submit">{copy.add}</button>
    </form>
  )
}

export function TextComposer({
  copy,
  draft,
  onDraftChange,
  onSubmit,
  placeholder,
}: ComposerProps) {
  return (
    <form
      className="composer text-composer"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <input
        aria-label={placeholder ?? copy.placeholder}
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder={placeholder ?? copy.placeholder}
      />
      <button type="submit">{copy.add}</button>
    </form>
  )
}
