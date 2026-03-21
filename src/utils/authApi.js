/**
 * Utilidad para realizar peticiones autenticadas con JWT
 * Incluye automáticamente el header Authorization: Bearer ${token}
 */

const BASE_URL = import.meta.env.VITE_WP_URL;

/**
 * Realiza una petición autenticada con JWT
 * @param {string} endpoint - URL del endpoint (relativa a BASE_URL)
 * @param {Object} options - Opciones de fetch
 * @param {string} token - Token JWT del usuario
 * @returns {Promise<Response>}
 */
export const authenticatedFetch = async (endpoint, options = {}, token) => {
  if (!token) {
    throw new Error('Token JWT requerido para realizar peticiones autenticadas');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
};

/**
 * GET request autenticado
 * @param {string} endpoint - URL del endpoint
 * @param {string} token - Token JWT
 * @returns {Promise<any>}
 */
export const authGet = async (endpoint, token) => {
  const response = await authenticatedFetch(endpoint, { method: 'GET' }, token);
  
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * POST request autenticado
 * @param {string} endpoint - URL del endpoint
 * @param {Object} data - Datos a enviar
 * @param {string} token - Token JWT
 * @returns {Promise<any>}
 */
export const authPost = async (endpoint, data, token) => {
  const response = await authenticatedFetch(
    endpoint,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    token
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Error: ${response.statusText}`);
  }

  return response.json();
};

/**
 * PUT request autenticado
 * @param {string} endpoint - URL del endpoint
 * @param {Object} data - Datos a actualizar
 * @param {string} token - Token JWT
 * @returns {Promise<any>}
 */
export const authPut = async (endpoint, data, token) => {
  const response = await authenticatedFetch(
    endpoint,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    token
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Error: ${response.statusText}`);
  }

  return response.json();
};

/**
 * DELETE request autenticado
 * @param {string} endpoint - URL del endpoint
 * @param {string} token - Token JWT
 * @returns {Promise<any>}
 */
export const authDelete = async (endpoint, token) => {
  const response = await authenticatedFetch(
    endpoint,
    { method: 'DELETE' },
    token
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Error: ${response.statusText}`);
  }

  return response.json();
};

/**
 * EJEMPLO DE USO:
 * 
 * import { useAuth } from '@/context/AuthContext';
 * import { authGet, authPost, authPut, authDelete } from '@/utils/authApi';
 * 
 * function MiComponente() {
 *   const { token, user } = useAuth();
 *   
 *   // GET request privado
 *   const obtenerPerfil = async () => {
 *     try {
 *       const perfil = await authGet('/wp/v2/users/me', token);
 *       console.log('Perfil:', perfil);
 *     } catch (error) {
 *       console.error('Error:', error);
 *     }
 *   };
 *   
 *   // POST request privado
 *   const crearPedido = async (pedidoData) => {
 *     try {
 *       const resultado = await authPost('/wp-json/wc/v3/orders', pedidoData, token);
 *       console.log('Pedido creado:', resultado);
 *     } catch (error) {
 *       console.error('Error:', error);
 *     }
 *   };
 *   
 *   // PUT request privado
 *   const actualizarPerfil = async (datosActuales) => {
 *     try {
 *       const resultado = await authPut('/wp/v2/users/' + user?.id, datosActuales, token);
 *       console.log('Perfil actualizado:', resultado);
 *     } catch (error) {
 *       console.error('Error:', error);
 *     }
 *   };
 *   
 *   // DELETE request privado
 *   const eliminar = async (id) => {
 *     try {
 *       const resultado = await authDelete('/wp-json/wc/v3/orders/' + id, token);
 *       console.log('Eliminado:', resultado);
 *     } catch (error) {
 *       console.error('Error:', error);
 *     }
 *   };
 *   
 *   return (
 *     // ... rest of component
 *   );
 * }
 */
