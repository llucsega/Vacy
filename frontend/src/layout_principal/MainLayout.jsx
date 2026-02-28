import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar_inferior from './buscar/Navbar_inferior';

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