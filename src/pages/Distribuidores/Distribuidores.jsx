import React, { useState } from 'react';
import { contactoDistribuidor } from '../../services/homelifeService';
import useSEO from '../../utils/useSEO';
import './Distribuidores.css';

const Distribuidores = () => {
  const [formData, setFormData] = useState({
    empresa: '',
    contacto: '',
    celular: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await contactoDistribuidor(formData);
      setSuccess(true);
      setFormData({
        empresa: '',
        contacto: '',
        celular: '',
        email: '',
        asunto: '',
        mensaje: ''
      });
    } catch (err) {
      setError(err.message || 'Ocurrió un error al enviar el formulario. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const seo = useSEO({
    title: 'Distribuidores | Únete a la Red Comercial de HomeLife',
    description: 'Convírtete en distribuidor autorizado de HomeLife. Vende equipos médicos certificados INVIMA con soporte, material de ventas y descuentos por volumen en toda Colombia.',
    canonical: 'https://www.homelife.com.co/distribuidores',
  });

  return (
    <div className="distribuidores-page">
      {seo}
      {/* Hero */}
      <section className="distribuidores-hero">
        <h1>¿Deseas ser distribuidor de nuestros productos?</h1>
        <p>Únete a nuestra red de aliados y lleva los mejores equipos médicos a toda Colombia.</p>
      </section>

      <div className="distribuidores-container">
        {/* Formulario */}
        <div className="distribuidores-form-card">
          <h2>Formulario de contacto</h2>
          
          {error && <div className="alert alert-danger" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', border: '1px solid red', borderRadius: '4px', backgroundColor: '#ffe6e6' }}>{error}</div>}
          {success && <div className="alert alert-success" style={{ color: 'green', marginBottom: '1rem', padding: '0.5rem', border: '1px solid green', borderRadius: '4px', backgroundColor: '#e6ffe6' }}>¡Gracias! Hemos recibido tu solicitud y te contactaremos pronto.</div>}
          
          <form className="distribuidores-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="empresa">Empresa <span>*</span></label>
                <input type="text" id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="contacto">Nombre del contacto <span>*</span></label>
                <input type="text" id="contacto" name="contacto" value={formData.contacto} onChange={handleChange} required disabled={loading} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="celular">Celular <span>*</span></label>
                <input type="tel" id="celular" name="celular" value={formData.celular} onChange={handleChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico <span>*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={loading} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="asunto">Asunto</label>
              <input type="text" id="asunto" name="asunto" value={formData.asunto} onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="4" value={formData.mensaje} onChange={handleChange} disabled={loading}></textarea>
            </div>
            <div className="form-actions">
              {!success && (
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar solicitud'}
                </button>
              )}
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