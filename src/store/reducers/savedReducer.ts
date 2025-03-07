import { SavedState,SavedActions,SAVED_ACTIONS } from "../../types/Saved";


const initialState: SavedState = {
    saved: [],
    loading: false,
    error: null,
};

export const SavedReducer = (state = initialState, action: SavedActions): SavedState => {
    switch (action.type) {
        case SAVED_ACTIONS.FETCH_SAVED:
            return { loading: true, error: null, saved: [] };
        case SAVED_ACTIONS.FETCH_SAVED_ERROR:
            return { loading: false, error: action.payload, saved: [] };
        case SAVED_ACTIONS.FETCH_SAVED_SUCCESS:
            return { loading: false, error: null, saved: action.payload };
        default:
            return state;
    }
};
