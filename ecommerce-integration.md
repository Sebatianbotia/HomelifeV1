# Migración Total a WordPress + WooCommerce (Headless E-commerce)

Esta guía detalla cómo transformar este proyecto React en una tienda dinámica donde WordPress gestiona **todo**: contenidos, productos, usuarios y pagos.

## 1. Arquitectura del Sistema

Tu proyecto actual pasará de datos estáticos a una arquitectura "Headless":
- **Backend:** WordPress + WooCommerce (Gestiona datos y lógica de negocio).
- **Frontend:** Tu App React actual (Gestiona la interfaz y experiencia de usuario).
- **Comunicación:** API REST / JSON.

---

## 2. Preparación del Backend (WordPress)

Necesitarás instalar estos plugins esenciales en tu WordPress:

1.  **WooCommerce:** El motor de la tienda.
2.  **WP Webhooks:** Para enviar datos a otros servicios si es necesario.
3.  **JWT Authentication for WP REST API:** Para que tus usuarios de React puedan "loguearse" en WordPress de forma segura.
4.  **CoCart:** (Altamente recomendado) Proporciona una API mucho más sencilla para manejar el carrito desde React.
5.  **ACF (Advanced Custom Fields):** Para añadir datos extra a tus productos que WooCommerce no trae por defecto.

---

## 3. Manejo de Contenido (CMS)

Todo lo que ves en las carpetas `src/pages/Blog`, `FAQ`, `Legal`, `Nosotros` y `Home` debe ser reemplazado por llamadas a la API:

- **Blog:** Usa `/wp-json/wp/v2/posts`.
- **Páginas Estáticas:** Usa `/wp-json/wp/v2/pages`.
- **FAQs:** Crea un "Custom Post Type" en WordPress y consúltalo vía API.

---

## 4. Gestión de Productos (WooCommerce)

Actualmente tus productos están en `src/data/products.js`. Debes migrarlos a WooCommerce y consumirlos así:

- **Listado de Productos:** `/wp-json/wc/v3/products`.
- **Categorías:** `/wp-json/wc/v3/products/categories`.
- **Filtros:** WordPress permite filtrar por categoría, etiqueta y precio directamente en la URL de la API.

---

## 5. El Carrito y el Checkout (La parte clave)

Aquí es donde la mayoría de los proyectos headless sufren. Tienes dos caminos:

### Opción A: Carrito en React + Checkout en WordPress (Fácil)
1. El usuario navega en React.
2. Al hacer clic en "Pagar", creas un enlace que redirige al usuario a `tu-wordpress.com/checkout?add-to-cart=ID_PRODUCTO`.
3. El pago ocurre en la interfaz nativa de WordPress/WooCommerce.
4. **Pros:** Te ahorras configurar pasarelas de pago en React.

### Opción B: Carrito Sincronizado + Checkout Headless (Avanzado)
1. Usas el plugin **CoCart** para que cuando el usuario añada algo al carrito en React, también se añada en la sesión de WordPress en segundo plano.
2. Usas la API de WooCommerce para crear el "Order".
3. Implementas la pasarela de pago (Stripe, PayPal, etc.) directamente en React usando sus librerías correspondientes.
4. **Pros:** El usuario nunca abandona tu aplicación React.

---

## 6. Autenticación de Usuarios

Para que las páginas de `Cuenta` y `Auth` funcionen con WordPress:
1. El usuario envía email/password desde React.
2. El plugin JWT devuelve un **Token**.
3. Guardas ese token en `localStorage`.
4. En cada petición a la API (como ver sus pedidos), incluyes el token en el header: `Authorization: Bearer <TOKEN>`.

---

## 7. Pasarela de Pagos (Ejemplo Stripe)

Para manejar pagos directamente en React:
1. Instala `@stripe/stripe-js` y `@stripe/react-stripe-js`.
2. Cuando el usuario confirma la compra, pides a tu WordPress (vía un endpoint personalizado) que cree un "PaymentIntent".
3. Stripe procesa el pago en el frontend.
4. Una vez aprobado, notificas a WooCommerce para que marque el pedido como "Pagado".

---

## Resumen de Pasos Inmediatos

1.  **Levanta tu WordPress** (local o remoto).
2.  **Crea 3 productos de prueba** en WooCommerce.
3.  **Configura las claves de API** de WooCommerce (Settings -> Advanced -> REST API).
4.  **Actualiza tu `.env`** en React con estas claves.
5.  **Empieza por `Productos.jsx`**: Reemplaza el import de `products.js` por un `fetch` a la API de WooCommerce.

> [!TIP]
> Si buscas una solución más moderna y rápida, considera usar **WPGraphQL** junto con **WooGraphQL**. Es mucho más eficiente que la API REST para e-commerce.
