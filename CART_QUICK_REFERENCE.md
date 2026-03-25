/**
 * QUICK REFERENCE: CartContext API
 * Copia y pega en tus componentes
 */

// ═══════════════════════════════════════════════════════════════════════
// IMPORT
// ═══════════════════════════════════════════════════════════════════════
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

// ═══════════════════════════════════════════════════════════════════════
// HOOK BÁSICO
// ═══════════════════════════════════════════════════════════════════════
const { 
  cart,                    // Objeto completo (null hasta cargar)
  cartInfo,                // Objeto calculado con valores útiles
  isCartLoading,           // Boolean: true durante operaciones
  cartError,               // String: mensaje de error si existe
  fetchCart,               // () => Promise
  addToCart,               // (productId, quantity?) => Promise<boolean>
  updateQuantity,          // (itemKey, quantity) => Promise<boolean>
  removeFromCart,          // (itemKey) => Promise<boolean>
  goToCheckout,            // () => void (redirige a checkout)
} = useCart();

// ═══════════════════════════════════════════════════════════════════════
// USAR cartInfo (RECOMENDADO)
// ═══════════════════════════════════════════════════════════════════════

// Mostrar número de items
<span>{cartInfo.itemsCount} items en carrito</span>

// Mostrar total
<h2>Total: ${cartInfo.cartTotal}</h2>

// Validar si está vacío
{cartInfo.isEmpty && <p>Tu carrito está vacío</p>}

// Mostrar items
{cartInfo.items.map(item => (
  <div key={item.key}>
    <h4>{item.name}</h4>
    <p>Cantidad: {item.quantity}</p>
    <p>Precio: ${item.totals.line_total}</p>
  </div>
))}

// ═══════════════════════════════════════════════════════════════════════
// AGREGAR PRODUCTO AL CARRITO
// ═══════════════════════════════════════════════════════════════════════
const handleAddProduct = async () => {
  const success = await addToCart(productId, 1);
  
  if (success) {
    console.log('Producto agregado');
  } else {
    console.error('Error:', cartError);
  }
};

<button 
  onClick={handleAddProduct}
  disabled={isCartLoading}
>
  {isCartLoading ? 'Agregando...' : 'Agregar'}
</button>

// ═══════════════════════════════════════════════════════════════════════
// ACTUALIZAR CANTIDAD DE ITEM
// ═══════════════════════════════════════════════════════════════════════
const handleUpdateQuantity = async (itemKey, newQuantity) => {
  const success = await updateQuantity(itemKey, newQuantity);
  
  if (success) {
    console.log('Cantidad actualizada');
  } else {
    console.error('Error:', cartError);
  }
};

// Ejemplo: Input de cantidad
<input
  type="number"
  value={itemQuantity}
  onChange={(e) => {
    const newQty = parseInt(e.target.value);
    handleUpdateQuantity(item.key, newQty);
  }}
  disabled={isCartLoading}
/>

// ═══════════════════════════════════════════════════════════════════════
// ELIMINAR ITEM DEL CARRITO
// ═══════════════════════════════════════════════════════════════════════
const handleRemove = async (itemKey) => {
  if (window.confirm('¿Eliminar este producto?')) {
    const success = await removeFromCart(itemKey);
    
    if (success) {
      console.log('Producto eliminado');
    }
  }
};

<button onClick={() => handleRemove(item.key)} disabled={isCartLoading}>
  Eliminar
</button>

// ═══════════════════════════════════════════════════════════════════════
// IR AL CHECKOUT
// ═══════════════════════════════════════════════════════════════════════
const { isAuthenticated } = useAuth();
const { cartInfo, goToCheckout, isCartLoading } = useCart();
const navigate = useNavigate();

const handleGoToCheckout = () => {
  // Validar que no esté vacío
  if (cartInfo.isEmpty) {
    alert('Tu carrito está vacío');
    return;
  }

  // Validar que esté autenticado
  if (!isAuthenticated) {
    navigate('/auth?redirect=carrito');
    return;
  }

  // Ir al checkout (redirige a WordPress)
  goToCheckout();
};

