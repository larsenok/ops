# ops web

React + TypeScript + Vite frontend for the local-first `ops` dashboard.

## Run

```bash
npm install
npm run start
```

## Env

Create `web/.env` for private values:

```dotenv
VITE_CURRENCY=NOK
VITE_YEARLY_SALARY=720000
VITE_EXPECTED_TAX_PERCENT=34
VITE_INCOME_STREAMS=Freelance:8000;Interest:250
VITE_SUBSCRIPTIONS=Phone:399;Music:129;Cloud:29
VITE_DEBTS=Credit card:4200:high priority;Student loan:182000
```

Use semicolon-separated `Name:MonthlyAmount[:OptionalNote]` entries for list variables. `web/.env` is ignored.

## Build

```bash
npm run build
```
