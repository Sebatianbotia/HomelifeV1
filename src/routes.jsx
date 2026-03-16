// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Páginas principales
import Home from './pages/Home/Home';
import Productos from './pages/Productos/Productos';
import ProductoDetalle from './pages/ProductoDetalle/ProductoDetalle';
import Blog from './pages/Blog/Blog';
import ArticuloDetalle from './pages/ArticuloDetalle/ArticuloDetalle';
import Nosotros from './pages/Nosotros/Nosotros';
import Distribuidores from './pages/Distribuidores/Distribuidores';
import Cuenta from './pages/Cuenta/Cuenta';
import Auth from './pages/Auth/Auth';
import Carrito from './pages/Carrito/Carrito';
import RegistroEquipo from './pages/RegistroEquipo/RegistroEquipo';
import FAQ from './pages/FAQ/FAQ';
import PoliticaPrivacidad from './pages/Legal/PoliticaPrivacidad';
import PoliticaGarantia from './pages/Legal/PoliticaGarantia';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'productos', element: <Productos /> },
      { path: 'producto/:id', element: <ProductoDetalle /> },
      { path: 'blog', element: <Blog /> },
      { path: 'articulo/:id', element: <ArticuloDetalle /> },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'distribuidores', element: <Distribuidores /> },
      { path: 'cuenta', element: <Cuenta /> },
      { path: 'auth', element: <Auth /> },
      { path: 'carrito', element: <Carrito /> },
      { path: 'contacto', element: <RegistroEquipo /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'privacidad', element: <PoliticaPrivacidad /> },
      { path: 'garantia', element: <PoliticaGarantia /> },
    ],
  },
]);