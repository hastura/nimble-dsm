import React from 'react';
import styles from './ManifestoSection.module.css';

interface ManifestoSectionProps {
  headline: React.ReactNode;
  body: string;
  imageUrl?: string;
  ctaText?: string;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({ 
  headline, 
  body, 
  imageUrl = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80",
  ctaText = "Read Our Story"
}) => {
  const figmaMeta = JSON.stringify({
    component: "ManifestoSection"
  });

  return (
    <section className={styles.manifesto} data-figma-meta={figmaMeta}>
      <div className={styles.grid}>
        <div className={styles.textContent}>
          <div className={styles.label}>
            <div className={styles.labelLine}></div>
            <span>Manifesto</span>
          </div>
          
          <h2 className={styles.headline}>
            {headline}
          </h2>
          
          <p className={styles.body}>
            {body}
          </p>
          
          <button className={styles.ctaButton}>
            <span className={styles.ctaText}>{ctaText}</span>
            <div className={styles.ctaIconBox}>
              →
            </div>
          </button>
        </div>

        <div className={styles.imageContainer}>
           <div className={styles.imageWrapper}>
              <img 
                src={imageUrl}
                className={styles.image}
                alt="Manifesto Lifestyle"
              />
           </div>
           <div className={styles.accentCorner}></div>
        </div>
      </div>
    </section>
  );
};
