# Schemas

This directory owns schemas for folder-owned data and executable contracts.

The intent is to keep pure data separate from executable contracts:

- `meta.json` is JSON-safe ownership/index data.
- `index.tsx` is React implementation.
- `render.ts` is render-tree contract code.
- `figma.ts` is Figma export contract code.
- `source.md` is human-readable source/evidence.

Registries and catalogs should aggregate these files; they should not invent
new ownership data.

Files in this directory use two forms:

- `*.schema.json` describes JSON files.
- `*.schema.ts` describes TypeScript module contracts.
