# FinEnsure

A personal finance tracker built for a frontend assignment. Works entirely in the browser with no backend required.

## What it does

Track your money - income and expenses. See where it goes with charts and reports. Everything stays in your browser.

## Features I built

### Login
- Simple name-based login (no passwords needed for demo)
- Each username gets their own separate data
- Data stays in browser localStorage

### Dashboard
- Summary cards showing total income, expenses, and balance
- Area chart for income vs expenses over time
- Pie chart for expense breakdown by category
- Date filters (last 30 days, this month, custom ranges, etc.)

### Transactions
- Add income and expenses manually
- Categories: groceries, dining, transport, entertainment, etc.
- Mark transactions as recurring (daily, weekly, monthly)
- Edit, delete, or duplicate any transaction
- Bulk import from CSV or Excel
- Search and filter by type, category, date

### Reports
- Generate PDF reports instantly
- Pick any date range
- Shows income, expenses, balance, and category breakdown
- Download history tracked locally

### Settings
- Update profile info (name, gender, country, language)
- Upload profile picture
- Delete account (clears all data)

### Role Toggle
- Switch between Admin and Viewer modes
- Admin: Full access (add, edit, delete)
- Viewer: Read-only (just view data and download reports)
- Good for demoing access control

### AI Receipt Scanner (optional)
- Upload receipt photo
- AI extracts amount, date, merchant
- Auto-fills transaction form
- Needs backend deployed separately

## Tech used

- React + TypeScript
- Vite for building
- Redux for state management
- Tailwind CSS for styling
- Recharts for graphs
- jsPDF for report generation
- Mock API layer intercepts all requests

## How to run

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## How mock mode works

All API calls get intercepted and handled locally. No real backend needed.

Data storage:
- `localStorage` with username prefix
- Each user gets isolated data
- Works across page refreshes

## Deployment

Built for Vercel. Just connect the repo and deploy. Make sure to set:
```
VITE_MOCK_MODE=true
```

## Notes

- Data is browser-specific (incognito = fresh start)
- localStorage has ~5MB limit
- Charts show per-transaction data points
- AI feature requires backend (can skip for demo)

## Structure

```
client/
├── src/
│   ├── pages/          # Dashboard, Transactions, Reports, Settings
│   ├── components/     # Reusable UI components
│   ├── lib/            # mock-api.ts, mock-data.ts
│   ├── features/       # Redux slices
│   └── context/        # Role provider
└── public/
```

Made for Zorvyn frontend assignment.
