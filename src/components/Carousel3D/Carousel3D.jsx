import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Carousel3D.css';

const Carousel3D = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const totalItems = items.length;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play cada 5 segundos
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!items || items.length === 0) {
    return <div style={{ color: 'white', textAlign: 'center' }}>No hay productos</div>;
  }

  return (
    <div className="carousel-3d">
      <div className="carousel-viewport">
        {items.map((item, index) => {
          // Calcular la posición relativa al índice actual
          let offset = index - currentIndex;
          if (offset > totalItems / 2) offset -= totalItems;
          if (offset < -totalItems / 2) offset += totalItems;

          // Ángulo basado en el offset (360°/totalItems)
          const angle = offset * (360 / totalItems);
          const radian = (angle * Math.PI) / 180;
          const radius = 400; // Distancia desde el centro
          const x = Math.sin(radian) * radius;
          const z = (Math.cos(radian) - 1) * radius;
          const scale = Math.max(0.6, 1 - Math.abs(offset) * 0.15);
          const opacity = Math.max(0.3, 1 - Math.abs(offset) * 0.2);
          const zIndex = Math.round((1 - Math.abs(offset) / totalItems) * 100);

          return (
            <div
              key={item.id}
              className="carousel-item"
              style={{
                transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: Math.abs(offset) <= 1 ? 'all' : 'none',
              }}
            >
              <div className="product-card-3d" onClick={() => navigate(`/producto/${item.id}`)} style={{ cursor: 'pointer' }}>
                {item.discount > 0 && (
                  <span className="badge-discount">-{item.discount}%</span>
                )}
                {item.isNew && <span className="badge-new">NUEVO</span>}
                <div className="product-image">
                  <img src={item.images && item.images.length > 0 ? item.images[0] : ''} alt={item.name} />
                  <div className="quick-view-overlay">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>Ver Más</span>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{item.name}</h3>
                  <div className="product-rating">
                    {'★'.repeat(item.rating)}
                    {'☆'.repeat(5 - item.rating)}
                    <span>({item.reviewCount || item.reviews})</span>
                  </div>
                  <div className="product-price">
                    {item.originalPrice && (
                      <span className="old-price">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                    <span className="current-price">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={(e) => { e.stopPropagation(); addItem(item); }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button className="carousel-arrow prev" onClick={goToPrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
        <button className="carousel-arrow next" onClick={goToNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel3D;