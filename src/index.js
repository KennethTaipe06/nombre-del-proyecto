import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'; // Importar el archivo CSS de la aplicación
import AppWrapper from './App'; // Importar AppWrapper en lugar de App
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
