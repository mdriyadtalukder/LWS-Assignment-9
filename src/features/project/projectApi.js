import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => ({
                url: "/projects",
                method: "GET"
            }),
        })
    })
})
export const {useGetProjectsQuery}=projectApi;