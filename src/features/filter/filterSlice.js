import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: "",
    sellectedProjects: [
        "Scoreboard",
        "Flight Booking",
        "Product Cart",
        "Book Store",
        "Blog Application",
        "Job Finder",
    ],
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        searching: (state, action) => {
            state.search = action.payload;
        },
        selectedProjects: (state, action) => {
            const key = Object.keys(action.payload).join("");
            if(state.sellectedProjects.includes(key)){
                state.sellectedProjects = state.sellectedProjects.filter(project => project !== key)
            }else{
                state.sellectedProjects.push(key)
            }
        },
    },
});

export const { searching, selectedProjects } = filterSlice.actions;
export default filterSlice.reducer;
