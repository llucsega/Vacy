const MobileWrapper = ({ children, scrollContainerRef }) => {
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
      </div>
    </div>
  );
};

export default MobileWrapper;