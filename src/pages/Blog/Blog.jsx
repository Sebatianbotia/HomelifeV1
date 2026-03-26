import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../../utils/useSEO';
import './Blog.css';
import { adaptarPostParaReact } from '../../utils/wpBlogAdapter';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_WP_URL?.replace(/\/$/, '') || 'https://www.homelife.com.co';

        // Fetch de categorías y artículos en paralelo
        const [categoriesRes, articlesRes] = await Promise.all([
          fetch(`${baseUrl}/wp-json/wp/v2/categoria_react?_fields=id,name,count&hide_empty=true`),
          fetch(`${baseUrl}/wp-json/wp/v2/blog_react?_fields=id,date,title,excerpt,categoria_react,yoast_head_json,acf&per_page=10`)
        ]);

        if (!categoriesRes.ok || !articlesRes.ok) {
          throw new Error('Error al obtener datos de la API');
        }

        const categoriesData = await categoriesRes.json();
        const articlesData = await articlesRes.json();

        // Adaptar posts y establecer estados
        const adaptedPosts = articlesData.map(post => adaptarPostParaReact(post, categoriesData));
        setPosts(adaptedPosts);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Estado de carga
  if (loading) {
    return (
      <div className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <h1 className="blog-hero-title">Revista HomeLife</h1>
            <p className="blog-hero-subtitle">
              Noticias, consejos y guías sobre salud y tecnología médica para cuidar de ti y los tuyos.
            </p>
          </div>
        </section>
        <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <p>Cargando artículos...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error || posts.length === 0) {
    return (
      <div className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <h1 className="blog-hero-title">Revista HomeLife</h1>
            <p className="blog-hero-subtitle">
              Noticias, consejos y guías sobre salud y tecnología médica para cuidar de ti y los tuyos.
            </p>
          </div>
        </section>
        <div className="container" style={{ padding: '40px 20px', textAlign: 'center', color: '#ff6b6b' }}>
          <p>{error || 'No hay artículos disponibles'}</p>
        </div>
      </div>
    );
  }

  // Separar featured post del resto
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  const seo = useSEO({
    title: 'Blog de Salud | Revista HomeLife',
    description: 'Artículos, guías y consejos sobre salud, equipos médicos y tecnología para el bienestar de toda la familia. Escrito por expertos en salud.',
    canonical: 'https://www.homelife.com.co/blog',
  });

  return (
    <div className="blog-page">
      {seo}
      <section className="blog-hero">
        <div className="container">
          <h1 className="blog-hero-title">Revista HomeLife</h1>
          <p className="blog-hero-subtitle">
            Noticias, consejos y guías sobre salud y tecnología médica para cuidar de ti y los tuyos.
          </p>
        </div>
      </section>

      <div className="container blog-layout">
        <div className="blog-content">
          <main className="blog-main">
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
                <Link to={`/articulo/${featuredPost.id}`} className="read-more-btn">
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
              {recentPosts.map(post => (
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
                    <Link to={`/articulo/${post.id}`} className="read-more-link">
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
                {recentPosts.slice(0, 3).map(post => (
                  <Link key={post.id} to={`/articulo/${post.id}`} className="popular-post">
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
    </div>
  );
};

export default Blog;