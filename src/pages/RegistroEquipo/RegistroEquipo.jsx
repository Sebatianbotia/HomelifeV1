import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useProducts } from '../../context/ProductsContext';
import { useAuth } from '../../context/AuthContext';
import { registrarEquipo } from '../../services/homelifeService';
import './RegistroEquipo.css';

const RegistroEquipo = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const { productos } = useProducts();
  const { user } = useAuth();
  const [enviado, setEnviado] = useState(false);
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const selectedProductId = watch('producto');
  const selectedProduct = useMemo(() =>
    productos.find(p => String(p.id) === String(selectedProductId)),
    [productos, selectedProductId]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrar productos según el término de búsqueda
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return productos;
    return productos.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.categories?.[0]?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productos, searchTerm]);

  // Registrar el campo oculto para react-hook-form
  useEffect(() => {
    register('producto', { required: 'Debes seleccionar un producto' });
  }, [register]);

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);

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
      await registrarEquipo(formData);
      setEnviado(true);

      setTimeout(() => {
        setEnviado(false);
        reset();
        setArchivo(null);
      }, 5000);

    } catch (err) {
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

                {/* Producto Custom Dropdown */}
                <div className="form-field full-width custom-dropdown-wrapper" ref={dropdownRef}>
                  <label>Producto <span className="required">*</span></label>

                  <div
                    className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedProduct ? (
                      <div className="selected-product-item">
                        <span>{selectedProduct.name}</span>
                      </div>
                    ) : (
                      <span className="placeholder">Busca y selecciona tu equipo...</span>
                    )}
                    <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="custom-dropdown-panel">
                      <div className="search-bar-dropdown">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Escribe para buscar..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      <div className="dropdown-options-list">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map(product => (
                            <div
                              key={product.id}
                              className={`dropdown-option ${String(product.id) === String(selectedProductId) ? 'active' : ''}`}
                              onClick={() => {
                                setValue('producto', product.id, { shouldValidate: true });
                                setIsDropdownOpen(false);
                                setSearchTerm('');
                              }}
                            >
                              <div className="option-info">
                                <span className="option-name">{product.name}</span>
                                <span className="option-category">{product.categories?.[0]?.name || 'HomeLife'}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="no-results">No se encontraron productos</div>
                        )}
                      </div>
                    </div>
                  )}
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
            <p><strong>✉️ atencionalcliente@homelife.com</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroEquipo;