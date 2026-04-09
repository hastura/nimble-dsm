import { useState } from 'react';

export const useFigmaBridge = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToFigma = async (content: string): Promise<void> => {
    // Guarantee proper xmlns on SVG strings
    let svg = content.trim();
    if (svg.startsWith('<svg') && !svg.includes('xmlns=')) {
      svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const isSVG = svg.startsWith('<svg');

    const markCopied = () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    };

    // Strategy 1 — ClipboardItem with image/svg+xml (best Figma compatibility)
    if (typeof ClipboardItem !== 'undefined') {
      try {
        const items: Record<string, Blob> = {
          'text/plain': new Blob([svg], { type: 'text/plain' }),
        };
        if (isSVG) {
          items['image/svg+xml'] = new Blob([svg], { type: 'image/svg+xml' });
          items['text/html']     = new Blob([svg], { type: 'text/html' });
        }
        await navigator.clipboard.write([new ClipboardItem(items)]);
        markCopied();
        return;
      } catch {
        // fall through
      }
    }

    // Strategy 2 — plain text write
    try {
      await navigator.clipboard.writeText(svg);
      markCopied();
      return;
    } catch {
      // fall through
    }

    // Strategy 3 — legacy execCommand
    try {
      const ta = document.createElement('textarea');
      ta.value = svg;
      ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) { markCopied(); return; }
    } catch {
      // fall through
    }

    alert('Clipboard access denied. Please allow clipboard permissions in your browser.');
  };

  return { copyToFigma, isCopied };
};
