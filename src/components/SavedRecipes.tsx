import  { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bookmark, AlertCircle, Book, LogOut } from 'lucide-react';
import { RecipeList } from './RecipeList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { fetchSaved } from '../store/action-creator/saved';
import { setUser } from '../store/action-creator/users';

export function SavedRecipes() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>()
  const {saved,loading,error} = useSelector((state:RootState)=>state.saved)
  const {user} = useSelector((state:RootState)=>state.user)

  useEffect(() => {
    if (!user) {
      navigate('/login');
    };
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchSaved(user?.id!))
  }, [user]);

  const handleLogout = async () => {
    localStorage.removeItem('user')
    dispatch(setUser(null))
    navigate('/');
  };

  if (!user) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Saved Recipes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hello, {user.email}</span>
            <Link 
              to="/" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to Recipes
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse text-gray-500">Loading your saved recipes...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md flex items-start mb-8">
            <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        ) : saved.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved recipes yet</h3>
            <p className="text-gray-500 mb-6">
              When you save recipes, they'll appear here for easy access.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Recipes
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-8 text-center">
              Here are all the recipes you've saved for later. You can remove items by clicking the unsave button on each recipe.
            </p>
            <RecipeList recipes={saved} />
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Recipe Book. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}