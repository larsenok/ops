# ops

`ops` is a public GitHub repo for a private personal operations center. The frontend lives in [`/web`](./web) and is meant to be run locally as a compact dashboard for one user.

## Goal

The app gives one user a desktop-first control room for:

- yearly salary, expected tax, income streams, and disposable monthly cash
- subscriptions, fixed costs, and **forbruk** / burn rate
- debt tracking
- to-dos and notes
- a simple calendar plus a clickable month overview
- an optimistic finance projection that sketches potential buffer over time

Norwegian is the default language. A button in the title bar switches the interface to English.

## Privacy model

The repo can stay public because private finance numbers are not committed. Runtime salary, income, subscription, fixed-cost, and debt figures are read from a local `web/.env` file through Vite variables.

There is one gitignore file, and it belongs inside `web/.gitignore`. It ignores local env files such as `web/.env` / `web/.env.*` while still allowing a future `web/.env.example` if needed.

## Default env structure

Create `web/.env` locally:

```dotenv
# Currency used by Intl.NumberFormat. Default: NOK
VITE_CURRENCY=NOK

# Main salary inputs. Tax can be 34 or 0.34.
VITE_YEARLY_SALARY=720000
VITE_EXPECTED_TAX_PERCENT=34

# Extendable semicolon-separated lines using Name:MonthlyAmount[:OptionalNote].
VITE_INCOME_STREAMS=Freelance:8000;Interest:250
VITE_SUBSCRIPTIONS=Phone:399;Music:129;Cloud:29
VITE_DEBTS=Credit card:4200:high priority;Student loan:182000

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
- **Visual style:** Windows 95 reminiscent surfaces, title bars, inset fields, hard borders, and compact controls, with a calmer background.
- **Category boundaries:** money, debt, to-dos, inbox notes, calendar, month overview, and future projection are separated into distinct window-like panels.
- **Private numbers:** salary, income streams, subscriptions, debts, and fixed-cost numbers come from local env variables so they are not shared in the public repo.
