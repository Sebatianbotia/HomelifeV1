/**
 * Adaptador de datos WooCommerce Store API
 * Convierte datos de la WooCommerce Store API (/wc/store/v1/) al formato esperado por los componentes
 * NOTA: La Store API devuelve estructura de datos diferente que la REST API v3
 *       - Precios: objeto prices con propiedades separate
 *       - Stock: booleano is_in_stock en lugar de stock_status
 *       - Atributos: terms (objetos) en lugar de options (strings)
 */

/**
 * Convierte datos de categoría WC al formato de la app
 * @param {Object} wcCategory - Categoría de WC
 * @returns {Object} Categoría adaptada
 */
export const adaptCategory = (wcCategory) => {
  return {
    id: wcCategory.id,
    name: wcCategory.name,
    slug: wcCategory.slug || wcCategory.name.toLowerCase().replace(/\s+/g, '-'),
    count: wcCategory.count || 0,
  };
};

/**
 * Convierte datos de producto WC al formato de la app (para listados)
 * @param {Object} wcProduct - Producto de WC
 * @param {Array} allCategories - Todas las categorías para buscar nombres
 * @returns {Object} Producto adaptado
 */
export const adaptProduct = (wcProduct, allCategories = []) => {
  // Buscar la primera categoría del producto
  const firstCategory = wcProduct.categories?.[0] || {};
  const categoryName = firstCategory.name || 'Sin categoría';
  const categoryId = firstCategory.id || null;
  const categorySlug = firstCategory.slug || categoryName.toLowerCase().replace(/\s+/g, '-');

  // Extraer mejor imagen
  const images = wcProduct.images || [];

  // Store API: Los precios vienen ahora en un objeto prices
  // Estructura: { price, regular_price, sale_price, currency_symbol, ... }
  const prices = wcProduct.prices || {};
  const regularPrice = parseFloat(prices.regular_price || prices.price || 0);
  const salePrice = parseFloat(prices.sale_price || prices.price || 0);
  const price = salePrice > 0 ? salePrice : regularPrice;
  const discount = regularPrice > price ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;

  // Stock: ignorar y asumir siempre disponible
  const inStock = true;

  return {
    id: wcProduct.id.toString(),
    name: wcProduct.name || 'Producto sin nombre',
    slug: wcProduct.slug || wcProduct.id.toString(),
    category: categoryName,
    categoryId: categoryId,
    categorySlug: categorySlug,
    brand: 'HomeLife',
    price: Math.round(price),
    originalPrice: Math.round(regularPrice),
    discount: discount,
    inStock: inStock,
    stock: 999,
    rating: parseFloat(wcProduct.average_rating || 0),
    reviewCount: parseInt(wcProduct.rating_count || 0),
    isNew: false,
    isFeatured: false,
    images: images.map(img => img.src),
    shortDescription: wcProduct.short_description ? stripHtml(wcProduct.short_description) : '',
    sku: wcProduct.sku || '',
  };
};

/**
 * Convierte datos de producto WC al formato de la app (detalle completo)
 * @param {Object} wcProduct - Producto detallado de WC
 * @returns {Object} Producto adaptado con todos los detalles
 */
export const adaptProductDetalle = (wcProduct) => {
  const firstCategory = wcProduct.categories?.[0] || {};
  const categoryName = firstCategory.name || 'Sin categoría';
  const categoryId = firstCategory.id || null;
  const categorySlug = firstCategory.slug || categoryName.toLowerCase().replace(/\s+/g, '-');

  const images = wcProduct.images || [];
  const mainImages = images.map(img => img.src);

  // Store API: Los precios vienen en un objeto prices
  // Estructura: { price, regular_price, sale_price, currency_symbol, ... }
  const prices = wcProduct.prices || {};
  const regularPrice = parseFloat(prices.regular_price || prices.price || 0);
  const salePrice = parseFloat(prices.sale_price || prices.price || 0);
  const price = salePrice > 0 ? salePrice : regularPrice;
  const discount = regularPrice > price ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;

  // Stock: ignorar y asumir siempre disponible
  const inStock = true;

  // Procesar atributos
  // Store API: Los atributos vienen con terms (array de objetos) en lugar de options (array de strings)
  const specifications = {};
  const selectableAttributes = [];

  if (wcProduct.attributes && Array.isArray(wcProduct.attributes)) {
    wcProduct.attributes.forEach(attr => {
      // Solo mostrar como seleccionable si tiene 2 o más opciones (ej: Motivo, Color)
      if (attr.terms && attr.terms.length >= 2) {
        selectableAttributes.push({
          id: attr.id,
          name: attr.name,
          slug: attr.slug,
          options: attr.terms.map(t => ({
            id: t.id,
            name: t.name,
            slug: t.slug
          }))
        });

        specifications[attr.name] = attr.terms.map(t => t.name).join(', ');
      } else if (attr.terms && attr.terms.length > 0) {
        // Si solo tiene una opción, lo dejamos en especificaciones pero no como selector
        specifications[attr.name] = attr.terms.map(t => t.name).join(', ');
      } else if (attr.options && attr.options.length > 0) {
        specifications[attr.name] = attr.options.join(', ');
      }
    });
  }

  return {
    id: wcProduct.id.toString(),
    name: wcProduct.name || 'Producto sin nombre',
    slug: wcProduct.slug || wcProduct.id.toString(),
    category: categoryName,
    categoryId: categoryId,
    categorySlug: categorySlug,
    brand: 'HomeLife',
    price: Math.round(price),
    originalPrice: Math.round(regularPrice),
    discount: discount,
    inStock: inStock,
    stock: 999,
    rating: parseFloat(wcProduct.average_rating || 0),
    reviewCount: parseInt(wcProduct.rating_count || 0),
    isNew: false,
    isFeatured: false,
    images: mainImages,
    shortDescription: wcProduct.short_description ? stripHtml(wcProduct.short_description) : '',
    fullDescription: wcProduct.description ? sanitizeHtmlWithFormatting(wcProduct.description) : '',
    features: [],
    specifications: specifications,
    selectableAttributes: selectableAttributes,
    tags: wcProduct.tags || [],
    sku: wcProduct.sku || '',
    relatedIds: wcProduct.related_ids || [],
    techSheetPdf: extractTechSheet(wcProduct.description || wcProduct.short_description) || '',
  };
};

