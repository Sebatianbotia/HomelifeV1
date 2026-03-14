import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { allPosts } from '../../data/blogPosts';
import './ArticuloDetalle.css';

const ArticuloDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = allPosts.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);

  if (!post) return null;

  return (
    <div className="article-detail-page">
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

          <div className="article-hero-image">
            <img src={post.image} alt={post.title} />
          </div>

          <div 
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
