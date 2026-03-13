import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

// Datos mock de artículos
const featuredPost = {
  id: 1,
  title: 'Cómo controlar la presión arterial en casa',
  excerpt: 'Aprende las mejores técnicas y recomendaciones de nuestros expertos para medir tu presión arterial correctamente y llevar un registro diario.',
  image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
  category: 'Salud Cardiovascular',
  date: '15 Mar 2025',
  author: 'Dra. Ana López',
  readTime: 5,
};

const posts = [
  {
    id: 2,
    title: 'Oxímetros de pulso: guía completa de uso',
    excerpt: 'Descubre cómo funcionan, cuándo usarlos y qué significan los números en tu oxímetro.',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&h=400&fit=crop',
    category: 'Tecnología Médica',
    date: '10 Mar 2025',
    author: 'Dr. Carlos Méndez',
    readTime: 4,
  },
  {
    id: 3,
    title: 'Beneficios del monitoreo continuo de glucosa',
    excerpt: 'Para personas con diabetes, los glucómetros modernos ofrecen precisión y comodidad. Te contamos las novedades.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop',
    category: 'Diabetes',
    date: '5 Mar 2025',
    author: 'Lic. Marta Suárez',
    readTime: 6,
  },
  {
    id: 4,
    title: 'Nebulizadores vs inhaladores: ¿cuál elegir?',
    excerpt: 'Comparativa completa para que sepas qué dispositivo es mejor según la condición respiratoria.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop',
    category: 'Salud Respiratoria',
    date: '28 Feb 2025',
    author: 'Dr. Pedro Ramírez',
    readTime: 7,
  },
  {
    id: 5,
    title: 'Termómetros infrarrojos: mitos y realidades',
    excerpt: 'Resolvemos las dudas más frecuentes sobre la precisión y uso de los termómetros sin contacto.',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&h=400&fit=crop',
    category: 'Tecnología Médica',
    date: '20 Feb 2025',
    author: 'Dra. Laura Gómez',
    readTime: 3,
  },
  {
    id: 6,
    title: 'Consejos para cuidar tu tensiómetro',
    excerpt: 'Alarga la vida de tu equipo con estos sencillos pasos de mantenimiento y calibración.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&h=400&fit=crop',
    category: 'Consejos',
    date: '15 Feb 2025',
    author: 'Ing. Javier Torres',
    readTime: 4,
  },
];

const categories = [
  { name: 'Salud Cardiovascular', count: 8 },
  { name: 'Tecnología Médica', count: 12 },
  { name: 'Diabetes', count: 6 },
  { name: 'Salud Respiratoria', count: 5 },
  { name: 'Consejos', count: 9 },
  { name: 'Noticias', count: 4 },
];

const Blog = () => {
  return (
    <div className="blog-page">
      {/* Hero del Blog */}
      <section className="blog-hero">
        <div className="container">
          <h1 className="blog-hero-title">Revista HomeLife</h1>
          <p className="blog-hero-subtitle">
            Noticias, consejos y guías sobre salud y tecnología médica para cuidar de ti y los tuyos.
          </p>
        </div>
      </section>

      <div className="container blog-layout">
        {/* Contenido principal */}
        <main className="blog-main">
          {/* Artículo destacado */}
          <article className="featured-post">
            <div className="featured-post-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <span className="post-category">{featuredPost.category}</span>
            </div>
            <div className="featured-post-content">
              <h2 className="featured-post-title">{featuredPost.title}</h2>
              <p className="featured-post-excerpt">{featuredPost.excerpt}</p>
              <div className="post-meta">
                <span className="post-date">{featuredPost.date}</span>
                <span className="post-author">Por {featuredPost.author}</span>
                <span className="post-read-time">{featuredPost.readTime} min lectura</span>
              </div>
              <Link to={`/blog/${featuredPost.id}`} className="read-more-btn">
                Leer artículo completo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>

          {/* Grid de artículos recientes */}
          <h2 className="section-title">Artículos recientes</h2>
          <div className="posts-grid">
            {posts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-card-image">
                  <img src={post.image} alt={post.title} />
                  <span className="post-category">{post.category}</span>
                </div>
                <div className="post-card-content">
                  <h3 className="post-card-title">{post.title}</h3>
                  <p className="post-card-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span className="post-read-time">{post.readTime} min</span>
                  </div>
                  <Link to={`/blog/${post.id}`} className="read-more-link">
                    Leer más
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          <div className="sidebar-widget search-widget">
            <h3 className="widget-title">Buscar</h3>
            <div className="search-box">
              <input type="text" placeholder="Buscar artículos..." />
              <button>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>
          </div>

          <div className="sidebar-widget categories-widget">
            <h3 className="widget-title">Categorías</h3>
            <ul className="category-list">
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link to={`/blog/categoria/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {cat.name}
                    <span className="category-count">{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-widget popular-widget">
            <h3 className="widget-title">Artículos populares</h3>
            <div className="popular-posts">
              {posts.slice(0, 3).map(post => (
                <Link key={post.id} to={`/blog/${post.id}`} className="popular-post">
                  <img src={post.image} alt={post.title} />
                  <div>
                    <h4>{post.title}</h4>
                    <span>{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blog;