import React from 'react';
import { Link } from 'react-router-dom';

// Passem scrollContainerRef com a prop perquè el botó de la casa sàpiga on fer scroll
const Navbar_inferior = ({ scrollContainerRef }) => {
  
  return (
    <div className="absolute bottom-6 left-25 right-25 h-13 bg-[#4b3621]/50 backdrop-blur-sm rounded-[30px] flex justify-around items-center z-50 shadow-2xl px-2 border border-white/10">

      {/* BOTÓN 1: PERFIL */}
      <Link 
        to="/perfil" 
        className="cursor-pointer hover:scale-110 transition-transform flex flex-col items-center p-2 mt-0.5"
      >
        <div className="w-3 h-3 bg-[#f4ece1] rounded-full mb-0.5"></div>
        <div className="w-5.5 h-2.25 bg-[#f4ece1] rounded-t-full"></div>
      </Link>

      {/* BOTÓN 2: INICIO */}
      <Link 
        to="/" 
        className="cursor-pointer hover:scale-110 transition-transform p-2"
        onClick={() => {
          // Si ens han passat la referència i existeix, pugem a dalt
          if (scrollContainerRef && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <div className="relative w-7 h-7 flex flex-col items-center justify-end">
          <div className="absolute top-1.5 w-4.5 h-4.5 bg-[#f4ece1] rotate-45 rounded-[3px] left-1/2 -translate-x-1/2"></div>
          <div className="w-5 h-3 bg-[#f4ece1] rounded-xs relative flex justify-center items-end overflow-hidden mb-px">
            <div className="w-1.75 h-2.75 bg-[#4b3621]/50 rounded-t-full -mb-px -ml-px"></div>
          </div>
        </div>
      </Link>

    </div>
  );
};

export default Navbar_inferior; // Importantíssim per poder-lo importar a l'App!