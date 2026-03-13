import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { products } from '../../data/products';
import './RegistroEquipo.css';

const RegistroEquipo = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [enviado, setEnviado] = useState(false);
  const [archivo, setArchivo] = useState(null);

  // Obtener lista única de productos para el selector
  const productList = products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category
  }));

  const onSubmit = (data) => {
    // Aquí iría la llamada a la API
    console.log('Datos del registro:', data);
    console.log('Archivo:', archivo);
    setEnviado(true);
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setEnviado(false);
      reset();
      setArchivo(null);
    }, 3000);
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  return (
    <div className="registro-page">
      <div className="registro-header">
        <h1>Registra tu equipo</h1>
        <p>Completa el formulario para activar tu garantía y recibir soporte personalizado</p>
      </div>

      <div className="registro-container">
        <div className="registro-card">
          {enviado ? (
            <div className="registro-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h2>¡Registro exitoso!</h2>
              <p>Gracias por registrar tu equipo. Hemos enviado un correo de confirmación con los detalles.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="registro-form">
              <div className="form-grid">
                {/* Nombre completo */}
                <div className="form-field">
                  <label htmlFor="nombre">Nombre completo <span className="required">*</span></label>
                  <input
                    type="text"
                    id="nombre"
                    {...register('nombre', { required: 'El nombre es obligatorio' })}
                    placeholder="Ej: Juan Pérez"
                  />
                  {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
                </div>

                {/* Correo electrónico */}
                <div className="form-field">
                  <label htmlFor="email">Correo electrónico <span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'El correo es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Correo no válido'
                      }
                    })}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                {/* Teléfono */}
                <div className="form-field">
                  <label htmlFor="telefono">Teléfono <span className="required">*</span></label>
                  <input
                    type="tel"
                    id="telefono"
                    {...register('telefono', {
                      required: 'El teléfono es obligatorio',
                      pattern: {
                        value: /^[0-9+\-\s]+$/,
                        message: 'Formato inválido'
                      }
                    })}
                    placeholder="300 123 4567"
                  />
                  {errors.telefono && <span className="error-message">{errors.telefono.message}</span>}
                </div>

                {/* Ciudad */}
                <div className="form-field">
                  <label htmlFor="ciudad">Ciudad <span className="required">*</span></label>
                  <input
                    type="text"
                    id="ciudad"
                    {...register('ciudad', { required: 'La ciudad es obligatoria' })}
                    placeholder="Bogotá"
                  />
                  {errors.ciudad && <span className="error-message">{errors.ciudad.message}</span>}
                </div>

                {/* Dirección (opcional) */}
                <div className="form-field">
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    type="text"
                    id="direccion"
                    {...register('direccion')}
                    placeholder="Calle 123 #45-67"
                  />
                </div>

                {/* Lugar de compra */}
                <div className="form-field">
                  <label htmlFor="lugarCompra">Lugar de compra <span className="required">*</span></label>
                  <input
                    type="text"
                    id="lugarCompra"
                    {...register('lugarCompra', { required: 'El lugar de compra es obligatorio' })}
                    placeholder="Ej: Tienda online, Distribuidor autorizado"
                  />
                  {errors.lugarCompra && <span className="error-message">{errors.lugarCompra.message}</span>}
                </div>

                {/* Fecha de compra */}
                <div className="form-field">
                  <label htmlFor="fechaCompra">Fecha de compra <span className="required">*</span></label>
                  <input
                    type="date"
                    id="fechaCompra"
                    {...register('fechaCompra', { required: 'La fecha de compra es obligatoria' })}
                  />
                  {errors.fechaCompra && <span className="error-message">{errors.fechaCompra.message}</span>}
                </div>

                {/* Producto */}
                <div className="form-field full-width">
                  <label htmlFor="producto">Producto <span className="required">*</span></label>
                  <select
                    id="producto"
                    {...register('producto', { required: 'Debes seleccionar un producto' })}
                  >
                    <option value="">Selecciona un producto</option>
                    {productList.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} ({product.category})
                      </option>
                    ))}
                  </select>
                  {errors.producto && <span className="error-message">{errors.producto.message}</span>}
                </div>

                {/* Número de serie */}
                <div className="form-field full-width">
                  <label htmlFor="serial">Número de serie <span className="required">*</span></label>
                  <input
                    type="text"
                    id="serial"
                    {...register('serial', { required: 'El número de serie es obligatorio' })}
                    placeholder="Ej: HL-AB12C3"
                  />
                  <small className="field-hint">Lo encuentras en la parte inferior del equipo.</small>
                  {errors.serial && <span className="error-message">{errors.serial.message}</span>}
                </div>

                {/* Subir factura (opcional) */}
                <div className="form-field full-width">
                  <label htmlFor="factura">Subir factura (opcional)</label>
                  <input
                    type="file"
                    id="factura"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <small className="field-hint">Formatos aceptados: PDF, JPG, PNG (máx 5MB)</small>
                </div>

                {/* Mensaje adicional */}
                <div className="form-field full-width">
                  <label htmlFor="mensaje">Mensaje adicional (opcional)</label>
                  <textarea
                    id="mensaje"
                    rows="4"
                    {...register('mensaje')}
                    placeholder="Cuéntanos cualquier detalle adicional sobre tu equipo o consulta"
                  ></textarea>
                </div>

                {/* Aceptación de políticas */}
                <div className="form-field full-width checkbox-field">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      {...register('acepta', { required: 'Debes aceptar las políticas de datos' })}
                    />
                    <span>He leído y acepto la <a href="/politica-privacidad" target="_blank">política de tratamiento de datos</a>.</span>
                  </label>
                  {errors.acepta && <span className="error-message">{errors.acepta.message}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">Registrar equipo</button>
                <p className="form-note">Los campos marcados con <span className="required">*</span> son obligatorios.</p>
              </div>
            </form>
          )}
        </div>

        <div className="registro-info">
          <div className="info-card">
            <h3>¿Por qué registrar tu equipo?</h3>
            <ul>
              <li>✓ Activa tu garantía de 2 años</li>
              <li>✓ Recibe notificaciones de actualizaciones</li>
              <li>✓ Soporte técnico prioritario</li>
              <li>✓ Ofertas exclusivas para clientes registrados</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para autocompletar tus datos y ver el historial de tus equipos.</p>
            <a href="/cuenta" className="info-link">Iniciar sesión</a>
          </div>
          <div className="info-card">
            <h3>¿Necesitas ayuda?</h3>
            <p>Contáctanos directamente:</p>
            <p><strong>📞 +57 300 123 4567</strong></p>
            <p><strong>✉️ soporte@homelife.com.co</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroEquipo;