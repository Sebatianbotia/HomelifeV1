import React, { useEffect, useState } from 'react';
import { getFAQ } from '../../services/contentService';
import './FAQ.css';

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        setLoading(true);
        const data = await getFAQ();
        setFaqData(data);
      } catch (err) {
        console.error('Error fetching FAQ:', err);
        setError(err.message || 'Error desconocido al cargar las preguntas');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQ();
  }, []);

  if (loading) {
    return (
      <div className="faq-page">
        <div className="container">
          <h1>Preguntas Frecuentes</h1>
          <p style={{ textAlign: 'center', padding: '40px' }}>Cargando preguntas frecuentes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="faq-page">
        <div className="container">
          <h1>Preguntas Frecuentes</h1>
          <p style={{ textAlign: 'center', padding: '40px', color: '#d32f2f' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="faq-page">
      <div className="container">
        <h1>Preguntas Frecuentes</h1>
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
