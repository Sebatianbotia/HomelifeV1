import React, { useEffect } from 'react';
import '../Legal/LegalPage.css';

const PoliticaPrivacidad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-card">
          <h1>POLÍTICA DE TRATAMIENTO Y PROTECCIÓN DE DATOS PERSONALES</h1>
          <div className="legal-content">
            <h2 style={{ color: 'var(--cyan-400)' }}>1. Introducción</h2>
            <p>
              En cumplimiento de lo establecido en el Artículo 15 de la Constitución Política de Colombia,
              la Ley 1581 de 2012, el Decreto 1377 de 2013, el Decreto 1074 de 2015 y demás normas
              que regulan la protección de datos personales, HOME MEDICAL GROUP SAS adopta la presente Política de
              Tratamiento de Datos Personales.
            </p>
            <p>
              El objetivo de esta política es garantizar el derecho que tienen todas las personas a conocer,
              actualizar, rectificar y suprimir la información personal que repose en nuestras bases de datos, así
              como establecer los procedimientos para el adecuado tratamiento de dicha información.
            </p>
            <p>
              Esta política aplica a clientes, usuarios, proveedores, distribuidores, empleados, aliados
              comerciales y cualquier tercero cuyos datos personales sean tratados por la compañía.
            </p>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>2. Identificación del Responsable del Tratamiento</h2>
            <p>
              <strong>Razón social:</strong> HOME MEDICAL GROUP SAS<br />
              <strong>NIT:</strong> 900.561.035-9<br />
              <strong>Dirección:</strong> Carrera 10 #72‑66 Of. 302 – Bogotá, Colombia<br />
              <strong>Correo electrónico:</strong> atencionalcliente@homelife.com.co<br />
              <strong>Teléfono:</strong> 601 7224189<br />
              <strong>Celular:</strong> 316 8811431
            </p>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>3. Definiciones</h2>
            <ul>
              <li><strong>Dato personal:</strong> Información que permite identificar o hacer identificable a una persona natural.</li>
              <li><strong>Dato sensible:</strong> Información que afecta la intimidad del titular o cuyo uso indebido puede generar discriminación.</li>
              <li><strong>Tratamiento:</strong> Cualquier operación sobre datos personales como recolección, almacenamiento, uso, circulación o supresión.</li>
              <li><strong>Titular:</strong> Persona natural a quien pertenecen los datos personales.</li>
              <li><strong>Base de datos:</strong> Conjunto organizado de datos personales objeto de tratamiento.</li>
            </ul>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>4. Principios para el Tratamiento de Datos</h2>
            <p>HOME MEDICAL GROUP SAS aplicará los siguientes principios:</p>
            <ul>
              <li><strong>Legalidad:</strong> El tratamiento se realiza conforme a la ley.</li>
              <li><strong>Finalidad:</strong> Los datos se utilizarán para fines legítimos previamente informados.</li>
              <li><strong>Libertad:</strong> El tratamiento se realizará con autorización previa del titular.</li>
              <li><strong>Veracidad:</strong> La información será veraz, completa y actualizada.</li>
              <li><strong>Transparencia:</strong> El titular podrá conocer el uso de sus datos.</li>
              <li><strong>Security:</strong> Se implementarán medidas técnicas y administrativas para proteger la información.</li>
              <li><strong>Confidencialidad:</strong> Los datos personales serán tratados de forma reservada.</li>
            </ul>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>5. Finalidad del Tratamiento de Datos</h2>
            <ul>
              <li>Gestionar la preventa, venta y posventa de productos o servicios.</li>
              <li>Realizar gestiones comerciales, administrativas y logísticas.</li>
              <li>Atender solicitudes, consultas, quejas o reclamos.</li>
              <li>Enviar información comercial, promociones o novedades sobre productos y servicios.</li>
              <li>Realizar estudios estadísticos, análisis de mercado o mejora del servicio.</li>
              <li>Cumplir obligaciones legales, contractuales o regulatorias.</li>
              <li>Gestionar procesos de selección, contratación y administración del personal.</li>
              <li>Atender requerimientos de autoridades judiciales o administrativas.</li>
            </ul>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>6. Derechos de los Titulares</h2>
            <ul>
              <li>Conocer, actualizar y rectificar sus datos personales.</li>
              <li>Solicitar prueba de la autorización otorgada.</li>
              <li>Ser informados sobre el uso de sus datos.</li>
              <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
              <li>Revocar la autorización o solicitar la eliminación de sus datos cuando proceda.</li>
              <li>Acceder gratuitamente a sus datos personales.</li>
            </ul>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>7. Procedimiento para Consultas y Reclamos</h2>
            <p><strong>Consultas:</strong> Serán atendidas en un plazo máximo de diez (10) días hábiles. Si no es posible, se informará y se resolverá en cinco (5) días hábiles adicionales.</p>
            <p><strong>Reclamos:</strong> Presentar nombre, identificación, hechos y contacto. Será atendido en un término máximo de quince (15) días hábiles.</p>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>8. Seguridad de la Información</h2>
            <p>HOME MEDICAL GROUP SAS adopta medidas técnicas, administrativas y organizacionales para proteger la información personal contra acceso no autorizado, pérdida, uso indebido, alteración o divulgación.</p>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>9. Vigencia de la Política</h2>
            <p>
              La presente política entra en vigencia a partir de su publicación y permanecerá
              vigente mientras exista tratamiento de datos personales por parte de HOME MEDICAL
              GROUP SAS. Los datos personales serán conservados durante el tiempo necesario para cumplir las
              finalidades descritas o mientras exista una obligación legal o contractual que así lo requiera.
            </p>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>10. Derecho de Retracto</h2>
            <p>
              En cumplimiento de la Ley 1480 de 2011 – Estatuto del Consumidor, el cliente podrá
              ejercer el derecho de retracto dentro de los cinco (5) días hábiles siguientes a la entrega del producto,
              devolviéndolo en las mismas condiciones en que fue recibido. Los costos de transporte y devolución deberán ser asumidos por el cliente.
            </p>

            <h2 style={{ color: 'var(--cyan-400)', marginTop: '30px' }}>11. Política de Garantías</h2>
            <p>
              Las garantías aplican exclusivamente a los productos importados o distribuidos
              por HOME MEDICAL GROUP SAS y se rigen por lo establecido en el Decreto 735 de 2013,
              que reglamenta la efectividad de la garantía en Colombia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
