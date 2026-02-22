import React, { useState } from 'react';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // LISTA DE DATOS (MOCK): Simulamos la base de datos. 
  // Cada elemento es un objeto completo con su propia estructura.
  const mockData = [
    { id: 1, nombre: "Vacy Oficial", tipo: "usuario", avatar: "V" },
    { id: 2, nombre: "Pasta Carbonara", tipo: "receta", icon: "🍝" },
    { id: 3, nombre: "Marc Chef", tipo: "usuario", avatar: "M" },
    { id: 4, nombre: "Pizza Margherita", tipo: "receta", icon: "🍕" },
    { id: 5, nombre: "Ensalada César", tipo: "receta", icon: "🥗" },
    { id: 6, nombre: "Admin Vacy", tipo: "usuario", avatar: "A" },
  ];

  // FILTRADO DINÁMICO: Filtramos el array de objetos según lo que el usuario escribe.
  const filteredResults = mockData.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Si el componente recibe la orden de estar cerrado, devuelve null (no dibuja nada)
  if (!isOpen) return null;

  return (
    /* CONTENEDOR PRINCIPAL: Ocupa toda la pantalla con el color beige de Vacy y una animación suave */
    <div className="absolute inset-0 bg-[#ddc7aa] z-100 flex flex-col animate-in fade-in duration-300">
      
      {/* CABECERA: Barra de búsqueda negra con bordes redondeados (estilo "Nueva Receta") */}
      <div className="flex items-center gap-4 w-[92%] mx-auto my-4 bg-[#2b1c08] p-3 rounded-full shadow-lg">
        {/* Botón para volver atrás y cerrar el overlay */}
        <button 
          onClick={onClose} 
          className="text-white/70 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* CAMPO DE BÚSQUEDA: Escribe aquí. Al cambiar, actualiza el estado 'searchTerm' */}
        <input 
          autoFocus
          type="text"                                 
          placeholder="BUSCAR .  .  ." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder-white/80 text-sm font-bold tracking-widest uppercase"
        />
        
        {/* Icono decorativo de lupa */}
        <div className="text-white/80 pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* CUERPO DE RESULTADOS: Zona con scroll donde se muestran las coincidencias o las tendencias */}
      <div className="flex-1 overflow-y-auto p-6">
        {searchTerm.length > 0 ? (
          /* ESCENARIO A: El usuario está buscando algo */
          <div className="space-y-3">
            {filteredResults.length > 0 ? (
              filteredResults.map(item => (
                /* CARD DE RESULTADO: Muestra la info del objeto filtrado */
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-4 bg-white/40 border border-white/20 rounded-2xl active:scale-[0.98] transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-[#4b3621] flex items-center justify-center font-bold text-white shadow-md">
                    {item.avatar || item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-[#4b3621]">{item.nombre}</p>
                    <p className="text-[10px] text-[#4b3621]/60 font-bold uppercase tracking-widest">+ {item.tipo}</p>
                  </div>
                </div>
              ))
            ) : (
              /* MENSAJE DE "NO HAY RESULTADOS" */
              <div className="text-center mt-10">
                <p className="text-[#4b3621]/60 font-medium italic">Vaya... no hay nada con "{searchTerm}"</p>
              </div>
            )}
          </div>
        ) : (
          /* ESCENARIO B: El buscador está vacío, mostramos sugerencias y frase */
          <div className="space-y-12 mt-4">
            {/* Sección de Tendencias */}
            <div className="text-center">
              <p className="text-[#4b3621]/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Tendencias Vacy</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Pasta', 'Vegan', 'Cenas rápidas', 'Postres'].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => setSearchTerm(tag)} // Truco: al pulsar la tendencia, se escribe en el buscador
                    className="px-5 py-2.5 bg-[#4b3621] text-white text-[10px] font-bold rounded-full uppercase tracking-tighter active:scale-95 transition-transform"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Frase decorativa final integrada en el fondo */}
            <div className="text-center opacity-40 px-10">
              <p className="text-[#4b3621] text-xs italic leading-relaxed font-medium">
                "Cocinar es un arte, buscar la receta perfecta también."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;