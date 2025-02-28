import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChefHat, Clock, Users, Star, ArrowLeft, Send, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById } from '../store/action-creator/recipes';
import type { RootState } from '../store/reducers';
import { addComment, fetchComments } from '../store/action-creator/comments';
import { fetchRating, setRating } from '../store/action-creator/rating';

export function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const recipeId = id ? Number(id) : null;
  const { recipes, loading } = useSelector((state: RootState) => state.recipes);
  const { comments } = useSelector((state: RootState) => state.comments);
  const {user} = useSelector((state:RootState)=>state.user)
  const { rating } = useSelector((state: RootState) => state.rating);
  const recipe = recipes[0];
  const [rate, setRate] = useState(0)
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (recipeId !== null) {
      dispatch(fetchRecipeById(recipeId));
      dispatch(fetchComments(recipeId));
      if (user) {
        dispatch(fetchRating(recipeId, user.id));
      }
    }
  }, [recipeId, dispatch, user]);
  
  useEffect(() => {
    setRate(Number(rating?.rating || 0));
  }, [rating]);
  
  useEffect(() => {
    setRate(0);
  }, [recipeId]);
  

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

  const handleRating = (rating: number) => {
    if (!user) return;
    dispatch(setRating(Number(recipe.id),rating,user.id)) 
  };
  const handleComment= (e:FormEvent)=>
  {
    e.preventDefault()
    if(user)
    dispatch(addComment(recipeId,newComment,user.id,user.user_name))

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

            <div className="flex items-center mb-4">
  <h3 className="text-xl font-semibold text-gray-900 mr-4">Rate this recipe:</h3>
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={24}
        className={`cursor-pointer transition-colors ${
          (hoverRating || rate) >= star
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => handleRating(star)}
      />
    ))}
    <span className="ml-2 text-sm text-gray-600">
      {rate ? `Your rating: ${rate}` : ''}
    </span>
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

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Comments</h2>

          {user ? (
            <form className="mb-8" onSubmit={handleComment}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} className="mr-2" />
                  Post
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-600 mb-8">
              Please{' '}
              <a href="/admin/login" className="text-indigo-600 hover:text-indigo-500">
                log in
              </a>{' '}
              to leave a comment.
            </p>
          )}

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <User size={24} className="text-gray-400" />
                    <span className="font-medium text-gray-900">{comment.user_name}</span>
                  </div>
                </div>
                <p className="text-gray-600">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
