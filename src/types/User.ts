export enum USER_ACTIONS {
    ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
    ADD_USER_ERROR = 'ADD_USER_ERROR',
    ADD_USER = 'ADD_USER',
}
export interface UserActionError {
    type: USER_ACTIONS.ADD_USER_ERROR;
    payload: string;
}

export interface UserActionSuccess {
    type: USER_ACTIONS.ADD_USER_SUCCESS;
    payload: User;
}

export interface UserAction {
    type: USER_ACTIONS.ADD_USER;
}

export type UserActions = UserActionError | UserActionSuccess | UserAction;

export interface UserState {
    loading: boolean;
    error: string | null;
    user: User|null;
}


export interface User{
    id:number|null,
    email:string,
    password:string,
    user_name:string,
    role:string
}