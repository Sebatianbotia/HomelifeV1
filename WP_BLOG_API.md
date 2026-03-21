Actúa como un desarrollador experto en React y Headless WordPress.

Tengo dos componentes: Blog.jsx (lista de artículos) y ArticuloDetalle.jsx (vista de un artículo individual). Ambos usan datos hardcodeados actualmente. Necesito refactorizarlos para consumir mi API REST de WordPress basada en un Custom Post Type llamado blog_react y una taxonomía categoria_react.

Contexto de la API (Custom Post Types):
He creado un Custom Post Type llamado blog_react y una taxonomía personalizada llamada categoria_react.

1. Endpoints a utilizar:
Usa la variable de entorno para la URL base (ej. import.meta.env.VITE_WC_URL o process.env.REACT_APP_WC_URL según corresponda).

            Categorías: ${BASE_URL}/wp-json/wp/v2/categoria_react?_fields=id,name,count&hide_empty=true
                Devuelve:
                        {
                                    "id": 114,
                                    "count": 1,
                                    "name": "Salud"
                                    }
                            Por vada elemento


            Artículos: ${BASE_URL}/wp-json/wp/v2/blog_react?_fields=id,date,title,excerpt,categoria_react,yoast_head_json,acf&per_page=10
                Devuelve:
                        {
                "id": 34483,
                "date": "2026-03-20T13:44:32",
                "title": {
                "rendered": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA"
                },
                "excerpt": {
                "rendered": "\u003Cp\u003ELa menopausia es un período fisiológico en la vida de las mujeres que está condicionado por cambios hormonales y consiste en el cese permanente de los ciclos menstruales, a una edad promedio de los 51 años. Antes [&hellip;]\u003C/p\u003E\n",
                "protected": false
                },
                "categoria_react": [114],
                "yoast_head_json": {
                "title": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA - HomeLife INFARTO",
                "description": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA",
                "robots": {
                    "index": "index",
                    "follow": "follow",
                    "max-snippet": "max-snippet:-1",
                    "max-image-preview": "max-image-preview:large",
                    "max-video-preview": "max-video-preview:-1"
                },
                "canonical": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/",
                "og_locale": "es_ES",
                "og_type": "article",
                "og_title": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA - HomeLife INFARTO",
                "og_description": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA",
                "og_url": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/",
                "og_site_name": "HomeLife",
                "article_modified_time": "2026-03-20T18:44:34+00:00",
                "og_image": [
                    {
                    "url": "https://www.homelife.com.co/wp-content/uploads/2026/03/image.png",
                    "width": 2560,
                    "height": 1707,
                    "type": "image/png"
                    }
                ],
                "twitter_card": "summary_large_image",
                "twitter_misc": {
                    "Tiempo de lectura": "3 minutos"
                },
                "schema": {
                    "@context": "https://schema.org",
                    "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/",
                        "url": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/",
                        "name": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA - HomeLife INFARTO",
                        "isPartOf": {
                        "@id": "https://www.homelife.com.co/#website"
                        },
                        "primaryImageOfPage": {
                        "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#primaryimage"
                        },
                        "image": {
                        "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#primaryimage"
                        },
                        "thumbnailUrl": "https://www.homelife.com.co/wp-content/uploads/2026/03/image.png",
                        "datePublished": "2026-03-20T18:44:32+00:00",
                        "dateModified": "2026-03-20T18:44:34+00:00",
                        "description": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA",
                        "breadcrumb": {
                        "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#breadcrumb"
                        },
                        "inLanguage": "es",
                        "potentialAction": [
                        {
                            "@type": "ReadAction",
                            "target": [
                            "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/"
                            ]
                        }
                        ]
                    },
                    {
                        "@type": "ImageObject",
                        "inLanguage": "es",
                        "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#primaryimage",
                        "url": "https://www.homelife.com.co/wp-content/uploads/2026/03/image.png",
                        "contentUrl": "https://www.homelife.com.co/wp-content/uploads/2026/03/image.png",
                        "width": 2560,
                        "height": 1707
                    },
                    {
                        "@type": "BreadcrumbList",
                        "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#breadcrumb",
                        "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Portada",
                            "item": "https://www.homelife.com.co/"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA"
                        }
                        ]
                    },
                    {
                        "@type": "WebSite",
                        "@id": "https://www.homelife.com.co/#website",
                        "url": "https://www.homelife.com.co/",
                        "name": "HomeLife",
                        "description": "Equipos médicos de calidad",
                        "potentialAction": [
                        {
                            "@type": "SearchAction",
                            "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": "https://www.homelife.com.co/?s={search_term_string}"
                            },
                            "query-input": {
                            "@type": "PropertyValueSpecification",
                            "valueRequired": true,
                            "valueName": "search_term_string"
                            }
                        }
                        ],
                        "inLanguage": "es"
                    }
                    ]
                }
                }
            }
            Por cada elemento.


            Artículo Individual (Para ArticuloDetalle.jsx - CON content): 
                ${BASE_URL}/wp-json/wp/v2/blog_react/${id}?_fields=id,date,title,content,categoria_react,yoast_head_json,acf
                Devuelve:
                {
                    "id": 34483,
                    "date": "2026-03-20T13:44:32",
                    "title": {
                        "rendered": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA"
                    },
                    "content": {
                        "rendered": "\n\u003Cfigure class=\"wp-block-image size-full\"\u003E\u003Cimg fetchpriority=\"high\" decoding=\"async\" width=\"2560\" height=\"1707\" src=\"https://www.homelife.com.co/wp-content/uploads/2026/03/image.png\" alt=\"toma de presión\" class=\"wp-image-34484\" srcset=\"https://www.homelife.com.co/wp-content/uploads/2026/03/image.png 2560w, https://www.homelife.com.co/wp-content/uploads/2026/03/image-1536x1024.png 1536w, https://www.homelife.com.co/wp-content/uploads/2026/03/image-2048x1366.png 2048w\" sizes=\"(max-width: 2560px) 100vw, 2560px\" /\u003E\u003C/figure\u003E\n\n\n\n\u003Cp\u003ELa menopausia es un período fisiológico en la vida de las mujeres que está condicionado por cambios hormonales y consiste en el cese permanente de los ciclos menstruales, a una edad promedio de los 51 años.\u003C/p\u003E\n\n\n\n\u003Cp\u003EAntes de la menopausia las mujeres corren menos riesgo de infartarse a comparación de los hombres, sin embargo, por en la menopausia disminuye la producción de hormonas y sobre todo el ESTROGENO, el cual juega un papel importante en la salud de las mujeres.&nbsp; En este caso el corazón se ve impactado, ya que, esta hormona ayuda a reducir la cantidad de placa que se acumula en las paredes internas de las arterias.&nbsp;\u003C/p\u003E\n\n\n\n\u003Cp\u003E\u003Cstrong\u003E\u003Cem\u003E¿Qué es la placa?\u003C/em\u003E\u003C/strong\u003E\u003C/p\u003E\n\n\n\n\u003Cp\u003E\u003Cstrong\u003E\u003Cem\u003EEs la acumulación de sustancias que pasan por las arterias, tales como; grasa, colesterol,\u003C/em\u003E\u003C/strong\u003E\u003Cstrong\u003E\u003Cem\u003E&nbsp;glóbulos blancos, calcio,&nbsp;\u003C/em\u003E\u003C/strong\u003E\u003Cstrong\u003E\u003Cem\u003Eetc. L\u003C/em\u003E\u003C/strong\u003E\u003Cstrong\u003E\u003Cem\u003Ea placa estrecha la arteria, y esta se endurece, aumentando la presión arterial, la persona puede tener un ataque al corazón o cerebral\u003C/em\u003E\u003C/strong\u003E\u003Cstrong\u003E.&nbsp; &nbsp;&nbsp;\u003C/strong\u003E\u003C/p\u003E\n\n\n\n\u003Cp\u003EPor la velocidad del día a día, las personas se descuidan en su alimentación, además el consumo de tabaco a aumentado con el tiempo, en hombres y mujeres, la falta de ejercicio y si le sumamos en el caso de las mujeres la reducción del nivel de estrógenos, se convierte en una bomba de tiempo.&nbsp;\u003C/p\u003E\n\n\n\n\u003Cp\u003EA menudo las mujeres no son diagnosticadas rápidamente a diferencia que los hombres, ya que, puede llegar a ser una enfermedad coronaria silenciosa.&nbsp;\u003C/p\u003E\n\n\n\n\u003Cp\u003EPor lo que se recomienda además de un control medico frecuente, es el monitoreo de la presión arterial en casa con un tensiómetro propio para que lleve el seguimiento de su tensión y tener un estilo de vida saludable.\u003C/p\u003E\n\n\n\n\u003Cp\u003ETener una alimentación equilibrada, reduciendo el consumo de grasas y azucares. Aumento de la práctica de ejercicio para mantener un peso saludable.&nbsp; Tener sobrepeso, especialmente en la cintura, aumenta el riesgo de padecer enfermedades cardíacas y en la menopausia las mujeres son más propensas a subir de kilos.\u003C/p\u003E\n\n\n\n\u003Cp\u003EEs clave abstenerse de fumar y el exagerado consumo de alcohol.&nbsp; El humo del cigarrillo reduce el oxígeno en la sangre, lo que aumenta la presión arterial y la frecuencia cardíaca porque el corazón tiene que esforzarse más para suministrar suficiente oxígeno al organismo y al cerebro. Por último, tratar de reducir el nivel de estrés y ansiedad.\u003C/p\u003E\n\n\n\n\u003Cp\u003E\u003Cbr\u003EEn HomeLife trabajamos por la salud de los colombianos, por eso estamos recomendados por la Fundación Colombiana del Corazón, ya que contamos con equipos de ultima tecnología, los cuales con su comando de voz, ayuda al paciente a entender los resultados proporcionados y puede guardar en sus memorias las ultimas tomas para llevar su propio control.&nbsp;\u003C/p\u003E\n\n\n\n\u003Cdiv data-wp-context=\"{&quot;notices&quot;:[],&quot;hideNextPreviousButtons&quot;:false,&quot;isDisabledPrevious&quot;:true,&quot;isDisabledNext&quot;:false,&quot;ariaLabelPrevious&quot;:&quot;Productos anteriores&quot;,&quot;ariaLabelNext&quot;:&quot;Productos siguientes&quot;,&quot;collection&quot;:&quot;woocommerce\\/product-collection\\/related&quot;}\" data-wp-init=\"callbacks.onRender\" data-wp-interactive=\"woocommerce/product-collection\" data-wp-router-region=\"wc-product-collection-45\" data-__private-preview-state=\"{&quot;isPreview&quot;:false,&quot;previewMessage&quot;:&quot;Los productos reales pueden diferir en funci\\u00f3n de la p\\u00e1gina en la que se est\\u00e9n viendo.&quot;}\" data-block-name=\"woocommerce/product-collection\" data-collection=\"woocommerce/product-collection/related\" data-dimensions=\"{&quot;widthType&quot;:&quot;fill&quot;}\" data-display-layout=\"{&quot;type&quot;:&quot;flex&quot;,&quot;columns&quot;:4,&quot;shrinkColumns&quot;:true}\" data-hide-controls=\"[&quot;inherit&quot;]\" data-query-context-includes=\"[&quot;collection&quot;]\" data-query-id=\"45\" data-query=\"{&quot;perPage&quot;:4,&quot;pages&quot;:1,&quot;offset&quot;:0,&quot;postType&quot;:&quot;product&quot;,&quot;order&quot;:&quot;asc&quot;,&quot;orderBy&quot;:&quot;title&quot;,&quot;search&quot;:&quot;&quot;,&quot;exclude&quot;:[],&quot;inherit&quot;:false,&quot;taxQuery&quot;:[],&quot;isProductCollectionBlock&quot;:true,&quot;featured&quot;:false,&quot;woocommerceOnSale&quot;:false,&quot;woocommerceStockStatus&quot;:[&quot;instock&quot;,&quot;outofstock&quot;,&quot;onbackorder&quot;],&quot;woocommerceAttributes&quot;:[],&quot;woocommerceHandPickedProducts&quot;:[],&quot;filterable&quot;:false,&quot;relatedBy&quot;:{&quot;categories&quot;:true,&quot;tags&quot;:true},&quot;productReference&quot;:16013}\" data-tag-name=\"div\" class=\"wp-block-woocommerce-product-collection is-layout-flow wp-block-woocommerce-product-collection-is-layout-flow\"\u003E\t\t\u003Cdiv data-wp-interactive=\"woocommerce/store-notices\" class=\"wc-block-components-notices alignwide\"\u003E\n\t\t\t\u003Ctemplate data-wp-each--notice=\"state.notices\" data-wp-each-key=\"context.notice.id\"\u003E\n\t\t\t\t\u003Cdiv\n\t\t\t\t\tclass=\"wc-block-components-notice-banner\"\n\t\t\t\t\tdata-wp-init=\"callbacks.scrollIntoView\"\n\t\t\t\t\tdata-wp-class--is-error=\"state.isError\"\n\t\t\t\t\tdata-wp-class--is-success =\"state.isSuccess\"\n\t\t\t\t\tdata-wp-class--is-info=\"state.isInfo\"\n\t\t\t\t\tdata-wp-class--is-dismissible=\"context.notice.dismissible\"\n\t\t\t\t\tdata-wp-bind--role=\"state.role\"\n\t\t\t\t\u003E\n\t\t\t\t\t\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" aria-hidden=\"true\" focusable=\"false\"\u003E\n\t\t\t\t\t\t\u003Cpath data-wp-bind--d=\"state.iconPath\"\u003E\u003C/path\u003E\n\t\t\t\t\t\u003C/svg\u003E\n\t\t\t\t\t\u003Cdiv class=\"wc-block-components-notice-banner__content\"\u003E\n\t\t\t\t\t\t\u003Cspan data-wp-init=\"callbacks.renderNoticeContent\" aria-live=\"assertive\" aria-atomic=\"true\"\u003E\u003C/span\u003E\n\t\t\t\t\t\u003C/div\u003E\n\t\t\t\t\t\u003Cbutton\n\t\t\t\t\t\tdata-wp-bind--hidden=\"!context.notice.dismissible\"\n\t\t\t\t\t\tclass=\"wc-block-components-button wp-element-button wc-block-components-notice-banner__dismiss contained\"\n\t\t\t\t\t\taria-label=\"Descartar este aviso\"\n\t\t\t\t\t\tdata-wp-on--click=\"actions.removeNotice\"\n\t\t\t\t\t\u003E\n\t\t\t\t\t\t\u003Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"\u003E\n\t\t\t\t\t\t\t\u003Cpath d=\"M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z\" /\u003E\n\t\t\t\t\t\t\u003C/svg\u003E\n\t\t\t\t\t\u003C/button\u003E\n\t\t\t\t\u003C/div\u003E\n\t\t\t\u003C/template\u003E\n\t\t\u003C/div\u003E\n\t\t\n\u003Ch2 class=\"wp-block-heading has-text-align-center\" style=\"margin-bottom:1rem\"\u003EProductos relacionados\u003C/h2\u003E\n\n\n\u003Cul data-block-name=\"woocommerce/product-template\" class=\"wc-block-product-template__responsive columns-4 wc-block-product-template wp-block-woocommerce-product-template is-layout-flow wp-block-woocommerce-product-template-is-layout-flow\" data-wp-on--scroll=\"actions.watchScroll\" data-wp-init=\"callbacks.initResizeObserver\"\u003E\u003Cli class=\"wc-block-product post-16003 product type-product status-publish has-post-thumbnail product_cat-basculas first instock shipping-taxable purchasable product-type-simple\"\n\t\t\t\t\t\n\t\t\t\tdata-wp-interactive=\"woocommerce/product-collection\"\n\t\t\t\tdata-wp-context='{\"productId\":16003}'\n\t\t\t\tdata-wp-key=\"product-item-16003\"\n\t\t\t\n\t\t\t\t\u003E\n\t\t\t\t\t\n\u003Cdiv data-block-name=\"woocommerce/product-image\" data-image-sizing=\"thumbnail\" data-is-descendent-of-query-loop=\"true\" data-show-sale-badge=\"false\" class=\"wc-block-components-product-image wc-block-grid__product-image wc-block-components-product-image--aspect-ratio-auto wp-block-woocommerce-product-image\"\u003E\u003Ca href=\"https://www.homelife.com.co/producto/bascula-ecoenergy-ecologica/\" style=\"\" data-wp-on--click=\"woocommerce/product-collection::actions.viewProduct\"\u003E\u003Cimg decoding=\"async\" width=\"500\" height=\"500\" src=\"https://www.homelife.com.co/wp-content/uploads/2021/03/bascula-ecoenergy-1000-x-1000-perspectiva-homelife-500x500.png\" class=\"attachment-woocommerce_thumbnail size-woocommerce_thumbnail\" alt=\"Báscula Ecoenergy (Ecológica)\" data-testid=\"product-image\" data-image-id=\"16291\" style=\"object-fit:cover;\" srcset=\"https://www.homelife.com.co/wp-content/uploads/2021/03/bascula-ecoenergy-1000-x-1000-perspectiva-homelife-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2021/03/bascula-ecoenergy-1000-x-1000-perspectiva-homelife-180x180.png 180w, https://www.homelife.com.co/wp-content/uploads/2021/03/bascula-ecoenergy-1000-x-1000-perspectiva-homelife-800x800.png 800w, https://www.homelife.com.co/wp-content/uploads/2021/03/bascula-ecoenergy-1000-x-1000-perspectiva-homelife-150x150.png 150w, https://www.homelife.com.co/wp-content/uploads/2021/03/bascula-ecoenergy-1000-x-1000-perspectiva-homelife-300x300.png 300w, https://www.homelife.com.co/wp-content/uploads/2021/03/bascula-ecoenergy-1000-x-1000-perspectiva-homelife-768x768.png 768w, https://www.homelife.com.co/wp-content/uploads/2021/03/bascula-ecoenergy-1000-x-1000-perspectiva-homelife.png 1000w\" sizes=\"(max-width: 500px) 100vw, 500px\" /\u003E\u003Cdiv class=\"wc-block-components-product-image__inner-container\"\u003E\n\n\u003C/div\u003E\u003C/a\u003E\u003C/div\u003E\n\n\u003Ch2 style=\"line-height:1.4; margin-bottom:0.75rem;margin-top:0;\" class=\"has-text-align-center wp-block-post-title has-medium-font-size\"\u003E\u003Ca data-wp-on--click=\"woocommerce/product-collection::actions.viewProduct\" href=\"https://www.homelife.com.co/producto/bascula-ecoenergy-ecologica/\" target=\"_self\" \u003EBáscula Ecoenergy (Ecológica)\u003C/a\u003E\u003C/h2\u003E\n\n\u003Cdiv data-block-name=\"woocommerce/product-price\" data-font-size=\"small\" data-is-descendent-of-query-loop=\"true\" data-text-align=\"center\" class=\"has-font-size has-small-font-size has-text-align-center wp-block-woocommerce-product-price has-small-font-size\" \u003E\u003Cdiv class=\"wc-block-components-product-price wc-block-grid__product-price\" \u003E\n\t\t\t\t\t\u003Cspan class=\"woocommerce-Price-amount amount\"\u003E\u003Cbdi\u003E\u003Cspan class=\"woocommerce-Price-currencySymbol\"\u003E&#36;\u003C/span\u003E119.000\u003C/bdi\u003E\u003C/span\u003E\n\t\t\t\t\u003C/div\u003E\u003C/div\u003E\n\n\u003Cdiv data-block-name=\"woocommerce/product-button\" data-font-size=\"small\" data-is-descendent-of-query-loop=\"true\" data-text-align=\"center\" class=\"wp-block-button wc-block-components-product-button   align-center wp-block-woocommerce-product-button has-small-font-size\"\n\t\t\t\t\t\n\t\t\tdata-wp-interactive=\"woocommerce/product-button\"\n\t\t\tdata-wp-init=\"actions.refreshCartItems\"\n\t\t\n\t\t\t\t\tdata-wp-context='{\"quantityToAdd\":1,\"productId\":16003,\"productType\":\"simple\",\"addToCartText\":\"A\\u00f1adir al carrito\",\"tempQuantity\":0,\"animationStatus\":\"IDLE\",\"inTheCartText\":\"### en el carrito\",\"noticeId\":\"\",\"hasPressedButton\":false}'\n\t\t\t\t\u003E\n\t\t\t\t\t\u003Cbutton\n\t\t\t\t\t\tclass=\"wp-block-button__link wp-element-button wc-block-components-product-button__button add_to_cart_button ajax_add_to_cart product_type_simple has-font-size has-small-font-size has-text-align-center wc-interactive\"\n\t\t\t\t\t\tstyle=\"\"\n\t\t\t\t\t\ttype=\"button\" data-product_id=\"16003\" data-product_sku=\"\" aria-label=\"Añadir al carrito: &ldquo;Báscula Ecoenergy (Ecológica)&rdquo;\" data-product_title=\"Báscula Ecoenergy (Ecológica)\"\n\t\t\t\t\t\tdata-wp-on--click=\"actions.addCartItem\"\n\t\t\t\t\t\u003E\n\t\t\t\t\t\u003Cspan \n\t\t\tdata-wp-text=\"state.addToCartText\"\n\t\t\tdata-wp-class--wc-block-slide-in=\"state.slideInAnimation\"\n\t\t\tdata-wp-class--wc-block-slide-out=\"state.slideOutAnimation\"\n\t\t\tdata-wp-on--animationend=\"actions.handleAnimationEnd\"\n\t\t\tdata-wp-watch=\"callbacks.startAnimation\"\n\t\t\tdata-wp-run=\"callbacks.syncTempQuantityOnLoad\"\n\t\t\u003EAñadir al carrito\u003C/span\u003E\n\t\t\t\t\t\u003C/button\u003E\n\t\t\t\t\t\u003Cspan\n\t\t\t\thidden\n\t\t\t\tdata-wp-bind--hidden=\"!state.displayViewCart\"\n\t\t\t\u003E\n\t\t\t\t\u003Ca\n\t\t\t\t\thref=\"https://www.homelife.com.co/carrito-2/\"\n\t\t\t\t\tclass=\"added_to_cart wc_forward\"\n\t\t\t\t\ttitle=\"Ver carrito\"\n\t\t\t\t\u003E\n\t\t\t\t\tVer carrito\n\t\t\t\t\u003C/a\u003E\n\t\t\t\u003C/span\u003E\n\t\t\t\t\u003C/div\u003E\n\n\t\t\t\t\u003C/li\u003E\u003Cli class=\"wc-block-product post-15974 product type-product status-publish has-post-thumbnail product_cat-basculas  instock shipping-taxable purchasable product-type-simple\"\n\t\t\t\t\t\n\t\t\t\tdata-wp-interactive=\"woocommerce/product-collection\"\n\t\t\t\tdata-wp-context='{\"productId\":15974}'\n\t\t\t\tdata-wp-key=\"product-item-15974\"\n\t\t\t\n\t\t\t\t\u003E\n\t\t\t\t\t\n\u003Cdiv data-block-name=\"woocommerce/product-image\" data-image-sizing=\"thumbnail\" data-is-descendent-of-query-loop=\"true\" data-show-sale-badge=\"false\" class=\"wc-block-components-product-image wc-block-grid__product-image wc-block-components-product-image--aspect-ratio-auto wp-block-woocommerce-product-image\"\u003E\u003Ca href=\"https://www.homelife.com.co/producto/bascula-smart-inteligente/\" style=\"\" data-wp-on--click=\"woocommerce/product-collection::actions.viewProduct\"\u003E\u003Cimg decoding=\"async\" width=\"500\" height=\"500\" src=\"https://www.homelife.com.co/wp-content/uploads/2021/02/bascula_Smart_OneMedic_1000x1000_homelife_JK100_movil-500x500.png\" class=\"attachment-woocommerce_thumbnail size-woocommerce_thumbnail\" alt=\"Báscula Smart (inteligente con bluetooth)\" data-testid=\"product-image\" data-image-id=\"15968\" style=\"object-fit:cover;\" srcset=\"https://www.homelife.com.co/wp-content/uploads/2021/02/bascula_Smart_OneMedic_1000x1000_homelife_JK100_movil-500x500.png 500w, https://www.homelife.com.co/wp-content/uploads/2021/02/bascula_Smart_OneMedic_1000x1000_homelife_JK100_movil-180x180.png 180w, https://www.homelife.com.co/wp-content/uploads/2021/02/bascula_Smart_OneMedic_1000x1000_homelife_JK100_movil-800x800.png 800w, https://www.homelife.com.co/wp-content/uploads/2021/02/bascula_Smart_OneMedic_1000x1000_homelife_JK100_movil-150x150.png 150w, https://www.homelife.com.co/wp-content/uploads/2021/02/bascula_Smart_OneMedic_1000x1000_homelife_JK100_movil-300x300.png 300w, https://www.homelife.com.co/wp-content/uploads/2021/02/bascula_Smart_OneMedic_1000x1000_homelife_JK100_movil-768x768.png 768w, https://www.homelife.com.co/wp-content/uploads/2021/02/bascula_Smart_OneMedic_1000x1000_homelife_JK100_movil.png 1000w\" sizes=\"(max-width: 500px) 100vw, 500px\" /\u003E\u003Cdiv class=\"wc-block-components-product-image__inner-container\"\u003E\n\n\u003C/div\u003E\u003C/a\u003E\u003C/div\u003E\n\n\u003Ch2 style=\"line-height:1.4; margin-bottom:0.75rem;margin-top:0;\" class=\"has-text-align-center wp-block-post-title has-medium-font-size\"\u003E\u003Ca data-wp-on--click=\"woocommerce/product-collection::actions.viewProduct\" href=\"https://www.homelife.com.co/producto/bascula-smart-inteligente/\" target=\"_self\" \u003EBáscula Smart (inteligente con bluetooth)\u003C/a\u003E\u003C/h2\u003E\n\n\u003Cdiv data-block-name=\"woocommerce/product-price\" data-font-size=\"small\" data-is-descendent-of-query-loop=\"true\" data-text-align=\"center\" class=\"has-font-size has-small-font-size has-text-align-center wp-block-woocommerce-product-price has-small-font-size\" \u003E\u003Cdiv class=\"wc-block-components-product-price wc-block-grid__product-price\" \u003E\n\t\t\t\t\t\u003Cspan class=\"woocommerce-Price-amount amount\"\u003E\u003Cbdi\u003E\u003Cspan class=\"woocommerce-Price-currencySymbol\"\u003E&#36;\u003C/span\u003E118.000\u003C/bdi\u003E\u003C/span\u003E\n\t\t\t\t\u003C/div\u003E\u003C/div\u003E\n\n\u003Cdiv data-block-name=\"woocommerce/product-button\" data-font-size=\"small\" data-is-descendent-of-query-loop=\"true\" data-text-align=\"center\" class=\"wp-block-button wc-block-components-product-button   align-center wp-block-woocommerce-product-button has-small-font-size\"\n\t\t\t\t\t\n\t\t\tdata-wp-interactive=\"woocommerce/product-button\"\n\t\t\tdata-wp-init=\"actions.refreshCartItems\"\n\t\t\n\t\t\t\t\tdata-wp-context='{\"quantityToAdd\":1,\"productId\":15974,\"productType\":\"simple\",\"addToCartText\":\"A\\u00f1adir al carrito\",\"tempQuantity\":0,\"animationStatus\":\"IDLE\",\"inTheCartText\":\"### en el carrito\",\"noticeId\":\"\",\"hasPressedButton\":false}'\n\t\t\t\t\u003E\n\t\t\t\t\t\u003Cbutton\n\t\t\t\t\t\tclass=\"wp-block-button__link wp-element-button wc-block-components-product-button__button add_to_cart_button ajax_add_to_cart product_type_simple has-font-size has-small-font-size has-text-align-center wc-interactive\"\n\t\t\t\t\t\tstyle=\"\"\n\t\t\t\t\t\ttype=\"button\" data-product_id=\"15974\" data-product_sku=\"\" aria-label=\"Añadir al carrito: &ldquo;Báscula Smart (inteligente con bluetooth)&rdquo;\" data-product_title=\"Báscula Smart (inteligente con bluetooth)\"\n\t\t\t\t\t\tdata-wp-on--click=\"actions.addCartItem\"\n\t\t\t\t\t\u003E\n\t\t\t\t\t\u003Cspan \n\t\t\tdata-wp-text=\"state.addToCartText\"\n\t\t\tdata-wp-class--wc-block-slide-in=\"state.slideInAnimation\"\n\t\t\tdata-wp-class--wc-block-slide-out=\"state.slideOutAnimation\"\n\t\t\tdata-wp-on--animationend=\"actions.handleAnimationEnd\"\n\t\t\tdata-wp-watch=\"callbacks.startAnimation\"\n\t\t\tdata-wp-run=\"callbacks.syncTempQuantityOnLoad\"\n\t\t\u003EAñadir al carrito\u003C/span\u003E\n\t\t\t\t\t\u003C/button\u003E\n\t\t\t\t\t\u003Cspan\n\t\t\t\thidden\n\t\t\t\tdata-wp-bind--hidden=\"!state.displayViewCart\"\n\t\t\t\u003E\n\t\t\t\t\u003Ca\n\t\t\t\t\thref=\"https://www.homelife.com.co/carrito-2/\"\n\t\t\t\t\tclass=\"added_to_cart wc_forward\"\n\t\t\t\t\ttitle=\"Ver carrito\"\n\t\t\t\t\u003E\n\t\t\t\t\tVer carrito\n\t\t\t\t\u003C/a\u003E\n\t\t\t\u003C/span\u003E\n\t\t\t\t\u003C/div\u003E\n\n\t\t\t\t\u003C/li\u003E\u003C/ul\u003E\u003C/div\u003E\n\n\n\n\u003Cp\u003E\u003C/p\u003E\n",
                        "protected": false
                    },
                    "categoria_react": [114],
                    "yoast_head_json": {
                        "title": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA - HomeLife INFARTO",
                        "description": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA",
                        "robots": {
                        "index": "index",
                        "follow": "follow",
                        "max-snippet": "max-snippet:-1",
                        "max-image-preview": "max-image-preview:large",
                        "max-video-preview": "max-video-preview:-1"
                        },
                        "canonical": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/",
                        "og_locale": "es_ES",
                        "og_type": "article",
                        "og_title": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA - HomeLife INFARTO",
                        "og_description": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA",
                        "og_url": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/",
                        "og_site_name": "HomeLife",
                        "article_modified_time": "2026-03-20T18:44:34+00:00",
                        "og_image": [
                        {
                            "url": "https://www.homelife.com.co/wp-content/uploads/2026/03/image.png",
                            "width": 2560,
                            "height": 1707,
                            "type": "image/png"
                        }
                        ],
                        "twitter_card": "summary_large_image",
                        "twitter_misc": {
                        "Tiempo de lectura": "3 minutos"
                        },
                        "schema": {
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                            "@type": "WebPage",
                            "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/",
                            "url": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/",
                            "name": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA - HomeLife INFARTO",
                            "isPartOf": {
                                "@id": "https://www.homelife.com.co/#website"
                            },
                            "primaryImageOfPage": {
                                "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#primaryimage"
                            },
                            "image": {
                                "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#primaryimage"
                            },
                            "thumbnailUrl": "https://www.homelife.com.co/wp-content/uploads/2026/03/image.png",
                            "datePublished": "2026-03-20T18:44:32+00:00",
                            "dateModified": "2026-03-20T18:44:34+00:00",
                            "description": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA",
                            "breadcrumb": {
                                "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#breadcrumb"
                            },
                            "inLanguage": "es",
                            "potentialAction": [
                                {
                                "@type": "ReadAction",
                                "target": [
                                    "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/"
                                ]
                                }
                            ]
                            },
                            {
                            "@type": "ImageObject",
                            "inLanguage": "es",
                            "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#primaryimage",
                            "url": "https://www.homelife.com.co/wp-content/uploads/2026/03/image.png",
                            "contentUrl": "https://www.homelife.com.co/wp-content/uploads/2026/03/image.png",
                            "width": 2560,
                            "height": 1707
                            },
                            {
                            "@type": "BreadcrumbList",
                            "@id": "https://www.homelife.com.co/blog_react/riesgo_infarto_menopausia/#breadcrumb",
                            "itemListElement": [
                                {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Portada",
                                "item": "https://www.homelife.com.co/"
                                },
                                {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "EL RIESGO DE INFARTO AUMENTA EN LAS MUJERES CON LA MENOPAUSIA"
                                }
                            ]
                            },
                            {
                            "@type": "WebSite",
                            "@id": "https://www.homelife.com.co/#website",
                            "url": "https://www.homelife.com.co/",
                            "name": "HomeLife",
                            "description": "Equipos médicos de calidad",
                            "potentialAction": [
                                {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": "https://www.homelife.com.co/?s={search_term_string}"
                                },
                                "query-input": {
                                    "@type": "PropertyValueSpecification",
                                    "valueRequired": true,
                                    "valueName": "search_term_string"
                                }
                                }
                            ],
                            "inLanguage": "es"
                            }
                        ]
                        }
                    }
                    }


