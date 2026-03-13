import React, { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import SplashScreen from './components/SplashScreen/SplashScreen';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen finishLoading={() => setLoading(false)} />;
  }

  return <RouterProvider router={router} />;
}

export default App;