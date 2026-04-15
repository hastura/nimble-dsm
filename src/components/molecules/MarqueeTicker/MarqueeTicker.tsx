import React from 'react';
import styles from './MarqueeTicker.module.css';

interface MarqueeTickerProps {
  text: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ text }) => {
  const figmaMeta = JSON.stringify({
    component: "MarqueeTicker",
    props: { text }
  });

  return (
    <div className={styles.tickerContainer} data-figma-meta={figmaMeta}>
      <div className={styles.tickerTrack}>
        {/* We repeat the text to create a seamless scrolling effect */}
        {[...Array(10)].map((_, i) => (
          <span key={i} className={styles.tickerItem}>
            {text} <span className={styles.separator}>///</span> {text} <span className={styles.separator}>///</span>
          </span>
        ))}
      </div>
    </div>
  );
};
