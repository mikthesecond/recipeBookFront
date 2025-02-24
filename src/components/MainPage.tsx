import { useState, useEffect } from 'react';
import { ChefHat } from 'lucide-react';
import { RecipeList } from '../components/RecipeList';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { fetchRecipes } from '../store/action-creator/recipes';

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const {recipes,error,loading} = useSelector((state:RootState)=>state.recipes)
  const dispatch = useDispatch<any>()

  const categories = ['all', 'breakfast', 'main course', 'dessert', 'vegetarian', 'seafood'];

  useEffect(() => {
  dispatch(fetchRecipes())
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Delicious Recipes</h1>
            <Link
              to="/admin/login"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ChefHat size={20} className="mr-2" />
              Admin Login
            </Link>
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {loading
        ?(
          <h1>Loading...</h1>
          ):(
          <RecipeList recipes={recipes}/>
          )}
           
      </div>
    </div>
  );
};

export default MainPage;
