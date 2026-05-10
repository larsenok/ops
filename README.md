# ops

Single-player operations center for a public GitHub repository. The frontend lives in `/web`.

## Product goal

`ops` helps one person keep a compact overview of day-to-day operations:

- income streams and recurring income assumptions;
- subscriptions and other recurring costs;
- to-dos, reminders, and operational notes;
- burn rate and runway-style personal cash-flow context;
- debt tracker with balances, payment targets, and payoff notes;
- simple non-money calendar for appointments, deadlines, and personal events.

The app is intended for private local values and public source code: sensitive numbers should come from environment variables, not committed files.

## Language

- Norwegian is the default UI language.
- English is available as a language switch.
- Copy should stay short, practical, and easy to scan in both languages.

## Layout and visual direction

- Desktop is prioritized.
- Categories should have clear visual boundaries so income, subscriptions, debt, to-dos, and calendar content are easy to distinguish at a glance.
- Narrow screens should stack all components vertically, one above the other, so the app remains readable as a scrolling phone layout.
- Visual style should be reminiscent of Windows 95: compact panels, clear borders, simple controls, muted system colors, and high information density without clutter.

## Environment configuration

Create a local `.env` file for private values. `.env` is ignored by git so personal income, debt, and subscription numbers do not get shared in the public repository.

Suggested default structure:

```dotenv
# App defaults
VITE_DEFAULT_LOCALE=nb
VITE_ENABLE_ENGLISH=true
VITE_CURRENCY=NOK

# Income streams used for local active-income summaries
VITE_INCOME_STREAM_1_NAME=Main job
VITE_INCOME_STREAM_1_MONTHLY_AMOUNT=0
VITE_INCOME_STREAM_2_NAME=Side income
VITE_INCOME_STREAM_2_MONTHLY_AMOUNT=0
VITE_INCOME_STREAM_3_NAME=Other
VITE_INCOME_STREAM_3_MONTHLY_AMOUNT=0

# Burn-rate defaults
VITE_MONTHLY_FIXED_COSTS=0
VITE_MONTHLY_VARIABLE_COSTS=0
VITE_CASH_BUFFER=0

# Debt tracker defaults
VITE_DEBT_1_NAME=Credit card
VITE_DEBT_1_BALANCE=0
VITE_DEBT_1_MIN_PAYMENT=0
VITE_DEBT_1_RATE=0
VITE_DEBT_2_NAME=Loan
VITE_DEBT_2_BALANCE=0
VITE_DEBT_2_MIN_PAYMENT=0
VITE_DEBT_2_RATE=0
```

Keep real values only in your local `.env`. If an example file is added later, use placeholder zero values only.

## Implementation notes for `/web`

- Treat income-stream environment variables as local defaults for active income stream cards or summaries.
- Keep financial cards compact: burn rate, active income streams, subscriptions, and debt should fit cleanly on desktop without hiding details behind deep navigation.
- Keep the calendar non-money oriented and visually separate from financial sections.
- Use responsive CSS so desktop can use columns/panels while phone width becomes a single readable vertical stack.
