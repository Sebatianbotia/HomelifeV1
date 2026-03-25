import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './HistorialPedidos.css';

const HistorialPedidos = () => {
  const BASE_URL = import.meta.env.VITE_WP_URL || 'https://www.homelife.com.co';
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPedidos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('homelife_jwt');
      if (!token) {
        throw new Error('No se encontró un token válido. Inicia sesión nuevamente.');
      }

      const response = await fetch(`${BASE_URL}/wp-json/homelife/v1/mis-pedidos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok || data.code === 'jwt_auth_invalid_token' || data.code === 'jwt_invalid') {
        throw new Error(data.message || 'Error al obtener tus pedidos. Verifica tu sesión.');
      }

      // Si data tiene success: true y los pedidos vienen en data.data o data.pedidos
      let pedidosData = data.pedidos || data.data || data;
      if (!Array.isArray(pedidosData)) {
        if (data.success && Array.isArray(data.pedidos)) {
          pedidosData = data.pedidos;
        } else {
          pedidosData = [];
        }
      }

      setPedidos(pedidosData);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Ocurrió un error inesperado al listar tus pedidos.');
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    fetchPedidos();
  }, [isAuthenticated, authLoading, navigate, fetchPedidos]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha desconocida';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusClass = (status) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'completed': return 'badge-completed';
      case 'processing': return 'badge-processing';
      case 'cancelled': return 'badge-cancelled';
      case 'on-hold': return 'badge-onhold';
      case 'pending': return 'badge-pending';
      case 'refunded': return 'badge-refunded';
      case 'failed': return 'badge-failed';
      default: return 'badge-default';
    }
  };

  // ESTADO DE CARGA
  if (loading || authLoading) {
    return (
      <div className="historial-pedidos-loader">
        <span className="spinner-large"></span>
        <p>Cargando tu historial de compras...</p>
      </div>
    );
  }

  // ESTADO DE ERROR
  if (error) {
    return (
      <div className="historial-error-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h3>¡Ups! Algo salió mal</h3>
        <p>{error}</p>
        <button className="retry-btn" onClick={fetchPedidos}>Reintentar</button>
      </div>
    );
  }

  // ESTADO VACÍO
  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="historial-empty-state">
        <div className="empty-icon-wrapper">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h3>Aún no tienes pedidos</h3>
        <p>¡Explora nuestra tienda de equipos médicos y descubre ofertas exclusivas!</p>
        <button className="go-to-shop-btn" onClick={() => navigate('/productos')}>
          Ir al catálogo
        </button>
      </div>
    );
  }

  // ESTADO DE ÉXITO
  return (
    <div className="historial-pedidos-container">
      <div className="historial-pedidos-list">
        {pedidos.map((pedido) => (
          <div key={pedido.order_id} className="pedido-card">

            {/* CABECERA */}
            <div className="pedido-card-header">
              <div className="pedido-meta">
                <span className="pedido-id">Pedido #{pedido.order_id}</span>
                <span className="pedido-date">{formatDate(pedido.date_created)}</span>
              </div>
              <div className={`pedido-badge ${getStatusClass(pedido.status)}`}>
                {pedido.status_label || pedido.status}
              </div>
            </div>

            {/* CUERPO - ÍTEMS */}
            <div className="pedido-card-body">
              {(pedido.items || []).map((item, index) => (
                <div key={`${item.product_id}-${index}`} className="pedido-item-row">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Cant: {item.quantity}</span>
                  </div>
                  <div className="item-line-total">
                    {formatPrice(item.line_total || 0)}
                  </div>
                </div>
              ))}
            </div>

            {/* PIE DE TARJETA */}
            <div className="pedido-card-footer">
              <div className="footer-info">
                <div className="footer-info-block">
                  <strong>Dirección de Envío:</strong>
                  <span>{pedido.shipping_address || 'No especificada'}</span>
                </div>
                <div className="footer-info-block">
                  <strong>Método de Pago:</strong>
                  <span>{pedido.payment_method || 'N/A'}</span>
                </div>
              </div>
              <div className="footer-total">
                <span className="total-label">Total del Pedido:</span>
                <span className="total-amount">{formatPrice(pedido.total)}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorialPedidos;
