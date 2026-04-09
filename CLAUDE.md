# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR (Vite)
npm run build     # Type-check (tsc -b) then build for production
npm run lint      # Run ESLint on all files
npm run preview   # Preview production build locally
```

No test framework is configured.

## Architecture

**nimble-web** is a React 19 + TypeScript + Vite design system documentation portal for the "Nimble" gaming/tech design system. Its primary purpose is to showcase UI components and enable a bidirectional design-to-code workflow with Figma via a custom clipboard bridge.

### Key directories

```
src/
├── components/          # Reusable UI components (atomic design)
│   ├── atoms/           # Button, Badge, Input
│   ├── molecules/       # ProductCard, PriceTag
│   └── organisms/       # GlobalHeader, ArtsyHero
├── portal/              # Documentation portal UI
│   ├── layout/          # PortalLayout (two-column sidebar + main)
│   ├── components/      # ComponentDoc, InstancePreview wrappers
│   ├── context/         # useFigmaBridge hook (clipboard integration)
│   └── utils/           # figmaGenerator.ts (DOM → Figma SVG)
└── tokens/              # Design tokens as JSON (colors, spacing, typography)
```

### Routing

`App.tsx` uses a simple `useState`-based switch (no router library). `activeItem` state determines which component documentation page is shown.

### Styling

Pure **CSS Modules** only — no Tailwind, no CSS-in-JS. Design tokens are defined in `/src/index.css` as CSS variables (e.g. `--nimble-accent: #B7FF3C`) and mirrored as JSON in `src/tokens/`.

### Figma integration

Components embed `data-figma-meta` attributes with JSON describing their component type and props. The portal's "Copy to Figma" buttons use:
- `useFigmaBridge` (`src/portal/context/useFigmaBridge.ts`) — clipboard bridge with three fallback strategies
- `figmaGenerator.ts` (`src/portal/utils/figmaGenerator.ts`) — converts DOM elements to Figma-compatible SVG

### Component conventions

- Each component lives in its own directory with a `.tsx` and `.module.css` file
- Components accept a `pseudoState` prop (e.g. `"hover"`, `"active"`, `"disabled"`) to render state variants without CSS pseudo-classes — used by `InstancePreview` for documentation
- Atomic design hierarchy: atoms → molecules → organisms

### Toolchain notes

- **Vite 8** with Oxc parser via `@vitejs/plugin-react`
- **React Compiler** enabled via `babel-plugin-react-compiler` (may affect build performance)
- **ESLint 9** flat config (`eslint.config.js`)
- **TypeScript 6** strict mode with `noUnusedLocals` and `noUnusedParameters` enforced
