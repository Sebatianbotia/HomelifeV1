# Análisis de Integración: Detalle de Producto (WooCommerce)

Este documento detalla la estructura del JSON recibido de la API de WooCommerce para un producto y cómo mapear estos datos a los componentes de la página de detalle (`producto-detalle`).

## 1. Datos útiles para `producto-detalle`

A continuación se listan los campos del JSON que deben usarse para renderizar la página:

| Dato | Campo en el JSON | Propósito |
| :--- | :--- | :--- |
| **Título** | `name` | Nombre principal del producto. |
| **Precio** | `price` | Valor numérico (ej. "75000"). |
| **Precio Formateado** | `price_html` | HTML con el símbolo de moneda y formato (ej. "$75.000"). |
| **Resumen Corto** | `short_description` | Descripción breve, usualmente mostrada junto a las imágenes. |
| **Descripción Larga** | `description` | Detalles completos, especificaciones narrativas. |
| **Imágenes** | `images` | Array de objetos con `src` y `alt`. |
| **Estado de Stock** | `stock_status` | Indica si está "instock" o "outofstock". |
| **Ficha Técnica** | `attributes` | Lista de características (Ref, Uso, Dimensiones, etc.). |
| **Categorías** | `categories` | Array con nombres e IDs de las categorías. |
| **Productos Relacionados** | `related_ids` | IDs para realizar peticiones de productos cruzados. |
| **SEO Meta** | `yoast_head_json` | Título y descripción para el motor de búsqueda. |
| **Categoría Principal** | `meta_data` (`_yoast_wpseo_primary_product_cat`) | Si usas Yoast SEO, este ID indica la categoría "Hogar". |

---

## 2. Acceso a los Datos (Implementación)

Si el objeto se recibe como `product`, así es como accederías a cada nivel:

### Información Básica
```javascript
const titulo = product.name;
const precio = product.price; // "75000"
// La descripción corta contiene el link de WhatsApp
const linkWhatsApp = product.short_description; 
```

### Galería de Imágenes
```javascript
// Primera imagen (Principal)
const imagenPrincipal = product.images[0]?.src;
const altImagen = product.images[0]?.alt || product.name;

// Todas las imágenes para un carrusel
const galeria = product.images.map(img => ({
  id: img.id,
  url: img.src,
  alt: img.alt
}));
```

### Ficha Técnica (Atributos)
Los atributos vienen en un array. Para mostrarlos en una tabla:
```javascript
{product.attributes.map(attr => (
  <tr key={attr.id}>
    <td>{attr.name}</td>
    <td>{attr.options.join(', ')}</td>
  </tr>
))}
```

### Categorías y Etiquetas
```javascript
// Renderizar lista de categorías
const categorias = product.categories.map(cat => cat.name).join(', ');

// Identificar la categoría principal (Lógica opcional)
const primaryCatId = product.meta_data.find(m => m.key === '_yoast_wpseo_primary_product_cat')?.value;
const mainCategory = product.categories.find(c => c.id.toString() === primaryCatId) || product.categories[0];
```

### SEO (Yoast)
```javascript
const seoTitle = product.yoast_head_json.title;
const seoDesc = product.yoast_head_json.description;
```

---

## 3. Datos NO presentes en este JSON (Carencias)

Aunque el JSON es muy completo, para una experiencia de usuario "premium" podrían faltar o requerir lógica adicional:

1.  **Costo de Envío:** No se calcula aquí. Requiere una integración con el sistema de zonas de WooCommerce o plugins de transportadoras en el checkout.
2.  **Opiniones/Reviews Detalladas:** Aunque existe `rating_count`, el contenido de las reseñas requiere una petición por separado a `/products/{id}/reviews`.
3.  **Cuotas/Financiación:** Si se desea mostrar algo como "Paga 3 cuotas de $25.000", esta lógica debe programarse en el frontend dividiendo el `price`.
4.  **Marca (Brand):** El campo `brands` está vacío en este JSON. Si usas un plugin de marcas, los datos podrían estar en `meta_data` bajo una key específica.
5.  **Variaciones:** Este es un producto `simple`. Si fuera `variable`, el campo `variations` contendría IDs, pero no el detalle de cada variación (requiere otra petición).
6.  **Migas de Pan (Breadcrumbs):** El JSON tiene la estructura en `schema`, pero no un array plano sencillo de etiquetas/links para un componente de navegación.

---

> [!TIP]
> Dado que la `description` y `short_description` vienen en formato HTML, asegúrate de usarlos con precaución en React utilizando `dangerouslySetInnerHTML` o una librería de sanitización.