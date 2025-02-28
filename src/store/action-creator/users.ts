import { Dispatch } from "redux"
import axios from "axios"
import { User, USER_ACTIONS, UserActions } from "../../types/User"


export const addUser=(email:string,password:string,user_name:string)=>
{
    return async (dispatch:Dispatch<UserActions>)=>
    {
       try {
        dispatch({
            type:USER_ACTIONS.ADD_USER})
            const response = await axios.post(`http://localhost:3228/api/registration`,{email,password,user_name})
        dispatch({
            type:USER_ACTIONS.ADD_USER_SUCCESS,
            payload:response.data})
       }
       catch(e)
       {
        dispatch({
            type:USER_ACTIONS.ADD_USER_ERROR,
            payload:"Ошибка добавления пользователя"})
       }
    }
}
export const logUser=(email:string,password:string)=>
    {
        return async (dispatch:Dispatch<UserActions>)=>
        {
           try {
            dispatch({
                type:USER_ACTIONS.ADD_USER})
                const response = await axios.post(`http://localhost:3228/api/login`,{email,password})
            dispatch({
                type:USER_ACTIONS.ADD_USER_SUCCESS,
                payload:response.data})
           }
           catch(e)
           {
            dispatch({
                type:USER_ACTIONS.ADD_USER_ERROR,
                payload:"Ошибка авторизации пользователя"})
           }
        }
    }
    export const setUser=(user:User)=>
        {
            return (dispatch:Dispatch<UserActions>)=>
            {
               try {
                dispatch({
                    type:USER_ACTIONS.ADD_USER})
                    
                dispatch({
                    type:USER_ACTIONS.ADD_USER_SUCCESS,
                    payload:user})
               }
               catch(e)
               {
                dispatch({
                    type:USER_ACTIONS.ADD_USER_ERROR,
                    payload:"Ошибка авторизации пользователя"})
               }
            }
        }