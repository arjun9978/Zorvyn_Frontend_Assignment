import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "@/app/store";
import {
  getMockTransactions,
  addMockTransaction,
  updateMockTransaction,
  deleteMockTransaction,
  bulkDeleteMockTransactions,
  duplicateMockTransaction,
  bulkImportMockTransactions,
  getMockReports,
  initializeMockData,
  deleteUserAccount,
} from "./mock-data";
import { TransactionType } from "@/features/transaction/transactionType";
import { _TRANSACTION_TYPE } from "@/constant";

// Initialize mock data on app load
initializeMockData();

const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === "true";
const REAL_BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// Real backend base query for AI receipt scanning
const realBackendQuery = fetchBaseQuery({
  baseUrl: REAL_BACKEND_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const auth = (getState() as RootState).auth;
    if (auth?.accessToken) {
      headers.set("Authorization", `Bearer ${auth.accessToken}`);
    }
    return headers;
  },
});

// Mock delay to simulate network request
const mockDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get date range from preset
const getDateRangeFromPreset = (preset?: string): { from: Date; to: Date; label: string } => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  
  switch (preset) {
    case "30days":
      return {
        from: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000),
        to: today,
        label: "Last 30 Days",
      };
    case "lastMonth": {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
      return { from: lastMonth, to: lastMonthEnd, label: "Last Month" };
    }
    case "last3Months":
      return {
        from: new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()),
        to: today,
        label: "Last 3 Months",
      };
    case "lastYear":
      return {
        from: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
        to: today,
        label: "Last Year",
      };
    case "thisMonth": {
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from: thisMonthStart, to: today, label: "This Month" };
    }
    case "thisYear": {
      const thisYearStart = new Date(now.getFullYear(), 0, 1);
      return { from: thisYearStart, to: today, label: "This Year" };
    }
    case "allTime":
      return {
        from: new Date(2000, 0, 1), // Far past date
        to: today,
        label: "All Time",
      };
    default:
      // Default to last 30 days
      return {
        from: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000),
        to: today,
        label: "Last 30 Days",
      };
  }
};

// Calculate analytics from transactions (NO date filtering - use all transactions)
const calculateAnalytics = (transactions: TransactionType[], fromDate?: Date, toDate?: Date) => {
  let filtered = transactions;
  
  // Filter by date range if provided
  if (fromDate && toDate) {
    filtered = transactions.filter(t => {
      const tDate = new Date(t.date).getTime();
      return tDate >= fromDate.getTime() && tDate <= toDate.getTime();
    });
  }
  
  const totalIncome = filtered
    .filter(t => t.type === _TRANSACTION_TYPE.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = filtered
    .filter(t => t.type === _TRANSACTION_TYPE.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100) : 0;
  
  return { totalIncome, totalExpense, balance, savingsRate, filtered };
};

// Calculate expense breakdown by category (with date filtering)
const calculateExpenseBreakdown = (transactions: TransactionType[], fromDate?: Date, toDate?: Date) => {
  let expenses = transactions.filter(t => t.type === _TRANSACTION_TYPE.EXPENSE);
  
  // Filter by date range if provided
  if (fromDate && toDate) {
    expenses = expenses.filter(t => {
      const tDate = new Date(t.date).getTime();
      return tDate >= fromDate.getTime() && tDate <= toDate.getTime();
    });
  }
  
  const categoryTotals: { [key: string]: number } = {};
  
  expenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });
  
  const totalExpense = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
  
  return Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
  }));
};

// Generate chart data from transactions - one data point per transaction
const generateChartData = (transactions: TransactionType[], fromDate?: Date, toDate?: Date) => {
  let filtered = transactions;
  
  // Filter by date range if provided
  if (fromDate && toDate) {
    filtered = transactions.filter(t => {
      const tDate = new Date(t.date).getTime();
      return tDate >= fromDate.getTime() && tDate <= toDate.getTime();
    });
  }
  
  // Sort by date (oldest first for chart display)
  const sorted = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Create one data point per transaction
  return sorted.map(t => {
    const d = new Date(t.date);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    return {
      date: dateKey,
      income: t.type === _TRANSACTION_TYPE.INCOME ? t.amount : 0,
      expenses: t.type === _TRANSACTION_TYPE.EXPENSE ? t.amount : 0,
    };
  });
};

