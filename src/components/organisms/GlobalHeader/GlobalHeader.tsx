import React from 'react';
import styles from './GlobalHeader.module.css';
import { Button } from '../../atoms/Button/Button';

export const GlobalHeader: React.FC = () => {
  // Metadata for "Copy to Figma" Bridge
  const figmaMeta = JSON.stringify({
    component: "GlobalHeader"
  });

  return (
    <header className={styles.header} data-figma-meta={figmaMeta}>
      <a href="/" className={styles.logo}>
        NIMBLE<span>.</span>
      </a>

      <nav className={styles.nav}>
        <a href="#" className={styles.navItem}>Shop</a>
        <a href="#" className={styles.navItem}>Collections</a>
        <a href="#" className={styles.navItem}>Story</a>
        <a href="#" className={styles.navItem}>Contact</a>
      </nav>

      <div className={styles.actions}>
        <Button variant="secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>Search</Button>
        <Button variant="primary" style={{ padding: '8px 16px', fontSize: '12px' }}>Cart (0)</Button>
      </div>
    </header>
  );
};
