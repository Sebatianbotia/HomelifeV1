Por motivos de seguridad, estamos migrando nuestra aplicación de la API REST v3 de WooCommerce (/wc/v3/) a la WooCommerce Store API pública (/wc/store/v1/). Esto significa que DEBES ELIMINAR por completo el uso de consumer_key y consumer_secret en todas las peticiones fetch relacionadas con productos y categorías.

Necesito que actualices los archivos donde se maneja el estado global de productos (ej. ProductsContext.jsx), la grilla de productos y la vista de detalle (ProductoDetalle.jsx).

Traer todos los productos (para grilla de productos)
    - https://www.homelife.com.co/wp-json/wc/store/v1/products?_fields=id,name,categories,prices,images,sku,average_rating,rating_count&per_page=100

    Por un producto devuelve:
    
         {
    "id": 34380,
    "name": "Termómetro Infrarrojo",
    "sku": "",
    "prices": {
      "price": "75000",
      "regular_price": "75000",
      "sale_price": "75000",
      "price_range": null,
      "currency_code": "COP",
      "currency_symbol": "$",
      "currency_minor_unit": 0,
      "currency_decimal_separator": ",",
      "currency_thousand_separator": ".",
      "currency_prefix": "$",
      "currency_suffix": ""
    },
    "average_rating": "0",
    "images": [
      {
        "id": 34381,
        "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-.png",
        "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--500x500.png",
        "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--180x180.png 180w",
        "sizes": "(max-width: 550px) 100vw, 550px",
        "name": "termometro infrarrojo",
        "alt": "termometro infrarrojo"
      },
      {
        "id": 34383,
        "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife.png",
        "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-500x500.png",
        "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-180x180.png 180w",
        "sizes": "(max-width: 550px) 100vw, 550px",
        "name": "termometro infrarrojo homelife",
        "alt": ""
      },
      {
        "id": 34382,
        "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto.png",
        "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-500x500.png",
        "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-180x180.png 180w",
        "sizes": "(max-width: 550px) 100vw, 550px",
        "name": "termometro infrarrojo homelife sin contacto",
        "alt": ""
      }
    ],
    "categories": [
      {
        "id": 22,
        "name": "Termómetros",
        "slug": "termometros",
        "link": "https://www.homelife.com.co/categoria-producto/termometros/"
      }
    ]
  },
    Esos datos debes usarlos para cada product card (en la sección de productos y productos destacados)

