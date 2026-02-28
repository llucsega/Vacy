import { Outlet } from 'react-router-dom';
import Header from '../../componentes/cabecera/Cabecera';
import Navbar_inferior from '../navegacion/NavbarInferior';

export default function MainLayout({ scrollRef }) {
  return (
    <>
      <Header />
      {/* L'Outlet és el lloc on es renderitzaran la Home, el Buscar, etc. */}
      <Outlet /> 
      <Navbar_inferior scrollContainerRef={scrollRef} />
    </>
  );
}