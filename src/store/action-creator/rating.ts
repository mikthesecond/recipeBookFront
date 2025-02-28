import { Dispatch } from "redux";
import { RATING_ACTIONS, RatingActions } from "../../types/Rating";
import axios from "axios";


export const setRating=(recipe_id:number|string,rate:number|null,user_id:number|string|null)=>
{
    return async(dispatch:Dispatch<RatingActions>)=>{
        try{
            dispatch({type:RATING_ACTIONS.SET_RATING})
            const response = await axios.post(`http://localhost:3228/api/rating`,{recipe_id,rate,user_id})
            dispatch({type:RATING_ACTIONS.SET_RATING_SUCCESS,payload:response.data})
        }
        catch(e)
        {
            dispatch({type:RATING_ACTIONS.SET_RATING_ERROR,payload:"Ошибка постановки рейтинга"})
        }
    }
}
export const fetchRating=(recipe_id:number|null,user_id:number|null)=>
    {
        return async(dispatch:Dispatch<RatingActions>)=>{
            try{
                dispatch({type:RATING_ACTIONS.SET_RATING})
                const response = await axios.get(`http://localhost:3228/api/rating`, { 
                    params: { recipe_id, user_id }
                });
                dispatch({type:RATING_ACTIONS.SET_RATING_SUCCESS,payload:response.data})
            }
            catch(e)
            {
                dispatch({type:RATING_ACTIONS.SET_RATING_ERROR,payload:"Ошибка получения рейтинга"})
            }
        }
    }