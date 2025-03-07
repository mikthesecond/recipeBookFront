import { Recipe } from "./Recipe";

export enum SAVED_ACTIONS {
    FETCH_SAVED = "FETCH_SAVED",
    FETCH_SAVED_ERROR = "FETCH_SAVED_ERROR",
    FETCH_SAVED_SUCCESS = "FETCH_SAVED_SUCCESS",
  }
  
  export interface SavedState {
    saved: Recipe[];
    loading: boolean;
    error: string | null;
  }
  
  export interface SavedActionError {
    payload: string;
    type: SAVED_ACTIONS.FETCH_SAVED_ERROR;
  }
  
  export interface SavedActionSuccess {
    payload: Recipe[];
    type: SAVED_ACTIONS.FETCH_SAVED_SUCCESS;
  }
  
  export interface SavedFetchAction {
    type: SAVED_ACTIONS.FETCH_SAVED;
  }
  
  
  export type SavedActions =
    | SavedActionError
    | SavedActionSuccess
    | SavedFetchAction
  

  