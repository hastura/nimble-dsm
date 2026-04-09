import React, { useState } from 'react';
import styles from './ComponentDoc.module.css';

type ComponentType = 'Foundation' | 'Atom' | 'Molecule' | 'Organism';

interface ComponentDocProps {
  title: string;
  description: string;
  type?: ComponentType;
  code?: string;
  children: React.ReactNode;
}

export const ComponentDoc: React.FC<ComponentDocProps> = ({
  title,
  description,
  type,
  code,
  children,
}) => {
  const [jsxCopied, setJsxCopied] = useState(false);

  const handleCopyJSX = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.cssText = 'position:fixed;left:-9999px;';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setJsxCopied(true);
    setTimeout(() => setJsxCopied(false), 2000);
  };

  return (
    <section className={styles.section}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          {type && <span className={`${styles.typeBadge} ${styles[`type${type}`]}`}>{type}</span>}
        </div>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.divider} />

      {/* ── Interaction states ── */}
      <div className={styles.statesLabel}>Interaction States</div>
      <div className={styles.statesArea}>{children}</div>

      {/* ── Code block ── */}
      {code && (
        <div className={styles.codeWrapper}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLang}>JSX</span>
            <button
              className={`${styles.copyJSX} ${jsxCopied ? styles.copyJSXDone : ''}`}
              onClick={handleCopyJSX}
            >
              {jsxCopied ? '✓ Copied' : 'Copy JSX'}
            </button>
          </div>
          <pre className={styles.codeBlock}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </section>
  );
};
