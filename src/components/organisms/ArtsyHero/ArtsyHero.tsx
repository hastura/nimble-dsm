import React from 'react';
import styles from './ArtsyHero.module.css';
import { Button } from '../../atoms/Button/Button';

interface ArtsyHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  imageUrl?: string;
}

export const ArtsyHero: React.FC<ArtsyHeroProps> = ({ 
  title, 
  subtitle, 
  ctaText, 
  imageUrl 
}) => {
  const figmaMeta = JSON.stringify({
    component: "ArtsyHero",
    props: { title, subtitle, ctaText }
  });

  return (
    <section className={styles.hero} data-figma-meta={figmaMeta}>
      <div 
        className={styles.imageLayer} 
        style={{ backgroundImage: `url(${imageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070'})` }}
      ></div>
      <div className={styles.content}>
        <div className={styles.accentLine}></div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Button variant="primary">{ctaText}</Button>
          <Button variant="secondary">Explore Story</Button>
        </div>
      </div>
    </section>
  );
};
