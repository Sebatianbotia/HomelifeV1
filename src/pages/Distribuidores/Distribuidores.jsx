import React from 'react';
import './Distribuidores.css';

const Distribuidores = () => {
  return (
    <div className="distribuidores-page">
      {/* Hero */}
      <section className="distribuidores-hero">
        <h1>¿Deseas ser distribuidor de nuestros productos?</h1>
        <p>Únete a nuestra red de aliados y lleva los mejores equipos médicos a toda Colombia.</p>
      </section>

      <div className="distribuidores-container">
        {/* Formulario */}
        <div className="distribuidores-form-card">
          <h2>Formulario de contacto</h2>
          <form className="distribuidores-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="empresa">Empresa <span>*</span></label>
                <input type="text" id="empresa" name="empresa" required />
              </div>
              <div className="form-group">
                <label htmlFor="contacto">Nombre del contacto <span>*</span></label>
                <input type="text" id="contacto" name="contacto" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="celular">Celular <span>*</span></label>
                <input type="tel" id="celular" name="celular" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico <span>*</span></label>
                <input type="email" id="email" name="email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="asunto">Asunto</label>
              <input type="text" id="asunto" name="asunto" />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="4"></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-submit">Enviar solicitud</button>
              <span className="form-note">Campos con <span>*</span> son obligatorios</span>
            </div>
          </form>
        </div>

        {/* Información de contacto */}
        <div className="distribuidores-info-card">
          <h3>Información para distribuidores</h3>
          <p>Nuestros distribuidores son parte clave de nuestro crecimiento. Te acompañamos en cada paso para que comercialices nuestros productos con éxito.</p>
          <div className="contacto-distribuidor">
            <h4>Contacto directo</h4>
            <p><strong>Alejandra Valderrama</strong></p>
            <p><span>📧</span> ventas3@homemedicalgroup.com</p>
            <p><span>📱</span> 300 355 5826</p>
          </div>
          <div className="distribuidores-beneficios">
            <h4>Beneficios</h4>
            <ul>
              <li>✔️ Catálogo completo de productos certificados</li>
              <li>✔️ Soporte y asesoría continua</li>
              <li>✔️ Material promocional incluido</li>
              <li>✔️ Descuentos por volumen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distribuidores;