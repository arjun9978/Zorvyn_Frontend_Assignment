import { apiClient } from "@/app/api-client";
import { ChartAnalyticsResponse, ExpensePieChartBreakdownResponse, FilterParams, SummaryAnalyticsResponse } from "./anayticsType";

export interface InsightsResponse {
  message: string;
  data: {
    highestCategory: {
      name: string;
      amount: number;
    } | null;
    monthlyComparison: {
      percentChange: string;
      message: string;
      trend: "positive" | "negative" | "neutral";
    };
    budgetHealth: {
      score: string;
      message: string;
      trend: "positive" | "negative" | "neutral";
    };
    spendingVelocity: {
      dailyAverage: number;
      projectedMonthly: number;
    };
    topPaymentMethod: {
      method: string;
      count: number;
    } | null;
    savingsPotential: {
      amount: number;
      message: string;
      trend: "positive" | "negative";
    };
    alert: {
      title: string;
      message: string;
    } | null;
  };
}

export const analyticsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    summaryAnalytics: builder.query<SummaryAnalyticsResponse, FilterParams>({
      query: ({preset, from, to}) => ({
        url: "/analytics/summary",
        method: "GET",
        params: {preset, from, to}
      }),
      providesTags: ["analytics"],
    }),
    chartAnalytics: builder.query<ChartAnalyticsResponse, FilterParams>({
      query: ({preset, from, to}) => ({
        url: "/analytics/chart",
        method: "GET",
        params: {preset, from, to}
      }),
      providesTags: ["analytics"],
    }),
    expensePieChartBreakdown: builder.query<ExpensePieChartBreakdownResponse, FilterParams  >({
      query: ({preset, from, to}) => ({
        url: "/analytics/expense-breakdown",
        method: "GET",
        params: {preset, from, to}
      }),
      providesTags: ["analytics"],
    }),
    getInsights: builder.query<InsightsResponse, FilterParams>({
      query: ({preset, from, to}) => ({
        url: "/analytics/insights",
        method: "GET",
        params: {preset, from, to}
      }),
      providesTags: ["analytics"],
    }),
  }),
});

export const {
  useSummaryAnalyticsQuery,
  useChartAnalyticsQuery,
  useExpensePieChartBreakdownQuery,
  useGetInsightsQuery,
} = analyticsApi;