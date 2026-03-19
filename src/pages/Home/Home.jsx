import React from 'react';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import Carousel3D from '../../components/Carousel3D/Carousel3D';
import Stats from '../../components/Stats/Stats';
import ValueProposition from '../../components/ValueProposition/ValueProposition';
import PartnersCarousel from '../../components/PartnersCarousel/PartnersCarousel';
import Testimonials from '../../components/Testimonials/Testimonials';
import SocialCommunity from '../../components/SocialCommunity/SocialCommunity';
import DistributorCTA from '../../components/DistributorCTA/DistributorCTA';
import { products } from '../../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <HeroSlider />
      <div className="home-page">
        <section className="featured-products">
          <h2 className="section-title">Productos Destacados</h2>
          <Carousel3D items={featuredProducts} />
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