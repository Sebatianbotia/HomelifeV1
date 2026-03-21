import React, { useEffect } from 'react';
import './LegalPage.css';

const LegalPage = ({ title, content }) => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-card">
          <h1>{title}</h1>
          <div className="legal-content">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
