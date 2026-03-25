/**
 * GUÍA DE INTEGRACIÓN: CartContext con AuthContext
 * 
 * Este archivo explica cómo el carrito se integra con la autenticación
 * y el flujo completo de compra en Homelife
 */

/**
 * FLUJO COMPLETO DE AUTENTICACIÓN Y CARRITO
 * 
 * 1. USUARIO ANÓNIMO
 *    ├─ Navega a /productos
 *    ├─ Usa CartContext (crea carrito sin auth)
 *    ├─ WC genera Cart-Token y lo guarda en localStorage
 *    ├─ Puede agregar items al carrito
 *    └─ En /carrito o checkout, se requiere login
 * 
 * 2. USUARIO INTENTA CHECKOUT
 *    ├─ Si NO está autenticado → redirigir a /auth (login requerido)
 *    ├─ En /auth, LogIn o SignUp
 *    ├─ AuthContext guarda usuario en localStorage
 *    ├─ Redirige a /cuenta o back a /carrito
 *    └─ El carrito persiste (mismo Cart-Token)
 * 
 * 3. USUARIO AUTENTICADO VA A CHECKOUT
 *    ├─ Validar que useAuth().isAuthenticated === true
 *    ├─ Validar que cartInfo.isEmpty === false
 *    ├─ Mostrar resumen: items, total, dirección
 *    ├─ Botón "Ir a Pagar" llama a goToCheckout()
 *    ├─ goToCheckout() redirige a /finalizar-compra de WordPress
 *    └─ WordPress checkout valida:
 *        ├─ Usuario autenticado (por sesión)
 *        ├─ Carrito válido (por Cart-Token)
 *        ├─ Stock disponible
 *        └─ Procesa el pago
 * 
 * 4. POST-COMPRA
 *    ├─ WordPress redirige a página de confirmación
 *    ├─ Carrito se vacía automáticamente
 *    ├─ Usuario ve orden en /cuenta (misOrders)
 *    └─ Email de confirmación enviado
 */

/**
 * PROTECCIONES RECOMENDADAS EN COMPONENTES
 */

// En Carrito.jsx - Validar autenticación antes de checkout
export const CarritoProtegido = () => {
  const { isAuthenticated, user } = useAuth();
  const { cartInfo, goToCheckout, isCartLoading } = useCart();
  const navigate = useNavigate();

  // Efecto: Si no autenticado, redirigir a login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?redirect=carrito');
    }
  }, [isAuthenticated, navigate]);

  // Bloqueo de carrito vacío en checkout
  const handleCheckout = () => {
    if (cartInfo.isEmpty) {
      alert('El carrito está vacío');
      return;
    }
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    goToCheckout();
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {/* Mostrar items del carrito */}
      <CartItemsList items={cartInfo.items} />

      {/* Resumen */}
      <div className="cart-summary">
        <h2>Resumen</h2>
        <p>Subtotal: ${cartInfo.cartSubtotal}</p>
        <p>Impuesto: ${cartInfo.cartTax}</p>
        <h3>Total: ${cartInfo.cartTotal}</h3>
      </div>

      {/* Botones */}
      <button
        onClick={() => navigate('/productos')}
        disabled={isCartLoading}
      >
        Seguir Comprando
      </button>

      <button
        onClick={handleCheckout}
        disabled={isCartLoading || cartInfo.isEmpty}
      >
        {isCartLoading ? 'Procesando...' : 'Proceder al Pago'}
      </button>
    </div>
  );
};

/**
 * ESTRUCTURA DE DATOS DEL CARRITO
 * 
 * Respuesta de GET /cart:
 * {
 *   "items": [
 *     {
 *       "key": "abc123def456", // Usar esto para update/remove
 *       "id": 123,              // Product ID
 *       "quantity": 2,
 *       "name": "Producto X",
 *       "price": "99.99",
 *       "image": { url: "..." },
 *       "totals": {
 *         "line_subtotal": "199.98",
 *         "line_total": "199.98"
 *       }
 *     }
 *   ],
 *   "items_count": 2,
 *   "items_weight": 0,
 *   "cart_contents_total": "199.98",
 *   "cart_contents_tax": "0",
 *   "totals": {
 *     "currency_code": "USD",
 *     "currency_symbol": "$",
 *     "currency_minor_unit": 2,
 *     "subtotal": "199.98",
 *     "subtotal_tax": "0",
 *     "fee_total": "0",
 *     "fee_tax": "0",
 *     "discount_total": "0",
 *     "discount_tax": "0",
 *     "shipping_total": "0",
 *     "shipping_tax": "0",
 *     "total": "199.98",
 *     "total_tax": "0"
 *   },
 *   "errors": [],
 *   "payment_methods": [...]
 * }
 */

/**
 * MEJOR PRÁCTICA: Usando cartInfo calculado
 * 
 * En lugar de acceder a cart.totals.total, usar:
 *   const { cartInfo } = useCart();
 *   console.log(cartInfo.cartTotal); // Ya viene formateado
 *   console.log(cartInfo.itemsCount); // Mejor que cart.items.length
 *   console.log(cartInfo.isEmpty); // Para validaciones
 */

/**
 * MANEJO DE ERRORES COMUNES
 * 
 * Error: "No stock"
 *   - Solución: Validar cartInfo.cartError después de addToCart
 *   - WC devuelve mensaje descriptivo
 *   - Mostrar al usuario en alert/toast
 * 
 * Error: "Cart-Token inválido"
 *   - Solución: Se maneja automáticamente, se genera uno nuevo
 *   - No requiere intervención del usuario
 * 
 * Error: "Usuario no autenticado en checkout"
 *   - Solución: Validar useAuth().isAuthenticated antes de goToCheckout()
 *   - Bloquear botón si no autenticado
 *   - Redirigir a /auth si intenta
 * 
 * Error: "Red connection"
 *   - Solución: Mostrar cartError al usuario
 *   - Ofrecer botón "Reintentar"
 *   - Llamar a fetchCart() nuevamente
 */

export const HandleCartErrors = () => {
  const { cartError, fetchCart, isCartLoading } = useCart();

  if (cartError) {
    return (
      <div className="error-container">
        <p>❌ Error: {cartError}</p>
        <button
          onClick={fetchCart}
          disabled={isCartLoading}
        >
          {isCartLoading ? 'Reintentando...' : 'Reintentar'}
        </button>
      </div>
    );
  }

  return null;
};
