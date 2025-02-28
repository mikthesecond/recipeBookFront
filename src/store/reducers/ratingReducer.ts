import { RatingState,RatingActions,RATING_ACTIONS } from "../../types/Rating";


const initialState: RatingState = {
    loading: false,
    error: null,
    rating: null,
};

export const ratingReducer = (state = initialState, action: RatingActions): RatingState => {
    switch (action.type) {
        case RATING_ACTIONS.SET_RATING:
            return { loading: true, error: null, rating: null };
        case RATING_ACTIONS.SET_RATING_ERROR:
            return { loading: false, error: action.payload, rating: null };
        case RATING_ACTIONS.SET_RATING_SUCCESS:
            return { loading: false, error: null, rating: action.payload };
        default:
            return state;
    }
};
