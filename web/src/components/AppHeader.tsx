import type { Copy } from '../types'

type AppHeaderProps = {
  copy: Copy
  onToggleLanguage: () => void
}

export function AppHeader({ copy, onToggleLanguage }: AppHeaderProps) {
  return (
    <header className="title-bar">
      <div>
        <span className="app-icon" aria-hidden="true" />
        <strong>OPS.EXE</strong>
      </div>
      <div className="language-controls">
        <span className="language-current" aria-label={`Current language: ${copy.languageName}`}>
          <span aria-hidden="true">{copy.languageFlag}</span> {copy.languageName}
        </span>
        <button type="button" onClick={onToggleLanguage}>
          {copy.languageAction}
        </button>
      </div>
    </header>
  )
}
