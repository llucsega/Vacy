/* 1. Importamos los componentes de navegación */
import { Routes, Route } from 'react-router-dom'; 

import MobileWrapper from './layout_principal/MobileWrapper'; 
import Header from './layout_principal/Header';
import Botones_crear_recetas from './layout_principal/recetas/Botones_crear_recetas';
import Filtros from './layout_principal/recetas/Filtros';
/* Importamos los nuevos componentes que hemos creado */
import RecipeDetail from './layout_principal/recetas/RecipeCard'; 
import './main.css';

function App() {
  return (
    <MobileWrapper>
      {/* Mantenemos el Header fuera de Routes si quieres que aparezca en todas las páginas.
          Si prefieres que en el detalle de receta no salga el Header, muévelo dentro de la ruta de inicio.
      */}
      <Header />
      
      {/* 2. Definimos las rutas (las "estaciones" de nuestra app) */}
      <Routes>
        
        {/* RUTA DE INICIO: Todo lo que tenías antes ahora vive en la URL "/" */}
        <Route path="/" element={
          <main className="flex flex-col px-4">
            <Botones_crear_recetas />
            <Filtros />
          </main>
        } />

        {/* RUTA DE DETALLE: Cuando entres a /recipe/nombre-receta */}
        {/* El ":id" es una variable que usaremos para saber qué receta cargar de la base de datos */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        {/* RUTA DE PERFIL: Un ejemplo de cómo iría escalando */}
        <Route path="/perfil" element={<div className="p-8 text-[#4b3621] font-bold">Pantalla de Perfil (Próximamente)</div>} />

      </Routes>
    </MobileWrapper>
  );
}

export default App;