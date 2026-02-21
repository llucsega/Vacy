import React from 'react';

const MobileWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#5a5555] flex justify-center items-center p-4">
      
      {/* EL MÓVIL (Marc fix) */}
      <div className="w-92.5 h-200 bg-[#f4ece1] border-12 border-[#333] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.3)] overflow-hidden relative">
        
        {/* EL CONTENIDO QUE SE MUEVE (Scroll) */}
        {/* Hem posat un ID per trobar-lo fàcilment */}
        <div 
          id="contenedor-scroll-vacy"
          className="h-full overflow-y-auto scrollbar-none scroll-smooth flex flex-col"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
         >
          {/* Children és tot el que hi ha a App.jsx */}
          <div className="pb-32"> 
            {children}
          </div>
        </div>

        {/* NAVBAR INFERIOR (Estil Glassmorphism) */}
        <div className="absolute bottom-6 left-6 right-6 h-13 bg-[#4b3621]/50 backdrop-blur-sm rounded-[30px] flex justify-around items-center z-50 shadow-2xl px-2 border border-white/10">
          
          {/* 1. XAT (Esquerra) */}
          <div className="cursor-pointer hover:scale-110 transition-transform p-2">
            <div className="w-6 h-4.5 bg-[#f4ece1] rounded-[15px] relative">
              <div 
                className="absolute -bottom-1 left-2 w-2 h-2 bg-[#f4ece1] rotate-45"
                style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
              ></div>
            </div>
          </div>

          {/* 2. NOTIFICACIONS (Campana més estilitzada) */}
          <div className="cursor-pointer hover:scale-110 transition-transform relative p-2 flex flex-col items-center mt-1.5">
            {/* El cos de la campana amb cintura (fent servir rounded i marges) */}
            <div className="w-4 h-3.5 bg-[#f4ece1] rounded-t-full relative">
              {/* El pic de la campana (la boleta de dalt) */}
              <div className="absolute -top-0.75 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#f4ece1] rounded-full"></div>
            </div>
            {/* La base de la campana (la part que sobresurt) */}
            <div className="w-5 h-1.25 bg-[#f4ece1] rounded-full -mt-0.5"></div>
            {/* El batall (la boleta de sota) */}
            <div className="w-1.5 h-1 bg-[#f4ece1] rounded-b-full mx-auto mt-px"></div>
          </div>

          {/* 3. PERFIL (Cap i espatlles) */}
          <div className="cursor-pointer hover:scale-110 transition-transform flex flex-col items-center p-2 mt-0.5">
            <div className="w-3 h-3 bg-[#f4ece1] rounded-full mb-0.5"></div>
            <div className="w-5.5 h-2.25 bg-[#f4ece1] rounded-t-full"></div>
          </div>

          {/* 4. CASA (Dreta - Torna a dalt) */}
          <div 
            className="cursor-pointer hover:scale-110 transition-transform p-2"
            onClick={() => {
              const container = document.getElementById('contenedor-scroll-vacy');
              if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
            }}
           >
            <div className="relative w-7 h-7 flex flex-col items-center justify-end">
    
              {/* TEULAT ARRODONIT (Un quadrat girat 45 graus amb cantonades suaus) */}
              <div className="absolute top-1.5 w-4.5 h-4.5 bg-[#f4ece1] rotate-45 rounded-[3px] left-1/2 -translate-x-1/2"></div>

              {/* COS DE LA CASA (Rectangle de base) */}
              <div className="w-5 h-3 bg-[#f4ece1] rounded-xs relative flex justify-center items-end overflow-hidden mb-px">
                
                {/* PORTA RODONETA (Arc de mig punt) */}
                <div className="w-1.75 h-2.75 bg-[#4b3621]/50 rounded-t-full -mb-px"></div>
                
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MobileWrapper;