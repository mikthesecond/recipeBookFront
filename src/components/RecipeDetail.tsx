import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChefHat, Clock, Users, Star, ArrowLeft, Edit, Send } from 'lucide-react';
import type { Recipe } from '../types/Recipe';
import type { Comment } from '../types/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById } from '../store/action-creator/recipes';
import type { RootState } from '../store/reducers';

export function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const recipeId = id ? Number(id) : null;
  const { recipes, error, loading } = useSelector((state: RootState) => state.recipes);
  const recipe = recipes[0]

  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<any>(null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (recipeId !== null) {
      dispatch(fetchRecipeById(recipeId));
    }
  }, [recipeId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h2>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to recipes
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-72 object-cover" />
          
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>

            <div className="flex items-center gap-6 mb-6 text-gray-600">
              <div className="flex items-center">
                <ChefHat size={20} className="mr-2" />
                <span>{recipe.chef}</span>
              </div>
              <div className="flex items-center">
                <Clock size={20} className="mr-2" />
                <span>{recipe.preptime}</span>
              </div>
              <div className="flex items-center">
                <Users size={20} className="mr-2" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>

            <p className="text-gray-600 mb-8">{recipe.description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions?.map((instruction, index) => (
                    <li key={index} className="flex text-gray-600">
                      <span className="font-bold mr-3">{index + 1}.</span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
