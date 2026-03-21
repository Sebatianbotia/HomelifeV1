import React, { useEffect, useState } from 'react';
import './SocialCommunity.css';

const SocialCommunity = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos de WordPress y script de TikTok
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_WP_URL?.replace(/\/$/, '') || 'https://www.homelife.com.co';
        const response = await fetch(
          `${baseUrl}/wp-json/wp/v2/secciones_home?slug=comunidad-social&_fields=acf`
        );

        if (!response.ok) {
          throw new Error('Error al cargar datos de comunidad social');
        }

        const responseData = await response.json();
        if (responseData.length > 0 && responseData[0].acf) {
          console.log('Datos de comunidad social obtenidos:', responseData[0].acf);
          setData(responseData[0].acf);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching social community data:', err);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const socialIcons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
        <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
        <circle cx="18.406" cy="5.594" r="1.44" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  };

  // Construir datos dinámicos de redes sociales desde WordPress
  const socialData = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@homelifecol',
      followers: data?.instagram_followers || '8.5K',
      url: 'https://www.instagram.com/homelifecol',
      icon: socialIcons.instagram,
      color: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@homelifecol',
      followers: data?.tiktok_followers || '12K',
      url: 'https://www.tiktok.com/@homelifecol',
      icon: socialIcons.tiktok,
      color: 'linear-gradient(90deg, #00f2ea, #ff0050)',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: 'HomeLife Colombia',
      followers: data?.youtube_followers || '4.2K',
      url: 'https://www.youtube.com/@homelifecol',
      icon: socialIcons.youtube,
      color: '#ff0000',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: '/homelifecol',
      followers: data?.facebook_followers || '15K',
      url: 'https://facebook.com/homelifecol',
      icon: socialIcons.facebook,
      color: '#1877f2',
    },
  ];

  if (loading) {
    return (
      <section className="social-community-section">
        <div style={{ padding: '100px 20px', textAlign: 'center', color: '#00d9d9' }}>
          Cargando...
        </div>
      </section>
    );
  }

  return (
    <section className="social-community-section">
      <div className="social-community-container">
        <h2 className="social-community-title">Experiencia HomeLife</h2>
        <p className="social-community-subtitle">
          Conecta con nosotros y sé parte de nuestra comunidad. Contenido exclusivo, tips de salud y mucho más.
        </p>

        <div className="social-content-wrapper">
          <div className="tiktok-mockup-wrapper">
            <div className="phone-mockup">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="tiktok-wrapper-inner">
                  {data?.tiktok_video_id ? (
                    <iframe
                      src={`https://www.tiktok.com/embed/v2/${data.tiktok_video_id}`}
                      style={{ width: '100%', height: '580px', border: 'none', borderRadius: '12px' }}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      title="TikTok Video"
                    ></iframe>
                  ) : (
                    <div style={{ width: '100%', height: '580px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '12px', color: '#fff' }}>
                      Cargando video...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="social-links-wrapper">
            <h3 className="social-follow-title">Síguenos en nuestras redes sociales</h3>
            <div className="social-cards-grid">
              {socialData.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  style={{ '--hover-color': social.color }}
                >
                  <div className="social-icon" style={{ background: social.color }}>
                    {social.icon}
                  </div>
                  <div className="social-info">
                    <h3>{social.name}</h3>
                    <p className="social-handle">{social.handle}</p>
                    <span className="social-followers">{social.followers} seguidores</span>
                  </div>
                  <div className="social-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            <div className="social-stats">
              <div className="stat-item">
                <span className="stat-value">{data?.stat_totales || '25K+'}</span>
                <span className="stat-label">Seguidores totales</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{data?.stat_publicaciones || '500+'}</span>
                <span className="stat-label">Publicaciones</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{data?.stat_alcance || '10M+'}</span>
                <span className="stat-label">Alcance mensual</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialCommunity;