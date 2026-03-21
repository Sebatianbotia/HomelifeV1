import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/Stats'; // Reutilizamos el componente de estadísticas
import './Nosotros.css';

const Nosotros = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetchear datos de WordPress
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_WP_URL?.replace(/\/$/, '') || 'https://www.homelife.com.co';
        const response = await fetch(
          `${baseUrl}/wp-json/wp/v2/secciones_home?slug=nosotros&_fields=acf&acf_format=standard`
        );

        if (!response.ok) {
          throw new Error('Error al cargar datos de la sección Nosotros');
        }

        const responseData = await response.json();
        if (responseData.length > 0 && responseData[0].acf) {
          console.log('Datos de Nosotros obtenidos:', responseData[0].acf);
          setData(responseData[0].acf);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching Nosotros data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Datos para las tarjetas de misión/visión/valores - Generadas dinámicamente desde WordPress
  const cards = useMemo(() => [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      ),
      title: 'Misión',
      description: data?.mision_texto || 'Proporcionar equipos médicos certificados de alta calidad que mejoren la salud y bienestar de nuestros clientes, con un servicio excepcional y precios justos.',
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'Visión',
      description: data?.vision_texto || 'Ser la empresa líder en Colombia en distribución de equipos médicos, reconocida por nuestra excelencia, innovación y compromiso con la salud de las personas.',
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      title: 'Valores',
      description: data?.valores_texto || 'Calidad, Integridad, Compromiso, Innovación y Responsabilidad Social. Estos valores guían cada decisión que tomamos y cada producto que ofrecemos.',
    },
  ], [data?.mision_texto, data?.vision_texto, data?.valores_texto]);

  // Datos para certificaciones - Generados dinámicamente desde WordPress
  const certifications = useMemo(() => {
    const certs = [];
    if (data?.cert_1) certs.push({ id: 1, image: data.cert_1 });
    if (data?.cert_2) certs.push({ id: 2, image: data.cert_2 });
    if (data?.cert_3) certs.push({ id: 3, image: data.cert_3 });
    if (data?.cert_4) certs.push({ id: 4, image: data.cert_4 });
    if (data?.cert_5) certs.push({ id: 5, image: data.cert_5 });
    if (data?.cert_6) certs.push({ id: 6, image: data.cert_6 });
    return certs.length > 0 ? certs : [
      { id: 1, image: '/certificaciones/LOGO INVIMA.gif' },
      { id: 2, image: '/certificaciones/LOGO ISO.png' },
      { id: 3, image: '/certificaciones/FUNDACION COLOMBIANA DEL CORAZON.png' },
      { id: 4, image: '/certificaciones/Logo-California-Collegiate-Athletic-Association.jpg' },
    ];
  }, [data?.cert_1, data?.cert_2, data?.cert_3, data?.cert_4, data?.cert_5, data?.cert_6]);

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="nosotros-page">
        <section className="nosotros-hero">
          <div className="container">
            <p style={{ textAlign: 'center', color: '#00d9d9', padding: '60px 20px' }}>Cargando información...</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="nosotros-page">
      {/* Hero */}
      <section className="nosotros-hero">
        <div className="container">
          <h1>{data?.hero_titulo || 'Acerca de HomeLife'}</h1>
          <p>{data?.hero_subtitulo || 'Líderes en equipos médicos certificados, comprometidos con tu salud y bienestar desde hace más de 15 años'}</p>
        </div>
      </section>

      {/* Historia */}
      <section className="nosotros-historia">
        <div className="container">
          <h2 className="section-title">Nuestra Historia</h2>
          {data?.historia_texto ? (
            <div className="historia-texto" dangerouslySetInnerHTML={{ __html: data.historia_texto }} />
          ) : (
            <p className="historia-texto">
              Desde 2010, HomeLife se ha dedicado a proporcionar equipos médicos de la más alta calidad a hogares, 
              clínicas y hospitales en toda Colombia. Nacimos con la visión de hacer accesible la tecnología médica 
              de vanguardia para todos, manteniendo los más altos estándares de calidad y certificación INVIMA.
            </p>
          )}
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="nosotros-cards">
        <div className="container">
          <h2 className="section-title">Nuestros Pilares</h2>
          <div className="cards-grid">
            {cards.map((card) => (
              <div key={card.id} className="card-item">
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas (reutilizamos Stats) */}
      <Stats />

      {/* Certificaciones */}
      <section className="nosotros-certificaciones">
        <div className="container">
          <h2 className="section-title">Certificaciones y Garantías</h2>
          <p className="certificaciones-intro">
            Todos nuestros productos cumplen con los más altos estándares de calidad y seguridad
          </p>
          <div className="certificaciones-grid">
            {certifications.map((cert) => (
              <div key={cert.id} className="certificacion-item">
                <img src={cert.image} alt="Certificación" className="cert-image" />
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default Nosotros;