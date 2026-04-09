import React from 'react';
import styles from './ProductCard.module.css';
import { PriceTag } from '../PriceTag/PriceTag';
import { Button } from '../../atoms/Button/Button';

interface ProductCardProps {
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  isNew?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  category, 
  price, 
  originalPrice, 
  imageUrl,
  isNew = false 
}) => {
  // Metadata for "Copy to Figma" Bridge
  const figmaMeta = JSON.stringify({
    component: "ProductCard",
    props: { title, category, price, isNew }
  });

  return (
    <div className={styles.card} data-figma-meta={figmaMeta}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl || 'https://placehold.co/600x600/111/white?text=Nimble+Gamer'} alt={title} className={styles.image} />
        {isNew && (
          <div className={styles.overlay}>
            <span className={styles.badge}>New Release</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <PriceTag price={price} originalPrice={originalPrice} />
        <Button variant="primary" fullWidth>Add to Cart</Button>
      </div>
    </div>
  );
};
