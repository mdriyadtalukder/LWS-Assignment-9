import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    addColor: ["Scoreboard","Flight Booking","Product Cart","Book Store","Blog Application","Job Finder"],
};
const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        searching: (state, action) => {
            state.search = action.payload;
        },
        addingColor: (state, action) => {
            if (state.addColor.includes(action.payload)) {
                state.addColor = state.addColor.filter(c => c !== action.payload)
            }
            else {
                state.addColor.push(action.payload);

            }
        }
    }
})
export default projectSlice.reducer;
export const { searching, addingColor } = projectSlice.actions;