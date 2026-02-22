// main.jsx o index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // IMPORTANTE
import App from './App';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Este es el que permite que funcionen las URLs */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);