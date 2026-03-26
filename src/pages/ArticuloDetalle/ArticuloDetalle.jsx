import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { adaptarPostParaReact } from '../../utils/wpBlogAdapter';
import { getArticuloDetalle } from '../../services/contentService';
import useSEO from '../../utils/useSEO';
import './ArticuloDetalle.css';

const ArticuloDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerProductosPorIds } = useProducts();
  const [post, setPost] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getArticuloDetalle(id);
        const adaptedPost = adaptarPostParaReact(data, []);
        setPost(adaptedPost);
        setError(null);

        // Fetch de productos relacionados si existen
        if (data.acf?.productos_relacionados && data.acf.productos_relacionados.length > 0) {
          try {
            const productos = await obtenerProductosPorIds(
              data.acf.productos_relacionados.slice(0, 4)
            );
            setRelatedProducts(productos);
          } catch (prodErr) {
          }
        }
      } catch (err) {
        setError(err.message);
        // Redirigir al blog después de 2 segundos si hay error
        setTimeout(() => navigate('/blog'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate, obtenerProductosPorIds]);

  // Estado de carga
  if (loading) {
    return (
      <div className="article-detail-page">
        <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <p>Cargando artículo...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error || !post) {
    return (
      <div className="article-detail-page">
        <div className="container" style={{ padding: '40px 20px', textAlign: 'center', color: '#ff6b6b' }}>
          <p>{error || 'No se pudo cargar el artículo'}</p>
          <p>Redirigiendo al blog...</p>
        </div>
      </div>
    );
  }

  const articleSeo = useSEO({
    title: post ? post.title : 'Artículo del Blog',
    description: post ? (post.excerpt || `Lee el artículo "${post.title}" en el blog de HomeLife sobre salud y equipos médicos.`) : '',
    canonical: `https://www.homelife.com.co/articulo/${id}`,
    image: post?.image,
  });

  return (
    <div className="article-detail-page">
      {articleSeo}
      <div className="container">
        <nav className="article-breadcrumb">
          <Link to="/blog">Blog</Link>
          <span className="separator">/</span>
          <span className="current">{post.category}</span>
        </nav>

        <article className="article-content">
          <header className="article-header">
            <span className="article-category">{post.category}</span>
            <h1 className="article-title">{post.title}</h1>
            <div className="article-meta">
              <span className="article-author">Por {post.author}</span>
              <span className="article-date">{post.date}</span>
              <span className="article-read-time">{post.readTime} min lectura</span>
            </div>
          </header>


          <div 
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Productos Relacionados */}
          {relatedProducts.length > 0 && (
            <section className="related-products-section">
              <h2 className="related-products-title">Productos Relacionados</h2>
              <div className="related-products-grid">
                {relatedProducts.map(product => (
                  <Link 
                    key={product.id} 
                    to={`/producto-detalle/${product.id}`}
                    className="related-product-card"
                  >
                    <div className="related-product-image">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.name} />
                      ) : (
                        <img src="/placeholder-product.png" alt={product.name} />
                      )}
                    </div>
                    <div className="related-product-content">
                      <h3 className="related-product-name">{product.name}</h3>
                      <p className="related-product-price">
                        ${product.price?.toLocaleString('es-CO') || 'N/A'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <footer className="article-footer">
            <div className="share-article">
              <span>Compartir:</span>
              <div className="share-links">
                {/* Simulated share buttons */}
                <button className="share-btn">FB</button>
                <button className="share-btn">TW</button>
                <button className="share-btn">WA</button>
              </div>
            </div>
            <Link to="/blog" className="back-to-blog">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver al Blog
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default ArticuloDetalle;
