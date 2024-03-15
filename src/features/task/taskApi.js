import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => ({
                url: "/tasks",
                method: "GET"
            }),
        }),
        getTask: builder.query({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "GET"
            }),
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: "/tasks",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { data } = await queryFulfilled;
                try {
                    // pessimistic updates cache
                    dispatch(apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                        draft.push(data)
                    }))
                } catch (error) {
                    //
                }

            },
        }),
        editTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const { data } = await queryFulfilled;
                try {
                    if (data?.id) {
                        // pessimistic updates cache for all task
                        dispatch(apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                            const index = draft?.findIndex((d) => parseInt(d?.id) === arg?.id)
                            draft[index] = data;
                        }))

                        // pessimistic updates cache for single task
                        dispatch(apiSlice.util.updateQueryData("getTask", arg?.id?.toString(), (draft) => {
                            Object.assign(draft, data);
                        }))
                    }
                } catch (error) {
                    //
                }
            }
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = dispatch(apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                    const filtering = draft.filter((d) => parseInt(d?.id) !== arg);
                    return filtering;
                }
                )
                )

                queryFulfilled.catch(result.undo)
            }

        }),
    })
})
export const { useGetTasksQuery, useGetTaskQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = taskApi;