export enum RECIPE_ACTIONS {
  FETCH_RECIPE = "FETCH_RECIPE",
  FETCH_RECIPE_ERROR = "FETCH_RECIPE_ERROR",
  FETCH_RECIPE_SUCCESS = "FETCH_RECIPE_SUCCESS",
  FETCH_RECIPE_BY_ID = "FETCH_RECIPE_BY_ID",
  FETCH_RECIPE_BY_ID_SUCCESS = "FETCH_RECIPE_BY_ID_SUCCESS",
  FETCH_RECIPE_BY_ID_ERROR = "FETCH_RECIPE_BY_ID_ERROR",
}

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

export interface RecipeActionError {
  payload: string;
  type: RECIPE_ACTIONS.FETCH_RECIPE_ERROR;
}

export interface RecipeActionSuccess {
  payload: Recipe[];
  type: RECIPE_ACTIONS.FETCH_RECIPE_SUCCESS;
}

export interface RecipeFetchAction {
  type: RECIPE_ACTIONS.FETCH_RECIPE;
}

export interface RecipeFetchByIdAction {
  type: RECIPE_ACTIONS.FETCH_RECIPE_BY_ID;
}

export type RecipeActions =
  | RecipeActionError
  | RecipeActionSuccess
  | RecipeFetchAction
  | RecipeFetchByIdAction

export interface Recipe {
  id: number | string;
  title: string;
  category: string;
  rating: number;
  preptime: string;
  servings: number;
  image: string;
  chef: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  user_id?: string;
}
