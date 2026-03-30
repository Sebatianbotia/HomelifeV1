import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

/**
 * CartContext - Carrito de compras basado en localStorage
 * 
 * El carrito se almacena localmente y los items se envían al backend
 * únicamente al momento de crear el pedido (checkout).
 * 
 * Estructura de un item en el carrito:
 * {
 *   id: string,          // Product ID
 *   name: string,        // Nombre del producto
 *   price: number,       // Precio actual
 *   originalPrice: number,
 *   image: string,       // URL de la primera imagen
 *   quantity: number,
 * }
 */

const CART_STORAGE_KEY = 'homelife_cart';

const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  // Persistir en localStorage cuando cambia
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  /**
   * Agrega un producto al carrito
   * @param {number|string} productId - ID del producto
   * @param {number} quantity - Cantidad a agregar (default 1)
   * @param {Object} productData - Datos del producto (name, price, images, etc)
   */
  const addToCart = useCallback(async (productId, quantity = 1, productData = null) => {
    try {
      setIsCartLoading(true);
      setCartError(null);

      // Generar un ID único para el item combinando el ID del producto y sus atributos
      // Esto permite tener el mismo producto con diferentes variantes (ej. Color) en el carrito
      const selectedAttrs = productData?.selectedAttributes || {};
      const attrString = Object.entries(selectedAttrs)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${v}`)
        .join('|');
      
      const cartItemId = attrString ? `${productId}-${attrString}` : String(productId);

      setCartItems(prev => {
        const existingIndex = prev.findIndex(item => String(item.cartItemId) === cartItemId);
        
        if (existingIndex >= 0) {
          // Ya existe: sumar cantidad
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        
        // Nuevo item
        const newItem = {
          cartItemId: cartItemId, // ID único para el carrito
          id: String(productId),  // ID real del producto en WooCommerce
          name: productData?.name || `Producto ${productId}`,
          price: productData?.price || 0,
          originalPrice: productData?.originalPrice || productData?.price || 0,
          image: productData?.images?.[0] || '',
          quantity: quantity,
          selectedAttributes: selectedAttrs, // Guardar los atributos para el ERP
        };
        
        return [...prev, newItem];
      });

      return true;
    } catch (err) {
      setCartError(err.message);
      return false;
    } finally {
      setIsCartLoading(false);
    }
  }, []);

  /**
   * Actualiza la cantidad de un item en el carrito
   * @param {string} itemId - ID del producto
   * @param {number} newQuantity - Nueva cantidad
   */
  const updateQuantity = useCallback(async (itemId, newQuantity) => {
    try {
      setIsCartLoading(true);
      setCartError(null);

      if (newQuantity <= 0) {
        // Eliminar si llega a 0
        setCartItems(prev => prev.filter(item => String(item.id) !== String(itemId)));
      } else {
        setCartItems(prev =>
          prev.map(item =>
            String(item.id) === String(itemId)
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }

      return true;
    } catch (err) {
      setCartError(err.message);
      return false;
    } finally {
      setIsCartLoading(false);
    }
  }, []);

  /**
   * Elimina un item del carrito
   * @param {string} itemId - ID del producto
   */
  const removeFromCart = useCallback(async (itemId) => {
    try {
      setIsCartLoading(true);
      setCartError(null);

      setCartItems(prev => prev.filter(item => String(item.id) !== String(itemId)));
      return true;
    } catch (err) {
      setCartError(err.message);
      return false;
    } finally {
      setIsCartLoading(false);
    }
  }, []);

  /**
   * Vacía el carrito completamente
   */
  const clearCart = useCallback(async () => {
    try {
      setIsCartLoading(true);
      setCartError(null);
      setCartItems([]);
      return true;
    } catch (err) {
      setCartError(err.message);
      return false;
    } finally {
      setIsCartLoading(false);
    }
  }, []);

  /**
   * Información calculada del carrito
   */
  const cartInfo = {
    items: cartItems,
    itemsCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    cartSubtotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cartTotal: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cartTax: 0,
    isEmpty: cartItems.length === 0,
  };

  const value = {
    cart: cartItems,
    cartInfo,
    isCartLoading,
    cartError,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart: () => {}, // no-op, cart is local
    goToCheckout: () => { window.location.href = '/checkout'; },
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto del carrito
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    if (process.env.NODE_ENV === 'development') {
    }

    return {
      cart: [],
      cartInfo: {
        items: [],
        itemsCount: 0,
        cartSubtotal: 0,
        cartTotal: 0,
        cartTax: 0,
        isEmpty: true,
      },
      isCartLoading: false,
      cartError: null,
      addToCart: async () => false,
      updateQuantity: async () => false,
      removeFromCart: async () => false,
      clearCart: async () => false,
      fetchCart: () => {},
      goToCheckout: () => {},
    };
  }

  return context;
};