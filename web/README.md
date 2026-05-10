# ops web

React + TypeScript + Vite frontend for the `ops` single-player operations center.

## What it does

- Defaults to Norwegian with an English switch in the app header.
- Shows active income streams from local Vite env variables.
- Calculates burn rate from subscriptions plus `VITE_MONTHLY_FIXED_COSTS`.
- Lets the user add subscriptions, to-dos, inbox notes, debts, and non-money calendar items in the browser session.
- Uses a compact Windows 95 reminiscent visual style with clear category boundaries.
- Prioritizes desktop layout while stacking every panel vertically on narrow screens.

## Local env

Create `web/.env` for private local values:

```dotenv
VITE_CURRENCY=NOK
VITE_INCOME_STREAMS=Salary:52000;Freelance:8000;Interest:250
VITE_MONTHLY_FIXED_COSTS=14500
```

`web/.env` is ignored by the single root `.gitignore`, so real private numbers stay out of the public repo.

## Run

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```
