# FinEnsure - Frontend (Assignment)

A personal finance tracking application built as a frontend-only demo. This is a standalone version designed for demonstration purposes, featuring all UI/UX functionality with mock data stored in localStorage.

## Live Demo

**https://zorvyn-frontend-assignment-nu.vercel.app/**

## Overview

FinEnsure helps users track income, expenses, and financial patterns with structured records and clear insights. This demo version works entirely in the browser without requiring a backend server as mentioned in the instructions of the assignment.

## Features

### Core Functionality

- **<span style="color: #3b82f6;">_Transaction Management_</span>**
  - Track ***<span style="color: #10b981;">income</span>*** and ***<span style="color: #ef4444;">expenses</span>*** with detailed ***<span style="color: #f59e0b;">categorization</span>***, enabling users to ***<span style="color: #8b5cf6;">filter</span>*** by ***<span style="color: #f59e0b;">type</span>***, ***<span style="color: #f59e0b;">category</span>***, ***<span style="color: #f59e0b;">date</span>***, payment method, and frequency
  - ***<span style="color: #ec4899;">Search</span>*** and ***<span style="color: #ec4899;">sorting</span>*** capabilities for transactions
  - Support for recurring ***<span style="color: #3b82f6;">transactions</span>*** (daily, weekly, monthly, yearly)
  - Bulk import/***<span style="color: #ec4899;">export</span>*** ***<span style="color: #3b82f6;">transactions</span>***
  
  
- **<span style="color: #3b82f6;">_Financial Analytics_</span>**
  - Real-time ***<span style="color: #6366f1;">dashboard</span>*** with user's entire financial overview (Current ***<span style="color: #10b981;">Balance</span>***, Total ***<span style="color: #10b981;">Income</span>***, Total ***<span style="color: #ef4444;">Expenses</span>***, Savings Rate)
  - ***<span style="color: #06b6d4;">Time-based visualization</span>*** showing ***<span style="color: #10b981;">balance</span>*** ***<span style="color: #06b6d4;">trend</span>*** over time
  - ***<span style="color: #f59e0b;">Categorical visualization</span>*** with ***<span style="color: #8b5cf6;">visual</span>*** ***<span style="color: #ef4444;">expense</span>*** ***<span style="color: #f59e0b;">breakdowns by category</span>*** (***<span style="color: #ec4899;">Pie chart</span>***)
  - ***<span style="color: #10b981;">Income</span>*** vs. ***<span style="color: #ef4444;">expense</span>*** analysis (***<span style="color: #ec4899;">Area chart</span>***) by per-***<span style="color: #3b82f6;">transaction</span>*** data ***<span style="color: #8b5cf6;">visualization</span>***
  - Customizable ***<span style="color: #f59e0b;">date range filtering</span>*** (30 days, this month, last month, biweekly etc.)
  - Recent ***<span style="color: #3b82f6;">transaction</span>*** logs on the ***<span style="color: #6366f1;">dashboard</span>***


- **<span style="color: #8b5cf6;">_Smart Insights_</span>**
 - ***<span style="color: #f59e0b;">Spending</span>*** ***<span style="color: #8b5cf6;">Insights</span>*** ***<span style="color: #6366f1;">Dashboard</span>***
 - ***<span style="color: #f59e0b;">Highest spending category</span>*** analysis
 - ***<span style="color: #06b6d4;">Monthly comparison</span>*** and trends
 - Financial ***<span style="color: #8b5cf6;">Insights</span>*** Overview
 - ***<span style="color: #ef4444;">Expense</span>*** & Savings Analytics
 - Personal Finance Summary
 - ***<span style="color: #f59e0b;">Spending</span>*** Behavior Analysis
 - Financial Health Metrics
 - Smart ***<span style="color: #f59e0b;">Spending</span>*** ***<span style="color: #8b5cf6;">Insights</span>***
 - Budget & Savings Overview


- **<span style="color: #3b82f6;">_Role-Based UI_</span>**
 - Simulated ***<span style="color: #8b5cf6;">role-based</span>*** access control on frontend
 - ***<span style="color: #10b981;">Viewer</span>*** role: Read-only access to view ***<span style="color: #6366f1;">data</span>***
 - ***<span style="color: #ef4444;">Admin</span>*** role: Full access to ***<span style="color: #10b981;">add</span>*** and ***<span style="color: #f59e0b;">edit</span>*** ***<span style="color: #3b82f6;">transactions</span>***
 - Role switcher for demonstration purposes


- **AI-Powered Receipt Scanning** *(Requires backend)*
  - Intelligent receipt data extraction using Google AI
  - Auto-fills transaction details from receipt image
  - Supports common receipt formats

- **PDF Report Generation**
  - Instant PDF download with financial summaries
  - Customizable ***<span style="color: #f59e0b;">date ranges</span>*** for reports
  - Report download history tracking

- **<span style="color: #3b82f6;">_Customized Profile Settings_</span>**
 - ***<span style="color: #8b5cf6;">Dark mode</span>***/Light theme appearance
 - Update profile picture, country, gender, etc in account settings

