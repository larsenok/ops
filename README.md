# ops

`ops` is a public GitHub repo for a private, single-player operations center. The app lives in [`/web`](./web) and is meant to be run locally as a personal dashboard, not as a shared finance system.

## Goal

The app gives one user a compact desktop-first control room for:

- income streams
- subscriptions and other recurring costs
- burn rate
- debt tracking
- to-dos and notes
- a simple non-money calendar

Norwegian is the default language. A button in the title bar switches the interface to English.

## Privacy model

The repo can stay public because private numbers are not committed. Runtime income and fixed-cost figures are read from a local `.env` file through Vite variables.

The root `.gitignore` is the only gitignore file in the repo and ignores `.env` / `.env.*` while still allowing a future `.env.example` if needed.

## Default env structure

Create `web/.env` locally:

```dotenv
# Currency used by Intl.NumberFormat. Default: NOK
VITE_CURRENCY=NOK

# Semicolon-separated income streams using Name:MonthlyAmount.
# Example values are fake; replace with your private local numbers.
VITE_INCOME_STREAMS=Salary:52000;Freelance:8000;Interest:250

# Monthly fixed costs that are not listed as subscriptions in the UI.
VITE_MONTHLY_FIXED_COSTS=14500
```

Do not commit `web/.env`; it contains personal finance data.

## Frontend

```bash
cd web
npm install
npm run start
```

Build check:

```bash
cd web
npm run build
```

## Product direction

- **Desktop prioritized:** the dashboard uses clear bordered panels and a wide grid for an operations-center feel.
- **Phone readable:** narrow screens stack every category vertically so the page scrolls naturally.
- **Visual style:** Windows 95 reminiscent surfaces, title bars, inset fields, hard borders, and compact controls.
- **Category boundaries:** money, debt, to-dos, inbox notes, and calendar items are separated into distinct window-like panels.
- **Private numbers:** income streams and fixed-cost numbers come from local env variables so they are not shared in the public repo.
