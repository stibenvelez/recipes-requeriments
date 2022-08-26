import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
    recipe: {},
    loading: false,
    amount:0

};

export const usersSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        getRecipe: (state, action) => {
            state.recipe = action.payload;
        },
        getAmount: (state, action) => {
            state.amount = action.payload;
        },
    },
});
export const { getRecipe, getAmount } = usersSlice.actions;

export default usersSlice.reducer;