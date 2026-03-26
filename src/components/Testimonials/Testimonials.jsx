import React, { useState, useEffect } from 'react';
import { getTestimonials } from '../../services/contentService';
import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Estado de carga
  if (loading) {
    return (
      <section className="testimonials-section">
        <div style={{ padding: '100px 20px', textAlign: 'center', color: '#00d9d9' }}>
          Cargando...
        </div>
      </section>
    );
  }

  // Estado de error
  if (error || testimonials.length === 0) {
    return (
      <section className="testimonials-section">
        <div style={{ padding: '100px 20px', textAlign: 'center', color: '#ff6b6b' }}>
          {error || 'No hay testimonios disponibles'}
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">Lo que dicen nuestros clientes</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <span>Vía {testimonial.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;