import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Star,
  ChefHat,
  Clock,
  Users,
  Edit,
  Trash2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { Recipe } from "../types/Recipe";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { deleteRecipe } from "../store/action-creator/recipes";
import { addSaved } from "../store/action-creator/saved";

interface RecipeListProps {
  recipes: Recipe[];
  saved?: Recipe[];
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}</span>
    </div>
  );
};

export function RecipeList({ recipes, saved=[] }: RecipeListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteRecipe(id));
  };

  const handleToggleSave = async (
    e: React.MouseEvent,
    recipe_id: string | number
  ) => {
    e.stopPropagation()
    if (!user?.id) return;
    dispatch(addSaved(user.id, recipe_id));
    console.log(saved)
  };

  const handleEdit = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/admin/recipes/edit/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => {
       const isSaved = saved?.some((item) => item.id === recipe.id);
        return (
          <div
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            {user?.role === "admin" && (
              <div className="absolute top-2 right-2 flex space-x-2 z-10">
                <button
                  onClick={(e) => handleEdit(e, String(recipe.id))}
                  className="p-2 bg-white rounded-full shadow-md text-indigo-600 hover:text-indigo-800 transition-colors"
                  title="Edit recipe"
                >
                  <Edit size={16} />
                </button>
                {deleteConfirm === String(recipe.id) ? (
                  <div className="flex items-center space-x-1 bg-white rounded-full shadow-md px-2">
                    <button
                      onClick={(e) => handleDelete(String(recipe.id), e)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Confirm delete"
                    >
                      Yes
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(null);
                      }}
                      className="text-gray-600 hover:text-gray-800 p-1"
                      title="Cancel"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(String(recipe.id));
                    }}
                    className="p-2 bg-white rounded-full shadow-md text-red-600 hover:text-red-800 transition-colors"
                    title="Delete recipe"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            )}

{user && (
  <button
    onClick={(e) => {
      handleToggleSave(e, recipe.id!);
    }}
    className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
    title={isSaved ? "Unsave recipe" : "Save recipe"}
  >
    {isSaved ? (
      <BookmarkCheck size={16} className="text-indigo-600" />
    ) : (
      <Bookmark size={16} className="text-gray-600" />
    )}
  </button>
)}


            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-indigo-600">
                  {recipe.category.charAt(0).toUpperCase() +
                    recipe.category.slice(1)}
                </span>
                <StarRating rating={recipe.rating} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <ChefHat size={16} className="mr-1" />
                  <span className="text-sm">{recipe.chef}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{recipe.preptime}</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span className="text-sm">{recipe.servings} servings</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
