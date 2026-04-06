import { TransactionType } from "@/features/transaction/transactionType";
import { _TRANSACTION_TYPE, PAYMENT_METHODS_ENUM } from "@/constant";

const MOCK_STORAGE_PREFIX = "fintrack_user_";
const MOCK_REPORTS_PREFIX = "fintrack_reports_";
const CURRENT_USER_KEY = "fintrack_current_user";

// Get current logged-in user
const getCurrentUser = (): string => {
  return localStorage.getItem(CURRENT_USER_KEY) || "guest";
};

// Set current user
export const setCurrentUser = (username: string) => {
  localStorage.setItem(CURRENT_USER_KEY, username.toLowerCase().trim());
};

// Clear current user (logout)
export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Delete user account data completely
export const deleteUserAccount = (username?: string) => {
  const user = username || getCurrentUser();
  const transactionsKey = `${MOCK_STORAGE_PREFIX}${user}_transactions`;
  const reportsKey = `${MOCK_REPORTS_PREFIX}${user}`;
  
  // Remove all user data
  localStorage.removeItem(transactionsKey);
  localStorage.removeItem(reportsKey);
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Get storage keys for current user
const getUserStorageKey = (username?: string): string => {
  const user = username || getCurrentUser();
  return `${MOCK_STORAGE_PREFIX}${user}_transactions`;
};

const getUserReportsKey = (username?: string): string => {
  const user = username || getCurrentUser();
  return `${MOCK_REPORTS_PREFIX}${user}`;
};

// Sample transaction titles and descriptions by category
const transactionTemplates = {
  groceries: [
    { title: "Whole Foods Market", desc: "Weekly grocery shopping" },
    { title: "Trader Joe's", desc: "Fresh produce and essentials" },
    { title: "Safeway", desc: "Monthly grocery run" },
    { title: "Local Farmers Market", desc: "Fresh vegetables and fruits" },
  ],
  dining: [
    { title: "Starbucks Coffee", desc: "Morning coffee and breakfast" },
    { title: "Chipotle", desc: "Lunch with colleagues" },
    { title: "Pizza Hut", desc: "Family dinner" },
    { title: "The Cheesecake Factory", desc: "Date night dinner" },
    { title: "McDonald's", desc: "Quick lunch" },
  ],
  transportation: [
    { title: "Uber Ride", desc: "Ride to downtown" },
    { title: "Gas Station", desc: "Fuel refill" },
    { title: "Metro Card Recharge", desc: "Monthly transit pass" },
    { title: "Lyft", desc: "Airport transfer" },
  ],
  utilities: [
    { title: "Electric Bill", desc: "Monthly electricity payment" },
    { title: "Water Bill", desc: "Quarterly water charges" },
    { title: "Internet Service", desc: "Monthly broadband payment" },
    { title: "Gas Bill", desc: "Monthly gas utility" },
  ],
  entertainment: [
    { title: "Netflix Subscription", desc: "Monthly streaming service" },
    { title: "Spotify Premium", desc: "Music streaming subscription" },
    { title: "Movie Tickets", desc: "Weekend cinema visit" },
    { title: "Concert Tickets", desc: "Live music event" },
    { title: "PlayStation Store", desc: "Game purchase" },
  ],
  shopping: [
    { title: "Amazon Purchase", desc: "Online shopping" },
    { title: "Target", desc: "Household items" },
    { title: "Nike Store", desc: "Running shoes" },
    { title: "Best Buy", desc: "Electronics purchase" },
    { title: "IKEA", desc: "Home furniture" },
  ],
  healthcare: [
    { title: "Health Insurance Premium", desc: "Monthly insurance payment" },
    { title: "Pharmacy", desc: "Prescription medications" },
    { title: "Dental Checkup", desc: "Routine dental visit" },
    { title: "Gym Membership", desc: "Monthly fitness membership" },
  ],
  travel: [
    { title: "Flight Booking", desc: "Round trip tickets" },
    { title: "Hotel Reservation", desc: "3-night stay" },
    { title: "Airbnb", desc: "Weekend getaway accommodation" },
    { title: "Car Rental", desc: "Weekend rental car" },
  ],
  housing: [
    { title: "Monthly Rent", desc: "Apartment rent payment" },
    { title: "Property Tax", desc: "Quarterly property tax" },
    { title: "Home Insurance", desc: "Annual insurance premium" },
    { title: "HOA Fees", desc: "Monthly association fees" },
  ],
  income: [
    { title: "Monthly Salary", desc: "Salary credit" },
    { title: "Freelance Project", desc: "Client payment" },
    { title: "Bonus Payment", desc: "Performance bonus" },
    { title: "Investment Returns", desc: "Dividend payment" },
    { title: "Side Gig", desc: "Part-time work payment" },
  ],
  investments: [
    { title: "Stock Purchase", desc: "Tech stock investment" },
    { title: "Mutual Fund", desc: "Monthly SIP investment" },
    { title: "Crypto Purchase", desc: "Bitcoin investment" },
    { title: "Retirement Fund", desc: "401k contribution" },
  ],
  other: [
    { title: "Gift Purchase", desc: "Birthday gift" },
    { title: "Charity Donation", desc: "Monthly donation" },
    { title: "Pet Supplies", desc: "Dog food and treats" },
    { title: "Miscellaneous", desc: "Various small expenses" },
  ],
};

// Generate random date within specified range, with bias towards recent dates
const getRandomDate = (daysAgo: number, biasRecent: boolean = true) => {
  const date = new Date();
  let dayOffset: number;
  
  if (biasRecent) {
    // Bias towards more recent dates (exponential distribution)
    // 70% of transactions in last 30 days, 30% older
    if (Math.random() < 0.7) {
      dayOffset = Math.floor(Math.random() * 30); // Last 30 days
    } else {
      dayOffset = 30 + Math.floor(Math.random() * (daysAgo - 30)); // Older
    }
  } else {
    dayOffset = Math.floor(Math.random() * daysAgo);
  }
  
  date.setDate(date.getDate() - dayOffset);
  return date.toISOString();
};

// Generate random amount based on category
const getRandomAmount = (category: string, type: string): number => {
  if (type === "INCOME") {
    return Math.floor(Math.random() * 3000) + 2000; // $2000-$5000
  }
  
  const ranges: { [key: string]: [number, number] } = {
    groceries: [50, 200],
    dining: [15, 80],
    transportation: [10, 60],
    utilities: [80, 250],
    entertainment: [10, 100],
    shopping: [30, 300],
    healthcare: [50, 500],
    travel: [200, 1500],
    housing: [800, 2500],
    investments: [100, 1000],
    other: [10, 150],
  };
  
  const [min, max] = ranges[category] || [10, 100];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate initial mock data with good spread across dates
export const generateInitialMockData = (): TransactionType[] => {
  const transactions: TransactionType[] = [];
  const expenseCategories = Object.keys(transactionTemplates).filter(c => c !== "income");
  const paymentMethods = Object.values(PAYMENT_METHODS_ENUM);
  
  // Generate transactions for the last 30 days with good distribution
  // Create 3-5 transactions per day for last 15 days, fewer for older dates
  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    date.setHours(Math.floor(Math.random() * 12) + 8); // Random hour 8am-8pm
    
    // More transactions for recent days
    const transactionsPerDay = dayOffset < 15 ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 2) + 1;
    
    for (let t = 0; t < transactionsPerDay; t++) {
      // 25% chance of income, 75% expense
      const isIncome = Math.random() < 0.25;
      const category = isIncome ? "income" : expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
      const templates = transactionTemplates[category as keyof typeof transactionTemplates];
      const template = templates[Math.floor(Math.random() * templates.length)];
      
      const type = isIncome ? _TRANSACTION_TYPE.INCOME : _TRANSACTION_TYPE.EXPENSE;
      const amount = getRandomAmount(category, type);
      
      // Vary the time slightly for each transaction on the same day
      const txDate = new Date(date);
      txDate.setMinutes(Math.floor(Math.random() * 60));
      
      const transaction: TransactionType = {
        _id: `mock-${Date.now()}-${dayOffset}-${t}`,
        userId: "demo-user",
        title: template.title,
        type: type,
        amount: amount,
        description: template.desc,
        category: category,
        date: txDate.toISOString(),
        isRecurring: Math.random() > 0.9, // 10% recurring
        recurringInterval: null,
        nextRecurringDate: null,
        lastProcessed: null,
        status: "COMPLETED",
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        createdAt: txDate.toISOString(),
        updatedAt: txDate.toISOString(),
      };
      
      transactions.push(transaction);
    }
  }
  
  // Sort by date (newest first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Initialize mock data in localStorage (only if first time for this user)
export const initializeMockData = () => {
  // Don't auto-initialize - let each user start fresh
  // Data will be created on first transaction add
};

// Get all transactions from localStorage for current user
export const getMockTransactions = (): TransactionType[] => {
  const storageKey = getUserStorageKey();
  const data = localStorage.getItem(storageKey);
  if (!data) {
    return []; // Return empty array for new users
  }
  return JSON.parse(data);
};

// Save transactions to localStorage for current user
export const saveMockTransactions = (transactions: TransactionType[]) => {
  const storageKey = getUserStorageKey();
  localStorage.setItem(storageKey, JSON.stringify(transactions));
};

// Add new transaction
export const addMockTransaction = (transaction: Omit<TransactionType, "_id" | "userId" | "createdAt" | "updatedAt" | "status" | "lastProcessed" | "nextRecurringDate">) => {
  const transactions = getMockTransactions();
  const newTransaction: TransactionType = {
    ...transaction,
    _id: `mock-${Date.now()}-${Math.random()}`,
    userId: "demo-user",
    status: "COMPLETED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastProcessed: null,
    nextRecurringDate: null,
  };
  transactions.unshift(newTransaction);
  saveMockTransactions(transactions);
  return newTransaction;
};

// Update transaction
export const updateMockTransaction = (id: string, updates: Partial<TransactionType>) => {
  const transactions = getMockTransactions();
  const index = transactions.findIndex(t => t._id === id);
  if (index !== -1) {
    transactions[index] = {
      ...transactions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveMockTransactions(transactions);
    return transactions[index];
  }
  return null;
};

// Delete transaction
export const deleteMockTransaction = (id: string) => {
  const transactions = getMockTransactions();
  const filtered = transactions.filter(t => t._id !== id);
  saveMockTransactions(filtered);
  return filtered;
};

// Bulk delete transactions
export const bulkDeleteMockTransactions = (ids: string[]) => {
  const transactions = getMockTransactions();
  const filtered = transactions.filter(t => !ids.includes(t._id));
  saveMockTransactions(filtered);
  return filtered;
};

// Duplicate transaction
export const duplicateMockTransaction = (id: string) => {
  const transactions = getMockTransactions();
  const original = transactions.find(t => t._id === id);
  if (original) {
    const duplicate: TransactionType = {
      ...original,
      _id: `mock-${Date.now()}-${Math.random()}`,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    transactions.unshift(duplicate);
    saveMockTransactions(transactions);
    return duplicate;
  }
  return null;
};

// Bulk import transactions
export const bulkImportMockTransactions = (newTransactions: any[]) => {
  const transactions = getMockTransactions();
  const imported = newTransactions.map((t, i) => ({
    ...t,
    _id: `mock-${Date.now()}-${i}`,
    userId: "demo-user",
    status: "COMPLETED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastProcessed: null,
    nextRecurringDate: null,
    recurringInterval: null,
  }));
  const combined = [...imported, ...transactions];
  saveMockTransactions(combined);
  return imported;
};

// Generate mock reports data for current user (only 2 sample reports)
export const generateMockReports = () => {
  const reports = [
    {
      _id: "report-sample-1",
      userId: getCurrentUser(),
      period: "Sample Report - Last 30 Days",
      sentDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: "DOWNLOADED",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      __v: 0,
    },
    {
      _id: "report-sample-2",
      userId: getCurrentUser(),
      period: "Sample Report - This Month",
      sentDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      status: "DOWNLOADED",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      __v: 0,
    },
  ];
  
  const storageKey = getUserReportsKey();
  localStorage.setItem(storageKey, JSON.stringify(reports));
  return reports;
};

export const getMockReports = () => {
  const storageKey = getUserReportsKey();
  const data = localStorage.getItem(storageKey);
  if (!data) {
    // Always generate sample reports for demo purposes
    return generateMockReports();
  }
  return JSON.parse(data);
};

// Add a new report download record
export const addReportDownload = (period: string, fromDate: string, toDate: string) => {
  const reports = getMockReports();
  const newReport = {
    _id: `report-${Date.now()}`,
    userId: getCurrentUser(),
    period: period,
    sentDate: new Date().toISOString(),
    status: "DOWNLOADED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  };
  
  // Add to beginning of array (most recent first)
  reports.unshift(newReport);
  
  const storageKey = getUserReportsKey();
  localStorage.setItem(storageKey, JSON.stringify(reports));
  
  return newReport;
};
