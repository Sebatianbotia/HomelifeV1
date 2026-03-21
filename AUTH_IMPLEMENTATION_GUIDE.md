# Guía de Implementación: Autenticación con JWT y WooCommerce

## 📋 Resumen

Se ha implementado un sistema completo de autenticación basado en JWT (JSON Web Tokens) y la API de WooCommerce. El sistema incluye:

- ✅ **AuthContext.jsx** - Contexto global de autenticación con React Hooks
- ✅ **authService.js** - Servicio centralizado para operaciones de autenticación  
- ✅ **authApi.js** - Utilidades para realizar peticiones autenticadas

---

## 🏗️ Estructura Implementada

### 1️⃣ **AuthContext.jsx** 
Ubicación: `src/context/AuthContext.jsx`

Proporciona:
- **Estados**: `user`, `token`, `loading`, `error`
- **Funciones**: `login()`, `register()`, `logout()`
- **Hook**: `useAuth()`

#### Estados:
- `user` (Object | null): Datos del usuario autenticado
- `token` (String | null): JWT token almacenado
- `loading` (Boolean): Indica si está cargando
- `error` (String | null): Mensaje de error si existe
- `isAuthenticated` (Boolean): Booleano de conveniencia

#### Funciones:

```javascript
// Login
const { login } = useAuth();
const success = await login('username', 'password');

// Register
const { register } = useAuth();
const success = await register({
  username: 'juan',
  email: 'juan@example.com',
  first_name: 'Juan',
  last_name: 'Pérez',
  password: 'seguro123',
  billing: {
    address_1: 'Calle Falsa 123',
    city: 'Madrid',
    country: 'ES'
  }
});

// Logout
const { logout } = useAuth();
logout();
```

### 2️⃣ **authService.js**
Ubicación: `src/services/authService.js`

Métodos disponibles:

```javascript
// Login
const result = await authService.login(username, password);
// Returns: { token, user_email, user_nicename }

// Get current user
const user = await authService.getCurrentUser(token);

// Register
const user = await authService.register({
  email: 'juan@example.com',
  username: 'juan',
  password: 'seguro123',
  first_name: 'Juan',
  last_name: 'Pérez',
  billing: { /* opcional */ }
});
```

### 3️⃣ **authApi.js**
Ubicación: `src/utils/authApi.js`

Funciones de utilidad para peticiones autenticadas:

```javascript
import { authGet, authPost, authPut, authDelete } from '@/utils/authApi';
import { useAuth } from '@/context/AuthContext';

function MiComponente() {
  const { token } = useAuth();

  // GET autenticado
  const datos = await authGet('/wp/v2/users/me', token);

  // POST autenticado
  const resultado = await authPost('/wp-json/wc/v3/orders', pedidoData, token);

  // PUT autenticado
  const actualizado = await authPut('/wp/v2/users/123', nuevoDatos, token);

  // DELETE autenticado
  const resultado = await authDelete('/wp-json/wc/v3/orders/456', token);
}
```

---

## 🔐 Endpoints Configurados

### 1. Login (JWT Auth)
```
POST /wp-json/jwt-auth/v1/token

Request:
{
  "username": "juan",
  "password": "password123"
}

Response:
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc....",
  "user_email": "juan@example.com",
  "user_nicename": "juan"
}
```

### 2. Registro (Custom Endpoint)
```
POST /api-registro

Request:
{
  "email": "juan.perez@example.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "username": "juanperez",
  "password": "password_seguro123",
  "billing": {
    "address_1": "Calle Falsa 123",
    "city": "Madrid",
    "country": "ES"
  }
}

Response:
{
  "id": 123,
  "username": "juanperez",
  "email": "juan.perez@example.com",
  "first_name": "Juan",
  "last_name": "Pérez"
}
```

### 3. Obtener Usuario Actual
```
GET /wp/v2/users/me

Headers:
{
  "Authorization": "Bearer ${token}"
}

Response:
{
  "id": 123,
  "username": "juan",
  "email": "juan@example.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "avatar_urls": { /* ... */ }
}
```

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Componente de Login

```jsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    
    if (success) {
      navigate('/cuenta'); // Redirigir a perfil
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuario o Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}
```

### Ejemplo 2: Componente de Registro

```jsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    
    if (success) {
      navigate('/cuenta');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Apellido"
      />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Usuario"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Contraseña"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
}
```

### Ejemplo 3: Componente Protegido

```jsx
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
}
```

### Ejemplo 4: Petición Autenticada

```jsx
import { useAuth } from '@/context/AuthContext';
import { authGet, authPost } from '@/utils/authApi';
import { useEffect, useState } from 'react';

export function MiPerfil() {
  const { user, token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // Obtener pedidos del usuario
        const data = await authGet('/wp-json/wc/v3/orders', token);
        setPedidos(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPedidos();
    }
  }, [token]);

  if (loading) return <div>Cargando pedidos...</div>;

  return (
    <div>
      <h1>Bienvenido, {user?.first_name}</h1>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            Pedido #{pedido.id} - ${pedido.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🔑 Headers para Peticiones Privadas

**IMPORTANTE**: Cualquier petición privada (protegida) debe incluir:

```
Authorization: Bearer ${token}
```

Ejemplo:

```javascript
const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

O usando el helper:

```javascript
import { authGet } from '@/utils/authApi';
const data = await authGet('/endpoint', token);
```

---

## 📦 Configuración en App.jsx

Asegúrate de envolver tu aplicación con el **AuthProvider**:

```jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;
```

---

## 🔐 Almacenamiento del Token

El token se guarda en **localStorage** con la clave `homelife_token`:

```javascript
// Acceder al token manualmente (no recomendado)
const token = localStorage.getItem('homelife_token');

// Mejora: usar el hook
const { token } = useAuth();
```

---

## ⚠️ Notas Importantes

1. **Endpoint de Registro**: `/api-registro` es un placeholder. Necesitarás crear este endpoint en tu backend.

2. **Token Expiración**: El token JWT tiene una expiración. Considera implementar un refresh token si es necesario.

3. **HTTPS**: En producción, asegúrate de usar HTTPS para todas las peticiones.

4. **CORS**: Si el frontend y backend están en dominios diferentes, configura CORS adecuadamente.

5. **Validación**: Implementa validación adicional en el backend para datos sensibles.

---

## ✅ Checklist de Implementación

- [x] AuthContext.jsx creado con todos los estados y funciones
- [x] authService.js configurado con endpoints JWT
- [x] authApi.js con helpers para peticiones autenticadas
- [x] localStorage para persistencia de token
- [x] Documentación comentada en el código
- [ ] Crear endpoint `/api-registro` en el backend
- [ ] Pruebas de login y registro
- [ ] Implementar refresh token (opcional)
- [ ] Proteger rutas (ProtectedRoute)

---

## 🎯 Próximos Pasos

1. **Crear el endpoint de registro** en tu backend (usar `/api-registro`)
2. **Actualizar URLs** si es necesario cambiar los endpoints
3. **Implementar componentes** de Login, Registro y Perfil
4. **Proteger rutas** que requieren autenticación
5. **Agregar refresh token** para mejor seguridad
6. **Implementar validaciones** adicionales en el frontend

¡Listo para implementar autenticación JWT en tu app React! 🚀
