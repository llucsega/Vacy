import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useRef } from 'react';
import { useAuth } from './context/AuthContext'; 
import { ProtectedRoute } from './layout_principal/buscar/ProtectedRoute';

import MobileWrapper from './layout_principal/MobileWrapper'; 
import UsernameModal from './layout_principal/connexion_bd/UsernameModal';
import Header from './layout_principal/Header';
import Botones_crear_recetas from './layout_principal/recetas/Botones_crear_recetas';
import Filtros from './layout_principal/recetas/Filtros';
import Navbar_inferior from './layout_principal/buscar/Navbar_inferior';
import SearchOverlay from './layout_principal/buscar/SearchOverlay';

import './main.css';

function App() {
  const scrollRef = useRef(null); 
  const { session, profile, setProfile, loading } = useAuth();

  if (loading) return null; // Evitem parpellejos mentre carreguem l'usuari

  return (
    <MobileWrapper scrollContainerRef={scrollRef}>
      
      <Routes>
        {/* 1. RUTA D'ONBOARDING (La teva Vacy amb fons desenfocat) */}
        <Route path="/onboarding" element={
          // Si no hi ha sessió (no està loguejat) o si ja té el perfil configurat...
          (!session || (profile && profile.is_setup)) 
            ? <Navigate to="/" replace /> // ...el fem fora cap a la Home
            : (
              <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 grayscale brightness-50 pointer-events-none select-none">
                  <Header />
                  <main className="flex flex-col px-4">
                    <Botones_crear_recetas />
                    <Filtros />
                  </main>
                </div>
                <UsernameModal 
                  profile={profile} 
                  onComplete={() => setProfile({ ...profile, is_setup: true })} 
                />
              </div>
            )
        }/>

        {/* 2. RUTES PROTEGIDES (El "Guàrdia" decideix si entres o vas a /onboarding) */}
        <Route element={<ProtectedRoute />}>
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
          
          <Route path="/buscar" element={<SearchOverlay />}/>
          {/* Afegeix aquí el perfil o qualsevol altra ruta privada */}
        </Route>

        {/* 3. REDIRECT PER DEFECTE */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    
    </MobileWrapper>
  );
}

export default App;