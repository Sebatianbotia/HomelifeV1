import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { crearPedido } from '../../services/homelifeService';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartInfo, clearCart, isCartLoading } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [cc, setCc] = useState(user?.cc || '');
  const [billing, setBilling] = useState({
    first_name: user?.first_name || user?.billing?.first_name || '',
    last_name: user?.last_name || user?.billing?.last_name || '',
    address_1: user?.billing?.address_1 || '',
    address_2: user?.billing?.address_2 || '',
    city: user?.billing?.city || '',
    phone: user?.billing?.phone || '',
    email: user?.email || user?.billing?.email || '',
  });

  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [shipping, setShipping] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
  });

  const [metodoPago, setMetodoPago] = useState('wompi');
  const [customerNote, setCustomerNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (!cc.trim()) return 'La Cédula o NIT es requerida';
    if (!billing.first_name.trim()) return 'El nombre es requerido';
    if (!billing.last_name.trim()) return 'El apellido es requerido';
    if (!billing.address_1.trim()) return 'La dirección es requerida';
    if (!billing.city.trim()) return 'La ciudad es requerida';
    if (!billing.phone.trim()) return 'El teléfono es requerido';
    if (!billing.email.trim()) return 'El correo electrónico es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billing.email)) return 'El correo electrónico no es válido';

    if (shipToDifferent) {
      if (!shipping.first_name.trim()) return 'El nombre de envío es requerido';
      if (!shipping.last_name.trim()) return 'El apellido de envío es requerido';
      if (!shipping.address_1.trim()) return 'La dirección de envío es requerida';
      if (!shipping.city.trim()) return 'La ciudad de envío es requerida';
    }

    return null;
  };

  const procesarPedido = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }
    if (cartInfo.isEmpty) { setError('Tu carrito está vacío'); return; }

    setLoading(true);

    try {
      let shippingData;
      if (shipToDifferent) {
        shippingData = {
          first_name: shipping.first_name.trim(),
          last_name: shipping.last_name.trim(),
          address_1: shipping.address_1.trim(),
          address_2: shipping.address_2.trim(),
          city: shipping.city.trim(),
        };
      } else {
        shippingData = {
          first_name: billing.first_name.trim(),
          last_name: billing.last_name.trim(),
          address_1: billing.address_1.trim(),
          address_2: billing.address_2.trim(),
          city: billing.city.trim(),
        };
      }

      const payload = {
        metodo_pago: metodoPago,
        cc: cc.trim(),
        items: cartInfo.items.map(item => ({
          product_id: parseInt(item.id),
          quantity: item.quantity,
        })),
        billing: {
          first_name: billing.first_name.trim(),
          last_name: billing.last_name.trim(),
          address_1: billing.address_1.trim(),
          address_2: billing.address_2.trim(),
          city: billing.city.trim(),
          phone: billing.phone.trim(),
          email: billing.email.trim(),
        },
        shipping: shippingData,
        customer_note: customerNote.trim(),
      };

      console.log('📦 Enviando pedido:', payload);

      const data = await crearPedido(payload);
      console.log('📩 Respuesta del servidor:', data);

      if (data.success || data.order_id || data.id) {
        const orderId = data.order_id || data.id;
        const isWompi = data.metodo === 'wompi' || data.abrir_wompi === true || metodoPago === 'wompi';

        if (isWompi) {
          if (!window.WidgetCheckout) {
            alert('Error: El sistema de pago no se ha cargado. Recarga la página e inténtalo de nuevo.');
            setLoading(false);
            return;
          }

          if (!data.wompi) {
            setError('El servidor no devolvió la configuración de pago. Contacta soporte.');
            setLoading(false);
            return;
          }

          const { public_key, currency, amount_in_cents, reference, signature } = data.wompi;

          const checkout = new window.WidgetCheckout({
            currency: currency,
            amountInCents: amount_in_cents,
            reference: reference,
            publicKey: public_key,
            signature: { integrity: signature },
          });

          checkout.open(function (result) {
            const transaction = result.transaction;
            if (transaction && transaction.status === 'APPROVED') {
              clearCart();
              navigate('/cuenta');
            } else {
              const status = transaction ? transaction.status : 'CANCELLED';
              alert('Pago no aprobado o cancelado. Estado: ' + status + '. Puedes intentarlo nuevamente.');
              setLoading(false);
            }
          });
        } else {
          await clearCart();
          navigate('/gracias', {
            state: {
              orderId: orderId,
              orderNumber: data.order_number || orderId,
              metodoPago: 'cod',
            },
          });
        }
      } else {
        setError(data.message || data.error || 'Error al procesar el pedido. Inténtalo de nuevo.');
        setLoading(false);
      }
    } catch (err) {
      console.error('❌ Error procesando pedido:', err);
      setError('Error de conexión. Verifica tu internet e inténtalo de nuevo.');
      setLoading(false);
    }
  };

  // Empty cart guard
  if (cartInfo.isEmpty && !isCartLoading && !loading) {

    return (
      <div className="checkout-empty">
        <h2>No hay productos en tu carrito</h2>
        <p>Agrega productos antes de proceder al pago.</p>
        <Link to="/productos" className="checkout-back-btn">Ir a Productos</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Finalizar Compra</h1>

      <form className="checkout-layout" onSubmit={procesarPedido}>
        {/* ═══ LEFT COLUMN: Forms ═══ */}
        <div className="checkout-form-section">

          {/* ── Billing ── */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Datos de Facturación
            </h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="billing_cc">Cédula / NIT *</label>
                <input type="text" id="billing_cc" name="cc" value={cc} onChange={(e) => { setCc(e.target.value); setError(null); }} placeholder="Tu número de identificación" required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="billing_first_name">Nombre *</label>
                <input type="text" id="billing_first_name" name="first_name" value={billing.first_name} onChange={handleBillingChange} placeholder="Tu nombre" required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="billing_last_name">Apellido *</label>
                <input type="text" id="billing_last_name" name="last_name" value={billing.last_name} onChange={handleBillingChange} placeholder="Tu apellido" required disabled={loading} />
              </div>
              <div className="form-group full-width">
                <label htmlFor="billing_address_1">Dirección *</label>
                <input type="text" id="billing_address_1" name="address_1" value={billing.address_1} onChange={handleBillingChange} placeholder="Carrera 48 #101A-09" required disabled={loading} />
              </div>
              <div className="form-group full-width">
                <label htmlFor="billing_address_2">Complemento</label>
                <input type="text" id="billing_address_2" name="address_2" value={billing.address_2} onChange={handleBillingChange} placeholder="Apto, casa, bodega (opcional)" disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="billing_city">Ciudad *</label>
                <input type="text" id="billing_city" name="city" value={billing.city} onChange={handleBillingChange} placeholder="Bogotá" required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="billing_phone">Teléfono *</label>
                <input type="tel" id="billing_phone" name="phone" value={billing.phone} onChange={handleBillingChange} placeholder="313 401 2845" required disabled={loading} />
              </div>
              <div className="form-group full-width">
                <label htmlFor="billing_email">Correo Electrónico *</label>
                <input type="email" id="billing_email" name="email" value={billing.email} onChange={handleBillingChange} placeholder="tu@email.com" required disabled={loading} />
              </div>
            </div>
          </div>

          {/* ── Shipping toggle ── */}
          <label className="shipping-toggle-check">
            <input
              type="checkbox"
              checked={shipToDifferent}
              onChange={(e) => setShipToDifferent(e.target.checked)}
              disabled={loading}
            />
            <span className="toggle-check-custom"></span>
            <span>¿Enviar a una dirección diferente?</span>
          </label>

          {/* ── Shipping (conditional) ── */}
          {shipToDifferent && (
            <div className="checkout-card shipping-card-animate">
              <h2 className="checkout-card-title">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Datos de Envío
              </h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="shipping_first_name">Nombre *</label>
                  <input type="text" id="shipping_first_name" name="first_name" value={shipping.first_name} onChange={handleShippingChange} placeholder="Nombre del destinatario" disabled={loading} />
                </div>
                <div className="form-group">
                  <label htmlFor="shipping_last_name">Apellido *</label>
                  <input type="text" id="shipping_last_name" name="last_name" value={shipping.last_name} onChange={handleShippingChange} placeholder="Apellido del destinatario" disabled={loading} />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="shipping_address_1">Dirección *</label>
                  <input type="text" id="shipping_address_1" name="address_1" value={shipping.address_1} onChange={handleShippingChange} placeholder="Dirección de envío" disabled={loading} />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="shipping_address_2">Complemento</label>
                  <input type="text" id="shipping_address_2" name="address_2" value={shipping.address_2} onChange={handleShippingChange} placeholder="Apto, bodega (opcional)" disabled={loading} />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="shipping_city">Ciudad *</label>
                  <input type="text" id="shipping_city" name="city" value={shipping.city} onChange={handleShippingChange} placeholder="Ciudad de envío" disabled={loading} />
                </div>
              </div>
            </div>
          )}

          {/* ── Payment Method ── */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Método de Pago
            </h2>
            <div className="payment-methods">
              <label
                className={`payment-option ${metodoPago === 'wompi' ? 'selected' : ''}`}
                htmlFor="pay-wompi"
              >
                <input type="radio" id="pay-wompi" name="metodo_pago" value="wompi" checked={metodoPago === 'wompi'} onChange={(e) => setMetodoPago(e.target.value)} disabled={loading} />
                <div className="payment-option-content">
                  <div className="payment-option-icon wompi-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="payment-option-info">
                    <span className="payment-option-name">Pago en línea seguro (Wompi)</span>
                    <span className="payment-option-desc">Tarjeta de crédito, débito, PSE, Nequi</span>
                  </div>
                </div>
                <div className="payment-radio-indicator"></div>
              </label>

              <label
                className={`payment-option ${metodoPago === 'cod' ? 'selected' : ''}`}
                htmlFor="pay-cod"
              >
                <input type="radio" id="pay-cod" name="metodo_pago" value="cod" checked={metodoPago === 'cod'} onChange={(e) => setMetodoPago(e.target.value)} disabled={loading} />
                <div className="payment-option-content">
                  <div className="payment-option-icon cod-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M6 12h.01M18 12h.01" />
                    </svg>
                  </div>
                  <div className="payment-option-info">
                    <span className="payment-option-name">Pago Contraentrega</span>
                    <span className="payment-option-desc">Paga al recibir tu producto en casa</span>
                  </div>
                </div>
                <div className="payment-radio-indicator"></div>
              </label>
            </div>

            {metodoPago === 'cod' && (
              <div className="cod-notice-checkout">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Pago contraentrega solo aplica para pedidos en Bogotá.
              </div>
            )}
          </div>

          {/* ── Customer Note ── */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Notas del Pedido
            </h2>
            <textarea
              className="customer-note-input"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              placeholder="Instrucciones especiales, horarios de entrega, factura electrónica, etc. (opcional)"
              rows={3}
              disabled={loading}
            />
          </div>
        </div>

        {/* ═══ RIGHT COLUMN: Summary ═══ */}
        <div className="checkout-summary-section">
          <div className="checkout-card order-summary-card">
            <h2 className="checkout-card-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Resumen del Pedido
            </h2>

            <div className="order-items">
              {cartInfo.items.map(item => (
                <div key={item.id} className="order-item">
                  <img
                    src={item.image || ''}
                    alt={item.name}
                    className="order-item-image"
                  />
                  <div className="order-item-info">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">Cantidad: {item.quantity}</span>
                  </div>
                  <span className="order-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="order-total-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartInfo.cartSubtotal)}</span>
              </div>
              <div className="order-total-row">
                <span>Envío</span>
                <span className="shipping-tbd">Por calcular</span>
              </div>
              <div className="order-total-row grand-total">
                <span>Total</span>
                <span>{formatPrice(cartInfo.cartTotal)}</span>
              </div>
            </div>

            {error && (
              <div className="checkout-error">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="confirm-order-btn"
              disabled={loading || isCartLoading || cartInfo.isEmpty}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Procesando pedido...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Confirmar Pedido
                </>
              )}
            </button>

            <p className="secure-notice">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Tus datos están protegidos con cifrado SSL
            </p>
          </div>

          <Link to="/carrito" className="back-to-cart-link">
            ← Volver al carrito
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
