import React, { useEffect } from 'react';
import './FAQ.css';

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "1. ¿Qué tipo de productos puedo encontrar en HomeLife?",
      a: "En HomeLife encontrarás equipos de diagnóstico y monitoreo de salud diseñados para uso en casa o en entornos profesionales. Nuestro portafolio incluye tensiómetros, oxímetros, termómetros, básculas y otros dispositivos que ayudan a llevar un control práctico y confiable de la salud."
    },
    {
      q: "2. ¿Los equipos cuentan con registro sanitario?",
      a: "Sí. Nuestros dispositivos médicos cuentan con registro sanitario INVIMA vigente, lo que garantiza que cumplen con los estándares de calidad y seguridad exigidos para su comercialización en Colombia."
    },
    {
      q: "3. ¿Los productos pueden usarse en casa o solo en clínicas?",
      a: "Los equipos HomeLife están diseñados para uso doméstico y profesional, permitiendo que las personas puedan monitorear su salud de forma sencilla en el hogar o utilizarlos en consultorios y centros médicos."
    },
    {
      q: "4. ¿Cómo puedo comprar los productos?",
      a: "Puedes comprar directamente a través de nuestra tienda en línea, donde encontrarás las fichas técnicas, características y precios de cada producto. Solo debes seleccionar el equipo que necesitas, agregarlo al carrito y seguir el proceso de compra."
    },
    {
      q: "5. ¿Los equipos tienen garantía?",
      a: "Sí. La mayoría de nuestros equipos cuentan con garantía entre 1 y 2 años, dependiendo del producto, lo que respalda su calidad y funcionamiento."
    },
    {
      q: "6. ¿Qué debo tener en cuenta para elegir un tensiómetro?",
      a: "Para elegir el tensiómetro adecuado es importante considerar: Tipo de medición (brazo o muñeca), Facilidad de uso, Tamaño del brazalete, Funciones adicionales como memoria, detección de arritmias o lectura por voz. Los tensiómetros digitales permiten medir presión sistólica, diastólica y frecuencia cardíaca de manera rápida y precisa."
    },
    {
      q: "7. ¿Para qué sirve un oxímetro de pulso?",
      a: "Un oxímetro permite medir la saturación de oxígeno en la sangre (SpO₂) y la frecuencia cardíaca, ayudando a monitorear la salud respiratoria de forma rápida y no invasiva."
    },
    {
      q: "8. ¿Los dispositivos son fáciles de usar?",
      a: "Sí. Nuestros equipos están diseñados para ser intuitivos y fáciles de utilizar, incluso para personas sin experiencia médica. Muchos dispositivos funcionan con solo presionar un botón y muestran los resultados en pantallas digitales claras."
    },
    {
      q: "9. ¿Los productos pueden ser utilizados por niños y adultos?",
      a: "Depende del dispositivo. Algunos equipos pueden utilizarse tanto en adultos como en niños, mientras que otros están diseñados para personas mayores de cierta edad. Siempre recomendamos revisar la ficha técnica del producto antes de usarlo."
    },
    {
      q: "10. ¿Cómo puedo comunicarme con servicio al cliente?",
      a: "Si tienes dudas sobre un producto, compras, soporte o garantías, puedes comunicarte con nuestro equipo de atención al cliente: Teléfono: 601 7224189, WhatsApp / celular: 316 8811431, Correo: atencionalcliente@homelife.com.co, Dirección: Carrera 10 #72-66 Of. 302, Bogotá – Colombia."
    },
    {
      q: "11. ¿Cómo debo cuidar y almacenar los equipos?",
      a: "Para garantizar su correcto funcionamiento recomendamos: Guardarlos en un lugar limpio y seco, Evitar golpes o caídas, Utilizar baterías adecuadas, Seguir las instrucciones del manual de uso. Esto permitirá mantener la precisión y prolongar la vida útil del equipo."
    },
    {
      q: "12. ¿Puedo solicitar asesoría para elegir el equipo adecuado?",
      a: "Claro que sí. Nuestro equipo puede ayudarte a elegir el dispositivo que mejor se adapte a tus necesidades de salud o a tu práctica profesional."
    }
  ];

  return (
    <div className="faq-page">
      <div className="container">
        <h1>Preguntas Frecuentes</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
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
