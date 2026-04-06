import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertCircle, Calendar, CreditCard, Wallet, Target, Activity } from "lucide-react";
import { useGetInsightsQuery } from "@/features/analytics/analyticsAPI";
import { DateRangeType } from "@/components/date-range-select";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";

interface InsightsProps {
  dateRange?: DateRangeType;
}

const DashboardInsights = ({ dateRange }: InsightsProps) => {
  const { data, isFetching } = useGetInsightsQuery({
    preset: dateRange?.value,
  });

  const insights = data?.data;

  if (isFetching) {
    return <InsightsSkeleton />;
  }

  if (!insights) return null;

  return (
    <Card className="!shadow-none border-1 border-gray-100 dark:border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Smart Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Highest Spending Category */}
        {insights.highestCategory && (
          <InsightItem
            icon={<TrendingUp className="h-4 w-4 text-red-500" />}
            title="Top Spending Category"
            value={insights.highestCategory.name}
            subtitle={`${formatCurrency(insights.highestCategory.amount)} spent`}
            trend="negative"
          />
        )}

        {/* Monthly Comparison */}
        {insights.monthlyComparison && (
          <InsightItem
            icon={<Calendar className="h-4 w-4 text-blue-500" />}
            title="vs Last Period"
            value={insights.monthlyComparison.percentChange}
            subtitle={insights.monthlyComparison.message}
            trend={insights.monthlyComparison.trend}
          />
        )}

        {/* Budget Health */}
        {insights.budgetHealth && (
          <InsightItem
            icon={<Target className="h-4 w-4 text-green-500" />}
            title="Budget Health"
            value={insights.budgetHealth.score}
            subtitle={insights.budgetHealth.message}
            trend={insights.budgetHealth.trend}
          />
        )}

        {/* Spending Velocity */}
        {insights.spendingVelocity && (
          <InsightItem
            icon={<Activity className="h-4 w-4 text-purple-500" />}
            title="Daily Burn Rate"
            value={formatCurrency(insights.spendingVelocity.dailyAverage)}
            subtitle={`On track to spend ${formatCurrency(insights.spendingVelocity.projectedMonthly)} this month`}
          />
        )}

        {/* Most Used Payment Method */}
        {insights.topPaymentMethod && (
          <InsightItem
            icon={<CreditCard className="h-4 w-4 text-indigo-500" />}
            title="Preferred Payment"
            value={insights.topPaymentMethod.method}
            subtitle={`${insights.topPaymentMethod.count} transactions`}
          />
        )}

        {/* Savings Potential */}
        {insights.savingsPotential && (
          <InsightItem
            icon={<Wallet className="h-4 w-4 text-cyan-500" />}
            title="Savings This Period"
            value={formatCurrency(insights.savingsPotential.amount)}
            subtitle={insights.savingsPotential.message}
            trend={insights.savingsPotential.trend}
          />
        )}

        {/* Alert if needed */}
        {insights.alert && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  {insights.alert.title}
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-0.5">
                  {insights.alert.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface InsightItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  trend?: "positive" | "negative" | "neutral";
}

const InsightItem = ({ icon, title, value, subtitle, trend }: InsightItemProps) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-sm font-semibold mt-0.5 truncate">{value}</p>
        {subtitle && (
          <div className="flex items-center gap-1 mt-1">
            {trend === "positive" && <TrendingUp className="h-3 w-3 text-green-500" />}
            {trend === "negative" && <TrendingDown className="h-3 w-3 text-red-500" />}
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InsightsSkeleton = () => (
  <Card className="!shadow-none border-1 border-gray-100 dark:border-border">
    <CardHeader>
      <Skeleton className="h-6 w-32" />
    </CardHeader>
    <CardContent className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-start gap-3 p-3">
          <Skeleton className="h-4 w-4 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default DashboardInsights;
