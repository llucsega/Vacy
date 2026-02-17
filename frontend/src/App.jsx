import { useState } from 'react';
import './Fondo_navbar_homeBut.css';
import './header.css';
import './principal.css';

function App() {
  // 1. Aquí anirà la "memòria" (estat) més endavant
  // Simulem que l'usuari NO està loguejat (false)
  // Si canvies aquest false per true manualment, veuràs el canvi a la web
  const [isLoggedIn] = useState(false);
 return (
    <div className="mobil-wrapper">

      <header className="vacy-header">
        <div className="vacy-logo-container">
          <span className="vacy-letter">V</span>
          <span className="vacy-letter">A</span>
          <div className="vacy-letter-c-wrapper">
            <span className="vacy-letter">C</span>
          </div>
          <span className="vacy-letter">Y</span>
        </div>
        <p className="vacy-slogan">Ayuda a vaciar tu nevera con Vacy</p>
      </header>

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

      <main className="vacy-content">
        {/* BLOC DE BOTONS PRINCIPALS */}
        <div className="action-buttons-container">
          <button className="vacy-btn btn-primary">
            <span>Nueva Receta</span>
            <small>+ Crear la tuya</small>
          </button>
          
          <button className="vacy-btn btn-secondary">
            <span>Ayuda Vacy</span>
            <small>IA Generadora</small>
          </button>
        </div>

        {/* LLISTA DE RECEPTES (Scroll) */}
      <section className="recipes-feed">
        <h2 className="section-title">Recetas de la comunidad</h2>
        
        <div className="filter-container">
          <button className="vacy-filter-btn">
            <div className="funnel-icon">
              <div className="funnel-top"></div>
              <div className="funnel-pipe"></div>
            </div>
            <span className="filter-text">FILTROS</span>
          </button>
        </div>

        <div className="recipe-placeholder">
          Proximamente...
        </div>
      </section>
      </main>    
      
    </div>
  );
}

export default App;