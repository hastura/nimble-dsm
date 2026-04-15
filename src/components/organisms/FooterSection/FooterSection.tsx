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
            <div className={styles.logoTitle} aria-label="NIMBLE REBELS_">
              <svg height="1em" viewBox="0 0 360 90" style={{ overflow: 'visible', display: 'block', marginBottom: '10px' }}>
                <text 
                  x="0" y="75" 
                  fontFamily="var(--nimble-font-headline, 'Inter', sans-serif)" 
                  fontSize="85" 
                  fontWeight="900" 
                  fontStyle="italic"
                  letterSpacing="-0.05em"
                  fill="var(--nimble-black, #000)"
                >
                  NIMBLE
                </text>
              </svg>
              <svg height="1em" viewBox="0 0 420 90" style={{ overflow: 'visible', display: 'block' }}>
                <text 
                  x="0" y="75" 
                  fontFamily="var(--nimble-font-headline, 'Inter', sans-serif)" 
                  fontSize="85" 
                  fontWeight="900" 
                  fontStyle="italic"
                  letterSpacing="-0.05em"
                  style={{ paintOrder: 'stroke fill' }}
                  fill="var(--nimble-white, #fff)" 
                  stroke="black" 
                  strokeWidth="2px"
                >
                  REBELS_
                </text>
              </svg>
            </div>
            
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
