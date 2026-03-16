import React from 'react';
import './ValueProposition.css';

const propositions = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Certificación INVIMA',
    description: 'Todos nuestros productos cuentan con registro sanitario INVIMA vigente y verificable.',
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Alta Calidad',
    description: 'Equipos fabricados con los más altos estándares de precisión y durabilidad.',
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: '2 Años de Garantía',
    description: 'Garantía extendida y soporte técnico especializado durante toda la vida del producto.',
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Asesoría de Expertos',
    description: 'Profesionales de la salud te guían en la elección del equipo adecuado para ti.',
  },
];

const ValueProposition = () => {
  return (
    <section className="value-section">
      <div className="value-container">
        <h2 className="value-title">¿Por qué elegir HomeLife?</h2>
        <div className="value-grid">
          {propositions.map((prop) => (
            <div key={prop.id} className="value-card">
              <div className="value-icon">{prop.icon}</div>
              <h3 className="value-card-title">{prop.title}</h3>
              <p className="value-card-description">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;