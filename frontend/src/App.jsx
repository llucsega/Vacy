import { Routes, Route } from 'react-router-dom'; 

import MobileWrapper from './layout_principal/MobileWrapper'; 
import Header from './layout_principal/Header';
import Botones_crear_recetas from './layout_principal/recetas/Botones_crear_recetas';
import Filtros from './layout_principal/recetas/Filtros';

import './main.css';

function App() {
  return (
    <MobileWrapper>
      {/* El Header sempre visible */}
      <Header />
      
      <Routes>
        {/* L'única ruta que existeix de veritat ara mateix */}
        <Route path="/" element={
          <main className="flex flex-col px-4">
            <Botones_crear_recetas />
            <Filtros />
          </main>
        } />
      </Routes>
    </MobileWrapper>
  );
}

export default App;