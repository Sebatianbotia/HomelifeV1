/**
 * Auth Service
 * Handles API calls for authentication.
 * Replace API_URL with your actual backend URL.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authService = {
  /**
   * Login user
   * @param {Object} credentials { email, password }
   */
  login: async (credentials) => {
    // SIMULATION - Replace with actual fetch call:
    // const response = await fetch(`${API_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials)
    // });
    // if (!response.ok) throw new Error('Credenciales incorrectas');
    // return await response.json();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
          resolve({
            id: '1',
            name: 'Usuario Demo',
            email: credentials.email,
            token: 'fake-jwt-token'
          });
        } else {
          reject(new Error('Email o contraseña incorrectos. Prueba con user@example.com / password123'));
        }
      }, 1500);
    });
  },

  /**
   * Register user
   * @param {Object} userData { name, email, password }
   */
  register: async (userData) => {
    // SIMULATION - Replace with actual fetch call:
    // const response = await fetch(`${API_URL}/auth/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    // if (!response.ok) throw new Error('Error al registrar usuario');
    // return await response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '2',
          name: userData.name,
          email: userData.email,
          token: 'fake-jwt-token-new'
        });
      }, 1500);
    });
  },

  /**
   * Social Login simulation
   */
  socialLogin: async (provider) => {
    console.log(`Logging in with ${provider}`);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id: '3', name: 'Social User', email: 'social@example.com' }), 1000);
    });
  }
};
