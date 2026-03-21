Actúa como un desarrollador experto en React y Headless WordPress.

Tengo el componente Nosotros.jsx que actualmente tiene todos sus textos e imágenes de certificaciones hardcodeados. Necesito refactorizarlo para que consuma datos dinámicos desde mi API de WordPress, manteniendo intactos los íconos SVG de las tarjetas, las clases CSS y la estructura HTML.

1. Endpoint a utilizar:
Usa la variable de entorno para la URL base.

Datos de la página: ${BASE_URL}/wp-json/wp/v2/secciones_home?slug=nosotros&_fields=acf&acf_format=standard
(Nota: Al buscar por slug, WP devuelve un array. Debes tomar el índice [0]).

2. Tareas a realizar:

Crea los estados data (objeto vacío o null), loading (boolean, inicializado en true) y error (string).

Haz un useEffect para hacer el fetch al endpoint y guardar respuesta[0].acf en el estado data. Maneja el catch para errores y el finally para el loading.

Mientras loading sea true, devuelve un texto o esqueleto simple de "Cargando información...".

Sección Hero: Reemplaza el <h1> y el <p> por data?.hero_titulo y data?.hero_subtitulo. (Añade fallbacks de texto por si acaso).

Sección Historia: Reemplaza el texto dentro de .historia-texto por data?.historia_texto. (Si usaste un editor WYSIWYG en WP, usa dangerouslySetInnerHTML, si usaste Área de Texto normal, imprímelo directo).

Sección Pilares (Cards): Transforma el array constante cards en una variable generada dentro del componente (o useMemo) para que la propiedad description tome los valores del estado:

Misión: data?.mision_texto

Visión: data?.vision_texto

Valores: data?.valores_texto
(Mantén los icon, id y title exactamente como están en el código original).

Sección Certificaciones: Actualiza el array certifications para que la propiedad image tome los campos del estado (data?.cert_1, data?.cert_2, etc.). Si algún campo de imagen viene vacío, fíltralo para que no renderice una imagen rota en el .certificaciones-grid.