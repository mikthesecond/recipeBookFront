export enum COMMENTS_ACTIONS {
  FETCH_COMMENTS = "FETCH_COMMENTS",
  FETCH_COMMENTS_ERROR = "FETCH_COMMENTS_ERROR",
  FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS",
}


export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export interface CommentsActionError {
  payload: string;
  type: COMMENTS_ACTIONS.FETCH_COMMENTS_ERROR;
}

export interface CommentsActionSuccess {
  payload: Comment[];
  type: COMMENTS_ACTIONS.FETCH_COMMENTS_SUCCESS;
}

export interface CommentsFetchAction {
  type: COMMENTS_ACTIONS.FETCH_COMMENTS;
}

export type CommentsActions = CommentsActionError | CommentsActionSuccess | CommentsFetchAction;

export interface Comment {
    id: number;
    recipe_id: number;
    username: string;
    comment: string;
  }