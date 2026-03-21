/**
 * Limpia HTML eliminando etiquetas y devolviendo solo texto
 */
const limpiarHTML = (htmlString) => {
  if (!htmlString) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

/**
 * Filtra el contenido HTML removiendo bloques de WooCommerce y elementos no deseados
 */
const filtrarContenidoWordPress = (htmlString) => {
  if (!htmlString) return "";
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Remover bloques de WooCommerce
  const woocommerceBlocks = doc.querySelectorAll(
    '[data-wp-interactive], .wp-block-woocommerce-product-collection, .wc-block-product-template, [data-block-name*="woocommerce"]'
  );
  woocommerceBlocks.forEach(el => el.remove());
  
  // Remover divs con clases de WooCommerce
  const wooclasses = doc.querySelectorAll('[class*="wc-"], [class*="wp-block-woocommerce"]');
  wooclasses.forEach(el => {
    // Solo remover si son contenedores, no si son elementos de texto
    if (el.children.length === 0 && el.textContent.trim() === '') {
      el.remove();
    }
  });
  
  return doc.body.innerHTML;
};

/**
 * Adapta los datos de WordPress al formato esperado por los componentes React
 * @param {Object} post - Post obtenido de la API de WordPress
 * @param {Array} wpCategories - Array de categorías de WordPress para mapeo de nombres
 * @returns {Object} Post formateado para React
 */
const adaptarPostParaReact = (post, wpCategories = []) => {
  const yoast = post.yoast_head_json || {};
  const imageUrl = yoast.og_image?.[0]?.url || '/placeholder-blog.jpg';
  const readTimeStr = yoast.twitter_misc?.["Tiempo de lectura"] || "3 minutos";
  const readTimeNumber = readTimeStr.replace(/\D/g, '') || "3";
  const authorName = yoast.author || 'Equipo HomeLife';

  // Mapeo de categoría
  let categoryName = "General";
  if (post.categoria_react && post.categoria_react.length > 0 && wpCategories.length > 0) {
    const catMatch = wpCategories.find(c => c.id === post.categoria_react[0]);
    if (catMatch) categoryName = catMatch.name;
  }

  // Formateo de fecha
  const formattedDate = new Date(post.date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Fallback inteligente para el extracto
  const rawExcerpt = post.excerpt?.rendered || post.content?.rendered || '';
  const cleanExcerpt = limpiarHTML(rawExcerpt).substring(0, 120) + '...';

  return {
    id: post.id,
    title: post.title?.rendered || yoast.title?.replace(' - HomeLife', '') || 'Sin título',
    excerpt: cleanExcerpt,
    content: filtrarContenidoWordPress(post.content?.rendered || ''),
    date: formattedDate,
    image: imageUrl,
    category: categoryName,
    author: authorName,
    readTime: readTimeNumber,
    relatedProducts: post.acf?.productos_relacionados || []
  };
};

export { limpiarHTML, adaptarPostParaReact, filtrarContenidoWordPress };
