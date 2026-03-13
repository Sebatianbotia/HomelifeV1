import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'Excelente servicio. El tutorial de YouTube me ayudó muchísimo con mi glucómetro. 100% recomendado.',
    source: 'Facebook',
  },
  {
    id: 2,
    name: 'Carlos Ramírez',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'Los sigo en TikTok y aprendo algo nuevo cada día. Compré mi tensiómetro aquí y estoy encantado.',
    source: 'Instagram',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    text: 'Rápida respuesta. Me ayudaron a escoger el tensiómetro perfecto para mi abuela. Llegó en 2 días.',
    source: 'TikTok',
  },
  {
    id: 4,
    name: 'Jorge Sánchez',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 5,
    text: 'La mejor inversión para la salud familiar. Productos certificados y atención personalizada.',
    source: 'YouTube',
  },
];

const Testimonials = () => {
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