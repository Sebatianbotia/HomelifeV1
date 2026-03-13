import React from 'react';
import { Link } from 'react-router-dom';
import './DistributorCTA.css';

const DistributorCTA = () => {
  const benefits = [
    { icon: '📈', text: 'Altos márgenes de ganancia' },
    { icon: '🚚', text: 'Logística y soporte incluido' },
    { icon: '🏆', text: 'Marca reconocida' },
    { icon: '📦', text: 'Catálogo completo' },
  ];

  return (
    <section className="distributor-cta-section">
      <div className="distributor-cta-container">
        <div className="distributor-cta-content">
          <span className="distributor-badge">OPORTUNIDAD DE NEGOCIO</span>
          <h2 className="distributor-cta-title">
            Conviértete en <span className="highlight">Distribuidor</span>
          </h2>
          <p className="distributor-cta-description">
            Únete a nuestra red de aliados comerciales y lleva los mejores equipos médicos certificados a toda Colombia.
          </p>

          <div className="distributor-benefits">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <span className="benefit-icon">{benefit.icon}</span>
                <span className="benefit-text">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="distributor-cta-actions">
            <Link to="/distribuidores" className="distributor-cta-button primary">
              Quiero ser distribuidor
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/contacto" className="distributor-cta-button secondary">
              Contactar asesor
            </Link>
          </div>
        </div>

        <div className="distributor-cta-stats">
          <div className="stat-card">
            <span className="stat-number">150+</span>
            <span className="stat-label">Distribuidores activos</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">25</span>
            <span className="stat-label">Departamentos</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfacción</span>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="distributor-shape shape-1"></div>
      <div className="distributor-shape shape-2"></div>
      <div className="distributor-shape shape-3"></div>
    </section>
  );
};

export default DistributorCTA;