2. Funciones Adaptadoras (Crea un archivo de utilidades o úsalas directamente):
La API de WP devuelve datos anidados y HTML sucio. Usa obligatoriamente estas funciones para formatear los datos al formato exacto que esperan los componentes, creando un fallback seguro si faltan campos como el excerpt o el author:

JavaScript
const limpiarHTML = (htmlString) => {
  if (!htmlString) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

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
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Fallback inteligente para el extracto (excerpt)
  const rawExcerpt = post.excerpt?.rendered || post.content?.rendered || '';
  const cleanExcerpt = limpiarHTML(rawExcerpt).substring(0, 120) + '...';

  return {
    id: post.id,
    title: post.title?.rendered || yoast.title?.replace(' - HomeLife', '') || 'Sin título',
    excerpt: cleanExcerpt,
    content: post.content?.rendered || '', 
    date: formattedDate,
    image: imageUrl,
    category: categoryName,
    author: authorName,
    readTime: readTimeNumber,
    relatedProducts: post.acf?.productos_relacionados || []
  };
};
3. Tareas para Blog.jsx:

Elimina la data estática (featuredPost, blogPosts, categories).

Crea estados para posts, categories, loading y error.

Usa useEffect con Promise.all para hacer fetch a las categorías y a los artículos.

Mapea los artículos usando adaptarPostParaReact(post, dataCategorias).

Usa el primer post del array adaptado como el "Featured Post" (destacado) y el resto del array (slice(1)) para el Grid de "Artículos recientes".

Renderiza el Sidebar dinámicamente con el estado categories.

4. Tareas para ArticuloDetalle.jsx:

Lee el id desde useParams().

Haz fetch al endpoint del artículo individual usando ese id.

Pasa la respuesta por adaptarPostParaReact(dataPost, []).

Inyecta post.content usando dangerouslySetInnerHTML en el contenedor article-body.

Maneja los estados de carga y error (redirigir a /blog si no encuentra el post).

Restricciones de UI: No alteres, renombres, ni elimines ninguna clase CSS (className). Mantén la estructura de etiquetas idéntica para no romper el diseño existente. Añade spinners o textos de "Cargando..." sencillos mientras se resuelven los fetches.