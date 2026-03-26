import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HistorialPedidos from '../../components/HistorialPedidos/HistorialPedidos';
import { getMisPedidos, actualizarUsuario } from '../../services/homelifeService';
import './Cuenta.css';

const DEPARTAMENTOS = [
  { code: '', label: 'Selecciona departamento' },
  { code: 'AMA', label: 'Amazonas' },
  { code: 'ANT', label: 'Antioquia' },
  { code: 'ARA', label: 'Arauca' },
  { code: 'ATL', label: 'Atlántico' },
  { code: 'BOL', label: 'Bolívar' },
  { code: 'BOY', label: 'Boyacá' },
  { code: 'CAL', label: 'Caldas' },
  { code: 'CAQ', label: 'Caquetá' },
  { code: 'CAS', label: 'Casanare' },
  { code: 'CAU', label: 'Cauca' },
  { code: 'CES', label: 'Cesar' },
  { code: 'CHO', label: 'Chocó' },
  { code: 'COR', label: 'Córdoba' },
  { code: 'CUN', label: 'Cundinamarca' },
  { code: 'DC', label: 'Bogotá D.C.' },
  { code: 'GUA', label: 'Guainía' },
  { code: 'GUV', label: 'Guaviare' },
  { code: 'HUI', label: 'Huila' },
  { code: 'LAG', label: 'La Guajira' },
  { code: 'MAG', label: 'Magdalena' },
  { code: 'MET', label: 'Meta' },
  { code: 'NAR', label: 'Nariño' },
  { code: 'NSA', label: 'Norte de Santander' },
  { code: 'PUT', label: 'Putumayo' },
  { code: 'QUI', label: 'Quindío' },
  { code: 'RIS', label: 'Risaralda' },
  { code: 'SAP', label: 'San Andrés y Providencia' },
  { code: 'SAN', label: 'Santander' },
  { code: 'SUC', label: 'Sucre' },
  { code: 'TOL', label: 'Tolima' },
  { code: 'VAC', label: 'Valle del Cauca' },
  { code: 'VAU', label: 'Vaupés' },
  { code: 'VID', label: 'Vichada' },
];

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

