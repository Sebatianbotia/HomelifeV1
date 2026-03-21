import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Cuenta.css';

const Cuenta = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <div className="loading-screen">Cargando perfil...</div>;
  if (!user) return null;

  const userName = user.name || user.display_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Usuario';
  const userInitial = userName.charAt(0).toUpperCase();
  const userFirstName = userName.split(' ')[0];

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
              <span className="p-val">0</span>
              <span className="p-lab">Pedidos</span>
            </div>
            <div className="p-stat">
              <span className="p-val">0</span>
              <span className="p-lab">Garantías</span>
            </div>
          </div>

          <div className="profile-menu">
            <button className="p-menu-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Mis Datos
            </button>
            <button className="p-menu-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Mis Pedidos
            </button>
            <button className="p-menu-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Equipos Registrados
            </button>
            <button className="p-menu-item logout" onClick={logout}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="welcome-banner">
            <h2>¡Hola, {userFirstName}!</h2>
            <p>Desde aquí puedes gestionar tus compras y registros técnicos.</p>
          </div>
          
          <div className="dashboard-grid">
            <div className="dash-card">
              <h3>Ultimos Pedidos</h3>
              <p className="empty-msg">Aún no tienes pedidos realizados.</p>
              <button className="dash-btn" onClick={() => navigate('/productos')}>Ir a la tienda</button>
            </div>
            <div className="dash-card">
              <h3>Equipos Homelife</h3>
              <p className="empty-msg">No has registrado ningún producto.</p>
              <button className="dash-btn" onClick={() => navigate('/contacto')}>Registrar equipo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuenta;
