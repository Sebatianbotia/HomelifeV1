import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Gracias.css';

const Gracias = () => {
  const location = useLocation();
  const { orderId, orderNumber, metodoPago } = location.state || {};

  return (
    <div className="gracias-page">
      <div className="gracias-card">
        <div className="gracias-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1>¡Pedido Exitoso!</h1>

        {orderNumber && (
          <p className="order-number">
            Tu número de orden es: <strong>#{orderNumber}</strong>
          </p>
        )}

        {metodoPago === 'cod' ? (
          <p className="order-message">
            Tu pedido ha sido registrado con éxito. <br />
            <strong>Pagarás al recibir tu producto.</strong>
          </p>
        ) : (
          <p className="order-message">
            Tu pedido ha sido registrado exitosamente.
          </p>
        )}

        <div className="gracias-info">
          <div className="info-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Recibirás un correo de confirmación con los detalles de tu pedido.</span>
          </div>
          <div className="info-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span>Tiempo de entrega estimado: 24-48 horas en Bogotá, 3-5 días hábiles a nivel nacional.</span>
          </div>
        </div>

        <div className="gracias-actions">
          <Link to="/cuenta" className="gracias-btn primary">
            Ver mis pedidos
          </Link>
          <Link to="/productos" className="gracias-btn secondary">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gracias;