/**
 * Busca un enlace a PDF en el HTML (Ficha técnica)
 * @param {string} html - El HTML del producto
 * @returns {string|null} La URL del PDF si se encuentra
 */
const extractTechSheet = (html) => {
  if (!html) return null;

  // Buscar enlaces que terminen en .pdf
  const pdfRegex = /href=["']([^"']+\.pdf)["']/i;
  const match = html.match(pdfRegex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
};

/**
 * Elimina etiquetas HTML de un string
 * @param {string} html - HTML a limpiar
 * @returns {string} Texto sin HTML
 */
export const stripHtml = (html) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

/**
 * Sanitiza HTML permitiendo solo etiquetas seguras (p, strong, em, ul, li, br)
 * Ideal para descriptiones de productos que mantienen formato pero sin riesgo
 * @param {string} html - HTML con potencial contenido malicioso
 * @returns {string} HTML sanitizado con formato permitido
 */
export const sanitizeHtmlWithFormatting = (html) => {
  if (!html) return '';

  // Crear elemento temporal
  const div = document.createElement('div');
  div.innerHTML = html;

  // Etiquetas permitidas
  const allowedTags = ['P', 'STRONG', 'EM', 'UL', 'LI', 'BR', 'SPAN', 'B', 'I'];

  // Función recursiva para procesar nodos
  const cleanNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.cloneNode(true);
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    // Verificar si la etiqueta está permitida
    if (!allowedTags.includes(node.nodeName)) {
      // Si no está permitida, procesar sus hijos
      const fragment = document.createDocumentFragment();
      for (let child of node.childNodes) {
        const cleanedChild = cleanNode(child);
        if (cleanedChild) {
          fragment.appendChild(cleanedChild);
        }
      }
      return fragment;
    }

    // Crear nuevo elemento permitido
    const cleanedNode = document.createElement(node.nodeName.toLowerCase());

    // Copiar contenido de hijos
    for (let child of node.childNodes) {
      const cleanedChild = cleanNode(child);
      if (cleanedChild) {
        cleanedNode.appendChild(cleanedChild);
      }
    }

    return cleanedNode;
  };

  // Procesar todos los nodos hijos
  const fragment = document.createDocumentFragment();
  for (let child of div.childNodes) {
    const cleanedChild = cleanNode(child);
    if (cleanedChild) {
      fragment.appendChild(cleanedChild);
    }
  }

  // Crear contenedor para obtener HTML
  const result = document.createElement('div');
  result.appendChild(fragment);
  return result.innerHTML;
};

/**
 * Convierte array de productos WC
 * @param {Array} wcProducts - Productos de WC
 * @param {Array} allCategories - Categorías para referencia
 * @returns {Array} Productos adaptados
 */
export const adaptProducts = (wcProducts, allCategories = []) => {
  if (!Array.isArray(wcProducts)) return [];
  return wcProducts.map(product => adaptProduct(product, allCategories));
};

/**
 * Convierte array de categorías WC
 * @param {Array} wcCategories - Categorías de WC
 * @returns {Array} Categorías adaptadas
 */
export const adaptCategories = (wcCategories) => {
  if (!Array.isArray(wcCategories)) return [];
  return wcCategories.map(category => adaptCategory(category));
};
