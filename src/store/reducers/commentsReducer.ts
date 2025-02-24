import { COMMENTS_ACTIONS, CommentState, CommentsActions} from "../../types/Comments"


const initialState:CommentState = {
    comments:[],
    loading:false,
    error:null
}

export const commentReducer = (state=initialState,action:CommentsActions):CommentState=>
{
    switch(action.type)
    {
        case COMMENTS_ACTIONS.FETCH_COMMENTS:return{loading:true,comments:[],error:null}
        case COMMENTS_ACTIONS.FETCH_COMMENTS_ERROR:return{loading:false,comments:[],error:action.payload}
        case COMMENTS_ACTIONS.FETCH_COMMENTS_SUCCESS:return{loading:false,comments:action.payload,error:null}
        default:return state
    }
}