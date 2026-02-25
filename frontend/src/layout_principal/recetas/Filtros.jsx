import React from 'react';
import RecipeCard from './RecipeCard';

const Filtros = () => {
  // MOCKDATA AMB ESTRUCTURA RECOMANADA
  const recipes = [
    {
      id: "1",
      title: "Pasta Carbonara",
      description: "Clàssica recepta italiana amb toc modern",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400",
      cookingTime: 20,
      servings: 2,
      originCountry: "IT",
      author: { username: "MarcChef" },
      stats: { likes: 124, comments: 18 },
      userInteractions: { isLiked: false, isFavorited: false }
    },
    {
      id: "2",
      title: "Bowl de Salmó i Arròs",
      description: "Receta fresca i ràpida, aprofitant ingredients",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400",
      cookingTime: 15,
      servings: 2,
      originCountry: null,
      author: { username: "ChefAnna" },
      stats: { likes: 87, comments: 12 },
      userInteractions: { isLiked: true, isFavorited: false }
    },
    {
      id: "3",
      title: "Pasta amb Pesto de Pistatxo",
      description: "Un gir italià amb ingredients que segur que tens",
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=400",
      cookingTime: 12,
      servings: 1,
      originCountry: "IT",
      author: { username: "LuigiChef" },
      stats: { likes: 56, comments: 5 },
      userInteractions: { isLiked: false, isFavorited: true }
    }
  ];

  return (
    <section className="mt-2 px-1.5 pb-20">
      {/* Títol Secció */}
      <h2 className="text-[1.8rem] font-bold text-[#884a0d] mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
        Recetas de la comunidad
      </h2>

      {/* Contenidor filtres (poc canvi per MVP) */}
      <div className="flex justify-end mb-5 px-1">
        <button className="bg-[#71351f] hover:bg-[#795548] active:scale-95 transition-all px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
          <span className="text-[#f4ece1] text-[0.8rem] font-semibold tracking-wider uppercase" style={{ fontFamily: "'Dancing Script', cursive" }}>
            FILTROS
          </span>
        </button>
      </div>

      {/* FEED DINÀMIC */}
      <div className="flex flex-col">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Placeholder final */}
      <div className="text-center text-gray-400 italic text-sm mt-4">
        Proximamente...
      </div>
    </section>
  );
};

export default Filtros;