import React, { useEffect, useState } from 'react';
import '../Legal/LegalPage.css';

const Politicas = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_WP_URL || 'https://www.homelife.com.co';
        const response = await fetch(`${baseUrl}/wp-json/wp/v2/pages?slug=politicas&_fields=title,content`);
        
        if (!response.ok) {
          throw new Error('Error al cargar las políticas');
        }
        
        const data = await response.json();
        if (data.length > 0) {
          setPageData(data[0]);
        } else {
          setError('No se encontraron políticas');
        }
      } catch (err) {
        console.error('Error fetching Politicas:', err);
        setError(err.message || 'Error desconocido al cargar las políticas');
      } finally {
        setLoading(false);
      }
    };

    fetchPoliticas();
  }, []);

  if (loading) {
    return (
      <div className="legal-page">
        <div className="container">
          <p style={{ textAlign: 'center', padding: '40px', fontSize: '1.1rem' }}>Cargando políticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="legal-page">
        <div className="container">
          <p style={{ textAlign: 'center', padding: '40px', color: '#d32f2f', fontSize: '1rem' }}>
            Error: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-card">
          <h1>{pageData?.title?.rendered}</h1>
          <div className="legal-content">
            {pageData?.content?.rendered && (
              <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politicas;
