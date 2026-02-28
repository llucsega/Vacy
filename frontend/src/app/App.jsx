import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useRef } from 'react';
import { useAuth } from '../infraestructura/autenticacion/ContextoAutenticacion'; 
import { ProtectedRoute } from '../layouts/navegacion/RutaProtegida';

import MainLayout from '../layouts/main/LayoutPrincipal';

import MobileWrapper from '../componentes/movil/ContenedorMovil'; 
import UsernameModal from '../componentes/onboarding/ModalUsuario';
import Header from '../componentes/cabecera/Cabecera';
import Botones_crear_recetas from '../componentes/botones/CrearRecetas';
import Filtros from '../componentes/filtros/Filtros';
import SearchOverlay from '../componentes/buscar/OverlayBusqueda';

import '../estilos/global.css';

function App() {
  const scrollRef = useRef(null); 
  const { session, profile, setProfile, loading } = useAuth();

  if (loading) {
    return (
      <MobileWrapper>
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#f5f0e8] p-6 text-center">
          {/* Un spinner discret i elegant */}
          <div className="w-10 h-10 border-4 border-[#3a2d22]/20 border-t-[#3a2d22] rounded-full animate-spin mb-4"></div>
          <span className="text-[#3a2d22] font-black text-lg animate-pulse tracking-tight">
            Cargando Vacy...
          </span>
        </div>
      </MobileWrapper>
    );
  }

  return (
    <MobileWrapper scrollContainerRef={scrollRef}>
      
      <Routes>
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

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout scrollRef={scrollRef} />}>
            
            <Route path="/" element={
              <main className="flex flex-col px-4">
                <Botones_crear_recetas />
                <Filtros />
              </main>
            }/>
            
            <Route path="/buscar" element={<SearchOverlay />}/>
            
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    
    </MobileWrapper>
  );
}

export default App;