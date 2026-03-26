/**
 * HTTP Client — capa base para todas las peticiones al backend.
 * Inyecta automáticamente:
 *   - BASE_URL desde VITE_WP_URL
 *   - Content-Type: application/json
 *   - Authorization: Bearer <token> (si existe en localStorage)
 *
 * Para peticiones con FormData, omite Content-Type para que el
 * navegador establezca el boundary correcto multipart/form-data.
 */

const BASE_URL = import.meta.env.VITE_WP_URL || 'https://www.homelife.com.co';

const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem('homelife_jwt');
  const headers = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Realiza una petición HTTP y devuelve los datos JSON.
 * @param {string} endpoint - Ruta relativa, p.ej. '/wp-json/homelife/v1/mis-pedidos'
 * @param {RequestInit} options - Opciones nativas de fetch (method, body, etc.)
 * @param {boolean} isFormData - Si el body es FormData, omite Content-Type
 * @returns {Promise<any>} Los datos de respuesta en JSON
 * @throws {Error} Si la respuesta no es OK
 */
export const apiRequest = async (endpoint, options = {}, isFormData = false) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = { ...getAuthHeaders(isFormData), ...(options.headers || {}) };

  const response = await fetch(url, { ...options, headers });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || `Error ${response.status}: ${response.statusText}`
    );
  }

  return data;
};

/**
 * GET helper
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
export const get = (endpoint) => apiRequest(endpoint, { method: 'GET' });

/**
 * POST helper (JSON)
 * @param {string} endpoint
 * @param {object} body
 * @returns {Promise<any>}
 */
export const post = (endpoint, body) =>
  apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) });

/**
 * POST helper (FormData — para subida de archivos)
 * @param {string} endpoint
 * @param {FormData} formData
 * @returns {Promise<any>}
 */
export const postForm = (endpoint, formData) =>
  apiRequest(endpoint, { method: 'POST', body: formData }, true);

export default { get, post, postForm, apiRequest };
