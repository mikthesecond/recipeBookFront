import { RecipeState, RecipeActions,RECIPE_ACTIONS } from "../../types/Recipe";


const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
};

export const recipeReducer = (state = initialState, action: RecipeActions): RecipeState => {
    switch (action.type) {
        case RECIPE_ACTIONS.FETCH_RECIPE:
            return { loading: true, error: null, recipes: [] };
        case RECIPE_ACTIONS.FETCH_RECIPE_ERROR:
            return { loading: false, error: action.payload, recipes: [] };
        case RECIPE_ACTIONS.FETCH_RECIPE_SUCCESS:
            return { loading: false, error: null, recipes: action.payload };
        

        case RECIPE_ACTIONS.FETCH_RECIPE_BY_ID:return { loading:true, error:null,recipes:[]};
        default:
            return state;
    }
};
