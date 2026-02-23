import { Routes, Route } from 'react-router-dom'; 
import { useRef } from 'react';

import MobileWrapper from './layout_principal/MobileWrapper'; 
import Header from './layout_principal/Header';
import Botones_crear_recetas from './layout_principal/recetas/Botones_crear_recetas';
import Filtros from './layout_principal/recetas/Filtros';
import Navbar_inferior from './layout_principal/buscar/Navbar_inferior';
import SearchOverlay from './layout_principal/buscar/SearchOverlay';

import './main.css';

function App() {
  const scrollRef = useRef(null); 
  return (
    <MobileWrapper scrollContainerRef={scrollRef}>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main className="flex flex-col px-4">
              <Botones_crear_recetas />
              <Filtros />
            </main>
            <Navbar_inferior scrollContainerRef={scrollRef} />
          </>
        }/>

        <Route path="/buscar" element={
          <>
            <SearchOverlay />
          </>
        }/>
      </Routes>
    
    </MobileWrapper>
  );
}

export default App;