<button 
  onClick={handleGoToCheckout}
  disabled={isCartLoading || cartInfo.isEmpty}
>
  {isCartLoading ? 'Procesando...' : 'Proceder al Pago'}
</button>

// ═══════════════════════════════════════════════════════════════════════
// MOSTRAR ERRORES
// ═══════════════════════════════════════════════════════════════════════
{cartError && (
  <div className="alert alert-error">
    ❌ {cartError}
  </div>
)}

// ═══════════════════════════════════════════════════════════════════════
// TEMPLATE COMPLETO: CARRITO SIMPLE
// ═══════════════════════════════════════════════════════════════════════

const CarritoSimple = () => {
  const { cartInfo, isCartLoading, cartError, updateQuantity, removeFromCart, goToCheckout } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (cartInfo.isEmpty) {
    return (
      <div>
        <h1>Carrito Vacío</h1>
        <button onClick={() => navigate('/productos')}>
          Ir a Productos
        </button>
      </div>
    );
  }

  return (
    <div className="carrito">
      <h1>Mi Carrito ({cartInfo.itemsCount} items)</h1>

      {/* Error si existe */}
      {cartError && <div className="error">{cartError}</div>}

      {/* Lista de items */}
      <div className="items-list">
        {cartInfo.items.map(item => (
          <div key={item.key} className="cart-item">
            <img src={item.image?.url} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Precio unit: ${item.price}</p>
            </div>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.key, parseInt(e.target.value))}
              disabled={isCartLoading}
              min="1"
            />
            <p>${item.totals.line_total}</p>
            <button
              onClick={() => removeFromCart(item.key)}
              disabled={isCartLoading}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="summary">
        <p>Subtotal: ${cartInfo.cartSubtotal}</p>
        <p>Impuesto: ${cartInfo.cartTax}</p>
        <h2>Total: ${cartInfo.cartTotal}</h2>
      </div>

      {/* Botones */}
      <div className="actions">
        <button onClick={() => navigate('/productos')} disabled={isCartLoading}>
          Seguir Comprando
        </button>
        <button
          onClick={goToCheckout}
          disabled={isCartLoading || !isAuthenticated}
        >
          {isCartLoading ? 'Procesando...' : 'Ir a Pagar'}
        </button>
      </div>

      {!isAuthenticated && (
        <p>⚠️ Debes <a href="/auth">iniciar sesión</a> para completar la compra</p>
      )}
    </div>
  );
};

export default CarritoSimple;

// ═══════════════════════════════════════════════════════════════════════
// VALIDACIONES CRÍTICAS
// ═══════════════════════════════════════════════════════════════════════

// 1. Bloquear botones durante carga
<button disabled={isCartLoading}>
  {isCartLoading ? 'Procesando...' : 'Acción'}
</button>

// 2. Validar cantidad
if (quantity < 1 || quantity > 100) {
  console.warn('Cantidad inválida');
  return;
}

// 3. Validar autenticación
if (!isAuthenticated) {
  navigate('/auth');
  return;
}

// 4. Manejo de errores
if (cartError) {
  console.error('Error del carrito:', cartError);
  // Mostrar al usuario
  // Ofrecer reintentar
}

// 5. Usar key de item, no product id
await removeFromCart(item.key); // ✓ Correcto
await removeFromCart(item.id);  // ✗ Incorrecto

// ═══════════════════════════════════════════════════════════════════════
// FLUJO POST-LOGIN
// ═══════════════════════════════════════════════════════════════════════

// En Auth.jsx - Después de login exitoso
const handleLoginSuccess = () => {
  // El carrito persiste automáticamente
  // Redirigir según donde venía
  const redirect = new URLSearchParams(location.search).get('redirect');
  navigate(redirect || '/cuenta');
};

// En Carrito.jsx - Validar acceso
useEffect(() => {
  if (!isAuthenticated) {
    navigate('/auth?redirect=carrito');
  }
}, [isAuthenticated, navigate]);
