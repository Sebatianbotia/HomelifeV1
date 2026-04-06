/**
 * FAQ Database Expandido para el Chatbot de HomeLife
 * Estructura optimizada con 50+ preguntas frecuentes categorizadas
 * Incluye navegación, contexto completo y búsqueda inteligente
 */

export const faqDatabase = [
  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 1: SOBRE HOMELIFE Y PRODUCTOS (8 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 1,
    category: 'empresa',
    section: 'sobre-homelife',
    question: '¿Qué es HomeLife y qué hacen?',
    keywords: ['homelife', 'empresa', 'quiénes', 'misión', 'visión', 'somos'],
    answer: 'HomeLife es una empresa especializada en equipos de diagnóstico y monitoreo de salud de calidad médica. Nos dedicamos a proporcionar dispositivos confiables, certificados y de fácil uso para que las personas puedan controlar su salud en casa o en entornos profesionales. Contáctanos para conocer más sobre nosotros.'
  },
  {
    id: 2,
    category: 'empresa',
    section: 'sobre-homelife',
    question: '¿Quién más vende productos HomeLife?',
    keywords: ['distribuidores', 'venta', 'dónde', 'comprar', 'tiendas', 'aliados', 'puntos venta'],
    answer: 'HomeLife tiene una red de distribuidores autorizados en toda Colombia. Además de nuestra tienda en línea, puedes encontrar nuestros productos en farmacias, centros médicos y puntos de venta especializados. Si quieres convertirte en distribuidor, tenemos un programa especial. ¿Deseas conocer dónde puedes comprar?',
    navigation: { link: '/distribuidores', label: 'Ver Distribuidores' }
  },
  {
    id: 3,
    category: 'productos',
    section: 'productos',
    question: '¿Qué tipo de productos puedo encontrar en HomeLife?',
    keywords: ['productos', 'equipos', 'tipos', 'qué', 'encontrar', 'catálogo', 'línea'],
    answer: 'En HomeLife encontrarás equipos de diagnóstico y monitoreo de salud:\n\nTensiómetros (brazo y muñeca)\nOxímetros de pulso\nTermómetros digitales\nBásculas digitales\nAccesorios y repuestos\n\nTodos nuestros equipos cuentan con certificación INVIMA y son diseñados para uso doméstico y profesional.',
    navigation: { link: '/productos', label: 'Ver Catálogo Complet' }
  },
  {
    id: 4,
    category: 'regulacion',
    section: 'productos',
    question: '¿Los equipos cuentan con registro sanitario INVIMA?',
    keywords: ['invima', 'registro', 'sanitario', 'certificación', 'calidad', 'seguridad', 'certificado', 'regulación'],
    answer: 'Sí, 100%. Todos nuestros dispositivos cuentan con registro sanitario INVIMA vigente y certificaciones internacionales. Esto garantiza que cumplen con los más altos estándares de calidad y seguridad exigidos para comercializar equipos médicos en Colombia y son aptos para uso doméstico y profesional.'
  },
  {
    id: 5,
    category: 'productos',
    section: 'productos',
    question: '¿Los tensiómetros son de brazo o muñeca?',
    keywords: ['tensiómetro', 'tensiometro', 'brazo', 'muñeca', 'tipos', 'diferencia', 'cuál', 'elegir'],
    answer: 'Tenemos ambos tipos disponibles:\n\nDe brazo: Más precisos, recomendados para uso frecuente y diagnóstico\nDe muñeca: Más portátiles, ideales para viajes\n\nAmbos miden presión sistólica, diastólica y frecuencia cardíaca. Te recomendamos elegir según tu estilo de vida y necesidades. ¿Necesitas ver nuestros modelos?',
    navigation: { link: '/productos', label: 'Ver Tensiómetros' }
  },
  {
    id: 6,
    category: 'productos',
    section: 'productos',
    question: '¿Qué diferencia hay entre un oxímetro y otros equipos?',
    keywords: ['oxímetro', 'oximetro', 'saturación', 'SpO2', 'oxígeno', 'pulso', 'diferencia', 'uso'],
    answer: 'El oxímetro mide la saturación de oxígeno (SpO2%) en la sangre y la frecuencia cardíaca. Es diferente a:\n\nTensiómetro: Mide presión arterial\nTermómetro: Mide temperatura\nBáscula: Mide peso\n\nEl oxímetro es ideal para monitorear problemas respiratorios, COVID-19 o post-operatorio. Todos nuestros equipos son complementarios para un control de salud integral.'
  },
  {
    id: 7,
    category: 'productos',
    section: 'productos',
    question: '¿Los productos pueden usarse en casa y en clínica?',
    keywords: ['uso', 'doméstico', 'profesional', 'casa', 'clínica', 'consultorio', 'hospital', 'dónde'],
    answer: 'Sí, definitivamente. Todos nuestros equipos están diseñados para:\n\nUso doméstico: Control personal de salud en casa\nUso profesional: En consultorios, clínicas y centros médicos\n\nLos equipos HomeLife cumplen con los estándares médicos internacionales, por lo que son aceptados en ambientes profesionales. Muchos profesionales de la salud recomiendan nuestros productos a sus pacientes.'
  },
  {
    id: 8,
    category: 'productos',
    section: 'productos',
    question: '¿Hay accesorios o repuestos disponibles?',
    keywords: ['accesorios', 'repuestos', 'brazalete', 'cable', 'batería', 'funda', 'repuesto'],
    answer: 'Sí. Contamos con accesorios y repuestos como:\n\nBrazaletes de repuesto (diferentes tamaños)\nCables de carga\nBaterías\nFundas protectoras\nStands de carga\n\nTodos los accesorios son compatibles con nuestros equipos. ¿Necesitas alguno específico?',
    navigation: { link: '/productos', label: 'Ver Accesorios' }
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 2: GUÍA DE PRODUCTOS (6 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 9,
    category: 'guía',
    section: 'guía-productos',
    question: '¿Cómo elegir el tensiómetro adecuado para mí?',
    keywords: ['tensiómetro', 'elegir', 'cómo', 'cuál', 'mejor', 'recomendación', 'necesidad'],
    answer: 'Para elegir el tensiómetro correcto, considera:\n\nTipo: Brazo (más preciso) o muñeca (más portátil)\nTamaño del brazalete: Debe ajustar cómodamente\nFacilidad de uso: Pantalla clara, botones intuitivos\nMemoria: ¿Necesitas guardar lecturas?\nConectividad: ¿Quieres sincronizar con app?\nPresupuesto: Desde básicos hasta digitales\n\nNuestros asesores pueden recomendarte el modelo ideal. ¡Contáctanos!',
    navigation: { link: '#chatbot-contact', label: 'Hablar con Asesor' }
  },
  {
    id: 10,
    category: 'guía',
    section: 'guía-productos',
    question: '¿Cómo usar correctamente un tensiómetro?',
    keywords: ['tensiometro', 'cómo usar', 'forma', 'modo', 'instrucciones', 'medición', 'correctamente'],
    answer: 'Pasos para medir presión correctamente:\n\n1. Siéntate relajado por 5 minutos\n2. Coloca el brazalete a la altura del corazón\n3. El brazo debe estar relajado y apoyado\n4. Presiona el botón de inicio\n5. Evita hablar durante la medición\n6. Toma 2-3 lecturas con 1 minuto de diferencia\n\nTip: Mide a la misma hora diariamente para comparar resultados. Si tienes dudas, consulta el manual de tu equipo.'
  },
  {
    id: 11,
    category: 'guía',
    section: 'guía-productos',
    question: '¿Cuál es la presión arterial normal?',
    keywords: ['presión', 'normal', 'valores', 'sistólica', 'diastólica', 'hipertensión', 'hipotensión'],
    answer: 'Valores de referencia:\n\nNormal: < 120/80 mmHg\nElevada: 120-129 / < 80 mmHg\n🔴 Hipertensión Estadio 1: 130-139 / 80-89 mmHg\n🔴 Hipertensión Estadio 2: ≥ 140 / ≥ 90 mmHg\n🔵 Hipotensión: < 90/60 mmHg\n\nImportante: Si tienes lecturas anormales, consulta a un médico. Nosotros proveemos equipos precisos, pero la interpretación médica es responsabilidad de un profesional de salud.'
  },
  {
    id: 12,
    category: 'guía',
    section: 'guía-productos',
    question: '¿Cómo interpretar las lecturas de saturación de oxígeno?',
    keywords: ['oxígeno', 'saturación', 'SpO2', 'niveles', 'normal', 'baja', 'interpretación'],
    answer: 'Niveles de saturación de oxígeno (SpO2):\n\nNormal: 95-100%\nBajo-Normal: 92-94%\n🟠 Preocupante: 90-91%\n🔴 Crítico: < 90%\n\nNota: La SpO2 puede variar con la altitud, edad y condiciones de salud. Si tienes lecturas bajas sin razones aparentes, consulta a un médico. ¡Nuestro oxímetro te dará lecturas precisas!'
  },
  {
    id: 13,
    category: 'guía',
    section: 'guía-productos',
    question: '¿Cuál es el peso ideal según mi altura?',
    keywords: ['peso', 'ideal', 'IMC', 'báscula', 'indice', 'masa corporal', 'calculadora'],
    answer: 'Para saber tu peso ideal, usa el Índice de Masa Corporal (IMC):\n\nIMC = Peso (kg) / Altura (m)2\n\nBajo peso: < 18.5\nPeso normal: 18.5 - 24.9\nSobrepeso: 25 - 29.9\n🔴 Obesidad: ≥ 30\n\nNuestras básculas digitales ayudan a monitorear tu peso con precisión. Usar una báscula confiable es el primer paso para un control de peso efectivo.\n\n💡 Consejo: Pésate a la misma hora (mañana) para comparar resultados.'
  },
  {
    id: 14,
    category: 'guía',
    section: 'guía-productos',
    question: '¿Con qué frecuencia debo medir mi presión?',
    keywords: ['frecuencia', 'medición', 'diariamente', 'cuándo', 'cuántas veces', 'regularidad', 'monitoreo'],
    answer: 'Frecuencia recomendada:\n\nCon hipertensión: Diariamente (2 veces al día)\nControl general: 3 veces a la semana\nChequeo preventivo: 1 vez al mes\n\n⏰ Mejor horario:\nMañana (después de despertarte)\nNoche (antes de dormir)\nMisma hora cada día\n\nTip: Registra tus lecturas en una app o cuaderno para que tu médico vea el patrón. ¡Nuestros equipos con memoria automática lo hacen más fácil!'
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 3: COMPRA Y PAGOS (8 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 15,
    category: 'compra',
    section: 'compra-pago',
    question: '¿Cómo compro en la tienda en línea?',
    keywords: ['compra', 'cómo', 'tienda', 'online', 'carrito', 'proceso', 'paso a paso'],
    answer: 'Pasos para comprar en línea:\n\nNavega a nuestra sección de Productos\nSelecciona el equipo que necesitas\nHaz clic en Agregar al Carrito\nVe a tu Carrito\nVerifica los artículos y precios\nHaz clic en Finalizar Compra\nCrea cuenta o inicia sesión\nCompleta dirección de envío\nSelecciona método de pago\nConfirma tu pedido\n\n¡Es así de simple! Si tienes dudas en algún paso, contáctanos.',
    navigation: { link: '/productos', label: 'Ir a Comprar' }
  },
  {
    id: 16,
    category: 'compra',
    section: 'compra-pago',
    question: '¿Cuáles son los métodos de pago disponibles?',
    keywords: ['pago', 'métodos', 'tarjeta', 'efectivo', 'pse', 'transferencia', 'opciones'],
    answer: 'Aceptamos múltiples métodos de pago:\n\nTarjeta de crédito/débito: Visa, Mastercard, American Express\nPSE: Transferencia bancaria en línea\nTransferencia bancaria: Directa a nuestra cuenta\nOtros: Consulta en checkout por opciones adicionales\n\nTodos nuestros pagos son seguros y encriptados. ¡Tu información está protegida!\n\n❓ ¿Necesitas otra forma de pago? Contáctanos para opciones especiales.',
    navigation: { link: '/carrito', label: 'Ir al Carrito' }
  },
  {
    id: 17,
    category: 'compra',
    section: 'compra-pago',
    question: '¿Hacen descuentos por cantidad o volumen?',
    keywords: ['descuento', 'volumen', 'cantidad', 'promoción', 'oferta', 'mayoreo', 'precio especial'],
    answer: 'Sí, contamos con:\n\nDescuentos por volumen: Compra 5+ unidades\nPromociones especiales: Ofertas variadas en temporadas\nPrograma mayorista: Para revendedores\nPrecios empresariales: Para instituciones\n\nSi compras por cantidad, comunícate directamente con nosotros para una cotización personalizada. ¡Podemos ajustar precios según tu necesidad!',
    navigation: { link: '#chatbot-contact', label: 'Solicitar Cotización' }
  },
  {
    id: 18,
    category: 'compra',
    section: 'compra-pago',
    question: '¿Puedo cambiar o devolver un producto?',
    keywords: ['cambio', 'devolución', 'retorno', 'política', 'garantía', 'defecto', 'reembolso'],
    answer: 'Política de devoluciones:\n\nSin abrir: 30 días para cambio o devolución\nCon defecto: Cambio o reparación sin costo\nEnvío: Contribuimos con el retorno\n\nCondiciones:\nProducto en estado original\nCon factura o comprobante\nDentro del plazo permitido\n\nPara procesar un cambio o devolución, contáctanos con tu número de orden y explicación del problema. ¡Estamos aquí para ayudarte!',
    navigation: { link: '#chatbot-contact', label: 'Solicitar Cambio/Devolución' }
  },
  {
    id: 19,
    category: 'compra',
    section: 'compra-pago',
    question: '¿Cuánto cuesta el envío?',
    keywords: ['envío', 'costo', 'entrega', 'gratis', 'tarifa', 'transporte', 'cuánto'],
    answer: 'El costo de envío depende de:\n\nTu ubicación: Bogotá, otras ciudades\nPeso y tamaño: Del producto\nVelocidad: Estándar o express\n\nPromociones:\nEnvío gratis por compra > $200.000 (Bogotá)\nDescuentos en envíos para órdenes mayores\n\nEl costo exacto se calcula en el checkout según tu dirección. ¿Necesitas envío a un lugar específico?',
    navigation: { link: '/carrito', label: 'Calcular Envío' }
  },
  {
    id: 20,
    category: 'compra',
    section: 'compra-pago',
    question: '¿Cuánto tiempo demora en llegar mi pedido?',
    keywords: ['entrega', 'tiempo', 'demora', 'tarifa', 'días', 'cuándo', 'rapidez'],
    answer: 'Tiempos de entrega:\n\nBogotá: 2-3 días hábiles\nCiudades principales: 4-7 días hábiles\nOtras ciudades: 7-10 días hábiles\n\nNota: \nTiempos pueden variar según festivos o clima\nRecibirás tracking para seguir tu pedido\nPuedes contactarnos si hay demoras\n\n💡 Consejo: Elige \"Envío Express\" si lo necesitas urgente (+ costo pero entrega garantizada).\n\n¿Necesitas acelerar tu pedido?',
    navigation: { link: '#chatbot-contact', label: 'Hablar sobre Entrega' }
  },
  {
    id: 21,
    category: 'compra',
    section: 'compra-pago',
    question: '¿Necesito cuenta para comprar?',
    keywords: ['cuenta', 'registrarse', 'usuario', 'login', 'crear', 'autenticación'],
    answer: 'Tienes dos opciones:\n\nOpción 1: Sin cuenta - Compra como invitado directamente\nOpción 2: Con cuenta - Crea una para:\n  Rápidas recompras\n  Ver historial de órdenes\n  Guardar dirección de envío\n  Acceder a promociones exclusivas\n\nCrear cuenta es rápido y gratis. Solo necesitas:\nEmail\nContraseña\nNombre completo\n\n👤 ¿Necesitas ayuda para crear tu cuenta?',
    navigation: { link: '/auth', label: 'Crear Cuenta' }
  },
  {
    id: 22,
    category: 'compra',
    section: 'compra-pago',
    question: '¿Cómo rastreo mi pedido?',
    keywords: ['rastrear', 'seguimiento', 'tracking', 'dónde', 'cómo', 'ubicación', 'tracking number'],
    answer: 'Para rastrear tu pedido:\n\nVe a tu Cuenta o Mis Compras\nSelecciona el pedido que deseas rastrear\nHaz clic en Ver Detalles\nEncontrarás el Número de Rastreo\nUsa este número en el sitio de la mensajería\n\nAlternativa: Si perdes tu número de rastreo, contáctanos con tu número de orden y te lo reenviaremos.\n\n💡 Consejo: Guarda tu número de orden cuando confirmes la compra.',
    navigation: { link: '/cuenta', label: 'Ir a Mi Cuenta' }
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 4: GARANTÍA Y SOPORTE (6 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 23,
    category: 'garantia',
    section: 'garantía-soporte',
    question: '¿Qué dice la política de garantías y proceso?',
    keywords: ['garantía', 'cobertura', 'proceso', 'política', 'daños', 'alterado', 'estrategico', 'PL-EST-PG-02', 'procedimiento'],
    answer: 'Para validar el proceso por garantía el equipo debe contar con todas sus partes, piezas y/o accesorios suministrados por el fabricante. El equipo no debe poseer indicios de que este fue manipulado o alterado, de lo contrario no se responde por daños causados por terceros. Todo daño causado a los equipos por una mala manipulación no será cubierto por la garantía que ofrece el fabricante.\n\nPROCESO ESTRATEGICO (CÓDIGO: PL-EST-PG-02 | VERSIÓN: 03 | 01/03/2024)\n\nPROCEDIMIENTO:\nLa garantía ofrecida por HOME MEDICAL GROUP SAS se hará efectiva mediante el siguiente proceso:\n\n1. Las quejas y/o reclamos se pueden recibir y registrar a través de diferentes fuentes:\nTelefónico: En horario de lunes a viernes de 7:30 am a 4:30 pm mediante el WhatsApp: 305 2028019.\nCorreo Electrónico: 7x24, enviando la PQRS al correo atencionalcliente@homelife.com.co\n\n2. Una vez el área de servicio al cliente evalué el caso puntual, solicitara realizar el envío del equipo a nuestras instalaciones: Destinario. HOME MEDICAL GROUP SAS. Dirección. la Carrera 10 No. 72-66 Oficina 301, de Bogotá D.C. Los costos del envíó serán asumidos por Home Medical Group SAS.\n\n3. Durante los siguientes 3 días hábiles, después de recibido el equipo. Se dará respuesta. De acuerdo con los resultados arrojados en la evaluación técnica, se realizará mantenimiento preventivo, correctivo o reposición del equipo, según sea el caso.\nNOTA: Junto con el equipo se enviará el reporte de servicio técnico.\n\n4. Se remite el equipo nuevamente a la dirección suministrada en la guía inicial con la que se recibió el envío.',
    navigation: { link: '/registra-tu-equipo', label: 'Registrar Equipo' }
  },
  {
    id: 24,
    category: 'garantia',
    section: 'garantía-soporte',
    question: '¿Cómo registro mi equipo para extender la garantía?',
    keywords: ['registro', 'registrar', 'equipo', 'serial', 'garantía', 'extender', 'cómo'],
    answer: 'Para registrar tu equipo:\n\nVe a la sección Registra tu Equipo\nCompleta el formulario con:\n  Nombre y datos de contacto\n  Número de serie del equipo\n  Lugar y fecha de compra\n  Número de factura\nCarga una foto de la factura o comprobante\nEnvía el formulario\n\nBeneficios:\nExtiende la garantía\nAcceso a soporte prioritario\nPromociones exclusivas\nTips y tutoriales personalizados\n\n⏰ Registra tu equipo dentro de 30 días de la compra.',
    navigation: { link: '/registra-tu-equipo', label: 'Registrar Mi Equipo' }
  },
  {
    id: 25,
    category: 'garantia',
    section: 'garantía-soporte',
    question: '¿Qué hago si mi equipo presenta fallas?',
    keywords: ['falla', 'problema', 'daño', 'no funciona', 'defectuoso', 'soporte', 'ayuda'],
    answer: 'Pasos si tu equipo falla:\n\nDiagnóstico: Intenta reiniciar o cambiar baterías\nVerifica manual: Revisa instrucciones de uso\nContáctanos: Envía foto y descripción del problema\nEvaluación: Nuestro equipo revisará en 24h\nSolución: Reparación, cambio o reembolso\n\nFormas de contactar:\nWhatsApp: 305 2028019\nTeléfono: 305 2028019\nEmail: atencionalcliente@homelife.com.co\n\n💡 Tip: Ten a mano tu número de serie y fecha de compra.',
    navigation: { link: '#chatbot-contact', label: 'Reportar Problema' }
  },
  {
    id: 26,
    category: 'garantia',
    section: 'garantía-soporte',
    question: '¿Hay servicio técnico en mi ciudad?',
    keywords: ['servicio técnico', 'reparación', 'centro', 'técnico', 'ciudad', 'dónde'],
    answer: 'Contamos con:\n\n🔧 Servicio técnico centralizado en Bogotá\n🔧 Aliados técnicos en principales ciudades\n🔧 Envío gratis de equipos para reparación\n\nPara servicio técnico:\n1. Contacta a atención al cliente\n2. Describe el problema\n3. Recibe instrucciones de envío\n4. Reparación en 5-7 días\n5. Envío de retorno sin costo\n\n¿En dónde estás ubicado? Podemos verificar opciones locales para ti.',
    navigation: { link: '#chatbot-contact', label: 'Solicitar Servicio Técnico' }
  },
  {
    id: 27,
    category: 'garantia',
    section: 'garantía-soporte',
    question: '¿Puedo obtener piezas de repuesto?',
    keywords: ['repuesto', 'pieza', 'componente', 'parte', 'brazalete', 'batería', 'accesorio'],
    answer: 'Sí, disponemos de múltiples repuestos:\n\nBrazaletes (diferentes tamaños)\nBaterías (variadas frecuencias)\nCables (USB y especiales)\nPilas (AAA, AA, etc.)\nFundas protectoras\nAccesorios varios\n\nCómo comprar repuestos:\n1. Identifica tu modelo exacto\n2. Mira en nuestra tienda online\n3. O contáctanos directamente\n\nEnvío rápido a tu domicilio.\n\n¿Qué repuesto necesitas?',
    navigation: { link: '/productos', label: 'Ver Repuestos' }
  },
  {
    id: 28,
    category: 'soporte',
    section: 'garantía-soporte',
    question: '¿Cómo me comunico con atención al cliente?',
    keywords: ['contacto', 'atención', 'cliente', 'teléfono', 'whatsapp', 'email', 'soporte'],
    answer: 'Múltiples formas de contactarnos:\n\nWhatsApp: 305 2028019\n → Respuestas rápidas, horario 8am-6pm\n\nTeléfono: 305 2028019\n → Llamadas: Lunes-Viernes 8am-6pm\n\n✉️ Email: atencionalcliente@homelife.com.co\n → Respuesta en 24 horas máximo\n\nDirección: Carrera 10 #72-66 Of. 302, Bogotá\n → Visitas por cita previa\n\nChat en vivo: Aquí mismo (mientras hablas conmigo)\n\n🕐 Horario: Lunes-Viernes 8am-6pm, Sábados 9am-1pm\n\n¿Cómo preferirías que te contactemos?',
    navigation: { link: '#chatbot-contact', label: 'Enviar Mensaje' }
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 5: CUENTA Y AUTENTICACIÓN (5 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 29,
    category: 'cuenta',
    section: 'cuenta-auth',
    question: '¿Cómo creo una cuenta en HomeLife?',
    keywords: ['cuenta', 'crear', 'registro', 'usuario', 'email', 'contraseña', 'signup'],
    answer: 'Para crear tu cuenta:\n\nHaz clic en Crear Cuenta (esquina superior)\nCompleta con:\n  Nombre completo\n  Email\n  Contraseña (mín. 8 caracteres)\n  Confirma contraseña\nAcepta términos y condiciones\n¡Listo! Acceso inmediato\n\nBeneficios de tener cuenta:\nCompras más rápidas\nHistorial de órdenes\nOfertas exclusivas\nSeguimiento de envíos\nRegistro de garantía\n\n¿Necesitas ayuda?',
    navigation: { link: '/auth', label: 'Crear Cuenta Ahora' }
  },
  {
    id: 30,
    category: 'cuenta',
    section: 'cuenta-auth',
    question: '¿Olvidé mi contraseña, cómo la recupero?',
    keywords: ['contraseña', 'olvidé', 'recuperar', 'reset', 'cambiar', 'password'],
    answer: 'Para recuperar tu contraseña:\n\nVe a la página de Login\nHaz clic en ¿Olvidaste tu contraseña?\nIngresa tu email\nRecibirás enlace en tu correo\nHaz clic en el enlace\nCrea nueva contraseña\n¡Acceso restaurado!\n\n⏰ El enlace es válido por 24 horas\n\n💡 Consejo: \nRevisa carpeta de spam\nUsa una contraseña fuerte (mayúsculas, números, símbolos)\nNo compartas tu contraseña con nadie\n\n☎️ Si no recibes el email, escríbenos.',
    navigation: { link: '/auth', label: 'Recuperar Contraseña' }
  },
  {
    id: 31,
    category: 'cuenta',
    section: 'cuenta-auth',
    question: '¿Cómo actualizo mis datos personales?',
    keywords: ['actualizar', 'datos', 'perfil', 'cambiar', 'información', 'dirección', 'teléfono'],
    answer: 'Para editar tu perfil:\n\nInicia sesión en tu cuenta\nVe a Mi Perfil o Mi Cuenta\nHaz clic en Editar Datos\nModifica lo que necesites:\n  Nombre\n  Teléfono\n  Dirección\n  Email\nGuarda cambios\n\nImportante:\nLa dirección se usa para envíos\nEl email es tu login\nVerifica datos para evitar problemas\n\n¿Hay algo que necesites cambiar en tu perfil?',
    navigation: { link: '/cuenta', label: 'Ir a Mi Cuenta' }
  },
  {
    id: 32,
    category: 'cuenta',
    section: 'cuenta-auth',
    question: '¿Cómo veo el historial de mis compras?',
    keywords: ['historial', 'compras', 'órdenes', 'pedidos', 'minotas', 'mis órdenes'],
    answer: 'Para ver tus compras anteriores:\n\nInicia sesión en tu cuenta\nVe a Mi Cuenta\nSelecciona Mis Órdenes o Historial de Compras\nVerás:\n  Número de orden\n  Fecha de compra\n  Productos\n  Total pagado\n  Estado de envío\n  Opción de factura\n\nDesde aquí también puedes:\nRastrear tu pedido\nVer detalles de la compra\nDescargar factura\nProblemas/Devoluciones\n\nSi necesitas info de una compra anterior, ¿me dices la fecha?',
    navigation: { link: '/cuenta', label: 'Ver Mis Órdenes' }
  },
  {
    id: 33,
    category: 'cuenta',
    section: 'cuenta-auth',
    question: '¿Cómo elimino mi cuenta?',
    keywords: ['eliminar', 'borrar', 'cuenta', 'dar de baja', 'cierre', 'cancelar'],
    answer: 'Para eliminar tu cuenta:\n\nInicia sesión\nVe a Configuración o Mi Perfil\nBusca Eliminar Cuenta o Peligro\nLee advertencias\nConfirma eliminación\n\nImportante:\nNo podrás recuperar la cuenta\nPerderás acceso a historial\nLos datos se borran en 30 días\nSi tienes órdenes pendientes, avísanos\n\n💡 Alternativa: Si solo quieres reportar un problema, comunícate con nosotros primero.\n\n¿Hay algo que podamos mejorar?',
    navigation: { link: '#chatbot-contact', label: 'Hablar con Soporte' }
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 6: CUIDADO Y USO (5 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 34,
    category: 'mantenimiento',
    section: 'cuidado-uso',
    question: '¿Cómo cuido y mantengo mis equipos?',
    keywords: ['cuidado', 'mantenimiento', 'limpiar', 'almacenamiento', 'conservar', 'durabilidad'],
    answer: 'Consejos de mantenimiento:\n\n🧹 Limpieza:\nLimpia con paño suave y húmedo\nNO uses agua y jabón directamente\nEvita líquidos en orificios\n\n🔋 Baterías:\nCambialas anualmente\nRetira si no usas > 2 meses\nGuarda baterías nuevas aparte\n\n🏠 Almacenamiento:\nLugar limpio y seco\nTemperatura 15-25°C\nEvita humedad, calor excesivo\nProtégelo en estuche\n\n⛔ Evita:\nGolpes y caídas\nSumergir en agua\nModificaciones caseras\nUsar fuente incorrecta\n\nSeguir estos pasos puede prolongar la vida útil a 10+ años.',
    navigation: { link: '#help', label: 'Ver Manual Completo' }
  },
  {
    id: 35,
    category: 'mantenimiento',
    section: 'cuidado-uso',
    question: '¿Qué tipo de baterías usan los equipos?',
    keywords: ['batería', 'pilas', 'energía', 'tipo', 'cuáles', 'AAA', 'AA', 'recargable'],
    answer: 'Tipos de baterías según equipo:\n\nLos modelos varían. Aquí los tipos comunes:\n\n🔋 Pilas AAA: En tensiómetros / oxímetros portátiles\n🔋 Pilas AA: En básculas / algunos tensiómetros\n🔋 Recargables USB: En equipos digitales modernos\n\nRecomendaciones:\nUsa baterías de buena calidad\nCambia anualmente\nRetira si no usas > 2 meses (evita fugas)\nGuarda las nuevas en lugar fresco\n\nRevisa el manual de tu equipo específico para saber exactamente qué necesita.\n\n¿Cuál es tu modelo? Te ayudo a identificar.',
    navigation: { link: '/productos', label: 'Ver Modelos' }
  },
  {
    id: 36,
    category: 'mantenimiento',
    section: 'cuidado-uso',
    question: '¿Mi equipo es resistente al agua?',
    keywords: ['agua', 'resistente', 'impermeable', 'mojado', 'sumergible', 'lluvia', 'vapor'],
    answer: 'Resistencia al agua según tipo:\n\nEsto varía por modelo. Información general:\n\nMayoría de equipos: NO son resistentes al agua\nAlgunos modelos: Resistencia a salpicaduras\n\nLo que sí puedes hacer:\nLimpiar con paño LIGERAMENTE húmedo\nExponer a vapor (sin inmersión)\n\nLo que NO debes hacer:\nSumergir en agua\nPoner bajo grifo\nUsar en ducha\nLavar con chorro\n\n💧 Si tu equipo se moja accidentalmente:\n1. Sécalo inmediatamente\n2. Abre batería si es posible\n3. Deja secar 24h antes de usar\n\nPara tu modelo específico, revisa el manual.\n\n¿Tu equipo se mojó? Ayúdame a resolverlo.',
    navigation: { link: '#chatbot-contact', label: 'Reportar Incidente' }
  },
  {
    id: 37,
    category: 'mantenimiento',
    section: 'cuidado-uso',
    question: '¿Puedo usar mi equipo en la playa o montaña?',
    keywords: ['playa', 'montaña', 'altura', 'agua salada', 'altitud', 'condiciones extremas', 'ambiente'],
    answer: 'Uso en diferentes ambientes:\n\n🏖️ Playa:\nSí, pero protégelo del agua salada\nGuarda en estuche\nLimpia con paño siempre\nNO lo metas al agua\nEvita arena dentro\n\n⛰️ Montaña:\nSí, aunque precisión puede cambiar\nA mayor altitud, SpO2 será diferente\nAclimatación: espera 2h antes de medir\nMantén en temperatura adecuada\n\n🌡️ Temperaturas extremas:\nNO uses < 10°C ni > 40°C\nEvita cambios bruscos (dejalo aclimatar)\nGuarda en estuche térmico si es necesario\n\nEn condiciones extremas, consulta tu manual específico.\n\n¿Planeas usar tu equipo en condiciones especiales? Cuéntame más.',
    navigation: { link: '#chatbot-contact', label: 'Consultar Específicamente' }
  },
  {
    id: 38,
    category: 'mantenimiento',
    section: 'cuidado-uso',
    question: '¿Con qué frecuencia debo revisar mi equipo?',
    keywords: ['revisión', 'mantenimiento', 'verificación', 'calibración', 'funcional', 'chequeo'],
    answer: 'Programa de mantenimiento recomendado:\n\nMensual:\nVerifica que encienda correctamente\nLimpia con paño suave\nComprueba pantalla y botones\n\n🔧 Cada 3 meses:\nCambia baterías por nuevas\nCompara lectura con otro equipo\nRevisa que todo funcione\n\nCada 6 meses:\nCalibración (algunos modelos)\nLimpieza profunda\nVerificación de precisión\n\nAnual:\nRevisión técnica profesional\nValidar registro de garantía\nActualizar datos en sistema\n\n💡 Consejo: Lleva registro de mantenimiento para validar garantía.\n\n¿Tu equipo necesita revisión?',
    navigation: { link: '#chatbot-contact', label: 'Solicitar Revisión' }
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 7: NEGOCIOS Y DISTRIBUIDORES (5 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 39,
    category: 'negocio',
    section: 'negocio-distribuidores',
    question: '¿Cómo puedo ser distribuidor de HomeLife?',
    keywords: ['distribuidor', 'programa', 'negocio', 'alianza', 'comercial', 'venta mayoreo', 'requisitos'],
    answer: 'Programa de Distribuidores:\n\nSomos una empresa en crecimiento buscando aliados comerciales para expandir en toda Colombia.\n\nRequisitos básicos:\nRegistro mercantil\nRUT activo\nExperiencia en ventas\nCapacidad financiera\nPersonas o empresa\n\nBeneficios:\nDescuentos por volumen\nSoporte de ventas\nMaterial promocional\nCapacitación de productos\nComisiones atractivas\nExclusividad de zona\n\nProceso:\n1. Solicitud inicial\n2. Evaluación de perfil\n3. Entrevista con gerencia\n4. Propuesta comercial\n5. Contrato y capacitación\n\n¿Interesado en ser distribuidor?',
    navigation: { link: '/distribuidores', label: 'Ver Programa de Distribuidores' }
  },
  {
    id: 40,
    category: 'negocio',
    section: 'negocio-distribuidores',
    question: '¿Cuál es el margen de ganancia para distribuidores?',
    keywords: ['margen', 'ganancia', 'comisión', 'precio mayorista', 'descuento', 'utilidad', 'porcentaje'],
    answer: 'Estructura de márgenes:\n\nLos márgenes varían según volumen y región\n\nTramos típicos:\n5-10 unidades: 25-30% descuento\n10-25 unidades: 30-35% descuento\n25-50 unidades: 35-40% descuento\n50+ unidades: 40-45% descuento\n\n💡 Factores que influyen:\nVolumen de compra\nZona geográfica\nTipo de producto\nHistorial comercial\nCapacidad de almacenamiento\n\nEjemplo:\nProducto lista: $100.000\nCon 30% desc: $70.000 costo\nMargen posible: $30.000+ (según venta)\n\nPara descuentos personalizados, contacta a nuestro equipo comercial.',
    navigation: { link: '/distribuidores', label: 'Solicitar Cotización' }
  },
  {
    id: 41,
    category: 'negocio',
    section: 'negocio-distribuidores',
    question: '¿Qué garantía ofrecen para distribuidores?',
    keywords: ['distribuidor', 'garantía', 'devolución', 'productos defectuosos', 'reemplazo', 'política'],
    answer: 'Garantía y soporte para distribuidores:\n\nDefectos de fabricación:\nCambio sin costo del producto\nReemplazo en 5-7 días\nEnvío corrido por HomeLife\n\nProductos sin vender:\nCambio si está sin abrir (hasta 60 días)\nCoordinación con equipo\nNota de crédito disponible\n\nProductos dañados en tránsito:\nSeguro de carga\nReposición garantizada\nDocumentación y evidencia\n\nSoporte técnico:\nCapacitación del distribuidor\nRespuesta rápida a problemas\nMaterial para explicar a clientes\n\nCada distribuidor tiene un Account Manager dedicado para resolver problemas.\n\n¿Tienes una situación específica?',
    navigation: { link: '/distribuidores', label: 'Contactar Gerencia Comercial' }
  },
  {
    id: 42,
    category: 'negocio',
    section: 'negocio-distribuidores',
    question: '¿HomeLife ofrece capacitación para vendedores?',
    keywords: ['capacitación', 'entrenamiento', 'producto', 'vendedor', 'personal', 'formación', 'training'],
    answer: 'Programa de capacitación:\n\nSí, ofrecemos programa integral para:  \n\n👥 Distribuidores → Gerentes y vendedores\nClientes empresariales → Personal médico\nFarmacias → Farmacéuticos\n\nContenido de capacitación:\nCaracterísticas técnicas de productos\nBeneficios y diferenciadores\nCómo elegir equipo según cliente\nUso correcto (demostración)\nMantenimiento y cuidados\nGarantía y políticas\nTécnicas de venta\nManejo de objeciones\n\nFormatos:\nSesiones presenciales (Bogotá)\nCapacitación remota (Zoom)\nMaterial didáctico (videos,manuales)\nCertificado al finalizar\n\nDuración: 2-4 horas según profundidad\n\n💡 Capacitación periódica con nuevos productos.\n\n¿Necesitas capacitación?',
    navigation: { link: '/distribuidores', label: 'Solicitar Capacitación' }
  },
  {
    id: 43,
    category: 'negocio',
    section: 'negocio-distribuidores',
    question: '¿Cómo reporto un distribuidor no autorizado?',
    keywords: ['distribuidor falso', 'falsificación', 'no autorizado', 'reportar', 'fraude', 'ilegal'],
    answer: 'Si encuentras productos falsificados o distribuidores no autorizados:\n\nDocumenta todo:\n   Fotos del producto\n   Nombre del distribuidor\n   Ubicación/dirección\n   Fecha y hora\n\nContacta con nosotros:\n  ✉️ Email: atencionalcliente@homelife.com.co\n   Tel: 305 2028019\n   WhatsApp: 305 2028019\n\nInformación a proporcionar:\n   Descripción detallada\n   Evidencia (fotos/videos)\n   Ubicación exacta\n   Acciones que está tomando\n\nInvestigación:\n   HomeLife investigará\n   Acciones legales si corresponde\n   Protegemos marca y clientes\n\nAdvertencia:\nProductos falsificados pueden ser peligrosos para la salud. No compres a distribuidores no verificados.\n\n¿Encontraste algo sospechoso?',
    navigation: { link: '#chatbot-contact', label: 'Reportar Abuso' }
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 8: REGISTRO DE EQUIPO (3 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 44,
    category: 'registro',
    section: 'registro-equipo',
    question: '¿Por qué registrar mi equipo?',
    keywords: ['registro', 'registrar', 'beneficios', 'equipo', 'por qué', 'garantía extendida'],
    answer: 'Beneficios de registrar tu equipo:\n\nGarantía extendida → Lleva de 1-2 años a hasta 3 años\nProtección completa → Cobertura ampliada de defectos\nSoporte prioritario → Atención más rápida\nComunicaciones directas → Tips, actualizaciones, recall si hay\nPromociones exclusivas → Descuentos en accesorios\nMateriales adicionales → Manuales, videos, guías\nReemplazo de piezas → Acceso a repuestos originales\nAseitoría gratis → Consultas con expertos\n\nLo mejor: ¡Es completamente GRATIS registrar!\n\nSolo necesitas:\nSerial del equipo\nFactura de compra\nEmail de contacto\n5 minutos\n\n¿Registraste tu equipo?',
    navigation: { link: '/registra-tu-equipo', label: 'Registrar Ahora' }
  },
  {
    id: 45,
    category: 'registro',
    section: 'registro-equipo',
    question: '¿Dónde encuentro el número serial de mi equipo?',
    keywords: ['serial', 'número', 'serie', 'dónde', 'ubicación', 'etiqueta', 'código'],
    answer: 'Ubicación del número serial:\n\nEl serial generalmente está:\n\nEn la parte trasera del equipo (etiqueta)\nEn la base o piso (si es portátil)\nEn el lateral (algunos modelos)\nEn el manual (página de especificidades)\nEn la caja original (etiqueta exterior)\n\nAspecto típico:\nCódigo corto: HL-2024-0001\nO más largo: 100123456789\nPuede tener letras y números\nIMPORTANTE: no confundir con UPC\n\n💡 Consejo:\nToma foto del serial\nEscríbelo en tu manual\nGuarda en lugar seguro\n\nSi no encuentras el serial, contacta al lugar donde compraste. Ellos tienen registro.\n\n¿Necesitas ayuda para identificarlo?',
    navigation: { link: '#chatbot-contact', label: 'Ayuda para Encontrarlo' }
  },
  {
    id: 46,
    category: 'registro',
    section: 'registro-equipo',
    question: '¿Puedo registrar un equipo ya usado o de segunda mano?',
    keywords: ['usado', 'segunda mano', 'no registro', 'original', 'compra anterior', 'transferencia'],
    answer: 'Política de registro para equipos usados:\n\nSÍ puedes registrar si:\nTienes la factura original\nEl serial es válido\nEl equipo está funcionando\nEres el actual propietario\n\nNO puedes registrar si:\nNo tienes comprobante de compra\nEl serial está borroso/ilegible\nEl equipo es importación no autorizada\nFue marcado como defectuoso\n\nProceso especial:\n1. Procura factura o comprobante\n2. Llena formulario de registro\n3. Adjunta comprobante de compra\n4. Se revisará para validar\n5. Si todo está bien: ¡registro activo!\n\n💡 Nota importante:\nLa garantía comienza en la fecha de COMPRA ORIGINAL, no en la fecha de tu registro.\n\n¿Tu equipo es usado pero tienes la factura?',
    navigation: { link: '/registra-tu-equipo', label: 'Registrar Equipo Usado' }
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 9: BLOG Y CONTENIDO (3 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 47,
    category: 'contenido',
    section: 'blog-info',
    question: '¿Dónde encuentro el blog de HomeLife?',
    keywords: ['blog', 'artículos', 'salud', 'tips', 'información', 'educación', 'conocimiento'],
    answer: 'Sección de Blog de HomeLife:\n\nTenemos una sección de blog con artículos sobre:\n\nTemas disponibles:\nMonitoreo de presión arterial\nSalud cardiovascular\nRecomendaciones de uso\nNoticias médicas relevantes\nTestimonios de usuarios\nTips de bienestar\nCOVID-19 y SpO2\nCuidados preventivos\n\nContenido actualizado:\n2-3 artículos nuevos mensual\nEscritos por profesionales\nInformación respaldada\nConsejos prácticos\n\nAcceso:\nVe a la sección Blog en el menú superior.\n\n💝 Beneficio extra:\nAlgunos artículos incluyen descuentos exclusivos para lectores.\n\n¿Te interesa algún tema específico en salud?',
    navigation: { link: '/blog', label: 'Ir al Blog' }
  },
  {
    id: 48,
    category: 'contenido',
    section: 'blog-info',
    question: '¿Tienen información sobre salud respiratoria?',
    keywords: ['respiratorio', 'pulmones', 'asma', 'oxígeno', 'COVID', 'respiración', 'salud'],
    answer: 'Contenido sobre Salud Respiratoria:\n\nSí, contamos con varios artículos sobre:\n\nTemas cubiertos:\nCómo medir SpO2 correctamente\nNiveles normales de oxígeno\nSíntomas de hipoxia\nCOVID-19 y saturación\nAsma y monitoreo\nEjercicios respiratorios\nCuándo buscar ayuda médica\nHistórico COVID información\n\n🔬 Fuentes:\nBasado en recomendaciones médicas\nInformación de OMS/CDC\nExpertos en medicina respiratoria\nEstudios clínicos\n\nImportante:\nNuestros artículos son informativos. Para diagnosis médica, consulta a un profesional de salud.\n\nLos oxímetros de HomeLife te ayudan a monitorear, pero no reemplazan diagnóstico médico.\n\n¿Necesitas info sobre un síntoma específico?',
    navigation: { link: '/blog', label: 'Ver Artículos' }
  },
  {
    id: 49,
    category: 'contenido',
    section: 'blog-info',
    question: '¿Cómo suscribirse al blog o newsletter?',
    keywords: ['newsletter', 'suscribir', 'email', 'actualización', 'artículos', 'noticias'],
    answer: 'Para recibir actualizaciones:\n\nNewsletter/Email:\nEntra al blog y busca el formulario de suscripción. Recibirás:\nNuevos artículos\nTips exclusivos\nDescuentos especiales\nInformación de nuevos productos\n1-2 emails por semana máximo\n\n🔔 Redes Sociales:\nSeguir en:\nInstagram: @homelifestore\nFacebook: HomeLife Colombia\nYouTube: HomeLife Oficial\nContenido diario\nComunidad activa\nConcursos y sorteos\n\nConfiguración:\nPuedes desuscribirse en cualquier momento\nRespetamos tu privacidad\nNo compartimos tu email\nSolo comunicaciones de HomeLife\n\n💝 Bonus: Suscriptores reciben código de 10% descuento.\n\n¿Te gustaría suscribirse?',
    navigation: { link: '/blog', label: 'Ir al Blog' }
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 10: POLÍTICAS Y LEGALES (4 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 50,
    category: 'legal',
    section: 'políticas-legal',
    question: '¿Cuál es la política de privacidad de HomeLife?',
    keywords: ['privacidad', 'datos', 'personal', 'información', 'seguridad', 'política', 'protección'],
    answer: 'Política de privacidad completa disponible\n\nEn HomeLife nos comprometemos con tu privacidad:\n\n🔐 Protección:\nTus datos están encriptados\nNo compartimos con terceros\nCumplimos GDPR y leyes locales\nAuditorías de seguridad regulares\n\nQué recopilamos:\nNombre, email, teléfono\nDirección de envío\nHistorial de compras\nPreferencias\n\n✋ Tus derechos:\nAcceso a tus datos\nRectificación si hay errores\nEliminación (DERECHO AL OLVIDO)\nPortabilidad de datos\n\nContacto para privacidad:\nEmail: privacidad@homelife.com.co\n\n🔗 Leer completo:\nVa a Políticas de Privacidad en el pie de página.\n\n¿Tienes pregunta sobre tus datos?',
    navigation: { link: '/politicas', label: 'Ver Políticas' }
  },
  {
    id: 51,
    category: 'legal',
    section: 'políticas-legal',
    question: '¿Cuáles son los términos y condiciones?',
    keywords: ['términos', 'condiciones', 'legal', 'acuerdo', 'responsabilidad', 'uso'],
    answer: 'Términos y Condiciones:\n\nAl usar HomeLife aceptas:\n\n📜 Tus responsabilidades:\nCompras legales (mayor edad)\nInformación correcta en formularios\nUso apropiado de plataforma\nNo actividades fraudulentas\n\n⚖️ Responsabilidades de HomeLife:\nVender equipos de calidad\nCumplir con garantía\nRespetar privacidad\nServicio al cliente responsable\n\nLimitaciones:\nLos equipos son para diagnóstico personal\nNO reemplazan asesoramiento médico\nHomeLife no es responsable de mal uso\nLimitación de responsabilidad en garantía\n\nCambios:\nHomeLife puede modificar términos con aviso previo.\n\n🔗 Documento completo:\nPixie en pie de página: Términos y Condiciones\n\n¿Tienes pregunta sobre los términos?',
    navigation: { link: '/politicas', label: 'Ver Términos Completos' }
  },
  {
    id: 52,
    category: 'legal',
    section: 'políticas-legal',
    question: '¿HomeLife está registrado y es una empresa confiable?',
    keywords: ['confiabilidad', 'registro', 'empresa', 'legal', 'cámara', 'comercio', 'verificación'],
    answer: 'Información de HomeLife:\n\nSí, somos una empresa legal y confiable\n\nRegistros y Certificaciones:\nRegistrados en Cámara de Comercio\nRUT válido y activo\nCertificación INVIMA de productos\nLicencia sanitaria vigente\nCertificaciones internacionales\nAños de operación en Colombia\n\n🏪 Mercado electrónico:\nVerificación en plataformas e-commerce\nReseñas y calificaciones públicas\nProtocolo de protección al consumidor\n\nPuedes verificar:\n1. Consulta Cámara Comercio Bogotá\n2. Verifica RUT\n3. Lee reseñas en plataformas\n4. Contacta directamente\n\nTransparencia:\nTodos nuestros datos públicos están disponibles.\nContáctanos si necesitas certificados o información adicional.\n\nHomeLife está comprometida con transparencia y confianza en todas las operaciones.\n\n¿Necesitas verificación adicional?',
    navigation: { link: '#chatbot-contact', label: 'Verificar Credenciales' }
  },
  {
    id: 53,
    category: 'legal',
    section: 'políticas-legal',
    question: '¿Qué dice la garantía limitada?',
    keywords: ['garantía', 'limitada', 'cobertura', 'qué incluye', 'exclusiones', 'período', 'defecto'],
    answer: 'Garantía Limitada de HomeLife:\n\nPeríodo:\n1-2 años desde compra (varía por producto)\nSe extiende si registras equipo\n\nCubre:\nDefectos de fabricación\nFallas de funcionamiento\nComponentes defectuosos\nRepuestos para reparación\nMano de obra\nEnvío de retorno\n\nNO Cubre:\nDaño por caídas/golpes\nMal uso\nModificaciones caseras\nDesgaste normal\nUso no autorizado\nNegligencia\nDesastres naturales\n\nPara garantía:\n1. Contacta en periodo de cobertura\n2. Envía producto\n3. HomeLife repara o cambia\n4. Envío de retorno sin costo\n\nDocumentos necesarios:\nFactura original\nNúmero de serie\nDescripción del problema\n\n🔗 Garantía completa en sección Políticas.\n\n¿Necesitas activar garantía?',
    navigation: { link: '/politicas', label: 'Ver Garantía Completa' }
  },

  // ════════════════════════════════════════════════════════════════
  // SECCIÓN 11: GENERAL / MISCELÁNEA (4 FAQs)
  // ════════════════════════════════════════════════════════════════
  {
    id: 54,
    category: 'general',
    section: 'miscelánea',
    question: '¿Realizan envíos internacionales?',
    keywords: ['internacional', 'exterior', 'país', 'exportación', 'envío afuera', 'otro país'],
    answer: 'Envíos Internacionales:\n\nActualmente:\nHomeLife opera principalmente en Colombia.\n\nEnvíos al exterior:\nLimitados a ciertos países bajo solicitud especial.\n\nSi necesitas envío internacional:\n1. Contacta directamente\n2. Requiere:\n   Documentación aduanal\n   Costos adicionales\n   Tiempo mayor\n   Regulaciones de importación\n\nCosto típicamente:\n2-3x el envío nacional\nSeguro incluido\nGestión aduanal por tu cuenta\n\n🏪 Alternativas:\nBuscar distribuidor local en tu país\nComparar con importadores\nVerificar regulaciones locales\n\nPara solicitudes especiales, escribe a:\natencionalcliente@homelife.com.co\n\n¿De qué país escribes?',
    navigation: { link: '#chatbot-contact', label: 'Solicitar Info Internacional' }
  },
  {
    id: 55,
    category: 'general',
    section: 'miscelánea',
    question: '¿Hacen donaciones o apoyo social?',
    keywords: ['donación', 'caridad', 'social', 'responsabilidad', 'comunidad', 'apoyo'],
    answer: 'Responsabilidad Social de HomeLife:\n\nHomeLife está comprometida con la comunidad:\n\nIniciativas:\nPrograma de donaciones a entidades médicas\nDescuentos para instituciones sin ánimo de lucro\nApoyo a comunidades vulnerables\nEducación en salud preventiva\nInvestigación médica local\n\nBeneficiarios típicos:\nClínicas en zonas rurales\nFundaciones de salud\nProgramas de geriátricos\nInstituciones educativas médicas\nCentros de rehabilitación\n\nProceso para solicitar:\n1. Documentación legal de la institución\n2. Descripción del proyecto\n3. Número de beneficiarios\n4. Evaluación caso a caso\n5. Respuesta en 15 días máximo\n\nContacta:\nSocialmatters@homelife.com.co\n\n💡 Somos mejor empresa cuando ayudamos a nuestra comunidad.\n\n¿Tu institución necesita apoyo?',
    navigation: { link: '#chatbot-contact', label: 'Solicitar Apoyo Social' }
  },
  {
    id: 56,
    category: 'general',
    section: 'miscelánea',
    question: '¿HomeLife tiene aplicación móvil?',
    keywords: ['app', 'aplicación', 'móvil', 'descargar', 'iOS', 'Android', 'smartphone'],
    answer: 'Aplicación Móvil de HomeLife:\n\nEstado actual:\nNo tenemos app nativa en App Store/Play Store, PERO:\n\nTienda Web Responsiva:\nAccede desde ahí navegador en móvil\nOptimizada para teléfono\nFunciona en iOS y Android\nDescarga rápida (no app requerida)\n\nCaracterísticas en web móvil:\nCompra fácil\nHistorial de pedidos\nRastreo de envíos\nCliente persistente (login)\nNotificaciones push si deseas\n\nFuturo:\nEstamos considerando app nativa con:\nChatbot integrado\nNotificaciones reales\nSíncronis datos\nExperiencia optimizada\n\n💡 Consejo:\nGuarda la web en pantalla de inicio (funciona como app).\n\n¿Te gustaría una app nativa? Nos encantaría feedback.\n\n¿Necesitas tutorial para usar la web móvil?',
    navigation: { link: '/', label: 'Ir a HomeLife' }
  },
  {
    id: 57,
    category: 'general',
    section: 'miscelánea',
    question: '¿Cómo reporto un problema o dejo feedback?',
    keywords: ['problema', 'reporte', 'feedback', 'bug', 'sugerencia', 'mejora', 'queja'],
    answer: 'Centro de Reportes y Feedback:\n\nProblemas técnicos:\nEmail: soporte.tecnico@homelife.com.co\nWhatsApp: 305 2028019\nIncluye:\n  Descripción del problema\n  Pantalla/screenshot si es posible\n  Dispositivo y navegador\n  Pasos para reproducir\n\n💡 Sugerencias de mejora:\nEmail: feedback@homelife.com.co\nCuéntanos:\n  Qué te gustaría mejorar\n  Por qué es importante\n  Tu caso de uso\n\nQuejas sobre servicio:\nTeléfono: 305 2028019\nWhatsApp: 305 2028019\nDirección para quejas formales (si necesitas)\n\nTiempos de respuesta:\nProblemas críticos: 2 horas\nProblemas normales: 24 horas\nFeedback: 48 horas\n\nReconocimiento:nLos reportes útiles pueden recibir descuentos o reconocimiento.\n\n¿Tienes algo que reportar?',
    navigation: { link: '#chatbot-contact', label: 'Enviar Reporte' }
  }
];

// ════════════════════════════════════════════════════════════════
// CONSTANTES DE CONTACTO Y NAVEGACIÓN
// ════════════════════════════════════════════════════════════════

export const CONTACT_INFO = {
  whatsapp: '573052028019',
  phone: '305 2028019',
  email: 'atencionalcliente@homelife.com.co',
  address: 'Carrera 10 #72-66 Of. 302, Bogotá – Colombia',
  supportEmail: 'soporte.tecnico@homelife.com.co',
  feedbackEmail: 'feedback@homelife.com.co',
  socialEmail: 'socialmatters@homelife.com.co'
};

export const NAVIGATION_SECTIONS = [
  { id: 'home', label: 'Inicio', url: '/' },
  { id: 'productos', label: 'Productos', url: '/productos' },
  { id: 'blog', label: 'Blog', url: '/blog' },
  { id: 'nosotros', label: 'Nosotros', url: '/nosotros' },
  { id: 'distribuidores', label: 'Distribuidores', url: '/distribuidores' },
  { id: 'registra-equipo', label: 'Registra tu Equipo', url: '/registra-tu-equipo' },
  { id: 'cuenta', label: 'Mi Cuenta', url: '/cuenta' },
  { id: 'carrito', label: 'Carrito', url: '/carrito' },
  { id: 'faq', label: 'Preguntas Frecuentes', url: '/faq' }
];

export const CATEGORIES = {
  'empresa': ' Sobre HomeLife',
  'productos': ' Productos',
  'regulacion': ' Regulación & Seguridad',
  'uso': ' Uso & Características',
  'guía': '🎯 Guía de Usuarios',
  'compra': ' Compra & Pago',
  'garantia': ' Garantía & Soporte',
  'soporte': ' Contacto & Soporte',
  'cuenta': '👤 Cuenta & Autenticación',
  'mantenimiento': '🧹 Mantenimiento & Cuidado',
  'negocio': ' Negocios & Distribuidores',
  'registro': '✏️ Registro de Equipo',
  'contenido': ' Blog & Contenido',
  'legal': '⚖️ Políticas & Legal',
  'general': '❓ Preguntas Generales'
};
