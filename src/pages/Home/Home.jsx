import React, { useMemo } from 'react';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import Carousel3D from '../../components/Carousel3D/Carousel3D';
import Stats from '../../components/Stats/Stats';
import ValueProposition from '../../components/ValueProposition/ValueProposition';
import PartnersCarousel from '../../components/PartnersCarousel/PartnersCarousel';
import Testimonials from '../../components/Testimonials/Testimonials';
import SocialCommunity from '../../components/SocialCommunity/SocialCommunity';
import DistributorCTA from '../../components/DistributorCTA/DistributorCTA';
import { useProducts } from '../../context/ProductsContext';
import './Home.css';

const Home = () => {
  const { productos, loading } = useProducts();

  // Filtrar productos destacados (primeros 6)
  const featuredProducts = useMemo(() => {
    return productos.slice(0, 6);
  }, [productos]);

  return (
    <>
      <HeroSlider />
      <div className="home-page">
        <section className="featured-products">
          <h2 className="section-title">Productos Destacados</h2>
          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px' }}>Cargando productos...</p>
          ) : (
            <Carousel3D items={featuredProducts} />
          )}
        </section>
      </div>
      <Stats />
      <ValueProposition />
      <PartnersCarousel />
      <Testimonials />
      <SocialCommunity />
      <DistributorCTA />
    </>
  );
};

export default Home;