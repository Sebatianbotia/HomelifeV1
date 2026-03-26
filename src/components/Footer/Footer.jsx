import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAjustesGlobales } from '../../services/contentService';
import './Footer.css';

const Footer = () => {
  const [ajustes, setAjustes] = useState(null);

  useEffect(() => {
    const fetchAjustes = async () => {
      try {
        const data = await getAjustesGlobales();
        if (data) setAjustes(data);
      } catch (error) {
        console.error("Error al cargar ajustes globales en Footer:", error);
      }
    };
    fetchAjustes();
  }, []);

  const direccion = ajustes?.direccion || "Bogotá, Colombia";
  const telefono = ajustes?.telefono || "+57 300 123 4567";
  const email = ajustes?.email || "info@homelife.com.co";
  const facebook = ajustes?.facebook || "https://facebook.com/homelifecol";
  const instagram = ajustes?.instagram || "https://instagram.com/homelifecol";
  const tiktok = ajustes?.tiktok || "https://tiktok.com/@homelifecol";
  const youtube = ajustes?.youtube || "https://www.youtube.com/@homelifecolombia2619";

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Columna 1: Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/HomeLife_logo.png" alt="HomeLife Logo" className="footer-logo-img" style={{ height: '50px', width: 'auto' }} />
          </div>
          <p className="footer-desc">
            Equipos médicos certificados INVIMA con tecnología de precisión.
            Más de 15 años cuidando la salud de las familias colombianas.
          </p>
          <div className="footer-certs">
            <div className="cert-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              INVIMA
            </div>
            <div className="cert-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              ISO 9001
            </div>
            <div className="cert-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
              </svg>
              Garantía Oficial
            </div>
          </div>
        </div>

        {/* Columna 2: Productos */}
        <div className="footer-col">
          <h4 className="footer-title">Productos</h4>
          <div className="footer-links">
            <Link to="/productos?cat=tensiometros" className="footer-link">Tensiómetros</Link>
            <Link to="/productos?cat=oximetros" className="footer-link">Oxímetros</Link>
            <Link to="/productos?cat=nebulizadores" className="footer-link">Nebulizadores</Link>
            <Link to="/productos?cat=termometros" className="footer-link">Termómetros</Link>
            <Link to="/productos?cat=glucometria" className="footer-link">Glucómetros</Link>
            <Link to="/productos?cat=basculas" className="footer-link">Básculas</Link>
          </div>
        </div>

        {/* Columna 3: Compañía */}
        <div className="footer-col">
          <h4 className="footer-title">Compañía</h4>
          <div className="footer-links">
            <Link to="/nosotros" className="footer-link">Sobre Nosotros</Link>
            <Link to="/nosotros#certificaciones" className="footer-link">Certificaciones</Link>
            <Link to="/distribuidores" className="footer-link">Distribuidores</Link>
            <Link to="/blog" className="footer-link">Blog de Salud</Link>
            <Link to="/contacto" className="footer-link">Registra tu equipo</Link> {/* Nuevo enlace */}
          </div>
        </div>

        {/* Columna 4: Contacto */}
        <div className="footer-col">
          <h4 className="footer-title">Contacto</h4>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{direccion}</span>
          </div>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
            </svg>
            <a href={`tel:${telefono.replace(/[^0-9+]/g, '')}`}>{telefono}</a>
          </div>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className="footer-social">
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                  <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
              </a>
            )}
            {tiktok && (
              <a href={tiktok} target="_blank" rel="noopener noreferrer" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            )}
            {youtube && (
              <a href={youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} desing by <a href="https://carlosandresovallemarin.github.io/zowlwebsite/?utm_source=ig&utm_medium=social&utm_content=link_in_bio" className='link-zowl' target="_blank" rel="noopener noreferrer">Zowl Web Desing</a></p>
        <div className="footer-legal">
          <Link to="/politicas">Políticas</Link>
          <Link to="/faq">Preguntas Frecuentes</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;