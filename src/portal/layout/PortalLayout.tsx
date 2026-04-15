import React from 'react';
import styles from './PortalLayout.module.css';

interface PortalLayoutProps {
  children: React.ReactNode;
  activeItem: string;
  onNavigate: (item: string) => void;
}

const NAV: Record<string, string[]> = {
  Foundations: ['Colors', 'Typography', 'Spacing'],
  Atoms:       ['Button', 'Input', 'Badge'],
  Molecules:   ['PriceTag', 'ProductCard', 'MarqueeTicker'],
  Organisms:   ['GlobalHeader', 'ProductGrid', 'ArtsyHero', 'ManifestoSection', 'CategoryGrid', 'FooterSection'],
};

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  children,
  activeItem,
  onNavigate,
}) => (
  <div className={styles.container}>
    {/* ── Sidebar ── */}
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        NIMBLE<span className={styles.dot}>.</span>DS
      </div>
      <div className={styles.version}>v0.1.0</div>

      <nav className={styles.nav}>
        {Object.entries(NAV).map(([group, items]) => (
          <div key={group} className={styles.navGroup}>
            <div className={styles.groupLabel}>{group}</div>
            {items.map((item) => (
              <button
                key={item}
                className={`${styles.navItem} ${activeItem === item ? styles.active : ''}`}
                onClick={() => onNavigate(item)}
              >
                {activeItem === item && <span className={styles.activeBar} />}
                {item}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <span className={styles.footerText}>Figma Bridge enabled</span>
        <span className={styles.footerDot} />
      </div>
    </aside>

    {/* ── Main content ── */}
    <main className={styles.main}>{children}</main>
  </div>
);
