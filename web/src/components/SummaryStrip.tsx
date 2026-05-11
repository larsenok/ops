type SummaryItem = {
  label: string
  value: string
  accent?: boolean
}

type SummaryStripProps = {
  items: SummaryItem[]
}

export function SummaryStrip({ items }: SummaryStripProps) {
  return (
    <section className="summary-strip window-panel" aria-label="summary">
      {items.map((item) => (
        <span className={`summary-item${item.accent ? ' accent' : ''}`} key={item.label}>
          <small>{item.label}</small>
          <strong>{item.value}</strong>
        </span>
      ))}
    </section>
  )
}
