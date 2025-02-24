import { Routes, Route } from 'react-router-dom';
import { RecipeDetail } from './components/RecipeDetail';
import { AdminLogin } from './components/AdminLogin';
import { AdminRecipes } from './components/AdminRecipes';
import { CreateRecipe } from './components/CreateRecipe';
import MainPage from './components/MainPage';



function App() {
  return(
  <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/recipes" element={<AdminRecipes />} />
      <Route path="/admin/recipes/new" element={<CreateRecipe />} />
    </Routes>
  );
}

export default App;