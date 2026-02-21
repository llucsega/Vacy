import React from 'react';

const RecipeCard = ({ imagen, titulo, descripcion, tiempo, personas }) => {
  return (
    <div className="bg-white rounded-[25px] overflow-hidden shadow-md mb-6 border border-gray-100 mx-1">
      {/* Imatge de la recepta */}
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${imagen})` }}
      ></div>

      {/* Detalls */}
      <div className="p-5">
        <h3 className="text-[#4b3621] font-bold text-xl mb-1 uppercase tracking-tight">
          {titulo}
        </h3>
        <p className="text-gray-500 text-sm leading-snug mb-4">
          {descripcion}
        </p>

        {/* Meta info */}
        <div className="flex gap-4 items-center text-[#4b3621] font-medium text-xs">
          <span className="flex items-center gap-1">⏱️ {tiempo} min</span>
          <span className="flex items-center gap-1">👥 {personas} pers</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;