/**
 * WooCommerce Store API Service
 * Maneja todas las peticiones a la WooCommerce Store API pública (/wc/store/v1/)
 * Documentación: WP_API.md
 * 
 * NOTA: Esta es la API pública de WooCommerce. NO requiere consumer_key ni consumer_secret.
 */

const WP_URL = import.meta.env.VITE_WP_URL || 'https://www.homelife.com.co';
const isDevelopment = import.meta.env.DEV;

const buildStoreApiUrl = (endpoint = '') => {
  // En desarrollo, usa URL relativa para que Vite proxy lo intercepte
  // En producción, usa URL absoluta
  if (isDevelopment) {
    return new URL(`/wp-json/wc/store/v1${endpoint}`, 'http://localhost:5173');
  }
  return new URL(`${WP_URL}/wp-json/wc/store/v1${endpoint}`);
};

/**
 * Traer todos los productos (para grilla de productos)
 * @param {number} page - Número de página (default 1)
 * @param {number} perPage - Items por página (default 100)
 * @returns {Promise<Array>} Array de productos
 */
export const fetchProductos = async (page = 1, perPage = 100) => {
  try {
    const url = buildStoreApiUrl('/products');
    // Store API: Campos específicos según WP_API.md
    // Nota: 'prices' es un objeto, no 'price,regular_price,sale_price'
    url.searchParams.append('_fields', 'id,name,categories,prices,images,sku,average_rating,rating_count');
    url.searchParams.append('page', page);
    url.searchParams.append('per_page', perPage);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Traer categorías de productos (id y nombre)
 * @returns {Promise<Array>} Array de categorías
 */
export const fetchCategorias = async () => {
  try {
    const url = buildStoreApiUrl('/products/categories');
    url.searchParams.append('_fields', 'id,name');
    url.searchParams.append('per_page', '30');

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Traer un producto por ID con todos los detalles
 * @param {number} productId - ID del producto
 * @returns {Promise<Object>} Objeto producto con detalles completos
 */
export const fetchProductoDetalle = async (productId) => {
  try {
    const url = buildStoreApiUrl(`/products/${productId}`);
    // Store API: Campos específicos incluyendo attributes y related_ids según WP_API.md
    // Nota: 'prices' es un objeto, no 'price,regular_price,sale_price'
    url.searchParams.append(
      '_fields',
      'id,name,description,short_description,prices,average_rating,rating_count,categories,images,attributes,related_ids'
    );

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Traer múltiples productos por IDs (para productos relacionados)
 * @param {Array<number>} productIds - Array de IDs de productos
 * @returns {Promise<Array>} Array de productos
 */
export const fetchProductosPorIds = async (productIds) => {
  if (!productIds || productIds.length === 0) return [];

  try {
    const url = buildStoreApiUrl('/products');
    url.searchParams.append('_fields', 'id,name,prices,images,average_rating,rating_count');
    url.searchParams.append('include', productIds.join(','));

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Traer productos filtrados por categoría
 * @param {number} categoryId - ID de categoría
 * @param {number} page - Número de página (default 1)
 * @param {number} perPage - Items por página (default 100)
 * @returns {Promise<Array>} Array de productos
 */
export const fetchProductosPorCategoria = async (categoryId, page = 1, perPage = 100) => {
  try {
    const url = buildStoreApiUrl('/products');
    url.searchParams.append('_fields', 'id,name,categories,prices,images,sku,average_rating,rating_count');
    // En Store API el parámetro puedre ser "category" pero se verifica con el servidor
    url.searchParams.append('category', categoryId);
    url.searchParams.append('page', page);
    url.searchParams.append('per_page', perPage);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Traer productos filtrados por categoría y precio
 * @param {number} categoryId - ID de categoría
 * @param {number} minPrice - Precio mínimo
 * @param {number} maxPrice - Precio máximo
 * @param {number} page - Número de página (default 1)
 * @param {number} perPage - Items por página (default 100)
 * @returns {Promise<Array>} Array de productos
 */
export const fetchProductosPorCategoriaYPrecio = async (
  categoryId,
  minPrice,
  maxPrice,
  page = 1,
  perPage = 100
) => {
  try {
    const url = buildStoreApiUrl('/products');
    url.searchParams.append('_fields', 'id,name,categories,prices,images,sku,average_rating,rating_count');
    url.searchParams.append('category', categoryId);
    url.searchParams.append('min_price', minPrice);
    url.searchParams.append('max_price', maxPrice);
    url.searchParams.append('page', page);
    url.searchParams.append('per_page', perPage);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    return await response.json();
  } catch (error) {
    throw error;
  }
}
