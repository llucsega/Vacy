import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOverlay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const mockData = [
    { id: 1, nombre: "Vacy Oficial", tipo: "usuario", avatar: "V" },
    { id: 2, nombre: "Pasta Carbonara", tipo: "receta", icon: "🍝" },
    { id: 3, nombre: "Marc Chef", tipo: "usuario", avatar: "M" },
    { id: 4, nombre: "Pizza Margherita", tipo: "receta", icon: "🍕" },
    { id: 5, nombre: "Ensalada César", tipo: "receta", icon: "🥗" },
    { id: 6, nombre: "Admin Vacy", tipo: "usuario", avatar: "A" },
  ];

  const filteredResults = mockData.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    /* CANVI CLAU: Hem posat 'absolute inset-0' però assegura't que el pare tingui 'relative' */
    /* Afegim 'overflow-hidden' per garantir que res surti dels marges arrodonits del mòbil */
    <div className="absolute inset-0 bg-[#f4ece1] z-100 flex flex-col animate-in fade-in duration-300 overflow-hidden">
      
      {/* CAPÇALERA: Utilitzem gap-2 en comptes de 3 per estalviar espai horitzontal */}
      <div className="flex items-center gap-2 w-[94%] mx-4.5 my-6">
        
        {/* 1. BOTÓ TORNAR */}
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 bg-[#5b3f1a] rounded-full flex items-center justify-center shadow-lg text-white/90 active:scale-90 transition-transform shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 2. LA BARRA DE BUSCAR */}
        {/* 'min-w-0' al pare i a l'input evita que el contingut empenyi la barra fora de la pantalla */}
        <div className="flex-1 min-w-0 bg-[#5b3f1a] p-3 px-4 rounded-full shadow-lg flex items-center gap-2 overflow-hidden">
          
          <div className="text-white/50 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input 
            autoFocus
            type="text"                                 
            placeholder="Buscar . . ." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            /* 'min-w-0' aquí és vital per a que no desbordi en aparèixer la X */
            className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder-white/70 text-base font-medium tracking-wide"
          />

          {searchTerm.length > 0 && (
            <button 
              onClick={() => setSearchTerm("")}
              className="text-white/60 hover:text-white transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* 3. ESPAI EQUILIBRADOR: Eliminat o reduït per donar aire a la barra si el mòbil és estret */}
        <div className="w-2 shrink-0"></div>
      </div>

      {/* COS DE LA PÀGINA */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        {searchTerm.length > 0 ? (
          <div className="space-y-3 pb-10">
            {filteredResults.map(item => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 p-4 bg-white/40 border border-[#5b3f1a]/5 rounded-2xl active:scale-[0.98] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#5b3f1a] flex items-center justify-center font-bold text-[#f4ece1] shadow-md shrink-0">
                  {item.avatar || item.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#5b3f1a] truncate">{item.nombre}</p>
                  <p className="text-[10px] text-[#5b3f1a]/50 font-bold uppercase tracking-widest">+ {item.tipo}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center px-10 pb-20">
            <p className="text-[#5b3f1a] text-sm italic leading-relaxed font-medium opacity-40 text-center">
              "Cocinar es un arte, buscar la receta perfecta también."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;