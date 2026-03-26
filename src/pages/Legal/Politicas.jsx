import React, { useEffect, useState } from 'react';
import { getPoliticas } from '../../services/contentService';
import '../Legal/LegalPage.css';

const Politicas = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        setLoading(true);
        const data = await getPoliticas();
        setPageData(data);
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
