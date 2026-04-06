// src/components/Layout/Layout.jsx
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ChatBot from '../ChatBot/ChatBot';
import './Layout.css'; // Si tienes estilos específicos para Layout, mantenlos

const Layout = () => {
  const { pathname } = useLocation();

  // Scroll al tope cuando cambie la ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </>
  );
};

export default Layout;