import DashboardDataChart from "./dashboard-data-chart";
import DashboardSummary from "./dashboard-summary";
import PageLayout from "@/components/page-layout";
//import ExpenseBreakDown from "./expense-breakdown";
import ExpensePieChart from "./expense-pie-chart";
import DashboardRecentTransactions from "./dashboard-recent-transactions";
import DashboardInsights from "./dashboard-insights";
import { useState } from "react";
import { DateRangeType } from "@/components/date-range-select";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<DateRangeType>(null);

  return (
    <div className="w-full flex flex-col">
      {/* Dashboard Summary Overview */}
      <PageLayout
        className="space-y-6"
        renderPageHeader={
          <DashboardSummary
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        }
      >
        {/* Dashboard Main Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-4 space-y-8">
            <DashboardDataChart dateRange={dateRange} />
            <DashboardRecentTransactions />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <ExpensePieChart dateRange={dateRange} />
            <DashboardInsights dateRange={dateRange} />
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default Dashboard;