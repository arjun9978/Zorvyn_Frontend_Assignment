# FinEnsure - Frontend (Assignment)

A personal finance tracking application built as a frontend-only demo. This is a standalone version designed for demonstration purposes, featuring all UI/UX functionality with mock data stored in localStorage.

## Live Demo

**https://zorvyn-frontend-assignment-nu.vercel.app/**

## Overview

FinEnsure helps users track income, expenses, and financial patterns with structured records and clear insights. This demo version works entirely in the browser without requiring a backend server as mentioned in the instructions of the assignment.

## Features

### Core Functionality

- **Transaction Management**
  - Track income and expenses with detailed categorization, enabling users to filter by type, category, date, payment method, and frequency
  - Support for recurring transactions (daily, weekly, monthly, yearly)
  - Bulk import/export transactions
  
  
- **Financial Analytics**
  - Real-time dashboard with user's entire financial overview (Current Balance, Total Income, Total Expenses, Savings Rate)
  - Visual expense breakdowns by category (Pie chart)
  - Income vs. expense trend analysis (Area chart) by per-transaction data visualization
  - Customizable date range filtering (30 days, this month, last month, biweekly etc.)
  - Recent transaction logs on the dashboard


- **Smart Insights**
 - Spending Insights Dashboard
 - Financial Insights Overview
 - Expense & Savings Analytics
 - Personal Finance Summary
 - Spending Behavior Analysis
 - Financial Health Metrics
 - Smart Spending Insights
 - Budget & Savings Overview


- **AI-Powered Receipt Scanning** *(Requires backend)*
  - Intelligent receipt data extraction using Google AI
  - Auto-fills transaction details from receipt image
  - Supports common receipt formats

- **PDF Report Generation**
  - Instant PDF download with financial summaries
  - Customizable date ranges for reports
  - Report download history tracking

- **Customized Profile Settings**
 - Dark/Light theme appearance
 - Update profile picture, country, gender, etc in account settings

### User Experience

- **Simple Login**
  - Enter any name to start using the app
  - Per-user data isolation (each username has separate data)
  - Data persists in browser localStorage

- **Responsive Design**
  - Fully optimized and resposive for desktop, tablet, and mobile devices
  - Dark theme based interface throughout
  - Accessible UI components
  - login page while showcasing app features through moving cards transition
  - Smooth transitions between feature highlights

- **Demo Mode Features: This is a frontend-only demo with the following characteristics**

- **No Real Backend Required**: All data is stored in browser localStorage
- **Per-User Data**: Each username gets isolated transaction/report data
- **Mock API**: All API calls are intercepted and handled locally
- **Sample Reports**: 2 sample reports included for demonstration
- **Empty Start**: New users start with zero transactions (add your own!)

### What Requires Backend (Optional)

- AI receipt scanning (connect to deployed backend on Render)

## Technology Stack

### Frontend

- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 6.x
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives, shadcn/ui
- **Charts**: Recharts
- **PDF Generation**: jspdf + jspdf-autotable
- **Animations**: Framer Motion


## Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── app/             # Redux store configuration
│   ├── components/      # Reusable UI components
│   │   ├── navbar/      # Navigation components
│   │   ├── transaction/ # Transaction-related components
│   │   └── ui/          # Base UI components (shadcn)
│   ├── constant/        # App constants and enums
│   ├── context/         # React context providers
│   ├── features/        # Redux slices and API definitions
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── lib/             # Utility functions
│   │   ├── mock-api.ts  # Mock API interceptor
│   │   └── mock-data.ts # Mock data management
│   ├── pages/           # Page components
│   │   ├── auth/        # Login page
│   │   ├── dashboard/   # Dashboard with charts
│   │   ├── reports/     # Report generation
│   │   ├── settings/    # User settings
│   │   └── transactions/# Transaction management
│   ├── routes/          # Route definitions
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── .env.example         # Environment template
├── package.json
└── vite.config.ts
```

## How It Works

### Mock Data Layer

The app uses a custom mock API layer (`src/lib/mock-api.ts`) that intercepts all RTK Query requests:

1. **Transaction Operations**: CRUD operations store data in localStorage per user
2. **Analytics**: Calculated in real-time from stored transactions
3. **Reports**: Generated locally with PDF download support
4. **User Data**: Isolated by username prefix in localStorage keys

### Data Persistence

Data is stored with the following localStorage keys:
- `fintrack_user_{username}_transactions` - User's transaction data
- `fintrack_reports_{username}` - User's report history
- `fintrack_current_user` - Currently logged-in username

### Chart Data

Charts display per-transaction data points:
- **Area Chart**: Each transaction appears as a separate data point
- **Pie Chart**: Expenses grouped by category with percentages

## Deployment

### Deployed to Vercel

1. Pushed code to GitHub
2. Connected repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_MOCK_MODE=true`
   - `VITE_API_BASE_URL` (if using AI receipt scanning)
4. Deployed


## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

This is a frontend assignment submission. No contributions are appreciated for this repo

## License

This project is for educational/demonstration purposes only. You can always take the UI inspirations from here.

## Contributor

Created for Zorvyn Frontend Assignment by : Arjun Pratap Aggarwal