### User Experience

- **Simple Login**
  - Enter any name to start using the app
  - Per-user data isolation (each username has separate data)
  - Data persists in browser ***<span style="color: #6366f1;">localStorage</span>***

- **<span style="color: #3b82f6;">_Responsive Design_</span>**
  - Fully optimized and ***<span style="color: #ec4899;">responsive</span>*** for desktop, tablet, and ***<span style="color: #ec4899;">mobile devices</span>***
  - ***<span style="color: #8b5cf6;">Dark theme</span>*** based interface throughout
  - ***<span style="color: #10b981;">Clean and readable design</span>***
  - Accessible ***<span style="color: #10b981;">UI</span>*** components
  - Handles ***<span style="color: #f59e0b;">empty states</span>*** and ***<span style="color: #f59e0b;">no data cases</span>*** gracefully
  - login page while showcasing app features through moving cards ***<span style="color: #f59e0b;">transition</span>***
  - Smooth ***<span style="color: #f59e0b;">transitions</span>*** between feature highlights

- **Demo Mode Features: This is a frontend-only demo with the following characteristics**

- **No Real Backend Required**: All ***<span style="color: #6366f1;">data</span>*** is stored in browser ***<span style="color: #6366f1;">localStorage</span>***
- **Per-User Data**: Each username gets isolated ***<span style="color: #3b82f6;">transaction</span>***/report ***<span style="color: #6366f1;">data</span>***
- **Mock API**: All API calls are intercepted and handled locally
- **Sample Reports**: 2 sample reports included for demonstration
- *****<span style="color: #f59e0b;">Empty</span>*** Start**: New users start with ***<span style="color: #f59e0b;">zero transactions</span>*** (***<span style="color: #10b981;">add</span>*** your own!)

### What Requires Backend (Optional)

- AI receipt scanning (connect to deployed backend on Render)

## Technology Stack

### Frontend

- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 6.x
- ***<span style="color: #8b5cf6;">State Management</span>***: Redux Toolkit with RTK Query
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives, shadcn/ui
- **Charts**: Recharts
- **PDF Generation**: jspdf + jspdf-autotable
- ***<span style="color: #f59e0b;">Animations</span>***: Framer Motion


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

1. ***<span style="color: #3b82f6;">Transaction</span>*** Operations**: CRUD operations store ***<span style="color: #6366f1;">data</span>*** in ***<span style="color: #6366f1;">localStorage</span>*** per user
2. **Analytics**: Calculated in real-time from stored ***<span style="color: #3b82f6;">transactions</span>***
3. **Reports**: Generated locally with PDF download support
4. **User Data**: Isolated by username prefix in ***<span style="color: #6366f1;">localStorage</span>*** keys

### Data Persistence

Data is stored with the following ***<span style="color: #6366f1;">localStorage</span>*** keys:
- `fintrack_user_{username}_transactions` - User's ***<span style="color: #3b82f6;">transaction</span>*** ***<span style="color: #6366f1;">data</span>***
- `fintrack_reports_{username}` - User's report history
- `fintrack_current_user` - Currently logged-in username

### Chart Data

Charts display per-***<span style="color: #3b82f6;">transaction</span>*** ***<span style="color: #6366f1;">data</span>*** points:
- ***<span style="color: #ec4899;">Area Chart</span>***: Each ***<span style="color: #3b82f6;">transaction</span>*** appears as a separate ***<span style="color: #6366f1;">data</span>*** point
- ***<span style="color: #ec4899;">Pie Chart</span>***: ***<span style="color: #ef4444;">Expenses</span>*** ***<span style="color: #f59e0b;">grouped by category</span>*** with percentages

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
