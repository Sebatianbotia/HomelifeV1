export const featuredPost = {
  id: 1,
  title: 'Cómo controlar la presión arterial en casa',
  excerpt: 'Aprende las mejores técnicas y recomendaciones de nuestros expertos para medir tu presión arterial correctamente y llevar un registro diario.',
  image: '/articulosImages/Articulo1.png',
  category: 'Salud Cardiovascular',
  date: '15 Mar 2025',
  author: 'Dra. Ana López',
  readTime: 5,
  content: `
    <h3>La importancia del monitoreo en casa</h3>
    <p>Controlar la presión arterial en casa es fundamental para prevenir complicaciones cardiovasculares. Los médicos recomiendan realizar mediciones periódicas para detectar cualquier anomalía a tiempo.</p>
    
    <h3>Técnica correcta de medición</h3>
    <p>Para obtener resultados precisos, es vital seguir estos pasos:</p>
    <ul>
      <li>Estar relajado y sentado al menos 5 minutos antes.</li>
      <li>Tener el brazo apoyado a la altura del corazón.</li>
      <li>No haber fumado ni tomado café 30 minutos antes.</li>
      <li>Mantener los pies apoyados en el suelo, sin cruzar las piernas.</li>
    </ul>

    <h3>¿Qué significan los valores?</h3>
    <p>Una presión arterial normal suele estar por debajo de 120/80 mmHg. Valores superiores de forma constante pueden indicar hipertensión y requieren consulta médica.</p>
  `
};

export const blogPosts = [
  {
    id: 2,
    title: 'Oxímetros de pulso: guía completa de uso',
    excerpt: 'Descubre cómo funcionan, cuándo usarlos y qué significan los números en tu oxímetro.',
    image: '/articulosImages/Articulo2.jpeg',
    category: 'Tecnología Médica',
    date: '10 Mar 2025',
    author: 'Dr. Carlos Méndez',
    readTime: 4,
    content: `
      <p>El oxímetro de pulso se ha convertido en una herramienta esencial en los hogares. Permite medir el nivel de saturación de oxígeno en la sangre de manera rápida y no invasiva.</p>
      <h3>Cómo usarlo correctamente</h3>
      <p>Asegúrate de que tus uñas no tengan esmalte y que tus manos estén calientes. Coloca el dispositivo en el dedo índice o medio y espera a que la lectura sea estable.</p>
    `
  },
  {
    id: 3,
    title: 'Beneficios del monitoreo continuo de glucosa',
    excerpt: 'Para personas con diabetes, los glucómetros modernos ofrecen precisión y comodidad. Te contamos las novedades.',
    image: '/articulosImages/Articulo3.jpeg',
    category: 'Diabetes',
    date: '5 Mar 2025',
    author: 'Lic. Marta Suárez',
    readTime: 6,
    content: `
      <p>La tecnología ha avanzado permitiendo que el control de la glucosa sea menos doloroso y mucho más preciso. Los nuevos dispositivos permiten llevar un registro histórico en el celular.</p>
    `
  },
  {
    id: 4,
    title: 'Nebulizadores vs inhaladores: ¿cuál elegir?',
    excerpt: 'Comparativa completa para que sepas qué dispositivo es mejor según la condición respiratoria.',
    image: '/articulosImages/Articulo4.jpeg',
    category: 'Salud Respiratoria',
    date: '28 Feb 2025',
    author: 'Dr. Pedro Ramírez',
    readTime: 7,
    content: `
      <p>Dependiendo de la edad del paciente y la severidad de la afección, el uso de un nebulizador puede ser más efectivo que un inhalador convencional, especialmente en niños pequeños.</p>
    `
  },
  {
    id: 5,
    title: 'Termómetros infrarrojos: mitos y realidades',
    excerpt: 'Resolvemos las dudas más frecuentes sobre la precisión y uso de los termómetros sin contacto.',
    image: '/articulosImages/Articulo5.jpeg',
    category: 'Tecnología Médica',
    date: '20 Feb 2025',
    author: 'Dra. Laura Gómez',
    readTime: 3,
    content: `
      <p>Los termómetros infrarrojos son seguros y eficientes si se usan a la distancia correcta recomendada por el fabricante.</p>
    `
  },
  {
    id: 6,
    title: 'Consejos para cuidar tu tensiómetro',
    excerpt: 'Alarga la vida de tu equipo con estos sencillos pasos de mantenimiento y calibración.',
    image: '/articulosImages/Articulo6.jpeg',
    category: 'Consejos',
    date: '15 Feb 2025',
    author: 'Ing. Javier Torres',
    readTime: 4,
    content: `
      <p>Evita doblar excesivamente el brazalete y guárdalo en un lugar fresco y seco. Recuerda calibrar tu equipo al menos una vez al año.</p>
    `
  },
];

export const allPosts = [featuredPost, ...blogPosts];
