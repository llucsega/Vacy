import React from 'react';
import RecipeCard from './RecipeCard';

const Filtros = () => {
  return (
    <section className="mt-2 px-1.5 pb-20">
      {/* Títol Secció */}
      <h2 className="text-[1.8rem] font-bold text-[#884a0d] mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
        Recetas de la comunidad
      </h2>

      {/* Contenidor Filtre */}
      <div className="flex justify-end mb-5 px-1">
        <button className="bg-[#71351f] hover:bg-[#795548] active:scale-95 transition-all px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
          {/* L'icona de l'embut simplificada */}
          <div className="flex flex-col items-center">
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-t-[#f4ece1] border-l-transparent border-r-transparent"></div>
            <div className="w-0.5 h-1 bg-[#f4ece1] -mt-px"></div>
          </div>
          <span className="text-[#f4ece1] text-[0.8rem] font-semibold tracking-wider uppercase" style={{ fontFamily: "'Dancing Script', cursive" }}>
            FILTROS
          </span>
        </button>
      </div>

      {/* Llista de Receptes (Scroll Area) */}
      <div className="flex flex-col">
        <RecipeCard 
          imagen="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400"
          titulo="WWWWWWWWWWWWW"
          descripcion="Fresca, ràpida i plena de nutrients per al dia a dia."
          tiempo="10"
          personas="1"
        />
        <RecipeCard 
          imagen="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"
          titulo="Bowl de Salmó i Arròs"
          descripcion="La recepta estrella per aprofitar el peix de la nevera."
          tiempo="15"
          personas="2"
        />
        <RecipeCard 
          imagen="https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=400"
          titulo="Pasta amb Pesto de Pistatxo"
          descripcion="Un gir italià amb ingredients que segur que tens."
          tiempo="12"
          personas="1"
        />
      </div>

      {/* Placeholder final */}
      <div className="text-center text-gray-400 italic text-sm mt-4">
        Proximamente...
      </div>
    </section>
  );
};

export default Filtros;