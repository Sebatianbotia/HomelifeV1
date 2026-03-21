/**
 * Auth Service
 * Maneja todas las peticiones relacionadas con autenticación
 * Usa JWT y la API de WooCommerce
 */

const BASE_URL = import.meta.env.VITE_WP_URL;

/**
 * DOCUMENTACIÓN DE ENDPOINTS:
 * 
 * 1. Login:
 *    POST /wp-json/homelife/v1/login
 *    Headers: { 'Content-Type': 'application/json' }
 *    Body: { username: string, password: string }
 *    Response: { token: string, user_email: string, user_nicename: string, ... }
 * 
 * 2. Registro (Custom Endpoint):
 *    POST /wp-json/homelife/v1/registro
 *    Headers: { 'Content-Type': 'application/json' }
 *    Body: { email, first_name, last_name, username, password, billing? }
 *    Response: { id: number, username: string, email: string, ... }
 * 
 * 3. Obtener Usuario Actual (Requiere Token):
 *    GET /wp/v2/users/me
 *    Headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
 *    Response: { id, username, email, first_name, last_name, avatar_urls, ... }
 */

export const authService = {
  /**
   * Login con credenciales de usuario
   * @param {string} username - Username o email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<{token: string, user_email: string, user_nicename: string}>}
   * @throws {Error} Si las credenciales son inválidas
   */
  login: async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/wp-json/homelife/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales inválidas');
      }

      const data = await response.json();
      return {
        token: data.token,
        user_email: data.user_email,
        user_nicename: data.user_nicename,
      };
    } catch (error) {
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  },

  /**
   * Obtener información del usuario autenticado
   * @param {string} token - JWT token
   * @returns {Promise<Object>} - Datos del usuario
   * @throws {Error} Si el token es inválido
   */
  getCurrentUser: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/wp/v2/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Token inválido o expirado');
      }

      const userData = await response.json();
      return {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        avatar_url: userData.avatar_urls?.[24],
      };
    } catch (error) {
      throw new Error(error.message || 'Error al obtener datos del usuario');
    }
  },

  /**
   * Registrar nuevo usuario
   * @param {Object} userData - Datos del usuario
   *   - email: string (requerido)
   *   - first_name: string
   *   - last_name: string
   *   - username: string (requerido)
   *   - password: string (requerido)
   *   - billing: Object (opcional)
   * @returns {Promise<Object>} - Datos del usuario registrado
   * @throws {Error} Si hay error en el registro
   */
  register: async (userData) => {
    try {
      const {
        email,
        first_name = '',
        last_name = '',
        username,
        password,
        billing,
      } = userData;

      // Validaciones
      if (!email || !username || !password) {
        throw new Error('Email, username y password son requeridos');
      }

      const registrationData = {
        email,
        first_name,
        last_name,
        username,
        password,
      };

      if (billing) {
        registrationData.billing = billing;
      }

      const response = await fetch(`${BASE_URL}/wp-json/homelife/v1/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar usuario');
      }

      const data = await response.json();
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      };
    } catch (error) {
      throw new Error(error.message || 'Error en el registro');
    }
  },
};
