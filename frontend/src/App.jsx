import { useState } from 'react';
import './Fondo_navbar_homeBut.css';

function App() {
  // 1. Aquí anirà la "memòria" (estat) més endavant
  // Simulem que l'usuari NO està loguejat (false)
  // Si canvies aquest false per true manualment, veuràs el canvi a la web
  const [isLoggedIn] = useState(true);
 return (
    <div className="mobil-wrapper">
      <nav className="navbar-superior">
        {/* MIG: El Buscador */}
        <div className="nav-center">
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="search-input"
            />
            {/* Lupa programada amb CSS */}
            <div className="search-icon-custom">
              <div className="lupa-cercle"></div>
              <div className="lupa-pal"></div>
            </div>
          </div>
        </div>

        {/* LÒGICA CONDICIONAL: 
            Si isLoggedIn és cert, mostra el perfil. 
            Si és fals, mostra els botons d'Acceder/Registro */}
        <div className="nav-right">
          {isLoggedIn ? (
            <div className="perfil-usuario"></div>
          ) : (
            <span className="auth-btn highlight">Acceder</span>
          )}
        </div>
      </nav>
      <div className="home-button-circle" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <div className="house-icon">
          <div className="house-roof"></div>
          <div className="house-body">
          <div className="house-door"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;