import React, { useState } from 'react';
import styles from './TypographyPage.module.css';

interface TypeStep {
  label: string;
  token: string;
  size: string;
  weight: string;
  font: string;
  sample: string;
  isUppercase?: boolean;
}

const TYPE_SCALE: TypeStep[] = [
  {
    label: 'Display',
    token: '--',
    size: '64px',
    weight: '900',
    font: 'Sora',
    sample: 'Nimble',
    isUppercase: true,
  },
  {
    label: 'Heading 1',
    token: '--',
    size: '32px',
    weight: '900',
    font: 'Sora',
    sample: 'Component Title',
    isUppercase: true,
  },
  {
    label: 'Heading 2',
    token: '--',
    size: '20px',
    weight: '700',
    font: 'Sora',
    sample: 'Section Heading',
    isUppercase: true,
  },
  {
    label: 'Body',
    token: '--nimble-font-body',
    size: '16px',
    weight: '400',
    font: 'Inter',
    sample: 'Regular body text for descriptions and supporting content.',
  },
  {
    label: 'Body Small',
    token: '--nimble-font-body',
    size: '14px',
    weight: '400',
    font: 'Inter',
    sample: 'Secondary information, captions, helper text.',
  },
  {
    label: 'Label',
    token: '--nimble-font-headline',
    size: '12px',
    weight: '700',
    font: 'Sora',
    sample: 'Component Label',
    isUppercase: true,
  },
  {
    label: 'Micro',
    token: '--nimble-font-headline',
    size: '10px',
    weight: '900',
    font: 'Sora',
    sample: 'Badge Text / Tag',
    isUppercase: true,
  },
];

const FONTS = [
  {
    name: 'Sora',
    role: 'Headline / Display',
    token: '--nimble-font-headline',
    weights: ['400', '700', '900'],
    desc: 'Used for all headings, labels, buttons, and brand moments. Geometric and commanding.',
  },
  {
    name: 'Inter',
    role: 'Body / UI',
    token: '--nimble-font-body',
    weights: ['400', '500', '700'],
    desc: 'Used for paragraphs, descriptions, and dense UI copy. Highly legible at small sizes.',
  },
];

const CopyToken: React.FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); } catch { /* */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button className={styles.tokenBtn} onClick={copy}>
      {copied ? '✓' : value}
    </button>
  );
};

export const TypographyPage: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>Typography</h1>
      <p className={styles.pageDesc}>
        Two typefaces power Nimble's voice: Sora for brand presence and hierarchy,
        Inter for readability in UI copy. All heading text is uppercase by convention.
      </p>
    </div>

    {/* Font families */}
    <div className={styles.block}>
      <div className={styles.blockLabel}>Font Families</div>
      <div className={styles.fontCards}>
        {FONTS.map((f) => (
          <div key={f.name} className={styles.fontCard}>
            <div className={styles.fontSample} style={{ fontFamily: f.name }}>
              Aa
            </div>
            <div className={styles.fontMeta}>
              <div className={styles.fontName}>{f.name}</div>
              <div className={styles.fontRole}>{f.role}</div>
              <CopyToken value={`var(${f.token})`} />
              <p className={styles.fontDesc}>{f.desc}</p>
              <div className={styles.weightRow}>
                {f.weights.map((w) => (
                  <span
                    key={w}
                    className={styles.weightChip}
                    style={{ fontFamily: f.name, fontWeight: w }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Type scale */}
    <div className={styles.block}>
      <div className={styles.blockLabel}>Type Scale</div>
      <div className={styles.scaleList}>
        {TYPE_SCALE.map((step) => (
          <div key={step.label} className={styles.scaleRow}>
            <div className={styles.scaleMeta}>
              <div className={styles.scaleLabel}>{step.label}</div>
              <div className={styles.scaleSpec}>
                {step.font} / {step.size} / {step.weight}
              </div>
            </div>
            <div
              className={styles.scaleSample}
              style={{
                fontFamily: step.font,
                fontSize: step.size,
                fontWeight: step.weight,
                textTransform: step.isUppercase ? 'uppercase' : 'none',
              }}
            >
              {step.sample}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