// Mock API base query
export const mockApiBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { getState } = api;
  const state = getState() as RootState;
  
  // Extract URL and method
  let url: string;
  let method: string = "GET";
  let body: any;
  let params: any;
  
  if (typeof args === "string") {
    url = args;
  } else {
    url = args.url;
    method = args.method || "GET";
    body = args.body;
    params = args.params;
  }
  
  // For AI receipt scanning, use real backend
  if (url.includes("/transaction/scan-receipt")) {
    return realBackendQuery(args, api, extraOptions);
  }
  
  // For all other endpoints, use mock data
  await mockDelay(300);
  
  try {
    // Transaction endpoints
    if (url === "/transaction/create" && method === "POST") {
      const newTransaction = addMockTransaction(body);
      return { data: { message: "Transaction created successfully", transaction: newTransaction } };
    }
    
    if (url === "/transaction/all" && method === "GET") {
      let transactions = getMockTransactions();
      
      // Apply filters
      if (params?.keyword) {
        const keyword = params.keyword.toLowerCase();
        transactions = transactions.filter(t => 
          t.title.toLowerCase().includes(keyword) || 
          t.description.toLowerCase().includes(keyword)
        );
      }
      
      if (params?.type) {
        transactions = transactions.filter(t => t.type === params.type);
      }
      
      if (params?.recurringStatus === "RECURRING") {
        transactions = transactions.filter(t => t.isRecurring);
      } else if (params?.recurringStatus === "NON_RECURRING") {
        transactions = transactions.filter(t => !t.isRecurring);
      }
      
      // Pagination
      const pageNumber = parseInt(params?.pageNumber) || 1;
      const pageSize = parseInt(params?.pageSize) || 10;
      const skip = (pageNumber - 1) * pageSize;
      const paginatedTransactions = transactions.slice(skip, skip + pageSize);
      
      return {
        data: {
          message: "Transactions fetched successfully",
          transations: paginatedTransactions,
          pagination: {
            totalCount: transactions.length,
            totalPages: Math.ceil(transactions.length / pageSize),
            pageNumber,
            pageSize,
            skip,
          },
        },
      };
    }
    
    if (url.startsWith("/transaction/") && url.includes("/") && method === "GET") {
      const id = url.split("/").pop();
      const transaction = getMockTransactions().find(t => t._id === id);
      if (transaction) {
        return { data: { message: "Transaction fetched successfully", transaction } };
      }
      return { error: { status: 404, data: { message: "Transaction not found" } } as FetchBaseQueryError };
    }
    
    if (url.startsWith("/transaction/update/") && method === "PUT") {
      const id = url.split("/").pop();
      if (id) {
        const updated = updateMockTransaction(id, body);
        if (updated) {
          return { data: { message: "Transaction updated successfully", transaction: updated } };
        }
      }
      return { error: { status: 404, data: { message: "Transaction not found" } } as FetchBaseQueryError };
    }
    
    if (url.startsWith("/transaction/delete/") && method === "DELETE") {
      const id = url.split("/").pop();
      if (id) {
        deleteMockTransaction(id);
        return { data: { message: "Transaction deleted successfully" } };
      }
      return { error: { status: 404, data: { message: "Transaction not found" } } as FetchBaseQueryError };
    }
    
    if (url === "/transaction/bulk-delete" && method === "DELETE") {
      bulkDeleteMockTransactions(body.transactionIds);
      return { data: { message: "Transactions deleted successfully" } };
    }
    
    if (url.startsWith("/transaction/duplicate/") && method === "PUT") {
      const id = url.split("/").pop();
      if (id) {
        const duplicate = duplicateMockTransaction(id);
        if (duplicate) {
          return { data: { message: "Transaction duplicated successfully", transaction: duplicate } };
        }
      }
      return { error: { status: 404, data: { message: "Transaction not found" } } as FetchBaseQueryError };
    }
    
    if (url === "/transaction/bulk-transaction" && method === "POST") {
      const imported = bulkImportMockTransactions(body.transactions);
      return { data: { message: `${imported.length} transactions imported successfully` } };
    }
    
    // Analytics endpoints
    if (url === "/analytics/summary" && method === "GET") {
      const transactions = getMockTransactions();
      const dateRange = getDateRangeFromPreset(params?.preset);
      const { totalIncome, totalExpense, balance, savingsRate, filtered } = calculateAnalytics(
        transactions,
        dateRange.from,
        dateRange.to
      );
      
      // Count filtered transactions
      const incomeCount = filtered.filter(t => t.type === _TRANSACTION_TYPE.INCOME).length;
      const expenseCount = filtered.filter(t => t.type === _TRANSACTION_TYPE.EXPENSE).length;
      
      return {
        data: {
          message: "Summary analytics fetched successfully",
          data: {
            currentBalance: balance,
            totalIncome: totalIncome,
            totalExpenses: totalExpense,
            transactionCount: filtered.length,
            savingRate: {
              percentage: savingsRate,
              expenseRatio: totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0,
            },
            percentageChange: {
              income: 0,
              expenses: 0,
              balance: 0,
              prevPeriodFrom: null,
              prevPeriodTo: null,
            },
            preset: {
              from: dateRange.from.toISOString(),
              to: dateRange.to.toISOString(),
              value: params?.preset || "30days",
              label: dateRange.label,
            },
          },
        },
      };
    }
    
    if (url === "/analytics/chart" && method === "GET") {
      const transactions = getMockTransactions();
      const dateRange = getDateRangeFromPreset(params?.preset);
      const chartData = generateChartData(transactions, dateRange.from, dateRange.to);
      
      // Count income and expense transactions within date range
      const filtered = transactions.filter(t => {
        const tDate = new Date(t.date).getTime();
        return tDate >= dateRange.from.getTime() && tDate <= dateRange.to.getTime();
      });
      const incomeCount = filtered.filter(t => t.type === _TRANSACTION_TYPE.INCOME).length;
      const expenseCount = filtered.filter(t => t.type === _TRANSACTION_TYPE.EXPENSE).length;
      
      return {
        data: {
          message: "Chart analytics fetched successfully",
          data: {
            chartData: chartData,
            totalIncomeCount: incomeCount,
            totalExpenseCount: expenseCount,
            preset: {
              from: dateRange.from.toISOString(),
              to: dateRange.to.toISOString(),
              value: params?.preset || "30days",
              label: dateRange.label,
            },
          },
        },
      };
    }
    
    if (url === "/analytics/expense-breakdown" && method === "GET") {
      const transactions = getMockTransactions();
      const dateRange = getDateRangeFromPreset(params?.preset);
      
      // Pass date filters to breakdown calculation
      const breakdown = calculateExpenseBreakdown(transactions, dateRange.from, dateRange.to);
      
      // Calculate total spent
      const totalSpent = breakdown.reduce((sum, item) => sum + item.amount, 0);
      
      return {
        data: {
          message: "Expense breakdown fetched successfully",
          data: {
            totalSpent: totalSpent,
            breakdown: breakdown.map(item => ({
              name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
              value: item.amount,
              percentage: item.percentage,
            })),
            preset: {
              from: dateRange.from.toISOString(),
              to: dateRange.to.toISOString(),
              value: params?.preset || "30days",
              label: dateRange.label,
            },
          },
        },
      };
    }
    
    // Reports endpoints
    if (url === "/report/all" && method === "GET") {
      const reports = getMockReports();
      const pageNumber = parseInt(params?.pageNumber) || 1;
      const pageSize = parseInt(params?.pageSize) || 10;
      const skip = (pageNumber - 1) * pageSize;
      const paginatedReports = reports.slice(skip, skip + pageSize);
      
      return {
        data: {
          message: "Reports fetched successfully",
          reports: paginatedReports,
          pagination: {
            totalCount: reports.length,
            totalPages: Math.ceil(reports.length / pageSize),
            pageNumber,
            pageSize,
            skip,
          },
        },
      };
    }
    
    if (url === "/report/update-setting" && method === "PUT") {
      // Just return success for mock mode
      return {
        data: {
          message: "Report settings updated successfully (Demo mode - email reports disabled)",
        },
      };
    }
    
    if (url === "/report/generate-pdf" && method === "GET") {
      // This will be handled separately with frontend PDF generation
      // For now, return success
      return {
        data: {
          message: "PDF generation endpoint - handled by frontend",
        },
      };
    }
    
    // User endpoints
    if (url === "/user/update" && method === "PUT") {
      // In mock mode, extract data from FormData if needed
      let updateData: any = body;
      
      // If body is FormData, convert it to object
      if (body instanceof FormData) {
        updateData = {};
        body.forEach((value, key) => {
          if (key === 'profilePicture' && value instanceof File) {
            // In mock mode, create a local object URL for the image
            updateData[key] = URL.createObjectURL(value);
          } else {
            updateData[key] = value;
          }
        });
      }
      
      const updatedUser = {
        ...state.auth.user,
        ...updateData,
      };
      
      return {
        data: {
          message: "User updated successfully",
          data: updatedUser,
        },
      };
    }
    
    if (url === "/user/delete-account" && method === "DELETE") {
      // Clear all user data from localStorage
      deleteUserAccount();
      return {
        data: {
          message: "Account deleted successfully (Demo mode)",
        },
      };
    }
    
    // Default fallback
    return {
      error: {
        status: 404,
        data: { message: `Mock endpoint not implemented: ${method} ${url}` },
      } as FetchBaseQueryError,
    };
  } catch (error) {
    return {
      error: {
        status: 500,
        data: { message: "Internal mock server error", error },
      } as FetchBaseQueryError,
    };
  }
};
