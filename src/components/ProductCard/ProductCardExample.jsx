/**
 * EJEMPLO: Cómo usar CartContext en componentes
 * Este archivo muestra las mejores prácticas para integrar el carrito
 * 
 * COPIAR ESTE PATRÓN en tus componentes de productos
 */

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const ProductCardExample = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [localError, setLocalError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const { addToCart, isCartLoading, cartError } = useCart();
  const { isAuthenticated } = useAuth();

  /**
   * Manejador para agregar al carrito
   * Validaciones y UX mejorada
   */
  const handleAddToCart = async () => {
    try {
      // Limpiar mensajes previos
      setLocalError(null);
      setSuccessMsg(null);

      // Validar que la cantidad sea válida
      if (quantity < 1) {
        setLocalError('La cantidad debe ser mayor a 0');
        return;
      }

      if (quantity > 100) {
        setLocalError('Cantidad máxima permitida: 100');
        return;
      }

      // Agregar al carrito
      const success = await addToCart(product.id, quantity);

      if (success) {
        setSuccessMsg(`✅ ${product.name} agregado al carrito`);
        setQuantity(1); // Reset cantidad
        
        // Mostrar mensaje por 3 segundos
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setLocalError('No se pudo agregar el producto');
      }
    } catch (err) {
      setLocalError(err.message || 'Error desconocido');
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>

        <div className="product-price">
          <span className="price">${product.price}</span>
          {product.regular_price && product.regular_price > product.price && (
            <span className="original-price">${product.regular_price}</span>
          )}
        </div>

        {/* Selector de cantidad */}
        <div className="quantity-selector">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity === 1 || isCartLoading}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              setQuantity(Math.min(100, Math.max(1, val)));
            }}
            disabled={isCartLoading}
            min="1"
            max="100"
          />
          <button
            onClick={() => setQuantity(Math.min(100, quantity + 1))}
            disabled={quantity === 100 || isCartLoading}
          >
            +
          </button>
        </div>

        {/* Botón Agregar al Carrito */}
        <button
          className="btn-add-to-cart"
          onClick={handleAddToCart}
          disabled={isCartLoading || !isAuthenticated}
          title={!isAuthenticated ? 'Debes iniciar sesión para comprar' : ''}
        >
          {isCartLoading ? 'Agregando...' : 'Agregar al Carrito'}
        </button>

        {/* Mensajes de error y éxito */}
        {(localError || cartError) && (
          <div className="alert alert-error">
            ⚠️ {localError || cartError}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success">
            {successMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardExample;

/**
 * EJEMPLO DE USO EN PÁGINA DE PRODUCTOS:
 * 
 * import { useCart } from '../../context/CartContext';
 * import { useAuth } from '../../context/AuthContext';
 * 
 * const Productos = () => {
 *   const { cartInfo } = useCart();
 *   const { isAuthenticated } = useAuth();
 * 
 *   return (
 *     <div>
 *       <header>
 *         <p>Carrito: {cartInfo.itemsCount} items - ${cartInfo.cartTotal}</p>
 *       </header>
 *       
 *       {products.map(product => (
 *         <ProductCardExample key={product.id} product={product} />
 *       ))}
 *     </div>
 *   );
 * };
 */

/**
 * VALIDACIONES IMPORTANTES:
 * 
 * 1. Bloquear botones con isCartLoading durante mutaciones
 * 2. Limpiar mensajes previos antes de nuevas acciones
 * 3. Validar cantidad (1-100 recomendado)
 * 4. Mostrar cartError si hay error en la petición
 * 5. Resetear cantidad después de agregar exitosamente
 * 6. Requerir autenticación para funcionalidades críticas
 * 7. Usar cartInfo.itemsCount y cartInfo.cartTotal para mostrar estado
 * 
 * NUNCA:
 * - Hacer múltiples llamadas sin esperar respuesta (usa isCartLoading)
 * - Acceder directamente a localStorage (usa useCart())
 * - Ignorar cartError o errores de red
 * - Permitir cantidades negativas o muy altas
 */
