import { configureStore } from "@reduxjs/toolkit";
import recipes from "./recipes/recipes.slice";

export const store = configureStore({
    reducer: {
       recipes
    },
});  