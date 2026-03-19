Traer todos los productos (para grilla de productos)
    - https://homelife.com.co/wp-json/wc/v3/products?consumer_key=ck_...&consumer_secret=cs_...&_fields=id,name,categories,price,regular_price,sale_price,images,sku,stock_status&per_page=100

    Por un producto devuelve:
    [
        {
            "id": 34380,
            "name": "Termómetro Infrarrojo",
            "categories": [
            {
                "id": 22,
                "name": "Termómetros",
                "slug": "termometros"
            }
            ],
            "price": "75000",
            "regular_price": "75000",
            "sale_price": "",
            "images": [
            {
                "id": 34381,
                "date_created": "2025-11-19T07:49:26",
                "date_created_gmt": "2025-11-19T17:49:26",
                "date_modified": "2025-11-19T07:50:49",
                "date_modified_gmt": "2025-11-19T17:50:49",
                "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-.png",
                "name": "termometro infrarrojo",
                "alt": "termometro infrarrojo",
                "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--180x180.png 180w",
                "sizes": "(max-width: 550px) 100vw, 550px",
                "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--500x500.png"
            },
            {
                "id": 34383,
                "date_created": "2025-11-19T07:49:54",
                "date_created_gmt": "2025-11-19T17:49:54",
                "date_modified": "2025-11-19T07:49:54",
                "date_modified_gmt": "2025-11-19T17:49:54",
                "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife.png",
                "name": "termometro infrarrojo homelife",
                "alt": "",
                "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-180x180.png 180w",
                "sizes": "(max-width: 550px) 100vw, 550px",
                "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-500x500.png"
            },
            {
                "id": 34382,
                "date_created": "2025-11-19T07:49:28",
                "date_created_gmt": "2025-11-19T17:49:28",
                "date_modified": "2025-11-19T07:49:28",
                "date_modified_gmt": "2025-11-19T17:49:28",
                "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto.png",
                "name": "termometro infrarrojo homelife sin contacto",
                "alt": "",
                "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-180x180.png 180w",
                "sizes": "(max-width: 550px) 100vw, 550px",
                "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-500x500.png"
            }
            ],
            "sku": "",
            "stock_status": "instock"
        },...
    Esos datos debes usarlos para cada product card (en la sección de productos y productos destacados)

Traer categorias de productos solo con id y nombre
    -https://www.homelife.com.co/wp-json/wc/v3/products/categories?consumer_key=ck_...&consumer_secret=cs_...&_fields=id,name

    Devuelve:
    [
        {
            "id": 67,
            "name": "Accesorios"
        },...
    Por cada categoría.
    Debes usarlo para llenar todos los campos de categoría en el proyecto, incluído asociar el nombre de una categoría a un producto.







Traer un producto por id con ciertos campos (para producto-detalle)
    - https://homelife.com.co/wp-json/wc/v3/products/product_id ?consumer_key=ck_...&consumer_secret=cs_...&_fields=id,name,description,short_description,price,regular_price,sale_price,average_rating,rating_count,stock_quantity,stock_status,categories,images,attributes,related_ids

    devuelve:
        {
            "id": 34380,
            "name": "Termómetro Infrarrojo",
            "description": "\u003Cp\u003E\u003Cspan class=\"r element-18\"\u003E\u003Cspan dir=\"auto\"\u003EEl termómetro infrarrojo sin contacto \u003Cstrong\u003EHOMELIFE\u003C/strong\u003E\u003C/span\u003E\u003C/span\u003E\u003Cstrong\u003E\u003Cspan class=\"r element-20\"\u003E \u003C/span\u003E\u003C/strong\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-24\"\u003E\u003Cstrong\u003E \u003C/strong\u003Ecuenta con un sensor infrarrojo especial que captura el calor corporal, registra y muestra la lectura en la pantalla. Además, a diferencia de los termómetros convencionales de mercurio o electrónicos, \u003Cstrong\u003E¡solo tarda 1 segundo en determinar la temperatura\u003C/strong\u003E\u003C/span\u003E\u003Cspan class=\"r element-25\"\u003E\u003Cstrong\u003E!\u003C/strong\u003E \u003C/span\u003E\u003Cspan class=\"r element-26\"\u003E Los \u003C/span\u003E\u003Cspan class=\"r element-28\"\u003E resultados \u003C/span\u003E\u003Cspan class=\"r element-27\"\u003E de la medición \u003C/span\u003E\u003Cspan class=\"r element-29\"\u003Eson precisos.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\n\u003Cp class=\"p element-43\"\u003E\u003Cspan class=\"r element-49\"\u003E\u003Cspan dir=\"auto\"\u003EMide temperatura corporal \u003C/span\u003E\u003C/span\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-51\"\u003E(rango  \u003C/span\u003E\u003Cspan class=\"r element-52\"\u003E34 \u003C/span\u003E\u003Cspan class=\"r element-53\"\u003E- \u003C/span\u003E\u003Cspan class=\"r element-54\"\u003E43 \u003C/span\u003E\u003Cspan class=\"r element-55\"\u003E ℃) \u003C/span\u003E\u003Cspan class=\"r element-56\"\u003Ey la temperatura \u003C/span\u003E\u003Cspan class=\"r element-58\"\u003Ede superficies de objetos \u003C/span\u003E\u003Cspan class=\"r element-60\"\u003E(rango 0-100 ℃): líquidos (agua de baño, biberón); superficies sólidas  \u003C/span\u003E\u003Cspan class=\"r element-62\"\u003E, \u003C/span\u003E\u003Cspan class=\"r element-61\"\u003Eetc.\u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-50\"\u003E \u003C/span\u003E\u003Cspan class=\"r element-57\"\u003E \u003C/span\u003E\u003Cspan class=\"r element-59\"\u003E \u003C/span\u003E\u003C/p\u003E\n\u003Cp class=\"p element-63\"\u003E\u003Cspan class=\"r element-64\"\u003E\u003Cspan dir=\"auto\"\u003EEste termómetro muestra los resultados de la medición mediante colores: \u003Cstrong\u003E\u003Cspan style=\"color: #008000;\"\u003Everde (temperatura normal)\u003C/span\u003E\u003C/strong\u003E, \u003Cspan style=\"color: #ffcc00;\"\u003E\u003Cstrong\u003Eamarillo (temperatura elevada)\u003C/strong\u003E\u003C/span\u003E y \u003Cstrong\u003E\u003Cspan style=\"color: #ff0000;\"\u003Erojo (temperatura muy alta)\u003C/span\u003E\u003C/strong\u003E. Esto resulta muy práctico para usarlo en la oscuridad o con poca visibilidad.\u003C/span\u003E\u003C/span\u003E\u003C/p\u003E\n\u003Cp class=\"p element-66\"\u003E\u003Cstrong\u003E\u003Cspan class=\"r element-67\"\u003E\u003Cspan dir=\"auto\"\u003EVentajas del termómetro infrarrojo sin contacto  \u003C/span\u003E\u003C/span\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-72\"\u003Ecompacto \u003C/span\u003E\u003C/span\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-71\"\u003E \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-69\"\u003E \u003C/span\u003E\u003C/strong\u003E\u003C/p\u003E\n\u003Cul\u003E\n\u003Cli class=\"p element-73\"\u003E\u003Cspan class=\"r element-74\"\u003E\u003Cspan dir=\"auto\"\u003ERecomendado para todas las edades (bebés, niños, adultos).\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-75\"\u003E\u003Cspan class=\"r element-76\"\u003E\u003Cspan dir=\"auto\"\u003ETamaño compacto y peso ligero (solo  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-77\"\u003E\u003Cspan dir=\"auto\"\u003E8,2 cm de longitud y 45 gramos \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-78\"\u003E\u003Cspan dir=\"auto\"\u003E)\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-79\"\u003E\u003Cspan class=\"r element-80\"\u003E\u003Cspan dir=\"auto\"\u003EDos modos de medición: temperatura corporal (rango 3,4 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-81\"\u003E\u003Cspan dir=\"auto\"\u003E- \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-82\"\u003E\u003Cspan dir=\"auto\"\u003E4,3 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-83\"\u003E\u003Cspan dir=\"auto\"\u003E℃ \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-84\"\u003E\u003Cspan dir=\"auto\"\u003E ) / temperatura de la superficie del objeto (rango 0 - 100  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-85\"\u003E\u003Cspan dir=\"auto\"\u003E℃ \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-86\"\u003E\u003Cspan dir=\"auto\"\u003E)\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-87\"\u003E\u003Cspan class=\"r element-88\"\u003E\u003Cspan dir=\"auto\"\u003ETiempo de medición — 1  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-89\"\u003E\u003Cspan dir=\"auto\"\u003Esegundo .\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-90\"\u003E\u003Cspan class=\"r element-91\"\u003E\u003Cspan dir=\"auto\"\u003EPantalla LCD grande con retroiluminación: permite leer las lecturas en la oscuridad.\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-92\"\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-97\"\u003EIndicación de color de los resultados \u003C/span\u003E\u003Cspan class=\"r element-93\"\u003Ede la medición: 34-37,3 ℃ — verde; 37,4-37,8 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-94\"\u003E\u003Cspan dir=\"auto\"\u003E℃ \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-95\"\u003E\u003Cspan dir=\"auto\"\u003E— amarillo; \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-96\"\u003E\u003Cspan dir=\"auto\"\u003E37,9-43 \u003C/span\u003E\u003C/span\u003E\u003Cspan dir=\"auto\"\u003E\u003Cspan class=\"r element-99\"\u003E ℃ — \u003C/span\u003E\u003Cspan class=\"r element-98\"\u003Erojo\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-100\"\u003E\u003Cspan class=\"r element-101\"\u003E\u003Cspan dir=\"auto\"\u003ENotificación sonora  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-102\"\u003E\u003Cspan dir=\"auto\"\u003Eal \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-103\"\u003E\u003Cspan dir=\"auto\"\u003Emedir\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-104\"\u003E\u003Cspan class=\"r element-105\"\u003E\u003Cspan dir=\"auto\"\u003EMemoria para  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-106\"\u003E\u003Cspan dir=\"auto\"\u003Ela última \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-107\"\u003E\u003Cspan dir=\"auto\"\u003E medición\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-108\"\u003E\u003Cspan class=\"r element-109\"\u003E\u003Cspan dir=\"auto\"\u003EApagado automático después de  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-110\"\u003E\u003Cspan dir=\"auto\"\u003E30 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-111\"\u003E\u003Cspan dir=\"auto\"\u003E segundos (ahorro de batería)\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-112\"\u003E\u003Cspan class=\"r element-113\"\u003E\u003Cspan dir=\"auto\"\u003EFunciona con  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-114\"\u003E\u003Cspan dir=\"auto\"\u003Euna \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-115\"\u003E\u003Cspan dir=\"auto\"\u003E batería  \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-116\"\u003E\u003Cspan dir=\"auto\"\u003ECR \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-117\"\u003E\u003Cspan dir=\"auto\"\u003E2032.\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-118\"\u003E\u003Cspan class=\"r element-119\"\u003E\u003Cspan dir=\"auto\"\u003EResolución de imagen del valor medido 0,1 ℃\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003Cli class=\"p element-120\"\u003E\u003Cspan class=\"r element-121\"\u003E\u003Cspan dir=\"auto\"\u003EEl error de medición no supera los 0,2 ℃ en el rango de 3,4 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-122\"\u003E\u003Cspan dir=\"auto\"\u003Ea \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-123\"\u003E\u003Cspan dir=\"auto\"\u003E4,3 \u003C/span\u003E\u003C/span\u003E\u003Cspan class=\"r element-124\"\u003E\u003Cspan dir=\"auto\"\u003E℃.\u003C/span\u003E\u003C/span\u003E\u003C/li\u003E\n\u003C/ul\u003E\n",
            "short_description": "\u003Cp\u003E\u003Ca href=\"https://wa.link/gok0za\"\u003E\u003Cimg class=\"alignleft wp-image-34040\" src=\"https://www.homelife.com.co/wp-content/uploads/2025/02/Recurso-11.png\" alt=\"Homelife contraentrega\" width=\"251\" height=\"56\" /\u003E\u003C/a\u003E\u003C/p\u003E\n\u003Cp\u003E&nbsp;\u003C/p\u003E\n\u003Cp\u003E&nbsp;\u003C/p\u003E\n\u003Cp\u003ETermómetro infrarrojo portátil con pantalla que cambia de color según el nivel de temperatura. Ideal para mediciones rápidas, precisas y seguras en casa o en consultorios.\u003C/p\u003E\n",
            "price": "75000",
            "regular_price": "75000",
            "sale_price": "",
            "average_rating": "0.00",
            "rating_count": 0,
            "stock_quantity": null,
            "categories": [
                {
                "id": 22,
                "name": "Termómetros",
                "slug": "termometros"
                }
            ],
            "images": [
                {
                "id": 34381,
                "date_created": "2025-11-19T07:49:26",
                "date_created_gmt": "2025-11-19T17:49:26",
                "date_modified": "2025-11-19T07:50:49",
                "date_modified_gmt": "2025-11-19T17:50:49",
                "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-.png",
                "name": "termometro infrarrojo",
                "alt": "termometro infrarrojo",
                "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--180x180.png 180w",
                "sizes": "(max-width: 550px) 100vw, 550px",
                "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo--500x500.png"
                },
                {
                "id": 34383,
                "date_created": "2025-11-19T07:49:54",
                "date_created_gmt": "2025-11-19T17:49:54",
                "date_modified": "2025-11-19T07:49:54",
                "date_modified_gmt": "2025-11-19T17:49:54",
                "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife.png",
                "name": "termometro infrarrojo homelife",
                "alt": "",
                "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-180x180.png 180w",
                "sizes": "(max-width: 550px) 100vw, 550px",
                "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-500x500.png"
                },
                {
                "id": 34382,
                "date_created": "2025-11-19T07:49:28",
                "date_created_gmt": "2025-11-19T17:49:28",
                "date_modified": "2025-11-19T07:49:28",
                "date_modified_gmt": "2025-11-19T17:49:28",
                "src": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto.png",
                "name": "termometro infrarrojo homelife sin contacto",
                "alt": "",
                "srcset": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto.png 550w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-250x250.png 250w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-180x180.png 180w",
                "sizes": "(max-width: 550px) 100vw, 550px",
                "thumbnail": "https://www.homelife.com.co/wp-content/uploads/2025/11/termometro-infrarrojo-homelife-sin-contacto-500x500.png"
                }
            ],
            "attributes": [
                {
                "id": 0,
                "name": "Referencia",
                "slug": "Referencia",
                "position": 0,
                "visible": true,
                "variation": false,
                "options": [
                    "DET3022"
                ]
                },
                {
                "id": 0,
                "name": "Uso",
                "slug": "Uso",
                "position": 1,
                "visible": true,
                "variation": false,
                "options": [
                    "Adultos y pediátrico (en la frente)"
                ]
                },
                {
                "id": 0,
                "name": "Riesgos",
                "slug": "Riesgos",
                "position": 2,
                "visible": true,
                "variation": false,
                "options": [
                    "IIA"
                ]
                },
                {
                "id": 0,
                "name": "Rango",
                "slug": "Rango",
                "position": 3,
                "visible": true,
                "variation": false,
                "options": [
                    "Modo frente: 34,0°C ~ 43,0°C (93,2°F ~ 109,4°F )"
                ]
                },
                {
                "id": 0,
                "name": "Resolución",
                "slug": "Resolución",
                "position": 4,
                "visible": true,
                "variation": false,
                "options": [
                    "0.1°C o 0.1 °F"
                ]
                },
                {
                "id": 0,
                "name": "Batería",
                "slug": "Batería",
                "position": 5,
                "visible": true,
                "variation": false,
                "options": [
                    "DC3V (1 batería CR2032)"
                ]
                },
                {
                "id": 0,
                "name": "Dimensiones",
                "slug": "Dimensiones",
                "position": 6,
                "visible": true,
                "variation": false,
                "options": [
                    "82,7 x 42 x 41,7 mm"
                ]
                },
                {
                "id": 0,
                "name": "Rango de temperatura de funcionamiento",
                "slug": "Rango de temperatura de funcionamiento",
                "position": 7,
                "visible": true,
                "variation": false,
                "options": [
                    "5°C ~40°C (41°F ~104°F ), 15% ~ 85% HR, sin condensación Presión\natmosférica: 70 kPa ~ 106 kPa"
                ]
                },
                {
                "id": 0,
                "name": "Apagado",
                "slug": "Apagado",
                "position": 8,
                "visible": true,
                "variation": false,
                "options": [
                    "Manual o automático después de 30 segundos de inactividad"
                ]
                },
                {
                "id": 0,
                "name": "Peso",
                "slug": "Peso",
                "position": 9,
                "visible": true,
                "variation": false,
                "options": [
                    "0,045 kg"
                ]
                },
                {
                "id": 0,
                "name": "Rango de temperatura de almacenamiento y transporte",
                "slug": "Rango de temperatura de almacenamiento y transporte",
                "position": 10,
                "visible": true,
                "variation": false,
                "options": [
                    "-25 °C ~ 55 °C (-13 °F ~ 131 °F), 15 % ~ 95 % de humedad relativa, sin condensación."
                ]
                },
                {
                "id": 0,
                "name": "Garantía",
                "slug": "Garantía",
                "position": 11,
                "visible": true,
                "variation": false,
                "options": [
                    "2 año"
                ]
                },
                {
                "id": 0,
                "name": "Contenido",
                "slug": "Contenido",
                "position": 12,
                "visible": true,
                "variation": false,
                "options": [
                    "Manual de usuario y batería"
                ]
                },
                {
                "id": 0,
                "name": "INVIMA",
                "slug": "INVIMA",
                "position": 13,
                "visible": true,
                "variation": false,
                "options": [
                    "INVIMA 2025DM-0031488"
                ]
                }
            ],
            "related_ids": [178, 34250, 174],
            "stock_status": "instock",
            "_links": {
                "self": [
                {
                    "href": "https://www.homelife.com.co/wp-json/wc/v3/products/34380",
                    "targetHints": {
                    "allow": [
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE"
                    ]
                    }
                }
                ],
                "collection": [
                {
                    "href": "https://www.homelife.com.co/wp-json/wc/v3/products"
                }
                ]
            }
            }
        Aquí tienes herramientas que puedes usar para limpiar el json y renderizar bien el contenido en producto-detalle:
                1. Cómo limpiar el HTML (El truco en React)
                WooCommerce siempre devolverá la descripción con etiquetas <p>, <span>, <strong>, etc. No hay un endpoint que devuelva texto plano nativamente.

                Para solucionar esto sin inyectar HTML (dangerouslySetInnerHTML), usamos una pequeña función utilitaria en JavaScript que convierte el HTML en texto puro aprovechando el navegador:

                JavaScript
                // Función para limpiar cualquier HTML y dejar solo el texto
                const limpiarHTML = (htmlString) => {
                if (!htmlString) return "";
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, 'text/html');
                return doc.body.textContent || "";
                };

                2. El "Adaptador" de Datos (El puente entre WooCommerce y tu Componente)
                Tu componente espera que product.images sea un array de strings (URLs), pero la API te da un array de objetos. También espera que specifications sea un objeto simple, pero la API te da un array de attributes.

                Aquí tienes la función exacta que recibe el JSON de WooCommerce y lo transforma en el objeto perfecto para tu componente:

                JavaScript
                const adaptarProductoParaReact = (datosWooCommerce) => {
                // 1. Convertir el array de atributos en un objeto simple para tu tabla de especificaciones
                const especificaciones = {};
                if (datosWooCommerce.attributes) {
                    datosWooCommerce.attributes.forEach(attr => {
                    // Tomamos el primer valor de la opción (ej. "Garantía": "2 años")
                    especificaciones[attr.name] = attr.options[0]; 
                    });
                }

                // 2. Extraer características de la descripción corta (limpiando el HTML)
                // Como tu short_description tiene saltos de línea, podemos dividirla para crear viñetas
                const textoCorto = limpiarHTML(datosWooCommerce.short_description);
                const caracteristicasArray = textoCorto.split('. ').filter(f => f.trim() !== '');

                // 3. Calcular descuento
                const precioRegular = parseFloat(datosWooCommerce.regular_price) || 0;
                const precioVenta = parseFloat(datosWooCommerce.sale_price) || precioRegular;
                const porcentajeDescuento = precioRegular > precioVenta 
                    ? Math.round(((precioRegular - precioVenta) / precioRegular) * 100) 
                    : 0;

                // 4. Retornar el objeto con la estructura EXACTA que pide tu componente
                return {
                    id: datosWooCommerce.id,
                    name: datosWooCommerce.name,
                    category: datosWooCommerce.categories.length > 0 ? datosWooCommerce.categories[0].name : 'General',
                    images: datosWooCommerce.images.map(img => img.src), // Extraemos solo las URLs
                    rating: parseFloat(datosWooCommerce.average_rating) || 0,
                    reviewCount: datosWooCommerce.rating_count || 0,
                    price: precioVenta,
                    originalPrice: precioRegular,
                    discount: porcentajeDescuento,
                    fullDescription: limpiarHTML(datosWooCommerce.description), // Descripción sin etiquetas
                    features: caracteristicasArray,
                    stock: datosWooCommerce.stock_quantity || 10, // Si manage_stock es false, damos un valor por defecto
                    inStock: datosWooCommerce.stock_status === 'instock',
                    specifications: especificaciones,
                    relatedIds: datosWooCommerce.related_ids, // Usarás esto para buscar los productos relacionados
                    
                    // Nota: techSheetPdf no viene en el JSON por defecto. 
                    // Necesitarás agregarlo como un campo personalizado (ACF) en WordPress.
                    techSheetPdf: null 
                };
                };
                Cómo se vería todo integrado en tu useEffect
                JavaScript
                useEffect(() => {
                const cargarProducto = async () => {
                    try {
                    // 1. Llamas al endpoint optimizado
                    const respuesta = await fetch("TU_URL_AQUI");
                    const datosCrudos = await respuesta.json();

                    // 2. Pasas los datos por el adaptador
                    const productoListo = adaptarProductoParaReact(datosCrudos);

                    // 3. Actualizas tu estado (el que usa el componente)
                    setProduct(productoListo);

                    } catch (error) {
                    console.error("Error al cargar:", error);
                    }
                };

                cargarProducto();
                }, [productId]);
                De esta forma, tu código frontend se mantiene súper limpio y no tienes que alterar en absoluto el código del componente que me enviaste.

                Traer múltiples productos por ID (Para la sección de Productos Relacionados)

                https://www.homelife.com.co/wp-json/wc/v3/products?consumer_key=ck_...&consumer_secret=cs_...&_fields=id,name,price,regular_price,sale_price,images,stock_status&include=178,34250,174
                Nota para el agente: Debes tomar el array related_ids que te da el detalle del producto, unirlo con comas (product.relatedIds.join(',')) y pasarlo al parámetro include en una nueva petición para renderizar las ProductCards del final.







Traer productos por categoria (para filtros en grilla de productos, especificamente para el filtro de categoria)
    - https://homelife.com.co/wp-json/wc/v3/products?consumer_key=ck_...&consumer_secret=cs_...&_fields=id,name,categories,price,regular_price,sale_price,images,sku,stock_status&per_page=100&category=id_category
    Te devuelve la lista de productos igual, solo que de una misma categoría (id_category)

Traer productos por categoria y precio
    - https://homelife.com.co/wp-json/wc/v3/products?consumer_key=ck_...&consumer_secret=cs_...&per_page=100&category=1&min_price=100&max_price=200
    Te devuelve la lista de productos igual, solo que de una misma categoría (id_category) y con un rango de precios (min_price y max_price)

    En el .env está: VITE_WP_URL=https://www.homelife.com.co y VITE_WC_CONSUMER_KEY y VITE_WC_CONSUMER_SECRET