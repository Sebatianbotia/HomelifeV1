// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Páginas principales
import Home from './pages/Home/Home';
import Productos from './pages/Productos/Productos';
import ProductoDetalle from './pages/ProductoDetalle/ProductoDetalle';
import Blog from './pages/Blog/Blog';
import Nosotros from './pages/Nosotros/Nosotros';
import Distribuidores from './pages/Distribuidores/Distribuidores';
import Cuenta from './pages/Cuenta/Cuenta';
import Carrito from './pages/Carrito/Carrito';
import RegistroEquipo from './pages/RegistroEquipo/RegistroEquipo'; // Nueva página

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'productos', element: <Productos /> },
      { path: 'producto/:id', element: <ProductoDetalle /> },
      { path: 'blog', element: <Blog /> },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'distribuidores', element: <Distribuidores /> },
      { path: 'cuenta', element: <Cuenta /> },
      { path: 'carrito', element: <Carrito /> },
      { path: 'contacto', element: <RegistroEquipo /> }, // Ruta para registrar equipo
    ],
  },
]);