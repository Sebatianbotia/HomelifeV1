import React from 'react';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/Stats'; // Reutilizamos el componente de estadísticas
import './Nosotros.css';

const Nosotros = () => {
  // Datos para las tarjetas de misión/visión/valores
  const cards = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      ),
      title: 'Misión',
      description: 'Proporcionar equipos médicos certificados de alta calidad que mejoren la salud y bienestar de nuestros clientes, con un servicio excepcional y precios justos.',
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'Visión',
      description: 'Ser la empresa líder en Colombia en distribución de equipos médicos, reconocida por nuestra excelencia, innovación y compromiso con la salud de las personas.',
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: 'Valores',
      description: 'Calidad, Integridad, Compromiso, Innovación y Responsabilidad Social. Estos valores guían cada decisión que tomamos y cada producto que ofrecemos.',
    },
  ];

  // Datos para certificaciones
  const certifications = [
    { id: 1, name: 'INVIMA', icon: '🛡️' },
    { id: 2, name: 'ISO 9001:2015', icon: '📋' },
    { id: 3, name: 'ISO 13485', icon: '🔬' },
    { id: 4, name: 'Garantía 2 Años', icon: '✅' },
  ];

  return (
    <div className="nosotros-page">
      {/* Hero */}
      <section className="nosotros-hero">
        <div className="container">
          <h1>Acerca de HomeLife</h1>
          <p>Líderes en equipos médicos certificados, comprometidos con tu salud y bienestar desde hace más de 15 años</p>
        </div>
      </section>

      {/* Historia */}
      <section className="nosotros-historia">
        <div className="container">
          <h2 className="section-title">Nuestra Historia</h2>
          <p className="historia-texto">
            Desde 2010, HomeLife se ha dedicado a proporcionar equipos médicos de la más alta calidad a hogares, 
            clínicas y hospitales en toda Colombia. Nacimos con la visión de hacer accesible la tecnología médica 
            de vanguardia para todos, manteniendo los más altos estándares de calidad y certificación INVIMA.
          </p>
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="nosotros-cards">
        <div className="container">
          <h2 className="section-title">Nuestros Pilares</h2>
          <div className="cards-grid">
            {cards.map((card) => (
              <div key={card.id} className="card-item">
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas (reutilizamos Stats) */}
      <Stats />

      {/* Certificaciones */}
      <section className="nosotros-certificaciones">
        <div className="container">
          <h2 className="section-title">Certificaciones y Garantías</h2>
          <p className="certificaciones-intro">
            Todos nuestros productos cumplen con los más altos estándares de calidad y seguridad
          </p>
          <div className="certificaciones-grid">
            {certifications.map((cert) => (
              <div key={cert.id} className="certificacion-item">
                <span className="cert-icon">{cert.icon}</span>
                <h4>{cert.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo (opcional) */}
      <section className="nosotros-equipo">
        <div className="container">
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="equipo-grid">
            <div className="equipo-item">
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop" alt="Dr. Carlos Mendoza" />
              <h4>Dr. Carlos Mendoza</h4>
              <p>Director Médico</p>
            </div>
            <div className="equipo-item">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop" alt="Dra. Ana López" />
              <h4>Dra. Ana López</h4>
              <p>Especialista en Salud</p>
            </div>
            <div className="equipo-item">
              <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop" alt="Dr. Jorge Ramírez" />
              <h4>Dr. Jorge Ramírez</h4>
              <p>Coordinador de Calidad</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;