import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChefHat, Clock, Users } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface RecipeListProps {
  recipes: Recipe[];
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}</span>
    </div>
  );
};

export function RecipeList({ recipes: recipes }: RecipeListProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          onClick={() => navigate(`/recipe/${recipe.id}`)}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-indigo-600">
                {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
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
      ))}
    </div>
  );
}