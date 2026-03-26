import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './routes';
import { ProductsProvider } from './context/ProductsContext';
import SplashScreen from './components/SplashScreen/SplashScreen';
function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen finishLoading={() => setLoading(false)} />;
  }

  return (
    <HelmetProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </HelmetProvider>
  );
}

export default App;