# NxPay UI v2.0

A modern UI library for NxPay Web applications with a beautiful green-to-purple color palette.

---

## Quick Start

```bash
# Install
pnpm add @nxpay/ui

# Use
<template>
  <NokiButton color="primary" label="Click me" />
</template>
```

---

## Documentation

All documentation is in the `docs/` folder:

- **[Documentation Index](./docs/INDEX.md)** - Table of contents
- **[Installation Guide](./docs/INSTALLATION_GUIDE.md)** - Get started
- **[Design System](./docs/DESIGN_SYSTEM.md)** - Complete design guide
- **[Migration Guide](./docs/MIGRATION_GUIDE.md)** - Migrate from NokiPay
- **[Project Setup](./docs/PROJECT_SETUP.md)** - Technical configuration

---

## NxPay Colors

5 harmonious colors forming a green-to-purple gradient:

```
1. #77F07F  Green (Primary)
2. #3FC995  Teal (Secondary)
3. #40A0AE  Blue Turquoise (Tertiary)
4. #37669C  Blue (Quaternary)
5. #3A2F6B  Purple (Accent)
```

Signature gradient:

```css
background: linear-gradient(135deg, #77f07f 0%, #3fc995 50%, #40a0ae 100%);
```

---

## Development

```bash
# Install dependencies
pnpm install

# Development
pnpm dev              # Playground (port 3000)
pnpm storybook        # Storybook (port 6006)

# Build
pnpm build            # Build module

# Tests
pnpm test             # Run tests
pnpm test:coverage    # With coverage

# Code quality
pnpm lint             # Lint
pnpm format           # Format
```

---

## Project Structure

```
ui/
├── docs/                    # All documentation
├── src/runtime/             # Source code
│   ├── components/          # Vue components
│   ├── composables/         # Composables
│   ├── utils/               # Utils & Design Tokens
│   └── assets/              # Assets
├── playground/              # Nuxt playground (3 pages)
├── stories/                 # Storybook stories
└── tests/                   # Vitest tests
```

---

## Features

- TypeScript support
- Nuxt 3.15.4 compatible
- Tailwind CSS integration (88 colors)
- Design tokens system
- Vitest testing (70% coverage)
- Storybook 7 documentation
- ESLint + Prettier
- Interactive playground

---

## License

MIT © 2025 NxPay Team

---

## Repository

[https://github.com/nxpay/ui](https://github.com/nxpay/ui)

---

Version: 2.0.0  
Built with: Nuxt 3.15.4 + Vue 3.5 + TypeScript 5.7
