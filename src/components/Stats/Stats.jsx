import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

const statsData = [
  { id: 1, value: 15, suffix: '+', label: 'Años de Experiencia', description: 'Líderes en el sector salud' },
  { id: 2, value: 50, suffix: 'K+', label: 'Clientes Satisfechos', description: 'Familias colombianas' },
  { id: 3, value: 40, suffix: '+', label: 'Productos Certificados', description: 'Con registro INVIMA' },
  { id: 4, value: 100, suffix: '%', label: 'Certificación INVIMA', description: 'Todos nuestros productos' },
];

const Stats = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounts();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounts = () => {
    statsData.forEach((stat, index) => {
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, stepTime);
    });
  };

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div key={stat.id} className="stat-item">
            <div className="stat-number">
              <span className="notranslate">{counts[index]}</span>
              <span className="stat-suffix notranslate">{stat.suffix}</span>
            </div>
            <h3 className="stat-label">{stat.label}</h3>
            <p className="stat-description">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;