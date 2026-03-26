/**
 * Homelife Service
 * Centraliza todas las peticiones al plugin de WordPress homelife/v1.
 * Usa httpClient para inyección automática de headers y BASE_URL.
 */

import { get, post, postForm } from './httpClient';

/**
 * Traer historial de pedidos del usuario autenticado.
 * @returns {Promise<Array>} Lista de pedidos
 */
export const getMisPedidos = async () => {
  const data = await get('/wp-json/homelife/v1/mis-pedidos');

  // Normalizar la respuesta al mismo formato que usaban los componentes
  let pedidos = data.pedidos || data.data || data;
  if (!Array.isArray(pedidos) && data.success && Array.isArray(data.pedidos)) {
    pedidos = data.pedidos;
  }
  return Array.isArray(pedidos) ? pedidos : [];
};

/**
 * Crear un nuevo pedido (Checkout).
 * @param {object} payload - Datos del pedido (metodo_pago, cc, items, billing, shipping)
 * @returns {Promise<object>} Respuesta del servidor con order_id y datos de pago
 */
export const crearPedido = async (payload) => {
  return post('/wp-json/homelife/v1/crear-pedido', payload);
};

/**
 * Actualizar datos del perfil del usuario.
 * @param {object} payload - Datos del usuario (user_id, first_name, last_name, billing, shipping, etc.)
 * @returns {Promise<object>} Respuesta de confirmación
 */
export const actualizarUsuario = async (payload) => {
  return post('/wp-json/homelife/v1/actualizar-usuario', payload);
};

/**
 * Registrar un equipo para garantía.
 * @param {FormData} formData - Formulario con datos del equipo y archivo de factura
 * @returns {Promise<object>} Respuesta de confirmación
 */
export const registrarEquipo = async (formData) => {
  return postForm('/wp-json/homelife/v1/registrar-equipo', formData);
};

/**
 * Enviar formulario de contacto para distribuidores.
 * @param {object} payload - Datos del distribuidor (empresa, contacto, celular, email, asunto, mensaje)
 * @returns {Promise<object>} Respuesta de confirmación
 */
export const contactoDistribuidor = async (payload) => {
  return post('/wp-json/homelife/v1/contacto-distribuidor', payload);
};
