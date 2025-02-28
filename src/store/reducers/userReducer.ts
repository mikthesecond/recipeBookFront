import { UserState, UserActions,USER_ACTIONS } from "../../types/User";


const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const userReducer = (state = initialState, action: UserActions): UserState => {
    switch (action.type) {
        case USER_ACTIONS.ADD_USER:
            return { loading: true, error: null, user: null };
        case USER_ACTIONS.ADD_USER_ERROR:
            return { loading: false, error: action.payload, user: null };
        case USER_ACTIONS.ADD_USER_SUCCESS:
            return { loading: false, error: null, user: action.payload };
        default:
            return state;
    }
};
