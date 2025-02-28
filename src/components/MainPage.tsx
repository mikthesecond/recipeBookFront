import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { RecipeList } from "../components/RecipeList";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { fetchRecipes } from "../store/action-creator/recipes";
import { UserPlus } from "lucide-react";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title"); // Состояние для сортировки
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Порядок сортировки
  const { recipes, loading } = useSelector(
    (state: RootState) => state.recipes
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.user);

  const categories = [
    "all",
    "breakfast",
    "main course",
    "dessert",
    "vegetarian",
    "seafood",
  ];

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin/recipes");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // Функция сортировки
  const sortRecipes = (recipes: any[]) => {
    return recipes
      .filter((recipe) =>
        selectedCategory === "all"
          ? true
          : recipe.category === selectedCategory
      )
      .sort((a, b) => {
        if (sortBy === "title") {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        if (sortBy === "rating") {
          return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
        }
        return 0;
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Delicious Recipes</h1>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ChefHat size={20} className="mr-2" />
              Login
            </Link>
            <Link
              to="/registration"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <UserPlus size={20} className="mr-2" />
              Sign up
            </Link>
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Сортировка */}
        <div className="flex items-center mb-6 gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-md border-gray-300"
          >
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white"
          >
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>

        {/* Сортированные и отфильтрованные рецепты */}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <RecipeList recipes={sortRecipes(recipes)} />
        )}
      </div>
    </div>
  );
};

export default MainPage;
