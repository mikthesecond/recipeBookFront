export enum RECIPE_ACTIONS {
  FETCH_RECIPE = "FETCH_RECIPE",
  FETCH_RECIPE_ERROR = "FETCH_RECIPE_ERROR",
  FETCH_RECIPE_SUCCESS = "FETCH_RECIPE_SUCCESS",
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


export type RecipeActions =
  | RecipeActionError
  | RecipeActionSuccess
  | RecipeFetchAction

export interface Recipe {
  id?: number | string;
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
