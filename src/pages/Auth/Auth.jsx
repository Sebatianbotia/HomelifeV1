import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DEPARTAMENTOS, CITIES_BY_DEPT } from '../../utils/colombiaData';
import useSEO from '../../utils/useSEO';
import './Auth.css';

const EMPTY_ADDRESS = {
  first_name: '',
  last_name: '',
  address_1: '',
  address_2: '',
  city: '',
  postcode: '',
  country: 'CO',
  state: '',
  phone: '',
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Account fields
  const [account, setAccount] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    cc: '',
  });

  // Billing & Shipping
  const [billing, setBilling] = useState({ ...EMPTY_ADDRESS, email: '' });
  const [shipping, setShipping] = useState({ ...EMPTY_ADDRESS });
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, register: registerUser, error: authError } = useAuth();
  const navigate = useNavigate();

  const seo = useSEO({ title: 'Iniciar Sesión / Registro', description: '', noIndex: true });

  // Generic handler for account fields
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccount(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Generic handler for billing fields
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling(prev => ({ ...prev, [name]: value, ...(name === 'state' ? { city: '' } : {}) }));
    setError('');
  };

  // Generic handler for shipping fields
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value, ...(name === 'state' ? { city: '' } : {}) }));
    setError('');
  };

  // Validation
  const validateRegistration = () => {
    // Account
    if (!account.first_name.trim()) return 'El nombre es requerido';
    if (!account.last_name.trim()) return 'El apellido es requerido';
    if (!account.username.trim()) return 'El usuario es requerido';
    if (!account.cc.trim()) return 'La Cédula / NIT es requerida';
    if (!account.email.trim()) return 'El correo electrónico es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(account.email)) return 'El correo electrónico no es válido';
    if (!account.password) return 'La contraseña es requerida';
    if (account.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (account.password !== account.confirmPassword) return 'Las contraseñas no coinciden';

    // Billing required fields
    if (!billing.first_name.trim()) return 'Nombre de facturación es requerido';
    if (!billing.last_name.trim()) return 'Apellido de facturación es requerido';
    if (!billing.address_1.trim()) return 'Dirección de facturación es requerida';
    if (!billing.city.trim()) return 'Ciudad de facturación es requerida';
    if (!billing.state) return 'Departamento de facturación es requerido';
    if (!billing.phone.trim()) return 'Teléfono de facturación es requerido';

    // Shipping (only if not same as billing)
    if (!sameAsBilling) {
      if (!shipping.first_name.trim()) return 'Nombre de envío es requerido';
      if (!shipping.last_name.trim()) return 'Apellido de envío es requerido';
      if (!shipping.address_1.trim()) return 'Dirección de envío es requerida';
      if (!shipping.city.trim()) return 'Ciudad de envío es requerida';
      if (!shipping.state) return 'Departamento de envío es requerido';
      if (!shipping.phone.trim()) return 'Teléfono de envío es requerido';
    }

    return null;
  };

  /**
   * Traduce errores técnicos de la API a mensajes amigables para el usuario
   */
  const mapAuthError = (errMessage) => {
    if (!errMessage) return 'Ha ocurrido un error inesperado. Inténtalo de nuevo.';
    
    // Convertir a minúsculas para facilitar la búsqueda
    const msg = errMessage.toLowerCase();

    if (msg.includes('username_exists') || msg.includes('ya existe un nombre de usuario')) {
      return 'Este nombre de usuario ya está en uso. Por favor, elige otro.';
    }
    if (msg.includes('email_exists') || msg.includes('ya existe una cuenta con tu dirección de correo')) {
      return 'Este correo electrónico ya está registrado. Si es tuyo, intenta iniciar sesión.';
    }
    if (msg.includes('invalid_username') || msg.includes('nombre de usuario no válido')) {
      return 'El nombre de usuario contiene caracteres no permitidos.';
    }
    if (msg.includes('password') || msg.includes('contraseña')) {
      if (msg.includes('incorrect') || msg.includes('incorrecta')) return 'La contraseña es incorrecta.';
      if (msg.includes('empty')) return 'La contraseña no puede estar vacía.';
    }
    if (msg.includes('invalid_email')) {
      return 'La dirección de correo electrónico no es válida.';
    }
    if (msg.includes('user_not_found') || msg.includes('usuario no encontrado') || msg.includes('invalid_username')) {
      return 'El usuario no existe o los datos son incorrectos.';
    }
    if (msg.includes('fetch') || msg.includes('network') || msg.includes('conexión')) {
      return 'Error de conexión. Verifica tu internet e inténtalo de nuevo.';
    }

    // Mensaje por defecto si no hay coincidencia clara
    return errMessage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        if (!account.username || !account.password) {
          throw new Error('Por favor completa todos los campos.');
        }

        const loginSuccess = await login(account.username, account.password);

        if (loginSuccess) {
          navigate('/cuenta');
        } else {
          throw new Error(mapAuthError(authError) || 'Error al iniciar sesión');
        }
      } else {
        // Validate registration
        const validationError = validateRegistration();
        if (validationError) {
          throw new Error(validationError);
        }

        // Build shipping data
        let shippingData;
        if (sameAsBilling) {
          shippingData = { ...billing };
          delete shippingData.email; // Shipping no usa email en WooCommerce
        } else {
          shippingData = { ...shipping };
        }

        // Build WooCommerce-native payload
        const payload = {
          username: account.username.trim(),
          email: account.email.trim(),
          password: account.password,
          first_name: account.first_name.trim(),
          last_name: account.last_name.trim(),
          cc: account.cc.trim(),
          billing: {
            first_name: billing.first_name.trim(),
            last_name: billing.last_name.trim(),
            address_1: billing.address_1.trim(),
            address_2: billing.address_2.trim(),
            city: billing.city.trim(),
            postcode: billing.postcode.trim(),
            country: 'CO',
            state: billing.state,
            phone: billing.phone.trim(),
            email: billing.email.trim() || account.email.trim(),
          },
          shipping: {
            first_name: shippingData.first_name.trim(),
            last_name: shippingData.last_name.trim(),
            address_1: shippingData.address_1.trim(),
            address_2: (shippingData.address_2 || '').trim(),
            city: shippingData.city.trim(),
            postcode: (shippingData.postcode || '').trim(),
            country: 'CO',
            state: shippingData.state,
            phone: (shippingData.phone || '').trim(),
          },
        };


        const regSuccess = await registerUser(payload);

        if (regSuccess) {
          setSuccess('¡Registro exitoso! Ya puedes iniciar sesión.');
          setIsLogin(true);
          // Reset
          setAccount({ username: '', email: '', password: '', confirmPassword: '', first_name: '', last_name: '', cc: '' });
          setBilling({ ...EMPTY_ADDRESS, email: '' });
          setShipping({ ...EMPTY_ADDRESS });
          setSameAsBilling(true);
        } else {
          throw new Error(mapAuthError(authError) || 'Error al registrar usuario');
        }
      }
    } catch (err) {
      setError(mapAuthError(err.message));
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill billing name when account name changes
  const handleFirstNameBlur = () => {
    if (!billing.first_name && account.first_name) {
      setBilling(prev => ({ ...prev, first_name: account.first_name }));
    }
  };
  const handleLastNameBlur = () => {
    if (!billing.last_name && account.last_name) {
      setBilling(prev => ({ ...prev, last_name: account.last_name }));
    }
  };

  // Render an address section (billing or shipping)
  const renderAddressSection = (title, icon, data, onChange, prefix) => (
    <div className="register-section">
      <h3 className="register-section-title">
        {icon}
        {title}
      </h3>
      <div className="register-grid">
        <div className="reg-field">
          <label>Nombre *</label>
          <input type="text" name="first_name" value={data.first_name} onChange={onChange} placeholder="Juan" disabled={loading} />
        </div>
        <div className="reg-field">
          <label>Apellido *</label>
          <input type="text" name="last_name" value={data.last_name} onChange={onChange} placeholder="Pérez" disabled={loading} />
        </div>
        <div className="reg-field">
          <label>Teléfono *</label>
          <input type="tel" name="phone" value={data.phone} onChange={onChange} placeholder="313 401 2845" disabled={loading} />
        </div>
        <div className="reg-field full">
          <label>Dirección *</label>
          <input type="text" name="address_1" value={data.address_1} onChange={onChange} placeholder="Carrera 48 #101A-09" disabled={loading} />
        </div>
        <div className="reg-field full">
          <label>Complemento</label>
          <input type="text" name="address_2" value={data.address_2} onChange={onChange} placeholder="Apto, casa, bodega (opcional)" disabled={loading} />
        </div>
        <div className="reg-field">
          <label>Ciudad *</label>
          <select name="city" value={data.city} onChange={onChange} disabled={loading || !data.state}>
            <option value="">{data.state ? 'Selecciona ciudad' : 'Selecciona un departamento'}</option>
            {data.state && CITIES_BY_DEPT[data.state]?.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="reg-field">
          <label>Departamento *</label>
          <select name="state" value={data.state} onChange={onChange} disabled={loading}>
            {DEPARTAMENTOS.map(d => (
              <option key={d.code} value={d.code}>{d.label}</option>
            ))}
          </select>
        </div>
        <div className="reg-field">
          <label>Código Postal</label>
          <input type="text" name="postcode" value={data.postcode} onChange={onChange} placeholder="110111" disabled={loading} />
        </div>
        <div className="reg-field">
          <label>País</label>
          <input type="text" value="Colombia" disabled className="field-disabled" />
        </div>
        {prefix === 'billing' && (
          <div className="reg-field full">
            <label>Correo de facturación</label>
            <input type="email" name="email" value={data.email} onChange={onChange} placeholder="Mismo correo de la cuenta si se deja vacío" disabled={loading} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="auth-page">
      {seo}
      <div className={`auth-container ${!isLogin ? 'register-mode' : ''}`}>
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
              {/* ═══ LOGIN ═══ */}
              {isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="login-username">Usuario</label>
                    <input
                      type="text"
                      id="login-username"
                      name="username"
                      placeholder="Nombre de usuario o email"
                      value={account.username}
                      onChange={handleAccountChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="login-password">Contraseña</label>
                    <input
                      type="password"
                      id="login-password"
                      name="password"
                      placeholder="••••••••"
                      value={account.password}
                      onChange={handleAccountChange}
                      required
                    />
                  </div>
                  <div className="auth-options">
                    <label className="remember-me">
                      <input type="checkbox" /> Recordarme
                    </label>
                    <button type="button" className="forgot-password">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                </>
              )}

              {/* ═══ REGISTER ═══ */}
              {!isLogin && (
                <>
                  {/* Section 1: Account Data */}
                  <div className="register-section">
                    <h3 className="register-section-title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Datos de Cuenta
                    </h3>
                    <div className="register-grid">
                      <div className="reg-field">
                        <label>Nombre *</label>
                        <input
                          type="text" name="first_name" value={account.first_name}
                          onChange={handleAccountChange} onBlur={handleFirstNameBlur}
                          placeholder="Juan" disabled={loading}
                        />
                      </div>
                      <div className="reg-field">
                        <label>Apellido *</label>
                        <input
                          type="text" name="last_name" value={account.last_name}
                          onChange={handleAccountChange} onBlur={handleLastNameBlur}
                          placeholder="Pérez" disabled={loading}
                        />
                      </div>
                      <div className="reg-field">
                        <label>Cédula / NIT *</label>
                        <input
                          type="text" name="cc" value={account.cc}
                          onChange={handleAccountChange}
                          placeholder="Identificación" disabled={loading}
                        />
                      </div>
                      <div className="reg-field">
                        <label>Usuario *</label>
                        <input
                          type="text" name="username" value={account.username}
                          onChange={handleAccountChange}
                          placeholder="juanperez99" disabled={loading}
                        />
                      </div>
                      <div className="reg-field">
                        <label>Correo Electrónico *</label>
                        <input
                          type="email" name="email" value={account.email}
                          onChange={handleAccountChange}
                          placeholder="juan@ejemplo.com" disabled={loading}
                        />
                      </div>
                      <div className="reg-field">
                        <label>Contraseña *</label>
                        <input
                          type="password" name="password" value={account.password}
                          onChange={handleAccountChange}
                          placeholder="Mínimo 6 caracteres" disabled={loading}
                        />
                      </div>
                      <div className="reg-field">
                        <label>Confirmar Contraseña *</label>
                        <input
                          type="password" name="confirmPassword" value={account.confirmPassword}
                          onChange={handleAccountChange}
                          placeholder="Repite la contraseña" disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Billing */}
                  {renderAddressSection(
                    'Datos de Facturación',
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>,
                    billing,
                    handleBillingChange,
                    'billing'
                  )}

                  {/* Checkbox: same as billing */}
                  <label className="same-address-check">
                    <input
                      type="checkbox"
                      checked={sameAsBilling}
                      onChange={(e) => setSameAsBilling(e.target.checked)}
                      disabled={loading}
                    />
                    <span className="check-custom"></span>
                    <span>Enviar a la misma dirección de facturación</span>
                  </label>

                  {/* Section 3: Shipping (only if different) */}
                  {!sameAsBilling && renderAddressSection(
                    'Datos de Envío',
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>,
                    shipping,
                    handleShippingChange,
                    'shipping'
                  )}
                </>
              )}

              <button
                type="submit"
                className={`auth-submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Cargando...' : (isLogin ? 'Entrar' : 'Crear Cuenta')}
              </button>
            </form>

            {isLogin && (
              <>
                <div className="auth-divider">
                  <span>O continúa con</span>
                </div>
                <div className="social-auth">
                  <button className="social-btn google">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#EA4335" d="M12 5.04c1.94 0 3.51.68 4.79 1.9L20.5 3.25C18.23 1.13 15.34 0 12 0 7.31 0 3.25 2.68 1.25 6.63l4.31 3.34c1-2.98 3.79-4.93 6.44-4.93z" />
                      <path fill="#FBBC05" d="M1.25 6.63C.45 8.21 0 9.99 0 12c0 2.01.45 3.79 1.25 5.37l4.31-3.34c-.26-.63-.44-1.33-.44-2.03 0-.7.18-1.4.44-2.03L1.25 6.63z" />
                      <path fill="#4285F4" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.83-2.97c-.89.58-2.02.94-3.32.94-2.55 0-4.71-1.73-5.48-4.06l-4.31 3.34C3.25 21.32 7.31 24 12 24z" />
                      <path fill="#34A853" d="M22.25 10.5H12v4.5h5.92c-.26 1.34-1.02 2.47-2.16 3.23l3.83 2.97C22.06 18.9 24 15.75 24 12c0-.52-.05-1.03-.14-1.5h-1.61z" />
                    </svg>
                    Google
                  </button>
                  <button className="social-btn facebook">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
