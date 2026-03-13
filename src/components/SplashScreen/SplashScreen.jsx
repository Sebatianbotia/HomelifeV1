import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ finishLoading }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        finishLoading();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className={`splash-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <img src="/splashScreen.png" alt="HomeLife Logo" className="splash-logo" />
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
