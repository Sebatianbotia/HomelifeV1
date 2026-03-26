import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductoDetalle.css';

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isCartLoading } = useCart();
  const { obtenerProductoPorId, obtenerProductosPorIds, productos } = useProducts();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        setError(null);

        let productoDetalle = await obtenerProductoPorId(parseInt(id));
        
        if (!productoDetalle && productos.length > 0) {
          const productoLocal = productos.find(p => p.slug === id || p.id === id);
          if (productoLocal) {
            productoDetalle = await obtenerProductoPorId(parseInt(productoLocal.id));
          }
        }

        if (!productoDetalle) {
          setError('Producto no encontrado');
          setTimeout(() => navigate('/productos'), 2000);
          return;
        }

        setProduct(productoDetalle);
        setCurrentImageIndex(0);
        setQuantity(1);
        setActiveTab('specs');

        if (productoDetalle.relatedIds && productoDetalle.relatedIds.length > 0) {
          const relacionados = await obtenerProductosPorIds(productoDetalle.relatedIds.slice(0, 4));
          setRelatedProducts(relacionados);
        }
      } catch (err) {
        console.error('Error cargando producto:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id, navigate, obtenerProductoPorId, obtenerProductosPorIds, productos]);

  if (loading) {
    return (
      <div className="product-detail-loading">
        <h2>Cargando producto...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-loading">
        <h2>{error || 'Producto no encontrado'}</h2>
        <p>Redirigiendo...</p>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };


  const handleAddToCart = async () => {
    if (product.inStock) {
      const success = await addToCart(product.id, quantity, product);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      }
    }
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className="producto-detalle-page">
      <button 
        className="mobile-back-btn" 
        onClick={() => navigate('/productos')}
        aria-label="Volver a todos los productos"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Volver</span>
      </button>

      <div className="breadcrumb">
        <div className="container">
          <Link to="/">Inicio</Link>
          <span className="separator">›</span>
          <Link to="/productos">Productos</Link>
          <span className="separator">›</span>
          <span className="current">{product.name}</span>
        </div>
      </div>

      <section className="product-detail-section">
        <div className="product-detail-layout">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="main-image-container">
              <img
                src={product.images && product.images.length > 0 ? product.images[currentImageIndex] : ''}
                alt={product.name}
                className="main-image"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnails">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <div className="product-category-badge">{product.category}</div>
            <h1 className="product-detail-title">{product.name}</h1>

            {product.reviewCount > 0 && (
              <div className="product-detail-rating">
                <div className="rating-stars">
                  <div className="stars">
                    {'★'.repeat(Math.round(product.rating))}
                    {'☆'.repeat(5 - Math.round(product.rating))}
                  </div>
                  <span className="rating-value">{Number(product.rating).toFixed(1)}</span>
                </div>
                <span className="rating-count">({product.reviewCount} reseñas)</span>
              </div>
            )}

            <div className="product-detail-pricing">
              <div className="price-row">
                <div className="detail-current-price">{formatPrice(product.price)}</div>
                {product.originalPrice > product.price && (
                  <>
                    <div className="detail-original-price">{formatPrice(product.originalPrice)}</div>
                    <div className="detail-discount-badge">-{product.discount}%</div>
                  </>
                )}
              </div>
              {savings > 0 && (
                <div className="detail-savings">
                  Ahorras {formatPrice(savings)}
                </div>
              )}
            </div>

            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={decreaseQuantity} disabled={quantity <= 1}>−</button>
                <div className="quantity-value">{quantity}</div>
                <button className="quantity-btn" onClick={increaseQuantity} disabled={quantity >= product.stock}>+</button>
              </div>
              <button
                className={`add-to-cart-btn-large ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={!product.inStock || isCartLoading}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {isCartLoading ? 'Agregando...' : addedToCart ? '¡Agregado! ✓' : product.inStock ? 'Agregar al Carrito' : 'Agotado'}
              </button>
            </div>

            <div className="cod-notice" role="note" aria-label="Aviso de pago contraentrega">
              Pago contraentrega solo aplica en Bogotá
            </div>

            <div 
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.fullDescription }}
            />

            {product.techSheetPdf && (
              <div className="product-techsheet">
                <h3 className="features-title" style={{ marginTop: '20px' }}>Ficha técnica</h3>
                <a className="techsheet-btn" href={`/${product.techSheetPdf}`} target="_blank" rel="noopener noreferrer">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Descargar ficha técnica (PDF)
                </a>
                <p className="techsheet-note">Documento informativo del producto.</p>
              </div>
            )}



            <div className="product-features">
              <h3 className="features-title">Características Principales</h3>
              <ul className="features-list">
                {product.features && product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-tabs">
              <div className="tabs-nav">
                <button
                  className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Especificaciones
                </button>
                <button
                  className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Envío y Entrega
                </button>
                <button
                  className={`tab-btn ${activeTab === 'warranty' ? 'active' : ''}`}
                  onClick={() => setActiveTab('warranty')}
                >
                  Garantía
                </button>
              </div>

              {activeTab === 'specs' && (
                <div className="tab-content active">
                  <table className="specifications-table">
                    <tbody>
                      {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="tab-content active">
                  <h3 style={{ marginBottom: '20px' }}>Información de Envío</h3>
                  <ul className="features-list">
                    <li>Envío estándar: $15.000</li>

                    <li>Tiempo de entrega: 24-48 horas en Bogotá</li>
                    <li>Envíos a todo Colombia: 3-5 días hábiles</li>
                    <li>Rastreo en tiempo real incluido</li>
                  </ul>
                </div>
              )}

              {activeTab === 'warranty' && (
                <div className="tab-content active">
                  <h3 style={{ marginBottom: '20px' }}>Garantía Extendida</h3>
                  <ul className="features-list">
                    <li>2 años de garantía extendida</li>
                    <li>Servicio técnico especializado</li>
                    <li>30 días para cambios y devoluciones</li>
                    <li>Mantenimiento preventivo incluido</li>
                    <li>Soporte técnico 24/7</li>
                    <li>Certificación INVIMA vigente</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="related-products-container">
            <h2 className="related-title">Productos Relacionados</h2>
            <div className="products-grid">
              {relatedProducts.map(relProduct => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductoDetalle;