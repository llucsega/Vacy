import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './estilos/global.css';
import { AuthProvider } from './infraestructura/autenticacion/ContextoAutenticacion'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);