const Cuenta = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [account, setAccount] = useState({ first_name: '', last_name: '', email: '', cc: '' });
  const [billing, setBilling] = useState({ ...EMPTY_ADDRESS, email: '' });
  const [shipping, setShipping] = useState({ ...EMPTY_ADDRESS });
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!isAuthenticated) return;
      setOrdersLoading(true);
      try {
        const pedidos = await getMisPedidos();
        setRecentOrders(pedidos);
      } catch (err) {
        console.error('Error fetching dashboard orders:', err);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchRecentOrders();
  }, [isAuthenticated]);

  const resetFormFields = () => {
    if (user) {
      setAccount({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        cc: user.cc || '',
      });
      setBilling({
        first_name: user.billing?.first_name || '',
        last_name: user.billing?.last_name || '',
        address_1: user.billing?.address_1 || '',
        address_2: user.billing?.address_2 || '',
        city: user.billing?.city || '',
        state: user.billing?.state || '',
        postcode: user.billing?.postcode || '',
        country: user.billing?.country || 'CO',
        phone: user.billing?.phone || '',
        email: user.billing?.email || user.email || '',
      });
      
      const hasShippingData = Object.keys(user.shipping || {}).some(k => k !== 'country' && user.shipping[k]);
      
      if (hasShippingData) {
        setShipping({
          first_name: user.shipping?.first_name || '',
          last_name: user.shipping?.last_name || '',
          address_1: user.shipping?.address_1 || '',
          address_2: user.shipping?.address_2 || '',
          city: user.shipping?.city || '',
          state: user.shipping?.state || '',
          postcode: user.shipping?.postcode || '',
          country: user.shipping?.country || 'CO',
          phone: user.shipping?.phone || '',
        });
        setSameAsBilling(false);
      } else {
        setShipping({ ...EMPTY_ADDRESS });
        setSameAsBilling(true);
      }
    }
  };

  useEffect(() => {
    resetFormFields();
  }, [user]);

  const handleAccountChange = (e) => setAccount(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBillingChange = (e) => setBilling(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleShippingChange = (e) => setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);

    try {
      const ENDPOINT = `${BASE_URL}/wp-json/homelife/v1/actualizar-usuario`;
      
      let finalShipping = {};
      if (sameAsBilling) {
        finalShipping = { ...billing };
        delete finalShipping.email;
      } else {
        finalShipping = { ...shipping };
      }

      const payload = {
        user_id: user.id,
        first_name: account.first_name.trim(),
        last_name: account.last_name.trim(),
        email: account.email.trim(),
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
          first_name: finalShipping.first_name.trim(),
          last_name: finalShipping.last_name.trim(),
          address_1: finalShipping.address_1.trim(),
          address_2: finalShipping.address_2.trim(),
          city: finalShipping.city.trim(),
          postcode: finalShipping.postcode.trim(),
          country: 'CO',
          state: finalShipping.state,
          phone: finalShipping.phone.trim(),
        }
      };

      const data = await actualizarUsuario(payload);

      if (data.success || data.id) {
        const updatedUser = {
          ...user,
          first_name: payload.first_name,
          last_name: payload.last_name,
          name: `${payload.first_name} ${payload.last_name}`.trim(),
          email: payload.email,
          cc: payload.cc,
          billing: {
            ...user.billing,
            ...payload.billing
          },
          shipping: {
            ...user.shipping,
            ...payload.shipping
          }
        };
        localStorage.setItem('homelife_user', JSON.stringify(updatedUser));
        setSaveMessage({ type: 'success', text: '¡Datos actualizados correctamente!' });
        setIsEditing(false);
      } else {
        setSaveMessage({ type: 'error', text: data.message || 'Error al actualizar datos.' });
      }
    } catch (err) {
      console.error('Error guardando perfil:', err);
      setSaveMessage({ type: 'error', text: 'Error de conexión. Inténtalo de nuevo.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    resetFormFields();
    setIsEditing(false);
    setSaveMessage(null);
  };

  if (loading) return <div className="loading-screen">Cargando perfil...</div>;
  if (!user) return null;

  const userName = user.name || user.display_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Usuario';
  const userInitial = userName.charAt(0).toUpperCase();
  const userFirstName = userName.split(' ')[0];

  const getStateLabel = (code) => {
    const d = DEPARTAMENTOS.find(dept => dept.code === code);
    return d ? d.label : code;
  };

  const renderAddressSection = (title, icon, data, onChange, prefix) => (
    <div className="datos-card">
      <h3 className="datos-card-title">
        {icon}
        {title}
      </h3>
      <div className="datos-grid">
        <div className="dato-group">
          <label>Nombre *</label>
          {isEditing ? <input type="text" name="first_name" value={data.first_name} onChange={onChange} disabled={saving} required /> : <p className="dato-value">{data.first_name || '—'}</p>}
        </div>
        <div className="dato-group">
          <label>Apellido *</label>
          {isEditing ? <input type="text" name="last_name" value={data.last_name} onChange={onChange} disabled={saving} required /> : <p className="dato-value">{data.last_name || '—'}</p>}
        </div>
        <div className="dato-group">
          <label>Teléfono *</label>
          {isEditing ? <input type="tel" name="phone" value={data.phone} onChange={onChange} disabled={saving} required /> : <p className="dato-value">{data.phone || '—'}</p>}
        </div>
        <div className="dato-group full-width">
          <label>Dirección *</label>
          {isEditing ? <input type="text" name="address_1" value={data.address_1} onChange={onChange} disabled={saving} required /> : <p className="dato-value">{data.address_1 || '—'}</p>}
        </div>
        <div className="dato-group full-width">
          <label>Complemento (Opcional)</label>
          {isEditing ? <input type="text" name="address_2" value={data.address_2} onChange={onChange} disabled={saving} /> : <p className="dato-value">{data.address_2 || '—'}</p>}
        </div>
        <div className="dato-group">
          <label>Ciudad *</label>
          {isEditing ? <input type="text" name="city" value={data.city} onChange={onChange} disabled={saving} required /> : <p className="dato-value">{data.city || '—'}</p>}
        </div>
        <div className="dato-group">
          <label>Departamento *</label>
          {isEditing ? (
            <select name="state" value={data.state} onChange={onChange} disabled={saving} required>
              {DEPARTAMENTOS.map(d => <option key={d.code} value={d.code}>{d.label}</option>)}
            </select>
          ) : <p className="dato-value">{getStateLabel(data.state) || '—'}</p>}
        </div>
        <div className="dato-group">
          <label>Código Postal</label>
          {isEditing ? <input type="text" name="postcode" value={data.postcode} onChange={onChange} disabled={saving} /> : <p className="dato-value">{data.postcode || '—'}</p>}
        </div>
        <div className="dato-group">
          <label>País</label>
          {isEditing ? <input type="text" value="Colombia" disabled /> : <p className="dato-value">Colombia</p>}
        </div>
        {prefix === 'billing' && (
          <div className="dato-group full-width">
            <label>Correo de facturación</label>
            {isEditing ? <input type="email" name="email" value={data.email} onChange={onChange} disabled={saving} /> : <p className="dato-value">{data.email || '—'}</p>}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="cuenta-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {userInitial}
            </div>
            <h1 className="profile-name">{userName}</h1>
            <p className="profile-email">{user.email}</p>
          </div>

          <div className="profile-stats">
            <div className="p-stat">
              <span className="p-val">{recentOrders.length}</span>
              <span className="p-lab">Pedidos</span>
            </div>
          </div>

          <div className="profile-menu">
            <button 
              className={`p-menu-item ${activeSection === 'datos' ? 'active' : ''}`}
              onClick={() => setActiveSection('datos')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Mis Datos
            </button>
            <button 
              className={`p-menu-item ${activeSection === 'pedidos' ? 'active' : ''}`}
              onClick={() => setActiveSection('pedidos')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Mis Pedidos
            </button>
            <button className="p-menu-item logout" onClick={logout}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Dashboard (default view) */}
          {activeSection === 'dashboard' && (
            <>
              <div className="welcome-banner">
                <h2>¡Hola, {userFirstName}!</h2>
                <p>Desde aquí puedes gestionar tus compras y registros técnicos.</p>
              </div>
              
              <div className="dashboard-grid">
                <div className="dash-card">
                  <h3>Últimos Pedidos</h3>
                  {ordersLoading ? (
                    <p className="empty-msg" style={{ marginTop: '1rem' }}>Cargando último pedido...</p>
                  ) : recentOrders.length > 0 ? (
                    <div className="dash-recent-order">
                      <div className="ro-header">
                        <span className="ro-id">Pedido #{recentOrders[0].order_id}</span>
                        <span className="ro-status">
                          {recentOrders[0].status_label || recentOrders[0].status}
                        </span>
                      </div>
                      <p className="ro-date">
                        Fecha: {new Date(recentOrders[0].date_created).toLocaleDateString('es-CO')}
                      </p>
                      <button 
                        className="dash-btn" 
                        style={{ width: '100%', marginTop: '5px' }} 
                        onClick={() => setActiveSection('pedidos')}
                      >
                        Ver historial completo
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="empty-msg">Aún no tienes pedidos realizados.</p>
                      <button className="dash-btn" onClick={() => navigate('/productos')}>Ir a la tienda</button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Mis Datos */}
          {activeSection === 'datos' && (
            <div className="mis-datos-section">
              <div className="section-header">
                <h2>Mis Datos</h2>
                {!isEditing ? (
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Editar
                  </button>
                ) : (
                  <button className="cancel-edit-btn" onClick={handleCancelEdit}>
                    Cancelar
                  </button>
                )}
              </div>

              {saveMessage && (
                <div className={`save-message ${saveMessage.type}`}>
                  {saveMessage.type === 'success' ? '✓' : '✕'} {saveMessage.text}
                </div>
              )}

              <form onSubmit={handleSaveProfile}>
                
                {/* 1. Datos de Cuenta */}
                <div className="datos-card">
                  <h3 className="datos-card-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Datos de Cuenta
                  </h3>
                  <div className="datos-grid">
                    <div className="dato-group">
                      <label>Nombre *</label>
                      {isEditing ? <input type="text" name="first_name" value={account.first_name} onChange={handleAccountChange} disabled={saving} required /> : <p className="dato-value">{account.first_name || '—'}</p>}
                    </div>
                    <div className="dato-group">
                      <label>Apellido *</label>
                      {isEditing ? <input type="text" name="last_name" value={account.last_name} onChange={handleAccountChange} disabled={saving} required /> : <p className="dato-value">{account.last_name || '—'}</p>}
                    </div>
                    <div className="dato-group">
                      <label>Cédula / NIT *</label>
                      {isEditing ? <input type="text" name="cc" value={account.cc} onChange={handleAccountChange} disabled={saving} required /> : <p className="dato-value">{account.cc || '—'}</p>}
                    </div>
                    <div className="dato-group full-width">
                      <label>Correo Electrónico *</label>
                      {isEditing ? <input type="email" name="email" value={account.email} onChange={handleAccountChange} disabled={saving} required /> : <p className="dato-value">{account.email || '—'}</p>}
                    </div>
                  </div>
                </div>

                {/* 2. Facturación */}
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

                {/* Checkbox same address (solo visible en edición, o si ya no existe, read-only no aplica mucho) */}
                {isEditing ? (
                  <div className="datos-card" style={{ padding: '10px 24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                      <input 
                        type="checkbox" 
                        checked={sameAsBilling} 
                        onChange={(e) => setSameAsBilling(e.target.checked)} 
                        disabled={saving} 
                      />
                      <span style={{ fontSize: '0.9rem', color: 'var(--gray-700)' }}>Enviar mercancía a la misma dirección de facturación</span>
                    </label>
                  </div>
                ) : (
                  sameAsBilling && (
                    <div className="datos-card" style={{ padding: '20px 24px' }}>
                      <p className="dato-value" style={{ margin: 0 }}>📍 Dirección de envío marcada como igual a la facturación.</p>
                    </div>
                  )
                )}

                {/* 3. Envío */}
                {(!sameAsBilling || isEditing && !sameAsBilling) && renderAddressSection(
                  'Datos de Envío',
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>,
                  shipping,
                  handleShippingChange,
                  'shipping'
                )}

                {isEditing && (
                  <div className="datos-actions">
                    <button type="submit" className="save-datos-btn" disabled={saving}>
                      {saving ? (
                        <><span className="spinner-sm"></span> Guardando...</>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                          Guardar Cambios
                        </>
                      )}
                    </button>
                    <button type="button" className="cancel-datos-btn" onClick={handleCancelEdit} disabled={saving}>Cancelar</button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Mis Pedidos */}
          {activeSection === 'pedidos' && (
            <div className="mis-pedidos-section">
              <div className="section-header">
                <h2>Mis Pedidos</h2>
              </div>
              <HistorialPedidos />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cuenta;
