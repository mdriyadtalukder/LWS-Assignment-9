import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'project',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000/"
    }),
    tagTypes: [],
    endpoints: (builder) => ({})
})
