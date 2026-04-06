# FinEnsure - Frontend (Assignment)

A personal finance tracking application built as a frontend-only demo. This is a standalone version designed for demonstration purposes, featuring all UI/UX functionality with mock data stored in localStorage.

## Live Demo

**[View Live Demo](https://finensure.vercel.app)** *(Update with your actual URL)*

## Overview

FinEnsure helps users track income, expenses, and financial patterns with structured records and clear insights. This demo version works entirely in the browser without requiring a backend server as mentioned in the instructions of the assignment.

## Features

### Core Functionality

- **Transaction Management**
  - Track income and expenses with detailed categorization, enabling users to filter by type, category, date, payment method, and frequency
  - Support for recurring transactions (daily, weekly, monthly, yearly)
  - Bulk import/export transactions
  - Edit, delete, or duplicate any transaction
  - Search and filter by multiple criteria
  
- **Financial Analytics**
  - Real-time dashboard with user's entire financial overview (Current Balance, Total Income, Total Expenses, Savings Rate)
  - Visual expense breakdowns by category (Pie chart)
  - Income vs. expense trend analysis (Area chart) by per-transaction data visualization
  - Customizable date range filtering (30 days, this month, last month, biweekly etc.)
  - Recent transaction logs on the dashboard

- **Smart Insights**
  - Top spending category with amount
  - Monthly comparison (spending change vs previous period)
  - Budget health score (Excellent/Good/Fair/Critical)
  - Daily burn rate (average spending per day + projected monthly)
  - Preferred payment method analysis
  - Savings this period tracker
  - Smart budget alerts when overspending

- **Role-Based Access Control**
  - Switch between Admin and Viewer roles via toggle in navbar
  - **Admin Role**: Full access to all features
    - Add, edit, delete transactions
    - Bulk import/export
    - Modify profile settings
    - Delete account
  - **Viewer Role**: Read-only access
    - View dashboard and analytics
    - View transactions (no modifications)
    - Download reports
    - Profile editing disabled
  - Role persists in localStorage for demo purposes

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
  - Update profile picture, country, gender, language in account settings
  - Multi-language support

### User Experience

- **Simple Login**
  - Enter any name to start using the app
  - Per-user data isolation (each username has separate data)
  - Data persists in browser localStorage

- **Responsive Design**
  - Fully optimized and responsive for desktop, tablet, and mobile devices
  - Dark theme based interface throughout
  - Accessible UI components
  - Login page showcasing app features through moving cards transition
  - Smooth transitions between feature highlights

### Demo Mode Features

This is a frontend-only demo with the following characteristics:

- **No Real Backend Required**: All data is stored in browser localStorage
- **Per-User Data**: Each username gets isolated transaction/report data
- **Mock API**: All API calls are intercepted and handled locally
- **Sample Reports**: 2 sample reports included for demonstration
- **Empty Start**: New users start with zero transactions (add your own!)

### What Works Without Backend

- All transaction CRUD operations
- Analytics and charts
- PDF report generation and download
- Profile settings (stored locally)
- Theme switching
- Role-based access control

### Backend-Dependent Features (Future Scope)

The following features are **proposed/future work** and require backend deployment:

- **AI Receipt Scanning**: Uses Google AI (Gemini) for intelligent receipt data extraction
  - Feature is visible in UI with "(Backend Required)" label
  - Excluded from this demo as it was built for **frontend assignment purposes**
  - Backend code available separately (not included in this branch)
  
**Note**: Since this was built specifically for a frontend development assignment, backend-dependent features are kept as proposed functionality to demonstrate full product vision while keeping the implementation purely frontend-focused.

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

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/arjun9978/Zorvyn_Frontend_Assignment.git
   cd Zorvyn_Frontend_Assignment
   ```

2. Install dependencies
   ```bash
   cd client
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser

### Environment Variables

Create a `.env` file in the `client` directory:

```env
# Mock Mode - Set to true to use mock data (required for demo)
VITE_MOCK_MODE=true

# Backend API URL (only needed for AI receipt scanning)
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

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
│   ├── context/         # React context providers (Role, Theme)
│   ├── features/        # Redux slices and API definitions
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── lib/             # Utility functions
│   │   ├── mock-api.ts  # Mock API interceptor
│   │   └── mock-data.ts # Mock data management
│   ├── pages/           # Page components
│   │   ├── auth/        # Login page
│   │   ├── dashboard/   # Dashboard with charts & insights
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
5. **Insights**: Smart calculations based on spending patterns

### Data Persistence

Data is stored with the following localStorage keys:
- `fintrack_user_{username}_transactions` - User's transaction data
- `fintrack_reports_{username}` - User's report history
- `fintrack_current_user` - Currently logged-in username
- `fintrack_user_role` - Current user role (Admin/Viewer)

### Chart Data

Charts display per-transaction data points:
- **Area Chart**: Each transaction appears as a separate data point showing income/expense trend over time
- **Pie Chart**: Expenses grouped by category with percentages

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_MOCK_MODE=true`
   - `VITE_API_BASE_URL` (if using AI receipt scanning)
4. Deploy!

### Build for Production

```bash
cd client
npm run build
```

The built files will be in the `dist/` directory.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Known Limitations

- Data is browser-specific (same username on different browsers = separate data)
- localStorage has ~5MB limit per domain
- AI receipt scanning requires backend deployment
- No real authentication (name-based only for demo)

## Contributing

This is a frontend assignment submission. No contributions are appreciated for this repo.

## License

This project is for educational/demonstration purposes only. You can always take UI inspirations from here.

## Contributor

Created for Zorvyn Frontend Assignment by **Arjun Pratap Aggarwal**
