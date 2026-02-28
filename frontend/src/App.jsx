import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useRef } from 'react';
import { useAuth } from './context/AuthContext'; 
import { ProtectedRoute } from './layout_principal/buscar/ProtectedRoute';

// 1. Importem el nou Layout
import MainLayout from './layout_principal/MainLayout';

import MobileWrapper from './layout_principal/MobileWrapper'; 
import UsernameModal from './layout_principal/connexion_bd/UsernameModal';
import Header from './layout_principal/Header';
import Botones_crear_recetas from './layout_principal/recetas/Botones_crear_recetas';
import Filtros from './layout_principal/recetas/Filtros';
import SearchOverlay from './layout_principal/buscar/SearchOverlay';

import './main.css';

function App() {
  const scrollRef = useRef(null); 
  const { session, profile, setProfile, loading } = useAuth();

  if (loading) return null;

  return (
    <MobileWrapper scrollContainerRef={scrollRef}>
      
      <Routes>
        {/* RUTA D'ONBOARDING: Es queda fora del Layout perquè el disseny és especial */}
        <Route path="/onboarding" element={
          (!session || (profile && profile.is_setup)) 
            ? <Navigate to="/" replace /> 
            : (
              <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 brightness-75 pointer-events-none select-none">
                  <Header />
                  <main className="flex flex-col px-4">
                    <Botones_crear_recetas />
                    <Filtros />
                  </main>
                </div>
                <UsernameModal 
                  profile={profile} 
                  onComplete={(newUsername) => setProfile({ ...profile, username: newUsername, is_setup: true })} 
                />
              </div>
            )
        }/>

        {/* RUTES PROTEGIDES + LAYOUT COMÚ */}
        <Route element={<ProtectedRoute />}>
          {/* Envoltem les rutes privades amb el MainLayout */}
          <Route element={<MainLayout scrollRef={scrollRef} />}>
            
            {/* HOME: Ara només conté el seu contingut real */}
            <Route path="/" element={
              <main className="flex flex-col px-4">
                <Botones_crear_recetas />
                <Filtros />
              </main>
            }/>
            
            {/* BUSCAR: També hereta Header i Navbar automàticament */}
            <Route path="/buscar" element={<SearchOverlay />}/>
            
            {/* Qualsevol ruta nova que vagi aquí dins ja tindrà l'estructura feta */}

          </Route>
        </Route>

        {/* REDIRECT PER DEFECTE */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    
    </MobileWrapper>
  );
}

export default App;