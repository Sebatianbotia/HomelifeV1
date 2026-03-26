import React, { useState, useEffect } from 'react';
import { getHeroSlides } from '../../services/contentService';
import './HeroSlider.css';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const mappedSlides = await getHeroSlides();
        setSlides(mappedSlides);
        setError(null);
      } catch (err) {
        console.error('Error fetching slides:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // AutoPlay: Solo ejecutar si slides.length > 0
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToNext = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const goToPrev = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Estado de carga
  if (loading) {
    return (
      <section className="hero-slider">
        <div style={{ padding: '100px 20px', textAlign: 'center', color: '#00d9d9' }}>
          Cargando...
        </div>
      </section>
    );
  }

  // Estado de error
  if (error || slides.length === 0) {
    return (
      <section className="hero-slider">
        <div style={{ padding: '100px 20px', textAlign: 'center', color: '#ff6b6b' }}>
          {error || 'No hay slides disponibles'}
        </div>
      </section>
    );
  }

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