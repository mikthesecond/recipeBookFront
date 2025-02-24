import { combineReducers } from "redux";
import { recipeReducer } from "./recipeReducer";
import { commentReducer } from "./commentsReducer";


export const rootReducer = combineReducers({
    recipes:recipeReducer,
    comments:commentReducer
})

export type RootState = ReturnType<typeof rootReducer>