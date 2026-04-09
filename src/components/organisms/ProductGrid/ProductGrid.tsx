import React from 'react';
import styles from './ProductGrid.module.css';
import { ProductCard } from '../../molecules/ProductCard/ProductCard';
import { Badge } from '../../atoms/Badge/Badge';

const DEMO_PRODUCTS = [
  {
    id: 1,
    title: 'Pro Controller X',
    category: 'Controllers',
    price: 89.99,
    originalPrice: 129.99,
    isNew: true,
    imageUrl: 'https://placehold.co/600x600/111/B7FF3C?text=PRO+X',
  },
  {
    id: 2,
    title: 'NimbleKeys TKL',
    category: 'Keyboards',
    price: 149.99,
    isNew: false,
    imageUrl: 'https://placehold.co/600x600/111/F5F5F5?text=TKL',
  },
  {
    id: 3,
    title: 'Stealth Mouse V2',
    category: 'Peripherals',
    price: 59.99,
    originalPrice: 79.99,
    isNew: false,
    imageUrl: 'https://placehold.co/600x600/111/A1A1A1?text=STEALTH',
  },
  {
    id: 4,
    title: 'HyperPad XXL',
    category: 'Accessories',
    price: 39.99,
    isNew: true,
    imageUrl: 'https://placehold.co/600x600/111/B7FF3C?text=XXL',
  },
];

interface ProductGridProps {
  title?: string;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title = 'Latest Gear',
  columns = 4,
}) => {
  const figmaMeta = JSON.stringify({
    component: 'ProductGrid',
    props: { title, columns },
  });

  return (
    <section className={styles.section} data-figma-meta={figmaMeta}>
      <div className={styles.sectionHeader}>
        <Badge variant="accent">Featured</Badge>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSub}>
          Curated high-performance gear for the competitive gamer.
        </p>
      </div>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {DEMO_PRODUCTS.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
};
