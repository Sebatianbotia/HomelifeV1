import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const getInitialLang = () => {
    const match = document.cookie.match(/googtrans=\/es\/([^;]+)/);
    if (match) {
      const code = match[1].toLowerCase();
      if (code === 'en') return 'EN';
      if (code === 'pt') return 'PT';
    }
    return 'ES';
  };

  const [currentLang, setCurrentLang] = useState(getInitialLang());

  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    setLangOpen(false);

    const code = langCode.toLowerCase();

    if (code === 'es') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    } else {
      document.cookie = `googtrans=/es/${code}; path=/`;
      document.cookie = `googtrans=/es/${code}; domain=${window.location.hostname}; path=/`;
    }

    window.location.reload();
  };

  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-top">
        <div className="header-container">
          <Link to="/" className="brand">
            <img src="/HomeLife_logo.png" alt="HomeLife Logo" className="brand-icon" style={{ height: '40px', width: 'auto' }} />
          </Link>

          <div className="header-actions">
            {/* Language selector */}
            <div className="lang-selector">
              <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
                <img src={currentLang === 'ES' ? "https://flagcdn.com/w20/co.png" : currentLang === 'EN' ? "https://flagcdn.com/w20/us.png" : "https://flagcdn.com/w20/br.png"} alt={currentLang} style={{ width: 20, height: 14, borderRadius: 2 }} />
                <span>{currentLang}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {langOpen && (
                <div className="lang-dropdown">
                  <div className={`lang-option ${currentLang === 'ES' ? 'active' : ''}`} onClick={() => handleLanguageChange('ES')}>
                    <img src="https://flagcdn.com/w20/co.png" alt="ES" style={{ width: 20, height: 14, borderRadius: 2 }} />
                    <span>Español</span>
                  </div>
                  <div className={`lang-option ${currentLang === 'EN' ? 'active' : ''}`} onClick={() => handleLanguageChange('EN')}>
                    <img src="https://flagcdn.com/w20/us.png" alt="EN" style={{ width: 20, height: 14, borderRadius: 2 }} />
                    <span>English</span>
                  </div>
                  <div className={`lang-option ${currentLang === 'PT' ? 'active' : ''}`} onClick={() => handleLanguageChange('PT')}>
                    <img src="https://flagcdn.com/w20/br.png" alt="PT" style={{ width: 20, height: 14, borderRadius: 2 }} />
                    <span>Português</span>
                  </div>
                </div>
              )}
            </div>

            <Link to={isAuthenticated ? "/cuenta" : "/auth"} className="icon-btn desktop-only-icon" title={isAuthenticated ? user.name : "Iniciar Sesión"}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {isAuthenticated && <span className="user-dot"></span>}
            </Link>

            {/* Removed heart icon */}

            <Link to="/carrito" className="icon-btn desktop-only-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="badge">{cartCount}</span>
            </Link>

            {/* Hamburger Menu Button */}
            <button 
              className="icon-btn mobile-menu-btn" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              Inicio
            </Link>
            <Link to="/productos" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Productos
            </Link>
            <Link to="/nosotros" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              Nosotros
            </Link>
            <Link to="/distribuidores" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" />
              </svg>
              Distribuidores
            </Link>
            <Link to="/blog" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Blog
            </Link>
            <Link to="/contacto" className="nav-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Registra equipo
            </Link>
          </div>

          <div className="nav-meta">
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              INVIMA
            </div>
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Envío Gratis
            </div>
            {/* Removed cotizar button */}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Inicio
          </Link>
          <Link to="/productos" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Productos
          </Link>
          <Link to="/nosotros" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            Nosotros
          </Link>
          <Link to="/distribuidores" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" />
            </svg>
            Distribuidores
          </Link>
          <Link to="/blog" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            Blog
          </Link>
          <Link to="/contacto" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Registra equipo
          </Link>

          <div className="mobile-actions-divider"></div>

          <Link to={isAuthenticated ? "/cuenta" : "/auth"} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {isAuthenticated ? `Hola, ${user.name.split(' ')[0]}` : 'Iniciar Sesión / Registro'}
          </Link>
          <Link to="/carrito" className="mobile-nav-link mobile-cart-link" onClick={() => setIsMobileMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Carrito
            {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
          </Link>
          
          <div className="mobile-trust-badges">
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              INVIMA
            </div>
            <div className="trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Envío Gratis
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;