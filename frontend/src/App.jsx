import { Routes, Route } from 'react-router-dom'; 
import { useRef } from 'react';
import { useAuth } from './context/AuthContext'; 

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
  
  // Recuperem la info de l'AuthContext. 
  const { session, profile, setProfile } = useAuth();

  return (
    <MobileWrapper scrollContainerRef={scrollRef}>
      
      {/* 3. El modal només surt si hi ha sessió però no està configurat */}
      {session && profile && !profile.is_setup && (
        <UsernameModal 
          profile={profile} 
          // Quan acabi, actualitzem el perfil al context
          onComplete={() => {
            // Aquesta petita funció actualitza el "profile" global
            // perquè el modal desaparegui a l'instant.
            setProfile({ ...profile, is_setup: true });
          }} 
        />
      )}

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

        <Route path="/buscar" element={<SearchOverlay />}/>
      </Routes>
    
    </MobileWrapper>
  );
}

export default App;