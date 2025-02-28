import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Minus, ArrowLeft, Save } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { fetchRecipeById, patchRecipe } from '../store/action-creator/recipes';

export function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [recipe, setRecipe] = useState<Recipe>({
    id: '',
    title: '',
    category: 'breakfast',
    rating: 0,
    preptime: '',
    servings: 1,
    image: '',
    chef: '',
    description: '',
  });
  const dispatch = useDispatch<any>()
  const {recipes,loading,error} = useSelector((state:RootState)=>state.recipes)
  const {user} = useSelector((state:RootState)=>state.user)
  useEffect(() => {
    if (user && user.role === "user") {
      navigate("/");
    }
  }, [user, navigate]);


  useEffect(() => {
    if (!id) return;
    dispatch(fetchRecipeById(Number(id)));
  }, [id, dispatch]);
  
  useEffect(() => {
    if (!recipes || recipes.length === 0) return;
  
    const foundRecipe = recipes[0];
    setRecipe(foundRecipe);
  
    if (foundRecipe.ingredients) {
      setIngredients(foundRecipe.ingredients);
    } else {
      setIngredients(['']);
    }
  
    if (foundRecipe.instructions) {
      setInstructions(foundRecipe.instructions);
    } else {
      setInstructions(['']);
    }
  }, [recipes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index: number) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedRecipe = {
      ...recipe,
      ingredients,
      instructions
    };
  dispatch(patchRecipe(updatedRecipe));
  navigate('/admin/recipes');
}

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/admin/recipes')}
          className="inline-flex items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to recipes
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Recipe</h1>

            {error && (
              <div className="mb-6 rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={recipe.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={recipe.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="main course">Main Course</option>
                    <option value="dessert">Dessert</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="seafood">Seafood</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700">
                    Preparation Time
                  </label>
                  <input
                    type="text"
                    id="preptime"
                    name="preptime"
                    required
                    value={recipe.preptime}
                    onChange={handleChange}
                    placeholder="e.g., 30 mins"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="servings" className="block text-sm font-medium text-gray-700">
                    Servings
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    required
                    min="1"
                    value={recipe.servings}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="chef" className="block text-sm font-medium text-gray-700">
                    Chef
                  </label>
                  <input
                    type="text"
                    id="chef"
                    name="chef"
                    required
                    value={recipe.chef}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    required
                    value={recipe.image}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={recipe.description || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredients
                </label>
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Minus size={20} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus size={16} className="mr-2" />
                  Add Ingredient
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions
                </label>
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <textarea
                      value={instruction}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                      rows={2}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Minus size={20} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addInstruction}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus size={16} className="mr-2" />
                  Add Instruction
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}