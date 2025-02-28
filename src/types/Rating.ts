export enum RATING_ACTIONS {
    SET_RATING_SUCCESS = 'SET_RATING_SUCCESS',
    SET_RATING_ERROR = 'SET_RATING_ERROR',
    SET_RATING = 'SET_RATING',
}
export interface RatingActionError {
    type: RATING_ACTIONS.SET_RATING_ERROR;
    payload: string;
}

export interface RatingActionSuccess {
    type: RATING_ACTIONS.SET_RATING_SUCCESS;
    payload: Rating;
}

export interface RatingAction {
    type: RATING_ACTIONS.SET_RATING;
}

export type RatingActions = RatingActionError | RatingActionSuccess | RatingAction;

export interface RatingState {
    loading: boolean;
    error: string | null;
    rating: Rating|null;
}

export interface Rating{
    id:number,
    user_id:number,
    rating:number,
    recipe_id:number
}