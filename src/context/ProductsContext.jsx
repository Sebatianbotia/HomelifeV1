/**
 * ProductsContext
 * Contexto global para manejar productos y categorías desde WooCommerce
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchProductos,
  fetchCategorias,
  fetchProductoDetalle,
  fetchProductosPorIds,
  fetchProductosPorCategoria,
} from '../services/woocommerceService';
import {
  adaptProduct,
  adaptProductDetalle,
  adaptCategories,
  adaptProducts,
} from '../utils/wcDataAdapter';

const ProductsContext = createContext();


export const useProducts = () => {
  const context = useContext(ProductsContext);
  
  // Si no hay contexto, retornar valores por defecto
  if (!context) {
    if (process.env.NODE_ENV === 'development') {
    }
    
    return {
      productos: [],
      categorias: [],
      loading: true,
      error: null,
      cargarProductos: async () => {},
      cargarCategorias: async () => {},
      obtenerProductoPorId: async () => null,
      obtenerProductosPorCategoria: async () => [],
      obtenerProductosPorIds: async () => [],
    };
  }
  
  return context;
};


export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productosCargados, setProductosCargados] = useState(false);
  const [categoriasCargadas, setCategoriasCargadas] = useState(false);


  const cargarCategorias = useCallback(async () => {
    if (categoriasCargadas) return; // Evitar cargar dos veces

    try {
      setError(null);
      const datosWc = await fetchCategorias();
      const categoriasAdaptadas = adaptCategories(datosWc);
      setCategorias(categoriasAdaptadas);
      setCategoriasCargadas(true);
    } catch (err) {
      setError(`Error cargando categorías: ${err.message}`);
    }
  }, [categoriasCargadas]);


  const cargarProductos = useCallback(async (page = 1, perPage = 100) => {
    if (productosCargados && page === 1) return; // Evitar recargar en primera página

    try {
      setError(null);
      setLoading(true);
      const datosWc = await fetchProductos(page, perPage);
      const productosAdaptados = adaptProducts(datosWc, categorias);
      setProductos(productosAdaptados);
      setProductosCargados(true);
    } catch (err) {
      setError(`Error cargando productos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [categorias, productosCargados]);

 
  const obtenerProductoPorId = useCallback(async (productId) => {
    try {
      setError(null);
      const datosWc = await fetchProductoDetalle(productId);
      return adaptProductDetalle(datosWc);
    } catch (err) {
      setError(`Error cargando producto: ${err.message}`);
      return null;
    }
  }, []);

  const obtenerProductosPorIds = useCallback(async (productIds) => {
    if (!productIds || productIds.length === 0) return [];

    try {
      setError(null);
      const datosWc = await fetchProductosPorIds(productIds);
      return adaptProducts(datosWc, categorias);
    } catch (err) {
      setError(`Error cargando productos relacionados: ${err.message}`);
      return [];
    }
  }, [categorias]);


  const obtenerProductosPorCategoria = useCallback(async (categoryId, page = 1, perPage = 100) => {
    try {
      setError(null);
      const datosWc = await fetchProductosPorCategoria(categoryId, page, perPage);
      return adaptProducts(datosWc, categorias);
    } catch (err) {
      setError(`Error cargando productos de categoría: ${err.message}`);
      return [];
    }
  }, [categorias]);


  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const datosCategoriasWc = await fetchCategorias();
        const categoriasAdaptadas = adaptCategories(datosCategoriasWc);
        setCategorias(categoriasAdaptadas);
        setCategoriasCargadas(true);

        const datosProductosWc = await fetchProductos(1, 100);
        const productosAdaptados = adaptProducts(datosProductosWc, categoriasAdaptadas);
        setProductos(productosAdaptados);
        setProductosCargados(true);

        setError(null);
      } catch (err) {
        setError(`Error cargando datos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const value = {
    productos,
    categorias,
    loading,
    error,
    cargarProductos,
    cargarCategorias,
    obtenerProductoPorId,
    obtenerProductosPorIds,
    obtenerProductosPorCategoria,
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
