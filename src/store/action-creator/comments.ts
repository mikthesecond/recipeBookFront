import { Dispatch } from "redux"
import axios from "axios"
import { COMMENTS_ACTIONS, CommentsActions } from "../../types/Comments"

export const fetchComments=(id:number|null)=>
{
    return async (dispatch:Dispatch<CommentsActions>)=>
    {
       try {
        dispatch({
            type:COMMENTS_ACTIONS.FETCH_COMMENTS})
            const response = await axios.get(`http://localhost:3228/api/comments/${id}`)
        dispatch({
            type:COMMENTS_ACTIONS.FETCH_COMMENTS_SUCCESS,
            payload:response.data})
       }
       catch(e)
       {
        dispatch({
            type:COMMENTS_ACTIONS.FETCH_COMMENTS_ERROR,
            payload:"Ошибка получения комментариев"})
       }
    }
}
export const addComment=(recipe_id:number|null,comment:string,user_id:number|null,username:string)=>
    {
        return async (dispatch:Dispatch<CommentsActions>)=>
        {
           try {
            dispatch({
                type:COMMENTS_ACTIONS.FETCH_COMMENTS})
                const response = await axios.post(`http://localhost:3228/api/comments`,{recipe_id,comment,user_id,username})
            dispatch({
                type:COMMENTS_ACTIONS.FETCH_COMMENTS_SUCCESS,
                payload:response.data})
           }
           catch(e)
           {
            dispatch({
                type:COMMENTS_ACTIONS.FETCH_COMMENTS_ERROR,
                payload:"Ошибка получения комментариев"})
           }
        }
    }