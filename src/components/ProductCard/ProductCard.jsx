import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <article className="product-card" onClick={() => navigate(`/producto/${product.id}`)} style={{ cursor: 'pointer' }}>
      <div className="card-badges">
        {product.discount > 0 && <span className="badge-discount">-{product.discount}%</span>}
        {product.isNew && <span className="badge-new">NUEVO</span>}
      </div>

      <div className="card-image-wrapper">
        <img src={product.images && product.images.length > 0 ? product.images[0] : ''} alt={product.name} className="card-image" />
        <button className="btn-ver-mas">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Ver Más
        </button>
      </div>

      <div className="card-content">
        <div className="card-category">{product.category}</div>
        <h3 className="card-title">
          {product.name}
        </h3>

        {product.reviewCount > 0 && (
          <div className="card-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < product.rating ? '' : 'empty'}`}>★</span>
              ))}
            </div>
            <span className="rating-count">({product.reviewCount})</span>
          </div>
        )}

        <div className="card-price">
          <div className="price-row">
            {product.originalPrice > product.price && (
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="price-current">{formatPrice(product.price)}</span>
          </div>
          {product.discount > 0 && (
            <div className="price-savings">
              Ahorras {formatPrice(product.originalPrice - product.price)}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;