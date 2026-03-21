Actúa como un desarrollador experto en React y Headless WordPress.

Tengo tres componentes que se renderizan en mi Home.jsx: HeroSlider, SocialCommunity y Testimonials. Actualmente usan arrays de datos hardcodeados. Necesito refactorizarlos para que consuman datos dinámicos desde mi API REST de WordPress.

Reglas Globales:

Mantén intactas TODAS las clases CSS (className), estructuras HTML y los SVGs. No modifiques el diseño.

Usa la variable de entorno para la URL base (ej. import.meta.env.VITE_WC_URL o process.env.REACT_APP_WC_URL).

Añade estados de loading (boolean) y error (string) en cada componente, devolviendo un esqueleto o un texto simple de "Cargando..." mientras se resuelven las peticiones.

Crea o usa una utilidad para limpiar HTML:

JavaScript
const limpiarHTML = (htmlString) => {
  if (!htmlString) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};
Tarea 1: Refactorizar HeroSlider.jsx
Endpoint: ${BASE_URL}/wp-json/wp/v2/slider_home?_fields=id,title,yoast_head_json,acf

Instrucciones específicas:

Haz un fetch a la API y guarda los resultados en el estado slides.

Mapea la respuesta de WordPress al formato que espera el slider:

image: slide.yoast_head_json?.og_image?.[0]?.url

title: slide.title?.rendered

description: slide.yoast_head_json?.description || ''

badge: slide.acf?.badge || '✨ Destacado' (Fallback si no existe).

buttonText: slide.acf?.texto_boton || 'Explorar Productos' (Fallback si no existe).

REGLA ESTRICTA DE REDIRECCIÓN: Para buttonLink, verifica el valor de slide.acf?.enlace_boton. Si viene vacío (""), nulo o no existe, DEBES asignar obligatoriamente '/productos'.

Asegúrate de que el setInterval que cambia los slides solo se ejecute si slides.length > 0.

Tarea 2: Refactorizar SocialCommunity.jsx
Endpoint: ${BASE_URL}/wp-json/wp/v2/secciones_home?slug=comunidad-social&_fields=acf

Instrucciones específicas:

Haz el fetch y guarda respuesta[0].acf en un estado data.

Mantén la inyección del script de TikTok (embed.js), pero el blockquote de TikTok solo debe renderizarse si data?.tiktok_video_id existe. Reemplaza el data-video-id y la URL en el cite con este valor.

Transforma la constante socialData en una variable dentro del renderizado o usa useMemo, y reemplaza la propiedad followers con:

Instagram: data?.instagram_followers || '0'

TikTok: data?.tiktok_followers || '0'

YouTube: data?.youtube_followers || '0'

Facebook: data?.facebook_followers || '0'

Reemplaza las estadísticas globales quemadas (25K+, 500+, 10M+) por data?.stat_totales, data?.stat_publicaciones y data?.stat_alcance.

Tarea 3: Refactorizar Testimonials.jsx
Endpoint: ${BASE_URL}/wp-json/wp/v2/testimonio_home?_fields=id,title,content,acf

Instrucciones específicas:

Haz un fetch al endpoint y guarda los resultados en el estado testimonials.

Mapea la respuesta al formato del componente:

name: item.title?.rendered

text: Usa la utilidad limpiarHTML(item.content?.rendered) (elimina las comillas extrañas o etiquetas <p>).

rating: item.acf?.cantidad_estrellas || 5 (Fallback a 5 si no viene en ACF).

avatar: item.acf?.foto_cliente || 'https://randomuser.me/api/portraits/lego/1.jpg' (Fallback genérico).

source: item.acf?.red_social || 'HomeLife' (Fallback genérico).