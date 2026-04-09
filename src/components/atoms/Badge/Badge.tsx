import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'outline' | 'dark';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'accent' }) => {
  const figmaMeta = JSON.stringify({
    component: "Badge",
    props: { variant, label: typeof children === 'string' ? children : 'Badge' }
  });

  return (
    <span className={`${styles.badge} ${styles[variant]}`} data-figma-meta={figmaMeta}>
      {children}
    </span>
  );
};
