import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: () => ({
                url: "/team",
                method: "GET"
            }),
        })
    })
})
export const {useGetTeamsQuery}=teamApi;