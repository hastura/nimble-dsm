import React from 'react';
import styles from './CategoryGrid.module.css';

interface CategoryItem {
  id: string;
  title: string;
  index: number;
  imageUrl: string;
}

interface CategoryGridProps {
  categories: CategoryItem[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  const figmaMeta = JSON.stringify({
    component: "CategoryGrid",
    props: { categoriesCount: categories.length }
  });

  return (
    <section className={styles.gridSection} data-figma-meta={figmaMeta}>
      <div className={styles.gridContainer}>
        {categories.map((cat, idx) => (
          <div key={cat.id} className={`${styles.card} ${idx !== 2 ? styles.borderRight : ''}`}>
            <div className={styles.cardForeground}>
              <span className={styles.indexLabel}>0{cat.index}</span>
              <h2 className={styles.title}>{cat.title}</h2>
              
              <div className={styles.bottomRow}>
                <button className={styles.exploreBtn}>EXPLORE</button>
                <div className={styles.iconBox}>
                  +
                </div>
              </div>
            </div>
            
            <div className={styles.imageBackground}>
              <img src={cat.imageUrl} alt={cat.title} className={styles.image} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
