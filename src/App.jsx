import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import SplashScreen from './components/SplashScreen/SplashScreen';
function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen finishLoading={() => setLoading(false)} />;
  }

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;