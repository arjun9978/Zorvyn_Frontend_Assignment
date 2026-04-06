# FinEnsure - Frontend Demo

A modern personal finance tracking application built as a frontend-only demo. This is a standalone version designed for demonstration purposes, featuring all UI/UX functionality with mock data stored in localStorage.

## Live Demo

**[View Live Demo](https://finensure.vercel.app)** *(Update with your actual URL)*

## Overview

FinEnsure helps users track income, expenses, and financial patterns with structured records and clear insights. This demo version works entirely in the browser without requiring a backend server.

## Features

### Core Functionality

- **Transaction Management**
  - Track income and expenses with detailed categorization
  - Support for recurring transactions (daily, weekly, monthly, yearly)
  - Attach receipts and documents to transactions
  - Bulk import/export transactions
  - Duplicate and bulk delete operations

- **Financial Analytics**
  - Real-time dashboard with financial overview
  - Visual expense breakdowns by category (Pie chart)
  - Income vs. expense trend analysis (Area chart)
  - Per-transaction data visualization
  - Customizable date range filtering (30 days, this month, last month, etc.)
  - Savings rate calculation and tracking

- **AI-Powered Receipt Scanning** *(Requires backend)*
  - Intelligent receipt data extraction using Google AI
  - Auto-fills transaction details from receipt image
  - Supports common receipt formats

- **PDF Report Generation**
  - Instant PDF download with financial summaries
  - Customizable date ranges for reports
  - Report download history tracking

### User Experience

- **Simple Login**
  - Enter any name to start using the app
  - Per-user data isolation (each username has separate data)
  - Data persists in browser localStorage

- **Responsive Design**
  - Fully optimized for desktop, tablet, and mobile devices
  - Dark mode interface throughout
  - Accessible UI components

- **Feature Carousel**
  - Animated login page showcasing app features
  - Smooth transitions between feature highlights

## Demo Mode Features

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

This is a frontend assignment submission. For questions or feedback, please contact through the repository.

## License

This project is for educational/demonstration purposes.

## Author

Created for Zorvyn Frontend Assignment
