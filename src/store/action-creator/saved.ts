import { Dispatch } from "redux"
import { SAVED_ACTIONS, SavedActions } from "../../types/Saved"
import axios from "axios"


export const fetchSaved = (userId:number|string)=>
{
    return async (dispatch:Dispatch<SavedActions>)=>
    {
        try{
            dispatch({
                type:SAVED_ACTIONS.FETCH_SAVED })
            const response = await axios.get("http://localhost:3228/api/saved",{params:{user_id:userId}})
            dispatch({
                type:SAVED_ACTIONS.FETCH_SAVED_SUCCESS,
                payload:response.data})
        }
        catch(e)
        {
            dispatch({
                type:SAVED_ACTIONS.FETCH_SAVED_ERROR,
                payload:"Ошибка получения сохраненных рецептов"})
        }
    }
}
export const addSaved = (user_id:number|string|null,recipe_id:number|string|null)=>
    {
        return async (dispatch:Dispatch<SavedActions>)=>
        {
            try{
                dispatch({
                    type:SAVED_ACTIONS.FETCH_SAVED })
                const response = await axios.post("http://localhost:3228/api/saved",{user_id,recipe_id})
                dispatch({
                    type:SAVED_ACTIONS.FETCH_SAVED_SUCCESS,
                    payload:response.data})
            }
            catch(e)
            {
                dispatch({
                    type:SAVED_ACTIONS.FETCH_SAVED_ERROR,
                    payload:"Ошибка сохранения рецептов"})
            }
        }
    }

