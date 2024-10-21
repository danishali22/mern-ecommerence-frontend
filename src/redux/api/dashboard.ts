import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarChartResponse, LineChartResponse, PieChartResponse, StatsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard`}),
    tagTypes: ["dashboard"],
    endpoints: (builder) => ({
        stats: builder.query<StatsResponse, string>({
            query: (id) => `stats?id=${id}`,
            providesTags: ["dashboard"],
        }),
        pie: builder.query<PieChartResponse, string>({
            query: (id) => `pie?id=${id}`,
            providesTags: ["dashboard"],
        }),
        bar: builder.query<BarChartResponse, string>({
            query: (id) => `bar?id=${id}`,
            providesTags: ["dashboard"],
        }),
        line: builder.query<LineChartResponse, string>({
            query: (id) => `line?id=${id}`,
            providesTags: ["dashboard"],
        }),
    }),
});

export const {useStatsQuery, usePieQuery, useBarQuery, useLineQuery} = dashboardApi