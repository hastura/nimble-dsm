import React, { useState } from 'react';
import styles from './SpacingPage.module.css';

interface SpacingStep {
  label: string;
  token: string;
  px: number;
}

const SPACING: SpacingStep[] = [
  { label: 'XS',  token: '--nimble-space-xs',  px: 4  },
  { label: 'SM',  token: '--nimble-space-sm',  px: 8  },
  { label: 'MD',  token: '--nimble-space-md',  px: 16 },
  { label: 'LG',  token: '--nimble-space-lg',  px: 24 },
  { label: 'XL',  token: '--nimble-space-xl',  px: 32 },
  { label: 'XXL', token: '--nimble-space-xxl', px: 64 },
];

const SpacingRow: React.FC<SpacingStep> = ({ label, token, px }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(`var(${token})`); } catch { /* */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.row} onClick={copy} title={`Click to copy var(${token})`}>
      <div className={styles.rowMeta}>
        <span className={styles.rowLabel}>{label}</span>
        <span className={styles.rowPx}>{px}px</span>
        <span className={styles.rowToken}>{copied ? '✓ Copied!' : `var(${token})`}</span>
      </div>
      <div className={styles.rowViz}>
        <div
          className={styles.vizBar}
          style={{ width: `${Math.min(px * 5, 600)}px` }}
        />
        <div
          className={styles.vizSquare}
          style={{ width: `${px}px`, height: `${px}px` }}
        />
      </div>
    </div>
  );
};

export const SpacingPage: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>Spacing</h1>
      <p className={styles.pageDesc}>
        Nimble's spacing scale is a fixed set of tokens based on a 4px grid.
        Use CSS variables to stay consistent across all components.
        Click any row to copy the token.
      </p>
    </div>

    <div className={styles.block}>
      <div className={styles.blockLabel}>Spacing Scale</div>
      <div className={styles.scaleList}>
        {SPACING.map((s) => <SpacingRow key={s.token} {...s} />)}
      </div>
    </div>

    <div className={styles.block}>
      <div className={styles.blockLabel}>Usage Guidelines</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Common Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>--nimble-space-xs</td>  <td>4px</td>  <td>Icon gaps, tight padding, badge inner spacing</td></tr>
          <tr><td>--nimble-space-sm</td>  <td>8px</td>  <td>Input padding, small gaps, button icon gap</td></tr>
          <tr><td>--nimble-space-md</td>  <td>16px</td> <td>Card padding, form field gaps, content rhythm</td></tr>
          <tr><td>--nimble-space-lg</td>  <td>24px</td> <td>Section padding, card content, header padding</td></tr>
          <tr><td>--nimble-space-xl</td>  <td>32px</td> <td>Button horizontal padding, large section gaps</td></tr>
          <tr><td>--nimble-space-xxl</td> <td>64px</td> <td>Page padding, hero sections, major layout gaps</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);
