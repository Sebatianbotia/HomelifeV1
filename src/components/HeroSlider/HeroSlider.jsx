import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop',
    badge: '✨ Nueva Línea Medic Life 2026',
    title: 'Equipos Médicos de Alta Tecnología',
    description: 'Selección premium de dispositivos médicos con certificación INVIMA. Calidad y tecnología de vanguardia para tu salud.',
    buttonText: 'Explorar Productos',
    buttonLink: '/productos',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1600&h=900&fit=crop',
    badge: '🔥 Ofertas Especiales',
    title: 'Hasta 30% de Descuento',
    description: 'Promociones exclusivas en equipos médicos certificados. Stock limitado. No dejes pasar esta oportunidad.',
    buttonText: 'Ver Ofertas',
    buttonLink: '/productos?ofertas=true',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&h=900&fit=crop',
    badge: '✅ Certificación INVIMA',
    title: '100% Certificados y Garantizados',
    description: 'Registro sanitario INVIMA vigente y garantía extendida de 2 años en todos nuestros productos.',
    buttonText: 'Ver Certificados',
    buttonLink: '/nosotros#certificaciones',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-overlay"></div>
          <div className="slide-content">
            <div className="slide-badge">{slide.badge}</div>
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-description">{slide.description}</p>
            <a href={slide.buttonLink} className="slide-button">
              {slide.buttonText}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        </div>
      ))}

      <button className="slider-arrow prev" onClick={goToPrev}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="slider-arrow next" onClick={goToNext}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;