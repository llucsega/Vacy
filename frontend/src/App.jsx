import { useState } from 'react';
import MobileWrapper from './layout_principal/MobileWrapper'; 
import Header from './layout_principal/Header';
import Botones_crear_recetas from './layout_principal/recetas/Botones_crear_recetas';
import Filtros from './layout_principal/recetas/Filtros';
import './Main.css';

function App() {
 
  return(
    <MobileWrapper>
      <Header />
      
      <main className="flex flex-col px-4">
        <Botones_crear_recetas />
        
        <Filtros />
      </main> 
    </MobileWrapper>
  );
}

export default App;