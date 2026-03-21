import React, { useState, useEffect } from 'react';
import './Testimonials.css';

/**
 * Limpia HTML eliminando etiquetas y devolviendo solo texto
 */
const limpiarHTML = (htmlString) => {
  if (!htmlString) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const baseUrl = import.meta.env.VITE_WP_URL?.replace(/\/$/, '') || 'https://www.homelife.com.co';
        const response = await fetch(
          `${baseUrl}/wp-json/wp/v2/testimonio_home?_fields=id,title,content,acf,yoast_head_json`
        );

        if (!response.ok) {
          throw new Error('Error al cargar testimonios');
        }

        const data = await response.json();
        
        // Mapear datos de WordPress al formato esperado
        const mappedTestimonials = data.map(item => ({
          id: item.id,
          name: item.title?.rendered || 'Cliente anónimo',
          text: limpiarHTML(item.content?.rendered) || item.yoast_head_json?.description || 'Excelente servicio',
          rating: item.acf?.cantidad_estrellas || 5,
          avatar: item.yoast_head_json?.og_image?.[0]?.url || 'https://randomuser.me/api/portraits/lego/1.jpg',
          source: item.acf?.red_social || 'HomeLife',
        }));

        setTestimonials(mappedTestimonials);
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