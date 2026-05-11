# ops

Local-first personal operations dashboard. The React/Vite frontend lives in [`web`](./web) and keeps private finance data out of git by reading local Vite env variables.

## Run

```bash
cd web
npm install
npm run start
```

## Private env

Create `web/.env` locally and never commit it:

```dotenv
VITE_CURRENCY=NOK
VITE_YEARLY_SALARY=720000
VITE_EXPECTED_TAX_PERCENT=34
VITE_INCOME_STREAMS=Freelance:8000;Interest:250
VITE_SUBSCRIPTIONS=Phone:399;Music:129;Cloud:29
VITE_DEBTS=Credit card:4200:high priority;Student loan:182000
```

List-style variables use `Name:MonthlyAmount[:OptionalNote]` entries separated by semicolons.

## Notes

- Norwegian is the default language; English is available from the title bar.
- The app shows income, tax, burn rate, subscriptions, debts, calendar items, month selection, and a simple optimistic projection.
- Styling aims for a compact Windows 95 control-room feel.
- Local record loading is isolated in the frontend so a backend data source can replace it later.

## Check

```bash
cd web
npm run build
```
