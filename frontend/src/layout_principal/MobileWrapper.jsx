import React, { useRef } from 'react'; // Importación de React y el Hook useRef para manejar referencias del DOM

const MobileWrapper = ({ children }) => {
  // Creamos una referencia llamada 'scrollContainerRef' para engancharla al contenedor del scroll
  // Esto nos permite controlar el scroll sin usar IDs de HTML
  const scrollContainerRef = useRef(null);

  return (
    /* CONTENEDOR PRINCIPAL: Centra el móvil en la pantalla y aplica el fondo gris */
    <div className="min-h-screen bg-[#5a5555] flex justify-center items-center p-4">
      
      {/* MARCO DEL MÓVIL: Define el tamaño fijo, bordes redondeados y sombra decorativa */}
      <div className="w-92.5 h-200 bg-[#f4ece1] border-12 border-[#333] rounded-[40px] shadow-[0px_20px_40px_rgba(0,0,0,0.3)] overflow-hidden relative">
        
        {/* ÁREA DE CONTENIDO (SCROLLABLE): Aquí es donde ocurre el scroll de la App */}
        <div 
          ref={scrollContainerRef} // Conectamos la referencia aquí para poder manipular este div después
          className="h-full overflow-y-auto scrollbar-none scroll-smooth flex flex-col"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
         >
          {/* Espaciado inferior para que el contenido no quede tapado por la Navbar */}
          <div className="pb-2"> 
            {children} {/* Aquí se renderiza todo el contenido de la aplicación */}
          </div>
        </div>

        {/* BARRA DE NAVEGACIÓN INFERIOR (NAVBAR): Estilo cristal (Glassmorphism) y posición fija */}
        <div className="absolute bottom-6 left-6 right-6 h-13 bg-[#4b3621]/50 backdrop-blur-sm rounded-[30px] flex justify-around items-center z-50 shadow-2xl px-2 border border-white/10">
          
          {/* BOTÓN 1: CHAT / MENSAJES */}
          <div className="cursor-pointer hover:scale-110 transition-transform p-2">
            <div className="w-6 h-4.5 bg-[#f4ece1] rounded-[15px] relative">
              <div 
                className="absolute -bottom-1 left-2 w-2 h-2 bg-[#f4ece1] rotate-45"
                style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
              ></div>
            </div>
          </div>

          {/* BOTÓN 2: NOTIFICACIONES (Diseño de campana estilitzada) */}
          <div className="cursor-pointer hover:scale-110 transition-transform relative p-2 flex flex-col items-center mt-1.5">
            <div className="w-4 h-3.5 bg-[#f4ece1] rounded-t-full relative">
              <div className="absolute -top-0.75 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#f4ece1] rounded-full"></div>
            </div>
            <div className="w-5 h-1.25 bg-[#f4ece1] rounded-full -mt-0.5"></div>
            <div className="w-1.5 h-1 bg-[#f4ece1] rounded-b-full mx-auto mt-px"></div>
          </div>

          {/* BOTÓN 3: PERFIL DE USUARIO (Icono de busto) */}
          <div className="cursor-pointer hover:scale-110 transition-transform flex flex-col items-center p-2 mt-0.5">
            <div className="w-3 h-3 bg-[#f4ece1] rounded-full mb-0.5"></div>
            <div className="w-5.5 h-2.25 bg-[#f4ece1] rounded-t-full"></div>
          </div>

          {/* BOTÓN 4: INICIO / HOME (Función de volver arriba) */}
          <div 
            className="cursor-pointer hover:scale-110 transition-transform p-2"
            onClick={() => {
              // Si existe la referencia del contenedor, hacemos scroll suave hacia arriba (top: 0)
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
           >
            <div className="relative w-7 h-7 flex flex-col items-center justify-end">
              {/* Tejado de la casa */}
              <div className="absolute top-1.5 w-4.5 h-4.5 bg-[#f4ece1] rotate-45 rounded-[3px] left-1/2 -translate-x-1/2"></div>
              {/* Estructura y puerta de la casa */}
              <div className="w-5 h-3 bg-[#f4ece1] rounded-xs relative flex justify-center  items-end overflow-hidden mb-px">
                <div className="w-1.75 h-2.75 bg-[#4b3621]/50 rounded-t-full -mb-px -ml-px"></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MobileWrapper;