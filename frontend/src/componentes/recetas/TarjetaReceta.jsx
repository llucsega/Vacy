import React, { useState } from 'react';

const RecipeCard = ({ recipe }) => {
  // Interacció local (per MVP)
  const [isLiked, setIsLiked] = useState(recipe.userInteractions?.isLiked || false);
  const [likesCount, setLikesCount] = useState(recipe.stats?.likes || 0);
  const [isFavorited, setIsFavorited] = useState(recipe.userInteractions?.isFavorited || false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => prev + (isLiked ? -1 : 1));
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-white rounded-[25px] overflow-hidden shadow-md mb-6 border border-gray-100 mx-1">
      
      {/* IMATGE O PLACEHOLDER */}
      <div 
        className="h-48 bg-cover bg-center flex items-center justify-center text-[#5b3f1a] font-bold text-lg"
        style={{ 
          backgroundImage: recipe.image ? `url(${recipe.image})` : 'none',
          backgroundColor: recipe.image ? 'transparent' : '#f0e6db'
        }}
      >
        {!recipe.image && 'Vacy 🧑‍🍳'}
      </div>

      {/* DETALLS */}
      <div className="p-5 flex flex-col gap-2">
        {/* TÍTOL */}
        <h3 className="text-[#4b3621] font-bold text-xl truncate">
          {recipe.title}
        </h3>

        {/* DESCRIPCIÓ */}
        {recipe.description && (
          <p className="text-gray-500 text-sm leading-snug truncate">
            {recipe.description}
          </p>
        )}

        {/* META INFO: temps, persones, bandera */}
        <div className="flex items-center gap-3 text-[#4b3621] font-medium text-xs">
          <span className="flex items-center gap-1">⏱ {recipe.cookingTime} min</span>
          <span className="flex items-center gap-1">👥 {recipe.servings}</span>
          {recipe.originCountry && (
            <span className="flex items-center gap-1">{recipe.originCountry.toUpperCase()}</span>
          )}
        </div>

        {/* AUTOR */}
        <p className="text-[#5b3f1a]/80 text-xs">by @{recipe.author.username}</p>

        {/* BARRA INTERACCIÓ */}
        <div className="flex justify-between items-center mt-3 border-t border-gray-200 pt-2">
          {/* LIKE */}
          <button 
            onClick={toggleLike}
            className={`flex items-center gap-1 text-sm ${isLiked ? 'text-red-500 font-bold' : 'text-gray-400'}`}
          >
            ❤️ {likesCount}
          </button>

          {/* COMMENTS */}
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            💬 {recipe.stats?.comments || 0}
          </div>

          {/* FAVORITE */}
          <button 
            onClick={toggleFavorite}
            className={`flex items-center gap-1 text-sm ${isFavorited ? 'text-yellow-500 font-bold' : 'text-gray-400'}`}
          >
            🔖
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;