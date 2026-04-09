import React, { useRef, useState } from 'react';
import styles from './InstancePreview.module.css';
import { useFigmaBridge } from '../context/useFigmaBridge';
import { generateFigmaSVG } from '../utils/figmaGenerator';

interface InstancePreviewProps {
  children: React.ReactElement;
  /** State label shown below the component cell, e.g. "Default", "Hover" */
  stateLabel?: string;
  /** Human-readable component name for aria-label */
  name?: string;
}

export const InstancePreview: React.FC<InstancePreviewProps> = ({
  children,
  stateLabel,
  name,
}) => {
  const { copyToFigma } = useFigmaBridge();
  const [status, setStatus] = useState<'idle' | 'copied'>('idle');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!wrapperRef.current) return;

    const target = wrapperRef.current.querySelector<HTMLElement>('[data-figma-meta]');
    if (!target) {
      console.warn('[Nimble] No [data-figma-meta] found inside InstancePreview');
      return;
    }

    const svg = generateFigmaSVG(target);
    await copyToFigma(svg);
    setStatus('copied');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className={styles.cell}>
      <div
        className={`${styles.preview} ${status === 'copied' ? styles.previewCopied : ''}`}
        ref={wrapperRef}
      >
        {/* Component rendered here */}
        <div className={styles.content}>{children}</div>

        {/* Copy button — visible on wrapper hover */}
        <button
          className={`${styles.copyBtn} ${status === 'copied' ? styles.copyBtnCopied : ''}`}
          onClick={handleCopy}
          aria-label={`Copy ${name ?? stateLabel ?? 'component'} to Figma`}
        >
          {status === 'copied' ? '✓ Copied!' : 'Copy to Figma'}
        </button>
      </div>

      {stateLabel && <div className={styles.stateLabel}>{stateLabel}</div>}
    </div>
  );
};
