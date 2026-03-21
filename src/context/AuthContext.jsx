import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_WP_URL;

  // Estados del Contexto de Autenticación
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * useEffect inicial: Verifica si existe una sesión guardada
   * Si existe, obtiene los datos del usuario autenticado
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('homelife_user');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setError(null);
        }
      } catch (err) {
        console.error('Error al inicializar autenticación:', err);
        localStorage.removeItem('homelife_user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [BASE_URL]);

  /**
   * Función login(username, password)
   * Realiza un fetch POST al endpoint de autenticación
   * @param {string} username - Email o nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<boolean>} - true si el login fue exitoso
   */
  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔐 Login intento:', {
        endpoint: `${BASE_URL}/wp-json/homelife/v1/login`,
        body: { username, password },
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await fetch(`${BASE_URL}/wp-json/homelife/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Incluir cookies si la API las devuelve
        body: JSON.stringify({
          username,
          password,
        }),
      });

      console.log('📩 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        let errorMessage = 'Error al iniciar sesión';
        try {
          const errorData = await response.json();
          console.error('❌ Error completo:', errorData);
          errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
        } catch (e) {
          const textError = await response.text();
          errorMessage = textError || `Error ${response.status}: ${response.statusText}`;
        }
        setError(errorMessage);
        setLoading(false);
        return false;
      }

      const data = await response.json();
      console.log('✅ Respuesta completa del servidor:', data);

      // Transformar respuesta del servidor al formato esperado
      const userData = {
        id: data.user_id,
        username: data.username,
        email: data.email,
        name: data.display_name || `${data.first_name} ${data.last_name}`.trim(),
        first_name: data.first_name,
        last_name: data.last_name,
        avatar_url: data.avatar_url,
        billing: data.billing,
        shipping: data.shipping,
      };

      localStorage.setItem('homelife_user', JSON.stringify(userData));
      setUser(userData);

      setError(null);
      setLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Error desconocido al iniciar sesión';
      setError(errorMessage);
      console.error('🔴 Login error:', err);
      setLoading(false);
      return false;
    }
  };

  /**
   * Función register(userData)
   * Realiza un fetch POST al endpoint de registro de WooCommerce
   * Si el registro es exitoso, inicia sesión automáticamente
   *
   * @param {Object} userData - Objeto con los datos del usuario
   *   - email: string (requerido)
   *   - first_name: string
   *   - last_name: string
   *   - username: string (requerido)
   *   - password: string (requerido)
   *   - billing: Object (opcional)
   *     - address_1: string
   *     - city: string
   *     - country: string
   * @returns {Promise<boolean>} - true si el registro fue exitoso
   */
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const {
        email,
        first_name,
        last_name,
        username,
        password,
        billing,
      } = userData;

      // Validaciones básicas
      if (!email || !username || !password) {
        setError('Email, username y password son requeridos');
        setLoading(false);
        return false;
      }

      const registrationData = {
        email,
        first_name: first_name || '',
        last_name: last_name || '',
        username,
        password,
      };

      if (billing) {
        registrationData.billing = billing;
      }

      // Endpoint: POST /wp-json/homelife/v1/registro
      const response = await fetch(`${BASE_URL}/wp-json/homelife/v1/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error al registrar usuario');
        setLoading(false);
        return false;
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);

      // Intenta iniciar sesión automáticamente después del registro
      const loginSuccess = await login(username, password);

      if (!loginSuccess) {
        setError('Registro exitoso pero hubo un error al iniciar sesión');
        setLoading(false);
        return false;
      }

      setError(null);
      setLoading(false);
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Error desconocido al registrar';
      setError(errorMessage);
      console.error('Register error:', err);
      setLoading(false);
      return false;
    }
  };

  /**
   * Función logout()
   * Elimina la sesión del usuario
   */
  const logout = () => {
    localStorage.removeItem('homelife_user');
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto de autenticación
 * @returns {Object} - Objeto con user, loading, error, login, register, logout, isAuthenticated
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('useAuth debe ser usado dentro de un AuthProvider');
    }
    
    return {
      user: null,
      loading: true,
      error: null,
      login: async () => false,
      register: async () => false,
      logout: () => {},
      isAuthenticated: false,
    };
  }
  
  return context;
};