Traer categorias de productos solo con id y nombre
    -https://www.homelife.com.co/wp-json/wc/store/v1/products/categories?_fields=id,name&per_page=30

    Devuelve:
    [
         {
            "id": 67,
            "name": "Accesorios"
        },
    Por cada categoría.
    Debes usarlo para llenar todos los campos de categoría en el proyecto, incluído asociar el nombre de una categoría a un producto.



Traer un producto por id con ciertos campos (para producto-detalle)
    - https://www.homelife.com.co/wp-json/wc/store/v1/products/id_producto?_fields=id,name,description,short_description,prices,average_rating,rating_count,categories,images,attributes,related_ids

    devuelve:
      {
  "id": 34380,
  "name": "Termómetro Infrarrojo",
  "short_description": "\u003Cp\u003E\u003Ca href=\"https://wa.link/gok0za\"\u003E\u003Cimg class=\"alignleft wp-image-34040\" src=\"https://www.homelife.com.co/wp-content/uploads/2025/02/Recurso-11.png\" alt=\"Homelife contraentrega\" width=\"251\" height=\"56\" /\u003E\u003C/a\u003E\u003C/p\u003E\n\u003Cp\u003E&nbsp;\u003C/p\u003E\n\u003Cp\u003E&nbsp;\u003C/p\u003E\n\u003Cp\u003ETermómetro infrarrojo portátil con pantalla que cambia de color según el nivel de temperatura. Ideal para mediciones rápidas, precisas y seguras en casa o en consultorios.\u003C/p\u003E",
  "description": "\u003Cp\u003E\u003Cspan class=\"r element-18\"\u003E\u003Cspan dir=\"auto\"\u003EEl termómetro infrarrojo sin contacto \u003Cstrong\u003EHOMELIFE\u003C/strong\u003E\u003C/span\u003E\u003C/span\u003E\u003Cstrong\u003E\u003Cspan class=\"r element-20\"\u003E \u003C/span\u003E\u003C/strong\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-24\"\u003E\u003Cstrong\u003E \u003C/strong\u003Ecuenta con un sensor infrarrojo especial que captura el calor corporal, registra y muestra la lectura en la pantalla. Además, a diferencia de los termómetros convencionales de mercurio o electrónicos, \u003Cstrong\u003E¡solo tarda 1 segundo en determinar la temperatura\u003C/strong\u003E\u003C/span\u003E\u003Cspan class=\"r element-25\"\u003E\u003Cstrong\u003E!\u003C/strong\u003E \u003C/span\u003E\u003Cspan class=\"r element-26\"\u003E Los \u003C/span\u003E\u003Cspan class=\"r element-28\"\u003E resultados \u003C/span\u003E\u003Cspan class=\"r element-27\"\u003E de la medición \u003C/span\u003E\u003Cspan class=\"r element-29\"\u003Eson precisos.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\n\u003Cp class=\"p element-43\"\u003E\u003Cspan class=\"r element-49\"\u003E\u003Cspan dir=\"auto\"\u003EMide temperatura corporal \u003C/span\u003E\u003C/span\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-51\"\u003E(rango  \u003C/span\u003E\u003Cspan class=\"r element-52\"\u003E34 \u003C/span\u003E\u003Cspan class=\"r element-53\"\u003E&#8211; \u003C/span\u003E\u003Cspan class=\"r element-54\"\u003E43 \u003C/span\u003E\u003Cspan class=\"r element-55\"\u003E ℃) \u003C/span\u003E\u003Cspan class=\"r element-56\"\u003Ey la temperatura \u003C/span\u003E\u003Cspan class=\"r element-58\"\u003Ede superficies de objetos \u003C/span\u003E\u003Cspan class=\"r element-60\"\u003E(rango 0-100 ℃): líquidos (agua de baño, biberón); superficies sólidas  \u003C/span\u003E\u003Cspan class=\"r element-62\"\u003E, \u003C/span\u003E\u003Cspan class=\"r element-61\"\u003Eetc.\u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-50\"\u003E \u003C/span\u003E\u003Cspan class=\"r element-57\"\u003E \u003C/span\u003E\u003Cspan class=\"r element-59\"\u003E \u003C/span\u003E\u003C/p\u003E\n\u003Cp class=\"p element-63\"\u003E\u003Cspan class=\"r element-64\"\u003E\u003Cspan dir=\"auto\"\u003EEste termómetro muestra los resultados de la medición mediante colores: \u003Cstrong\u003E\u003Cspan style=\"color: #008000\"\u003Everde (temperatura normal)\u003C/span\u003E\u003C/strong\u003E, \u003Cspan style=\"color: #ffcc00\"\u003E\u003Cstrong\u003Eamarillo (temperatura elevada)\u003C/strong\u003E\u003C/span\u003E y \u003Cstrong\u003E\u003Cspan style=\"color: #ff0000\"\u003Erojo (temperatura muy alta)\u003C/span\u003E\u003C/strong\u003E. Esto resulta muy práctico para usarlo en la oscuridad o con poca visibilidad.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\n\u003Cp class=\"p element-66\"\u003E\u003Cstrong\u003E\u003Cspan class=\"r element-67\"\u003E\u003Cspan dir=\"auto\"\u003EVentajas del termómetro infrarrojo sin contacto  \u003C/span\u003E\u003C/span\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-72\"\u003Ecompacto \u003C/span\u003E\u003C/span\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-71\"\u003E \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-69\"\u003E \u003C/span\u003E\u003C/strong\u003E\u003C/p\u003E\n\u003Cul\u003E\n\u003Cli class=\"p element-73\"\u003E\u003Cspan class=\"r element-74\"\u003E\u003Cspan dir=\"auto\"\u003ERecomendado para todas las edades (bebés, niños, adultos).\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-75\"\u003E\u003Cspan class=\"r element-76\"\u003E\u003Cspan dir=\"auto\"\u003ETamaño compacto y peso ligero (solo  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-77\"\u003E\u003Cspan dir=\"auto\"\u003E8,2 cm de longitud y 45 gramos \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-78\"\u003E\u003Cspan dir=\"auto\"\u003E)\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-79\"\u003E\u003Cspan class=\"r element-80\"\u003E\u003Cspan dir=\"auto\"\u003EDos modos de medición: temperatura corporal (rango 3,4 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-81\"\u003E\u003Cspan dir=\"auto\"\u003E&#8211; \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-82\"\u003E\u003Cspan dir=\"auto\"\u003E4,3 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-83\"\u003E\u003Cspan dir=\"auto\"\u003E℃ \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-84\"\u003E\u003Cspan dir=\"auto\"\u003E ) / temperatura de la superficie del objeto (rango 0 &#8211; 100  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-85\"\u003E\u003Cspan dir=\"auto\"\u003E℃ \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-86\"\u003E\u003Cspan dir=\"auto\"\u003E)\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-87\"\u003E\u003Cspan class=\"r element-88\"\u003E\u003Cspan dir=\"auto\"\u003ETiempo de medición — 1  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-89\"\u003E\u003Cspan dir=\"auto\"\u003Esegundo .\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-90\"\u003E\u003Cspan class=\"r element-91\"\u003E\u003Cspan dir=\"auto\"\u003EPantalla LCD grande con retroiluminación: permite leer las lecturas en la oscuridad.\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-92\"\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-97\"\u003EIndicación de color de los resultados \u003C/span\u003E\u003Cspan class=\"r element-93\"\u003Ede la medición: 34-37,3 ℃ — verde; 37,4-37,8 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-94\"\u003E\u003Cspan dir=\"auto\"\u003E℃ \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-95\"\u003E\u003Cspan dir=\"auto\"\u003E— amarillo; \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-96\"\u003E\u003Cspan dir=\"auto\"\u003E37,9-43 \u003C/span\u003E\u003C/span\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-99\"\u003E ℃ — \u003C/span\u003E\u003Cspan class=\"r element-98\"\u003Erojo\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-100\"\u003E\u003Cspan class=\"r element-101\"\u003E\u003Cspan dir=\"auto\"\u003ENotificación sonora  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-102\"\u003E\u003Cspan dir=\"auto\"\u003Eal \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-103\"\u003E\u003Cspan dir=\"auto\"\u003Emedir\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-104\"\u003E\u003Cspan class=\"r element-105\"\u003E\u003Cspan dir=\"auto\"\u003EMemoria para  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-106\"\u003E\u003Cspan dir=\"auto\"\u003Ela última \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-107\"\u003E\u003Cspan dir=\"auto\"\u003E medición\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-108\"\u003E\u003Cspan class=\"r element-109\"\u003E\u003Cspan dir=\"auto\"\u003EApagado automático después de  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-110\"\u003E\u003Cspan dir=\"auto\"\u003E30 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-111\"\u003E\u003Cspan dir=\"auto\"\u003E segundos (ahorro de batería)\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-112\"\u003E\u003Cspan class=\"r element-113\"\u003E\u003Cspan dir=\"auto\"\u003EFunciona con  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-114\"\u003E\u003Cspan dir=\"auto\"\u003Euna \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-115\"\u003E\u003Cspan dir=\"auto\"\u003E batería  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-116\"\u003E\u003Cspan dir=\"auto\"\u003ECR \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-117\"\u003E\u003Cspan dir=\"auto\"\u003E2032.\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-118\"\u003E\u003Cspan class=\"r element-119\"\u003E\u003Cspan dir=\"auto\"\u003EResolución de imagen del valor medido 0,1 ℃\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-120\"\u003E\u003Cspan class=\"r element-121\"\u003E\u003Cspan dir=\"auto\"\u003EEl error de medición no supera los 0,2 ℃ en el rango de 3,4 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-122\"\u003E\u003Cspan dir=\"auto\"\u003Ea \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-123\"\u003E\u003Cspan dir=\"auto\"\u003E4,3 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-124\"\u003E\u003Cspan dir=\"auto\"\u003E℃.\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003C/ul\u003E",
  "prices": {
    "price": "75000",
    "regular_price": "75000",
    "sale_price": "75000",
    "price_range": null,
    "currency_code": "COP",
    "currency_symbol": "$",
    "currency_minor_unit": 0,
    "currency_decimal_separator": ",",
    "currency_thousand_separator": ".",
    "currency_prefix": "$",
    "currency_suffix": ""
  },
  "average_rating": "0",
  "images": [
    {
      "id": 34381,
      "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-.png",
      "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--500x500.png",
      "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--180x180.png 180w",
      "sizes": "(max-width: 550px) 100vw, 550px",
      "name": "termometro infrarrojo",
      "alt": "termometro infrarrojo"
    },
    {
      "id": 34383,
      "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife.png",
      "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-500x500.png",
      "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-180x180.png 180w",
      "sizes": "(max-width: 550px) 100vw, 550px",
      "name": "termometro infrarrojo homelife",
      "alt": ""
    },
    {
      "id": 34382,
      "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto.png",
      "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-500x500.png",
      "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-180x180.png 180w",
      "sizes": "(max-width: 550px) 100vw, 550px",
      "name": "termometro infrarrojo homelife sin contacto",
      "alt": ""
    }
  ],
  "categories": [
    {
      "id": 22,
      "name": "Termómetros",
      "slug": "termometros",
      "link": "https://www.homelife.com.co/categoria-producto/termometros/"
    }
  ],
  "attributes": [
    {
      "id": 0,
      "name": "Referencia",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "DET3022",
          "slug": "DET3022"
        }
      ]
    },
    {
      "id": 0,
      "name": "Uso",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "Adultos y pediátrico (en la frente)",
          "slug": "Adultos y pediátrico (en la frente)"
        }
      ]
    },
    {
      "id": 0,
      "name": "Riesgos",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "IIA",
          "slug": "IIA"
        }
      ]
    },
    {
      "id": 0,
      "name": "Rango",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "Modo frente: 34,0°C ~ 43,0°C (93,2°F ~ 109,4°F )",
          "slug": "Modo frente: 34,0°C ~ 43,0°C (93,2°F ~ 109,4°F )"
        }
      ]
    },
    {
      "id": 0,
      "name": "Resolución",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "0.1°C o 0.1 °F",
          "slug": "0.1°C o 0.1 °F"
        }
      ]
    },
    {
      "id": 0,
      "name": "Batería",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "DC3V (1 batería CR2032)",
          "slug": "DC3V (1 batería CR2032)"
        }
      ]
    },
    {
      "id": 0,
      "name": "Dimensiones",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "82,7 x 42 x 41,7 mm",
          "slug": "82,7 x 42 x 41,7 mm"
        }
      ]
    },
    {
      "id": 0,
      "name": "Rango de temperatura de funcionamiento",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "5°C ~40°C (41°F ~104°F ), 15% ~ 85% HR, sin condensación Presión\natmosférica: 70 kPa ~ 106 kPa",
          "slug": "5°C ~40°C (41°F ~104°F ), 15% ~ 85% HR, sin condensación Presión\natmosférica: 70 kPa ~ 106 kPa"
        }
      ]
    },
    {
      "id": 0,
      "name": "Apagado",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "Manual o automático después de 30 segundos de inactividad",
          "slug": "Manual o automático después de 30 segundos de inactividad"
        }
      ]
    },
    {
      "id": 0,
      "name": "Peso",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "0,045 kg",
          "slug": "0,045 kg"
        }
      ]
    },
    {
      "id": 0,
      "name": "Rango de temperatura de almacenamiento y transporte",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "-25 °C ~ 55 °C (-13 °F ~ 131 °F), 15 % ~ 95 % de humedad relativa, sin condensación.",
          "slug": "-25 °C ~ 55 °C (-13 °F ~ 131 °F), 15 % ~ 95 % de humedad relativa, sin condensación."
        }
      ]
    },
    {
      "id": 0,
      "name": "Garantía",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "2 año",
          "slug": "2 año"
        }
      ]
    },
    {
      "id": 0,
      "name": "Contenido",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "Manual de usuario y batería",
          "slug": "Manual de usuario y batería"
        }
      ]
    },
    {
      "id": 0,
      "name": "INVIMA",
      "taxonomy": null,
      "has_variations": false,
      "terms": [
        {
          "id": 0,
          "name": "INVIMA 2025DM-0031488",
          "slug": "INVIMA 2025DM-0031488"
        }
      ]
    }
  ]
}

