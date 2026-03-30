import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../../utils/useSEO';
import './NotFound.css';

const NotFound = () => {
  const seo = useSEO({ title: 'Página no encontrada', description: 'Error 404', noIndex: true });

  return (
    <div className="not-found-page">
      {seo}
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <div className="not-found-glitch" data-text="404">404</div>
        <h2 className="not-found-subtitle">¡Ups! Te has perdido en el espacio</h2>
        <p className="not-found-text">
          La página que estás buscando no existe, ha sido movida o está temporalmente inactiva.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary-not-found">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Volver al Inicio
          </Link>
          <Link to="/productos" className="btn-secondary-not-found">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Ver Productos
          </Link>
        </div>
      </div>
      
      {/* Elementos decorativos de fondo */}
      <div className="bg-glow blob-1"></div>
      <div className="bg-glow blob-2"></div>
    </div>
  );
};

export default NotFound;
