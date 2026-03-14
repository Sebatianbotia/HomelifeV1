import React, { useState, useMemo } from 'react';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Productos.css';

const Productos = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'todas') {
      filtered = filtered.filter(p => p.categorySlug === selectedCategory);
    }

    if (priceRange.min !== '') {
      filtered = filtered.filter(p => p.price >= Number(priceRange.min));
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(p => p.price <= Number(priceRange.max));
    }

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: value }));
  };

  const applyPriceFilter = () => {
    setPriceRange({ ...priceRange });
  };

  const clearFilters = () => {
    setSelectedCategory('todas');
    setPriceRange({ min: '', max: '' });
    setSortBy('featured');
  };

  return (
    <div className="productos-page">
      <div className="productos-container">
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filtros</h3>
            <button className="clear-filters" onClick={clearFilters}>
              Limpiar todo
            </button>
          </div>

          <div className="filter-group">
            <h4>Categorías</h4>
            <ul className="category-list">
              <li
                className={selectedCategory === 'todas' ? 'active' : ''}
                onClick={() => handleCategoryClick('todas')}
              >
                Todas las categorías
                <span className="count">{products.length}</span>
              </li>
              {categories.map(cat => (
                <li
                  key={cat.id}
                  className={selectedCategory === cat.id ? 'active' : ''}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.name}
                  <span className="count">{cat.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h4>Rango de precio</h4>
            <div className="price-range">
              <div className="price-inputs">
                <div className="price-field">
                  <span>$</span>
                  <input
                    type="number"
                    name="min"
                    placeholder="Mín"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                  />
                </div>
                <span className="separator">-</span>
                <div className="price-field">
                  <span>$</span>
                  <input
                    type="number"
                    name="max"
                    placeholder="Máx"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
              <button className="apply-price" onClick={applyPriceFilter}>
                Aplicar
              </button>
            </div>
          </div>
        </aside>

        <main className="products-main">
          <div className="products-toolbar">
            <p className="results-count">
              Mostrando <strong>{filteredProducts.length}</strong> productos
            </p>
            <div className="sort-control">
              <label htmlFor="sort">Ordenar por:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name-asc">Nombre: A-Z</option>
                <option value="name-desc">Nombre: Z-A</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="no-products">No se encontraron productos</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Productos;