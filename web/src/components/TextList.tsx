import type { TextLine } from '../types'

type TextListProps = {
  lines: TextLine[]
}

export function TextList({ lines }: TextListProps) {
  return (
    <ul>
      {lines.map((line) => (
        <li key={line.id}>
          <span>{line.text}</span>
          {line.status ? <small>{line.status}</small> : null}
        </li>
      ))}
    </ul>
  )
}
