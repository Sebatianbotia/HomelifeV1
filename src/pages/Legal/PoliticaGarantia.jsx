import React, { useEffect } from 'react';
import '../Legal/LegalPage.css';

const PoliticaGarantia = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-card">
          <h1>POLÍTICA DE GARANTÍAS</h1>
          <div className="legal-content">
            <p>
              Las políticas que se describen a continuación se aplican única y exclusivamente a los
              bienes y productos importados y/o distribuidos por <strong>HOME MEDICAL GROUP SAS</strong>,
              identificada con el NIT 900.561.035-9, y domicilio en la Carrera 10 No. 72-66 Oficina 301,
              de Bogotá́ D.C. Las políticas contenidas en el presente documento se elaboraron teniendo
              en cuenta las disposiciones descritas en el artículo 78 de la constitución política de
              Colombia y lo expresado en el Decreto 735 de 2013 “Por el cual se reglamenta la efectividad
              de la garantía”.
            </p>
            
            <p>
              Las políticas y procedimientos referidos en el presente reglamento serán aplicados a los
              bienes y productos Importados y/o distribuidos por HOME MEDICAL GROUP SAS,
              ofrecidos en venta en los distintos establecimientos comerciales y puntos de venta, con la
              finalidad de proteger, promover y garantizar la efectividad y el libre ejercicio de los derechos
              de nuestros clientes.
            </p>

            <p>
              HOME MEDICAL GROUP SAS en su condición de Importador y distribuidor de
              Dispositivos Médicos de Diagnóstico y Reactivos de Diagnostico In Vitro bajo la marca
              <strong> HOMELIFE</strong> se compromete a:
            </p>
            
            <ul className="legal-list">
              <li>a) Responder por la calidad, idoneidad, seguridad y el buen estado y funcionamiento de los productos ofrecidos en venta en los distintos establecimientos comerciales</li>
              <li>b) Brindar un servicio de capacitación en la operación y manejo básico de los equipos.</li>
              <li>c) Proporcionar una garantía mínima de 1 año en cualquiera de nuestros equipos.</li>
              <li>d) Proveer de insumos o accesorios de los equipos durante su vida útil promedio.</li>
              <li>e) Se hará́ reposición dentro de los 8 días siguientes al reporte de la garantía de equipos por falla técnica con un equipo de las mismas características o misma referencia.</li>
            </ul>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '40px' }}>ALCANCE</h2>
            <p>Dichos lineamientos aplican a todos los clientes, distribuidores, comercializadores y usuario final de HOME MEDICAL GROUP SAS.</p>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '40px' }}>CONDICIONES</h2>
            <p>
              Para validar el proceso por garantía el equipo debe contar con todas sus partes, piezas
              y/o accesorios suministrados por el fabricante. El equipo no debe poseer indicios de
              que este fue manipulado o alterado, de lo contrario no se responde por daños causados
              por terceros.
            </p>
            <p>Todo daño causado a los equipos por una mala manipulación no será cubierto por la garantía que ofrece el fabricante.</p>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '40px' }}>PROCEDIMIENTO</h2>
            <p>La garantía ofrecida por HOME MEDICAL GROUP SAS se hará́ efectiva mediante el siguiente proceso:</p>
            
            <div className="procedure-step">
              <p><strong>1. Las quejas y/o reclamos se pueden recibir y registrar a través de diferentes fuentes:</strong></p>
              <ul>
                <li><strong>Telefónico:</strong> En horario de lunes a viernes de 7:30 am a 4:30 pm mediante la línea fija: 061 7224189 y/o celular: 3168811431.</li>
                <li><strong>Correo Electrónico:</strong> 7x24, enviando la PQRS al correo atencionalcliente@homelife.com.co</li>
              </ul>
            </div>

            <div className="procedure-step">
              <p><strong>2. Una vez el área de servicio al cliente evalúe el caso puntual, solicitará realizar el envío del equipo a nuestras instalaciones:</strong></p>
              <p style={{ paddingLeft: '20px' }}>
                Destinatario: HOME MEDICAL GROUP SAS.<br />
                Dirección: Carrera 10 No. 72-66 Oficina 301, de Bogotá́ D.C.<br />
                Los costos del envíó serán asumidos por Home Medical Group SAS.
              </p>
            </div>

            <div className="procedure-step">
              <p><strong>3. Durante los siguientes 3 días hábiles, después de recibido el equipo:</strong></p>
              <p style={{ paddingLeft: '20px' }}>
                Se dará respuesta. De acuerdo con los resultados arrojados en la evaluación técnica, se
                realizará mantenimiento preventivo, correctivo o reposición del equipo, según sea el
                caso.
              </p>
              <p style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                NOTA: Junto con el equipo se enviará el reporte de servicio técnico.
              </p>
            </div>

            <div className="procedure-step">
              <p><strong>4. Se remite el equipo nuevamente a la dirección suministrada en la guía inicial con la que se recibió el envío</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaGarantia;
