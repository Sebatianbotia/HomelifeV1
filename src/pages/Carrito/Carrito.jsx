import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Carrito.css';

const Carrito = () => {
  const { cart, removeItem, updateQuantity, getSubtotal } = useCart();
  const subtotal = getSubtotal();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para continuar</p>
        <Link to="/productos" className="continue-shopping">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Carrito de Compras</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.images && item.images.length > 0 ? item.images[0] : item.image} alt={item.name} className="cart-item-image" />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">{formatPrice(item.price)}</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Envío:</span>
          <span>Gratis</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <button className="checkout-btn" onClick={() => alert('Proceder al pago')}>
          Proceder al pago
        </button>
      </div>
    </div>
  );
};

export default Carrito;