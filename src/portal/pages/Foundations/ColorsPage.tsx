import React, { useState } from 'react';
import styles from './ColorsPage.module.css';

interface ColorSwatch {
  name: string;
  token: string;
  hex: string;
  textDark?: boolean;
}

const COLORS: ColorSwatch[] = [
  { name: 'Black',    token: '--nimble-black',    hex: '#000000' },
  { name: 'Charcoal', token: '--nimble-charcoal', hex: '#111111' },
  { name: 'White',    token: '--nimble-white',    hex: '#F5F5F5', textDark: true },
  { name: 'Gray',     token: '--nimble-gray',     hex: '#A1A1A1' },
  { name: 'Accent',   token: '--nimble-accent',   hex: '#B7FF3C', textDark: true },
  { name: 'Error',    token: '--nimble-error',     hex: '#FF4D4D' },
];

const Swatch: React.FC<ColorSwatch> = ({ name, token, hex, textDark }) => {
  const [status, setStatus] = useState<'idle' | 'copied'>('idle');

  const copy = async (value: string) => {
    try { await navigator.clipboard.writeText(value); }
    catch { /* ignore */ }
    setStatus('copied');
    setTimeout(() => setStatus('idle'), 1800);
  };

  return (
    <div className={styles.swatch} onClick={() => copy(hex)}>
      <div
        className={styles.swatchColor}
        style={{
          background: hex,
          border: hex === '#000000' ? '1px solid #333' : 'none',
        }}
      >
        <span className={`${styles.copyHint} ${textDark ? styles.copyHintDark : ''}`}>
          {status === 'copied' ? '✓ Copied!' : 'Click to copy'}
        </span>
      </div>
      <div className={styles.swatchInfo}>
        <div className={styles.swatchHex}>{hex}</div>
        <div className={styles.swatchName}>{name}</div>
        <button
          className={styles.tokenBtn}
          onClick={(e) => { e.stopPropagation(); copy(`var(${token})`); }}
          title="Copy CSS variable"
        >
          {token}
        </button>
      </div>
    </div>
  );
};

export const ColorsPage: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>Colors</h1>
      <p className={styles.pageDesc}>
        Nimble's color system centers on a high-contrast dark palette with a single
        high-energy neon accent. Click any swatch to copy the hex value, or click
        the token name to copy the CSS variable.
      </p>
    </div>

    <div className={styles.swatchGrid}>
      {COLORS.map((c) => <Swatch key={c.token} {...c} />)}
    </div>

    <div className={styles.usageTable}>
      <div className={styles.usageHeader}>Usage Guidelines</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Hex</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>--nimble-black</td>    <td>#000000</td><td>Page background, darkest surfaces</td></tr>
          <tr><td>--nimble-charcoal</td> <td>#111111</td><td>Card backgrounds, sidebar, elevated surfaces</td></tr>
          <tr><td>--nimble-white</td>    <td>#F5F5F5</td><td>Primary text, high-emphasis content</td></tr>
          <tr><td>--nimble-gray</td>     <td>#A1A1A1</td><td>Secondary text, labels, muted content</td></tr>
          <tr><td>--nimble-accent</td>   <td>#B7FF3C</td><td>CTAs, highlights, active states, brand moments</td></tr>
          <tr><td>--nimble-error</td>    <td>#FF4D4D</td><td>Error states, destructive actions</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);
