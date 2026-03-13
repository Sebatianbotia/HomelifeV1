import React from 'react';
import './PaymentMarquee.css';

// Lista de logos de medios de pago (usaremos imágenes de ejemplo de Unsplash o logos genéricos)
// En un proyecto real, deberías tener estos archivos en la carpeta assets
const payments = [
  { id: 1, name: 'Visa', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
  { id: 2, name: 'Mastercard', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { id: 3, name: 'American Express', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg' },
  { id: 4, name: 'Diners Club', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Diners_Club_logo.svg' },
  { id: 5, name: 'PSE', image: 'https://www.pse.com.co/images/logo-pse.png' },
  { id: 6, name: 'Efecty', image: 'https://www.efecty.com.co/images/logo-efecty.png' },
  { id: 7, name: 'Baloto', image: 'https://www.baloto.com/images/logo-baloto.png' },
  { id: 8, name: 'Nequi', image: 'https://nequi.com.co/images/logo-nequi.svg' },
  { id: 9, name: 'Daviplata', image: 'https://www.daviplata.com/images/logo-daviplata.png' },
  { id: 10, name: 'PayU', image: 'https://developers.payulatam.com/latam/_images/payu_logo.svg' },
];

const PaymentMarquee = () => {
  return (
    <section className="payment-marquee-section">
      <div className="payment-marquee-container">
        <h3 className="payment-marquee-title">Medios de pago aceptados</h3>
        <div className="payment-marquee">
          <div className="payment-marquee-track">
            {/* Primera copia de los logos */}
            {payments.map((payment) => (
              <div key={payment.id} className="payment-item">
                <img src={payment.image} alt={payment.name} />
              </div>
            ))}
            {/* Segunda copia para efecto infinito */}
            {payments.map((payment) => (
              <div key={`copy-${payment.id}`} className="payment-item">
                <img src={payment.image} alt={payment.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMarquee;