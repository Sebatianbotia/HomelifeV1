import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useProducts } from '../../context/ProductsContext';
import { useAuth } from '../../context/AuthContext';
import './RegistroEquipo.css';

const RegistroEquipo = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { productos } = useProducts();
  const { user } = useAuth();
  const [enviado, setEnviado] = useState(false);
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const BASE_URL = import.meta.env.VITE_WP_URL || 'https://www.homelife.com.co';

  // Obtener lista única de productos para el selector
  const productList = useMemo(() => {
    return productos.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category
    }));
  }, [productos]);

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);

    const token = localStorage.getItem('homelife_jwt') || user?.token;

    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('email', data.email);
    formData.append('telefono', data.telefono);
    formData.append('ciudad', data.ciudad);
    formData.append('direccion', data.direccion || '');
    formData.append('lugarCompra', data.lugarCompra);
    formData.append('fechaCompra', data.fechaCompra);
    formData.append('producto_id', data.producto);
    formData.append('serial', data.serial);
    formData.append('mensaje', data.mensaje || '');
    formData.append('acepta', data.acepta ? '1' : '0');

    if (archivo) {
      formData.append('factura', archivo);
    }

    try {
      const response = await fetch(`${BASE_URL}/wp-json/homelife/v1/registrar-equipo`, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok || responseData.success === false) {
        throw new Error(responseData.message || responseData.error || 'Error al registrar el equipo.');
      }

      setEnviado(true);

      setTimeout(() => {
        setEnviado(false);
        reset();
        setArchivo(null);
      }, 5000);

    } catch (err) {
      console.error('Error registrando equipo:', err);
      setServerError(err.message || 'Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
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
              {serverError && (
                <div className="server-error" style={{ color: '#ff8a80', background: 'rgba(255, 82, 82, 0.1)', border: '1px solid rgba(255, 82, 82, 0.25)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                  <strong>Error: </strong> {serverError}
                </div>
              )}
              <div className="form-grid">
                {/* Nombre completo */}
                <div className="form-field">
                  <label htmlFor="nombre">Nombre completo <span className="required">*</span></label>
                  <input
                    type="text"
                    id="nombre"
                    {...register('nombre', { required: 'El nombre es obligatorio' })}
                    placeholder="Ej: Juan Pérez"
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                  {errors.fechaCompra && <span className="error-message">{errors.fechaCompra.message}</span>}
                </div>

                {/* Producto */}
                <div className="form-field full-width">
                  <label htmlFor="producto">Producto <span className="required">*</span></label>
                  <select
                    id="producto"
                    {...register('producto', { required: 'Debes seleccionar un producto' })}
                    disabled={loading}
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
                    disabled={loading}
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
                    accept=".pdf"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                  <small className="field-hint">Formatos aceptados: Solo PDF (máx 5MB)</small>
                </div>

                {/* Mensaje adicional */}
                <div className="form-field full-width">
                  <label htmlFor="mensaje">Mensaje adicional (opcional)</label>
                  <textarea
                    id="mensaje"
                    rows="4"
                    {...register('mensaje')}
                    placeholder="Cuéntanos cualquier detalle adicional sobre tu equipo o consulta"
                    disabled={loading}
                  ></textarea>
                </div>

                {/* Aceptación de políticas */}
                <div className="form-field full-width checkbox-field">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      {...register('acepta', { required: 'Debes aceptar las políticas de datos' })}
                      disabled={loading}
                    />
                    <span>He leído y acepto la <a href="/politica-privacidad" target="_blank">política de tratamiento de datos</a>.</span>
                  </label>
                  {errors.acepta && <span className="error-message">{errors.acepta.message}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrar equipo'}
                </button>
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