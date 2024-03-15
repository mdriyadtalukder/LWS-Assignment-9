import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import projectSlice from "../features/project/projectSlice";
import teamSlice from "../features/team/teamSlice";
import taskSlice from "../features/task/taskSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        projects: projectSlice,
        teams: teamSlice,
        tasks: taskSlice,
    },
    devTools: import.meta.env.NODE_ENV !== 'production', //MODE
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware)
})