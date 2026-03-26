import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import useSEO from '../../utils/useSEO';
import './Carrito.css';

const Carrito = () => {
  const { cartInfo, isCartLoading, cartError, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const seo = useSEO({ title: 'Mi Carrito', description: '', noIndex: true });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleProceedToCheckout = () => {
    if (cartInfo.isEmpty) return;
    if (!isAuthenticated) {
      navigate('/auth?redirect=carrito');
      return;
    }
    navigate('/checkout');
  };

  if (cartInfo.isEmpty && !isCartLoading) {
    return (
      <div className="cart-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para continuar</p>
        <Link to="/productos" className="continue-shopping">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>

      {cartError && (
        <div className="cart-error-banner">
          <span>❌ {cartError}</span>
        </div>
      )}

      <div className="cart-layout">
        <div className="cart-items">
          {cartInfo.items.map(item => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image || ''} 
                alt={item.name} 
                className="cart-item-image" 
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">{formatPrice(item.price)}</p>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={isCartLoading || item.quantity <= 1}
                    >−</button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={isCartLoading}
                    >+</button>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)} 
                    disabled={isCartLoading}
                    title="Eliminar producto"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="cart-item-total">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumen del Pedido</h2>
          <div className="summary-row">
            <span>Subtotal ({cartInfo.itemsCount} items)</span>
            <span>{formatPrice(cartInfo.cartSubtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span className="free-shipping">Por calcular</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(cartInfo.cartTotal)}</span>
          </div>

          <button 
            className="checkout-btn"
            onClick={handleProceedToCheckout}
            disabled={isCartLoading || cartInfo.isEmpty}
          >
            {isCartLoading ? 'Procesando...' : 'Proceder al pago'}
          </button>

          <Link to="/productos" className="continue-shopping-link">
            ← Seguir comprando
          </Link>

          {!isAuthenticated && (
            <p className="auth-notice">
              ⚠️ Debes <Link to="/auth?redirect=carrito">iniciar sesión</Link> para completar la compra
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrito;