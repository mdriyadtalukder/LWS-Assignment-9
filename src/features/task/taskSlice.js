import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {}
})
export default taskSlice.reducer;
export const { } = taskSlice.actions;