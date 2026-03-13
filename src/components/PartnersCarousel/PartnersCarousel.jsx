import React from 'react';
import './PartnersCarousel.css';

// Lista de logos de empresas (ajusta las rutas según tu proyecto)
const partners = [
  { id: 1, name: 'Allers Group', logo: '/partners/allers.png' },
  { id: 2, name: 'Farmatodo', logo: '/partners/farmatodo.png' },
  { id: 3, name: 'Locatel', logo: '/partners/locatel.png' },
  { id: 4, name: 'Health Company', logo: '/partners/health-company.png' },
  { id: 5, name: 'Amanecer Médico', logo: '/partners/amanecer-medico.png' },
  { id: 6, name: 'Tecnomédica', logo: '/partners/tecnomedica.png' },
  { id: 7, name: 'Líneas Hospitalarias', logo: '/partners/lineas-hospitalarias.png' },
  { id: 8, name: 'Pepe Ganga', logo: '/partners/pepeganga.png' },
  { id: 9, name: 'La Rebaja', logo: '/partners/larebaja.png' },
  { id: 10, name: 'Colsubsidio', logo: '/partners/colsubsidio.png' },
];

const PartnersCarousel = () => {
  return (
    <section className="partners-section">
      <div className="partners-container">
        <h2 className="partners-title">Empresas que confían en nosotros</h2>
        <div className="partners-marquee">
          <div className="partners-track">
            {/* Primera copia de logos */}
            {partners.map((partner) => (
              <div key={partner.id} className="partner-item">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
            {/* Segunda copia para efecto infinito */}
            {partners.map((partner) => (
              <div key={`dup-${partner.id}`} className="partner-item">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;