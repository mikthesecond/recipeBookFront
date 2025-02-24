import { Dispatch } from "redux"
import { RECIPE_ACTIONS, RecipeActions } from "../../types/Recipe"
import axios from "axios"


export const fetchRecipes = ()=>
{
    return async (dispatch:Dispatch<RecipeActions>)=>
    {
        try{
            dispatch({
                type:RECIPE_ACTIONS.FETCH_RECIPE })
            const response = await axios.get("http://localhost:3228/api/recipes")
            dispatch({
                type:RECIPE_ACTIONS.FETCH_RECIPE_SUCCESS,
                payload:response.data})
        }
        catch(e)
        {
            dispatch({
                type:RECIPE_ACTIONS.FETCH_RECIPE_ERROR,
                payload:"Ошибка получения рецептов"})
        }
    }
}
export const fetchRecipeById = (id: number | null) => {
    return async (dispatch: Dispatch<RecipeActions>) => {
        if (id === null) {
            dispatch({
                type: RECIPE_ACTIONS.FETCH_RECIPE_ERROR,
                payload: "Некорректный ID рецепта",
            });
            return;
        }

        try {
            dispatch({ type: RECIPE_ACTIONS.FETCH_RECIPE_BY_ID });

            const response = await axios.get(`http://localhost:3228/api/recipe/${id}`);

            dispatch({
                type: RECIPE_ACTIONS.FETCH_RECIPE_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: RECIPE_ACTIONS.FETCH_RECIPE_ERROR,
                payload: "Ошибка получения рецепта",
            });
        }
    };
};
