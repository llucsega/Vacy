import { useState } from 'react';
import MobileWrapper from './componentes/MobileWrapper'; 
import Header from './componentes/Header';
import Botones_crear_recetas from './componentes/Botones_crear_recetas';
import './principal.css';
import './scroll_i_tarjetas.css';
import './Main.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
 
  return(
  
    <MobileWrapper>
      <Header />

      <main className="flex flex-col px-5">
        <Botones_crear_recetas />

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
      
    </MobileWrapper>
  );
}

export default App;