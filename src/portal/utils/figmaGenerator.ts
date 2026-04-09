/**
 * Nimble Figma SVG Generator
 * Converts a DOM element subtree to pixel-perfect SVG for Figma clipboard paste.
 *
 * Walks the DOM recursively, emitting flat SVG primitives (rect, image, text)
 * with absolute coordinates relative to the root element's bounding box.
 */

function applyTextTransform(text: string, transform: string): string {
  switch (transform) {
    case 'uppercase':   return text.toUpperCase();
    case 'lowercase':   return text.toLowerCase();
    case 'capitalize':  return text.replace(/\b\w/g, (c) => c.toUpperCase());
    default:            return text;
  }
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isTransparent(color: string): boolean {
  return color === 'transparent' || color === 'rgba(0, 0, 0, 0)';
}

export const generateFigmaSVG = (rootElement: HTMLElement): string => {
  const rootRect = rootElement.getBoundingClientRect();
  const W = rootRect.width;
  const H = rootRect.height;

  if (W === 0 || H === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg"/>`;
  }

  const parts: string[] = [];

  const processNode = (el: HTMLElement): void => {
    const rect = el.getBoundingClientRect();
    const cs   = window.getComputedStyle(el);

    const x = +(rect.left - rootRect.left).toFixed(2);
    const y = +(rect.top  - rootRect.top ).toFixed(2);
    const w = +rect.width .toFixed(2);
    const h = +rect.height.toFixed(2);

    if (w <= 0 || h <= 0) return;

    // ── Background + uniform border (rect) ────────────────────────
    const bg    = cs.backgroundColor;
    const hasBg = !isTransparent(bg);
    const rx    = parseFloat(cs.borderRadius) || 0;

    // Check all 4 border widths to decide whether to use rect stroke
    const btw = parseFloat(cs.borderTopWidth)    || 0;
    const brw = parseFloat(cs.borderRightWidth)  || 0;
    const bbw = parseFloat(cs.borderBottomWidth) || 0;
    const blw = parseFloat(cs.borderLeftWidth)   || 0;

    // Uniform border → use rect stroke (covers Button, Badge secondary, etc.)
    const uniformBorder =
      btw > 0 && btw === brw && btw === bbw && btw === blw &&
      cs.borderTopStyle !== 'none';

    if (hasBg || uniformBorder) {
      const fill        = hasBg ? escapeXML(bg) : 'none';
      const strokeAttrs = uniformBorder
        ? ` stroke="${escapeXML(cs.borderTopColor)}" stroke-width="${btw}"`
        : '';
      parts.push(
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${strokeAttrs}/>`
      );
    }

    // ── Asymmetric borders as individual SVG lines ─────────────────
    // (handles Input underline: border-bottom only)
    if (!uniformBorder) {
      type BorderSide = { w: number; style: string; color: string; x1: number; y1: number; x2: number; y2: number };
      const sides: BorderSide[] = [
        { w: btw, style: cs.borderTopStyle,    color: cs.borderTopColor,    x1: x,   y1: y,   x2: x+w, y2: y   },
        { w: brw, style: cs.borderRightStyle,  color: cs.borderRightColor,  x1: x+w, y1: y,   x2: x+w, y2: y+h },
        { w: bbw, style: cs.borderBottomStyle, color: cs.borderBottomColor, x1: x,   y1: y+h, x2: x+w, y2: y+h },
        { w: blw, style: cs.borderLeftStyle,   color: cs.borderLeftColor,   x1: x,   y1: y,   x2: x,   y2: y+h },
      ];
      sides.forEach(({ w: sw, style, color, x1, y1, x2, y2 }) => {
        if (sw > 0 && style !== 'none') {
          parts.push(
            `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${escapeXML(color)}" stroke-width="${sw}"/>`
          );
        }
      });
    }

    // ── Image ──────────────────────────────────────────────────────
    if (el instanceof HTMLImageElement && el.src) {
      parts.push(
        `<image x="${x}" y="${y}" width="${w}" height="${h}" href="${el.src}" preserveAspectRatio="xMidYMid slice"/>`
      );
      return; // <img> has no meaningful children
    }

    // ── Direct text nodes only (not aggregated from children) ──────
    const directText = Array.from(el.childNodes)
      .filter(
        (n) => n.nodeType === Node.TEXT_NODE && (n.textContent?.trim() ?? '').length > 0
      )
      .map((n) => n.textContent ?? '')
      .join('')
      .trim();

    if (directText) {
      const displayText    = applyTextTransform(directText, cs.textTransform);
      const color          = cs.color;
      const fontSize       = parseFloat(cs.fontSize);
      const fontWeight     = cs.fontWeight;
      const fontFamily     = cs.fontFamily.replace(/"/g, "'");
      const letterSpacing  = parseFloat(cs.letterSpacing) || 0;
      const isStrike       = cs.textDecorationLine.includes('line-through');

      // Horizontal alignment → SVG text-anchor
      let anchor = 'start';
      let tx     = x;
      if (cs.textAlign === 'center') {
        anchor = 'middle';
        tx     = x + w / 2;
      } else if (cs.textAlign === 'right' || cs.textAlign === 'end') {
        anchor = 'end';
        tx     = x + w;
      }

      const ty         = y + h / 2;
      const decoAttr   = isStrike ? ' text-decoration="line-through"' : '';

      parts.push(
        `<text x="${tx.toFixed(2)}" y="${ty.toFixed(2)}" dy=".35em"` +
          ` fill="${escapeXML(color)}"` +
          ` font-family="${escapeXML(fontFamily)}"` +
          ` font-size="${fontSize}"` +
          ` font-weight="${fontWeight}"` +
          ` letter-spacing="${letterSpacing}"` +
          ` text-anchor="${anchor}"${decoAttr}>${escapeXML(displayText)}</text>`
      );
    }

    // ── Recurse into child elements ────────────────────────────────
    Array.from(el.children).forEach((child) => {
      if (child instanceof HTMLElement) processNode(child);
    });
  };

  processNode(rootElement);

  return (
    `<svg width="${W.toFixed(2)}" height="${H.toFixed(2)}"` +
    ` viewBox="0 0 ${W.toFixed(2)} ${H.toFixed(2)}"` +
    ` xmlns="http://www.w3.org/2000/svg">` +
    parts.join('') +
    `</svg>`
  );
};
