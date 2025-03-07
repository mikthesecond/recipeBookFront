import { Routes, Route } from 'react-router-dom';
import { RecipeDetail } from './components/RecipeDetail';
import { Login } from './components/Login';
import { AdminRecipes } from './components/AdminRecipes';
import { CreateRecipe } from './components/CreateRecipe';
import MainPage from './components/MainPage';
import { Register } from './components/Register';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/action-creator/users';
import { EditRecipe } from './components/EditRecipe';
import { SavedRecipes } from './components/SavedRecipes';



function App() {
  const dispatch = useDispatch<any>()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  return(
  <Routes>
          <Route path="/saved-recipes" element={<SavedRecipes />} />
     <Route path="/admin/recipes/edit/:id" element={<EditRecipe />} />
      <Route path='/' element={<MainPage/>}/>
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path='/registration' element={<Register/>}/>
      <Route path="/admin/recipes" element={<AdminRecipes />} />
      <Route path="/admin/recipes/new" element={<CreateRecipe />} />
    </Routes>
  );
}

export default App;