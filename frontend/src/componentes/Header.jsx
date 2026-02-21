import React, { useState } from 'react';

const Header = () => {
  // Canvia a true per veure l'esfera de perfil, false per veure "Acceder"
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="w-full px-6 pt-6 pb-2 flex items-center gap-3">
      
      {/* 1. LOGO VACY */}
      <div 
        className="text-3xl font-bold text-[#834b13]" 
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        VACY
      </div>

      {/* 2. BUSCADOR */}
      <div className="flex-1 relative -right-2">
        <input 
          type="text" 
          placeholder="Buscar..." 
          className="w-full bg-[#dabda0]/60 shadow-inner border-none rounded-full py-1.5 px-4 text-sm focus:outline-none placeholder-[#4b3621]/40 text-[#4b3621]"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* 3. ACCIÓ DRETA (Condicional) */}
      <div className="flex items-center justify-end min-w-16.25">
        {isLoggedIn ? (
          /* ESFERA DE PERFIL */
          <div 
            className="w-12 h-12 rounded-full bg-[#834b13]/20 border-2 border-[#834b13]/30 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden"
            onClick={() => setIsLoggedIn(false)}
          >
            {/* Lletra inicial o pots posar una <img src="..." /> aquí */}
            <span className="text-[#834b13] font-bold text-xs">U</span>
          </div>
        ) : (
          /* BOTÓ ACCEDER */
          <button 
            className="text-[#4b3621] font-semibold text-sm hover:opacity-70 transition-opacity whitespace-nowrap"
            onClick={() => setIsLoggedIn(true)}
          >
            Acceder
          </button>
        )}
      </div>

    </header>
  );
};

export default Header;