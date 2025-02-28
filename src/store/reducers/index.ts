import { combineReducers } from "redux";
import { recipeReducer } from "./recipeReducer";
import { commentReducer } from "./commentsReducer";
import { ratingReducer } from "./ratingReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
    recipes:recipeReducer,
    comments:commentReducer,
    rating:ratingReducer,
    user:userReducer
})

export type RootState = ReturnType<typeof rootReducer>