2. Cambios estructurales en el Mapeo de Datos (¡MUY IMPORTANTE!):
La Store API devuelve un JSON ligeramente diferente a la v3. Debes actualizar las funciones adaptadoras o el mapeo en los componentes según estas nuevas reglas:

Precios:

Antes: product.price

Ahora: El precio está en un objeto. Usa product.prices.price. Para mostrarlo formateado con el símbolo, usa product.prices.currency_symbol o formatea el número (ej. Number(product.prices.price).toLocaleString('es-CO')).

Si hay oferta, evalúa product.prices.sale_price frente a product.prices.regular_price.

Stock:

Antes: product.stock_status === 'instock'

Ahora: Usa el booleano nativo product.is_in_stock (true/false).

Atributos (Ficha Técnica):

Antes: Las opciones venían en un array de strings attribute.options.

Ahora: Vienen en un array de objetos llamado terms. Debes mapearlo así: attribute.terms.map(t => t.name).join(', ').

Categorías:

Siguen siendo un array de objetos (product.categories), usa category.name.

Imágenes:

Siguen siendo un array de objetos. Usa product.images[0]?.src o product.images[0]?.thumbnail de forma segura con ?..

Descripciones:

short_description y description siguen viniendo como cadenas HTML, así que mantén el uso de dangerouslySetInnerHTML.

3. Tareas a realizar:

Busca todas las peticiones a WooCommerce (fetch, axios) en el contexto y en las vistas de detalle.

Elimina cualquier inyección de consumer_key y consumer_secret de las URLs o cabeceras.

Actualiza las URLs a /wc/store/v1/....

Revisa cómo se están consumiendo los datos en el JSX (ej. <span className="price">...</span>) y asegúrate de apuntar a product.prices.price y a product.is_in_stock.

Mantén 100% intactas las clases CSS, la estructura de los componentes y la lógica de carrito que ya exista. Solo estamos cambiando la capa de consumo de datos y su formateo.