import { useState } from 'react';
import './header.css';
import './principal.css';
import './scroll_i_tarjetas.css';
import './main.css';

function App() {
  // 1. Aquí anirà la "memòria" (estat) més endavant
  // Simulem que l'usuari NO està loguejat (false)
  // Si canvies aquest false per true manualment, veuràs el canvi a la web
  const [isLoggedIn, setIsLoggedIn] = useState(true);
 
  return(
  
    <div className="mobil-wrapper">

      <div className="scrollable-content">

        <header className="vacy-header">
          
          <div className="vacy-logo-container">
            
            <span className="vacy-letter">V</span>
            <span className="vacy-letter">A</span>
            
            <div className="vacy-letter-c-wrapper">
              <span className="vacy-letter">C</span>
            </div>
            
            <span className="vacy-letter">Y</span>

          </div>
        
        </header>



        <nav className="navbar-superior">
          
          <div className="nav-center">
            
            <div className="search-wrapper">
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="search-input"/>
              
              <div className="search-icon-custom">
                <div className="lupa-cercle"></div>
                <div className="lupa-pal"></div>
              </div>
            
            </div>
          
          </div>

          <div className="nav-right">
            {isLoggedIn ? 
              (<div className="perfil-usuario"></div>) 
              : 
              (<span className="auth-btn highlight">Acceder</span>
            )}
          </div>
        
        </nav>



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

          {/* LLISTA DE RECEPTES */}
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

            <div className="recipes-scroll-area">
              {/* TARGETA 1 */}
              <div className="recipe-card">
                <div className="recipe-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400)'}}></div>
                <div className="recipe-details">
                  <h3>WWWWWWWWWWWWW</h3>
                  <p>Fresca, ràpida i plena de nutrients per al dia a dia.</p>
                  <div className="recipe-meta">
                    <span>⏱️ 10 min</span>
                    <span>👥 1 pers</span>
                  </div>
                </div>
              </div>

              {/* TARGETA 2 */}
              <div className="recipe-card">
                <div className="recipe-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400)'}}></div>
                <div className="recipe-details">
                  <h3>Bowl de Salmó i Arròs</h3>
                  <p>La recepta estrella per aprofitar el peix de la nevera.</p>
                  <div className="recipe-meta">
                    <span>⏱️ 15 min</span>
                    <span>👥 2 pers</span>
                  </div>
                </div>
              </div>

              {/* TARGETA 3 */}
              <div className="recipe-card">
                <div className="recipe-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=400)'}}></div>
                <div className="recipe-details">
                  <h3>Pasta amb Pesto de Pistatxo</h3>
                  <p>Un gir italià amb ingredients que segur que tens.</p>
                  <div className="recipe-meta">
                    <span>⏱️ 12 min</span>
                    <span>👥 1 pers</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="recipe-placeholder">
              Proximamente...
            </div>
          </section>
        </main> 


      </div>


     <div 
        className="home-button-circle" 
        onClick={() => {
          // Busquem el contenidor que té l'scroll
          const container = document.querySelector('.scrollable-content');
          
          // Si el troba, el fem pujar a dalt de tot de forma suau
          if (container) {
            container.scrollTo({
              top: 0,
              behavior: 'smooth' // Això fa l'efecte de lliscar, no un salt brusc
            });
          }
        }}>
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