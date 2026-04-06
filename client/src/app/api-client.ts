// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "./store";

// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const auth = (getState() as RootState).auth;
//     if (auth?.accessToken) {
//       headers.set("Authorization", `Bearer ${auth.accessToken}`);
//     }
//     return headers;
//   },
// });

// export const apiClient = createApi({
//   reducerPath: "api", // Add API client reducer to root reducer
//   baseQuery: baseQuery,
//   refetchOnMountOrArgChange: true, // Refetch on mount or arg change
//   tagTypes: ["transactions", "analytics"], // Tag types for RTK Query
//   endpoints: () => ({}), // Endpoints for RTK Query
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { mockApiBaseQuery } from "@/lib/mock-api";

// Use mock API if VITE_MOCK_MODE is true, otherwise use real backend
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === "true";

const realBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const auth = (getState() as RootState).auth;
    if (auth?.accessToken) {
      headers.set("Authorization", `Bearer ${auth.accessToken}`);
    }
    return headers;
  },
});

// Choose between mock and real API based on environment variable
const baseQuery = MOCK_MODE ? mockApiBaseQuery : realBaseQuery;

export const apiClient = createApi({
  reducerPath: "api", // Add API client reducer to root reducer
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true, // Refetch on mount or arg change
  refetchOnFocus: true, // Refetch when window regains focus
  refetchOnReconnect: true, // Refetch when network reconnects
  tagTypes: ["transactions", "analytics"], // Tag types for RTK Query
  endpoints: () => ({}), // Endpoints for RTK Query
});

