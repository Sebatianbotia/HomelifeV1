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
import Checkout from './pages/Checkout/Checkout';
import Gracias from './pages/Gracias/Gracias';
import RegistroEquipo from './pages/RegistroEquipo/RegistroEquipo';
import FAQ from './pages/FAQ/FAQ';
import Politicas from './pages/Legal/Politicas';
import NotFound from './pages/NotFound/NotFound';

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
      { path: 'checkout', element: <Checkout /> },
      { path: 'gracias', element: <Gracias /> },
      { path: 'contacto', element: <RegistroEquipo /> },
      { path: 'registra-tu-equipo', element: <RegistroEquipo /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'politicas', element: <Politicas /> },
      { path: 'privacidad', element: <Politicas /> },
      { path: 'garantia', element: <Politicas /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);