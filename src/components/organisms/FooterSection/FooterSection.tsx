import React from 'react';
import styles from './FooterSection.module.css';

export const FooterSection: React.FC = () => {
  const figmaMeta = JSON.stringify({
    component: "FooterSection"
  });

  return (
    <footer className={styles.footer} data-figma-meta={figmaMeta}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          
          <div className={styles.brandingCol}>
            <h4 className={styles.logoTitle}>
              NIMBLE<br />
              <span className={styles.outlineText}>REBELS_</span>
            </h4>
            
            <div className={styles.newsletterInput}>
              <input 
                type="email" 
                placeholder="JOIN_THE_MOVEMENT" 
                className={styles.inputField} 
              />
              <button className={styles.submitBtn}>→</button>
            </div>
          </div>

          <div className={styles.linksCol}>
            <div className={styles.linkGroup}>
              <span className={styles.groupLabel}>CATALOG_</span>
              <a href="#" className={styles.link}>HOODIES</a>
              <a href="#" className={styles.link}>BOTTOMS</a>
              <a href="#" className={styles.link}>ACCESSORIES</a>
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.groupLabel}>INFO_</span>
              <a href="#" className={styles.link}>SHIPPING</a>
              <a href="#" className={styles.link}>SIZING</a>
              <a href="#" className={styles.link}>CONTACT</a>
            </div>
          </div>

        </div>

        <div className={styles.bottomBar}>
          <span>©2024 NIMBLE GAMER // REBELS_OS_DIV</span>
          <div className={styles.metaInfo}>
             <span>JAKARTA_HQ</span>
             <span>EST_2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
