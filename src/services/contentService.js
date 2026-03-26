/**
 * Content Service
 * Centraliza todas las peticiones de contenido estático de WordPress:
 * FAQ, Políticas, Nosotros, Testimonios, Slides del Hero,
 * Comunidad Social y Artículos de Blog.
 *
 * No requiere autenticación JWT — son endpoints públicos.
 */

const BASE_URL = (import.meta.env.VITE_WP_URL || 'https://www.homelife.com.co').replace(/\/$/, '');

const wpFetch = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error al cargar contenido: ${response.status}`);
  }
  return response.json();
};

/**
 * Obtener preguntas frecuentes (CPT: faq_react)
 * @returns {Promise<Array<{q: string, a: string}>>}
 */
export const getFAQ = async () => {
  const data = await wpFetch('/wp-json/wp/v2/faq_react?_fields=id,title,content&per_page=50');
  return data.map(item => ({
    q: item.title?.rendered || '',
    a: (() => {
      const div = document.createElement('div');
      div.innerHTML = item.content?.rendered || '';
      return div.textContent || div.innerText || '';
    })(),
  }));
};

/**
 * Obtener políticas de privacidad (página WP con slug "politicas")
 * @returns {Promise<{title: object, content: object}>}
 */
export const getPoliticas = async () => {
  const data = await wpFetch('/wp-json/wp/v2/pages?slug=politicas&_fields=title,content');
  if (!data.length) throw new Error('No se encontraron políticas');
  return data[0];
};

/**
 * Obtener datos de la sección Nosotros (CPT: secciones_home, slug "nosotros")
 * @returns {Promise<object|null>} Objeto ACF con los textos de misión, visión, etc.
 */
export const getNosotros = async () => {
  const data = await wpFetch(
    '/wp-json/wp/v2/secciones_home?slug=nosotros&_fields=acf&acf_format=standard'
  );
  return data.length > 0 && data[0].acf ? data[0].acf : null;
};

/**
 * Obtener testimonios de clientes (CPT: testimonio_home)
 * @returns {Promise<Array>} Testimoniales formateados para el componente
 */
export const getTestimonials = async () => {
  const data = await wpFetch(
    '/wp-json/wp/v2/testimonio_home?_fields=id,title,content,acf,yoast_head_json'
  );
  return data.map(item => ({
    id: item.id,
    name: item.title?.rendered || 'Cliente anónimo',
    text: (() => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(item.content?.rendered || '', 'text/html');
      return doc.body.textContent || item.yoast_head_json?.description || 'Excelente servicio';
    })(),
    rating: item.acf?.cantidad_estrellas || 5,
    avatar: item.yoast_head_json?.og_image?.[0]?.url || 'https://randomuser.me/api/portraits/lego/1.jpg',
    source: item.acf?.red_social || 'HomeLife',
  }));
};

/**
 * Obtener slides del Hero (CPT: slider_home)
 * @returns {Promise<Array>} Slides formateados para el HeroSlider
 */
export const getHeroSlides = async () => {
  const data = await wpFetch(
    '/wp-json/wp/v2/slider_home?_fields=id,title,yoast_head_json,acf'
  );
  return data.map(slide => ({
    id: slide.id,
    image: slide.yoast_head_json?.og_image?.[0]?.url || '/images/SliderImages/slider1.png',
    title: slide.title?.rendered || 'Equipo Médico',
    description: slide.yoast_head_json?.description || 'Calidad y tecnología al servicio de tu salud.',
    badge: slide.acf?.badge || '✨ Destacado',
    buttonText: slide.acf?.texto_boton || 'Explorar Productos',
    buttonLink: slide.acf?.enlace_boton?.trim() || '/productos',
  }));
};

/**
 * Obtener datos de la comunidad social (CPT: secciones_home, slug "comunidad-social")
 * @returns {Promise<object|null>} Objeto ACF con los datos de redes sociales
 */
export const getSocialFeed = async () => {
  const data = await wpFetch(
    '/wp-json/wp/v2/secciones_home?slug=comunidad-social&_fields=acf'
  );
  return data.length > 0 && data[0].acf ? data[0].acf : null;
};

/**
 * Obtener detalle de un artículo de blog (CPT: blog_react)
 * @param {string|number} id - ID del artículo
 * @returns {Promise<object>} Datos crudos del artículo de WordPress
 */
export const getArticuloDetalle = async (id) => {
  return wpFetch(
    `/wp-json/wp/v2/blog_react/${id}?_fields=id,date,title,content,categoria_react,yoast_head_json,acf`
  );
};
