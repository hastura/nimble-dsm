import React from 'react';
import styles from './PriceTag.module.css';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({ 
  price, 
  originalPrice, 
  currency = '$' 
}) => {
  // Metadata for "Copy to Figma" Bridge
  const figmaMeta = JSON.stringify({
    component: "PriceTag",
    props: { price, originalPrice, currency }
  });

  return (
    <div className={styles.priceTag} data-figma-meta={figmaMeta}>
      <span className={styles.current}>{currency}{price.toFixed(2)}</span>
      {originalPrice && (
        <span className={styles.original}>{currency}{originalPrice.toFixed(2)}</span>
      )}
    </div>
  );
};
