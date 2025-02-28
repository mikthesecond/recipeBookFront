import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut } from 'lucide-react';
import { RecipeList } from './RecipeList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { fetchRecipes } from '../store/action-creator/recipes';

export function AdminRecipes() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>()
  const {recipes,loading,error} = useSelector((state:RootState)=>state.recipes)
  const {user} = useSelector((state:RootState)=>state.user)


  useEffect(() => {
    if (user && user.role === "user"||!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
  dispatch(fetchRecipes())
  }, []);

  const handleLogout = async () => {
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/recipes/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus size={20} className="mr-2" />
              New Recipe
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
}