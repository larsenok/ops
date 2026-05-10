# ops web

React + TypeScript + Vite frontend for the `ops` personal operations center.

## What it does

- Defaults to Norwegian with an English switch in the app header.
- Reads yearly salary, expected tax, income streams, subscriptions and debts from local Vite env variables.
- Calculates monthly income, **forbruk** / burn rate from env-based subscriptions, and disposable cash after costs.
- Lets the user add debt rows and non-money calendar items in the browser session; subscriptions are env-only so restart behavior is explicit.
- Adds a clickable month overview so individual days in the current month can be selected.
- Shows an optimistic future projection for potential buffer over time.
- Uses a compact Windows 95 reminiscent visual style with clear category boundaries and a subtle background.
- Prioritizes desktop layout while stacking every panel vertically on narrow screens.

## Local env

Create `web/.env` for private local values:

```dotenv
VITE_CURRENCY=NOK
VITE_YEARLY_SALARY=720000
VITE_EXPECTED_TAX_PERCENT=34
VITE_INCOME_STREAMS=Freelance:8000;Interest:250
VITE_SUBSCRIPTIONS=Phone:399;Music:129;Cloud:29
VITE_DEBTS=Credit card:4200:high priority;Student loan:182000
```

Extend the list-style env variables with semicolon-separated `Name:MonthlyAmount[:OptionalNote]` lines.

`web/.env` is ignored by `web/.gitignore`, so real private numbers stay out of the public repo.

## Run

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```
