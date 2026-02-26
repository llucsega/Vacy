import { Routes, Route } from 'react-router-dom'; 
import { useRef, useState, useEffect } from 'react';
import { supabase } from './layout_principal/connexion_bd/supabaseClient';

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
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  // 1. Escoltem la sessió de Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Funció per portar les dades de la taula 'profiles'
  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
  };
  return (
    <MobileWrapper scrollContainerRef={scrollRef}>
      {session && profile && !profile.is_setup && (
        <UsernameModal 
          profile={profile} 
          onComplete={() => fetchProfile(session.user.id)} 
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