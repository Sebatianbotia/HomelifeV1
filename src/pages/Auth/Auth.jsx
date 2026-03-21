import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    billing: {
      address_1: '',
      city: '',
      country: ''
    }
  });
  const [showBilling, setShowBilling] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, register: registerUser, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested billing fields
    if (name.startsWith('billing_')) {
      const billingField = name.replace('billing_', '');
      setFormData(prev => ({
        ...prev,
        billing: {
          ...prev.billing,
          [billingField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError(''); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Validation
        if (!formData.username || !formData.password) {
          throw new Error('Por favor completa todos los campos.');
        }
        
        const success = await login(formData.username, formData.password);
        
        if (success) {
          navigate('/cuenta');
        } else {
          throw new Error(authError || 'Error al iniciar sesión');
        }
      } else {
        // Register Validation
        if (!formData.first_name || !formData.last_name || !formData.username || !formData.email || !formData.password) {
          throw new Error('Por favor completa todos los campos obligatorios.');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Las contraseñas no coinciden.');
        }
        if (formData.password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }

        // Prepare registration data
        const registrationData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
        };

        // Add billing if user filled it
        if (showBilling && (formData.billing.address_1 || formData.billing.city || formData.billing.country)) {
          registrationData.billing = formData.billing;
        }

        const success = await registerUser(registrationData);

        if (success) {
          setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
          setIsLogin(true); // Switch to login
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            first_name: '',
            last_name: '',
            billing: {
              address_1: '',
              city: '',
              country: ''
            }
          });
        } else {
          throw new Error(authError || 'Error al registrar usuario');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Iniciar Sesión
              </button>
              <button 
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Registrarse
              </button>
            </div>
          </div>

          <div className="auth-body">
            <h2 className="auth-title">
              {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
            </h2>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Ingresa tus credenciales para acceder a tu panel.' 
                : 'Únete a nuestra comunidad y maneja tus equipos médicos.'}
            </p>

            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="first_name">Nombre</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="Ej. Juan"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name">Apellido</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Ej. Pérez"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Nombre de usuario"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="usuario@ejemplo.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}

              {isLogin && (
                <div className="form-group">
                  <label htmlFor="username">Usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nombre de usuario o email"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              {!isLogin && (
                <>
                  <div className="form-divider">
                    <button
                      type="button"
                      className="billing-toggle"
                      onClick={() => setShowBilling(!showBilling)}
                    >
                      {showBilling ? '▼' : '▶'} Datos de Facturación (Opcional)
                    </button>
                  </div>

                  {showBilling && (
                    <div className="billing-section">
                      <div className="form-group">
                        <label htmlFor="address_1">Dirección</label>
                        <input
                          type="text"
                          id="address_1"
                          name="billing_address_1"
                          placeholder="Ej. Calle Falsa 123"
                          value={formData.billing.address_1}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="city">Ciudad</label>
                          <input
                            type="text"
                            id="city"
                            name="billing_city"
                            placeholder="Ej. Madrid"
                            value={formData.billing.city}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="country">País</label>
                          <input
                            type="text"
                            id="country"
                            name="billing_country"
                            placeholder="Ej. ES"
                            value={formData.billing.country}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {isLogin && (
                <div className="auth-options">
                  <label className="remember-me">
                    <input type="checkbox" /> Recordarme
                  </label>
                  <button type="button" className="forgot-password">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                className={`auth-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Cargando...' : (isLogin ? 'Entrar' : 'Crear Cuenta')}
              </button>
            </form>

            <div className="auth-divider">
              <span>O continúa con</span>
            </div>

            <div className="social-auth">
              <button 
                className="social-btn google"
                onClick={() => authService.socialLogin('Google')}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#EA4335" d="M12 5.04c1.94 0 3.51.68 4.79 1.9L20.5 3.25C18.23 1.13 15.34 0 12 0 7.31 0 3.25 2.68 1.25 6.63l4.31 3.34c1-2.98 3.79-4.93 6.44-4.93z"/>
                  <path fill="#FBBC05" d="M1.25 6.63C.45 8.21 0 9.99 0 12c0 2.01.45 3.79 1.25 5.37l4.31-3.34c-.26-.63-.44-1.33-.44-2.03 0-.7.18-1.4.44-2.03L1.25 6.63z"/>
                  <path fill="#4285F4" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.83-2.97c-.89.58-2.02.94-3.32.94-2.55 0-4.71-1.73-5.48-4.06l-4.31 3.34C3.25 21.32 7.31 24 12 24z"/>
                  <path fill="#34A853" d="M12 24l-4.31-3.34C6.92 18.6 6.09 16.41 6 14.07l-4.31 3.34C3.25 21.32 7.31 24 12 24z" opacity=".1"/>
                  <path fill="#34A853" d="M22.25 10.5H12v4.5h5.92c-.26 1.34-1.02 2.47-2.16 3.23l3.83 2.97C22.06 18.9 24 15.75 24 12c0-.52-.05-1.03-.14-1.5h-1.61z"/>
                </svg>
                Google
              </button>
              <button 
                className="social-btn facebook"
                onClick={() => authService.socialLogin('Facebook')}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
