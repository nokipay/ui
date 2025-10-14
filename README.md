# NxPay UI

> A modern UI library for NxPay Web applications with a beautiful green-to-purple color palette

## Documentation

All documentation is available in the `docs/` folder:

- **[Design System](./docs/DESIGN_SYSTEM.md)** - Complete design system guide
- **[Installation Guide](./docs/INSTALLATION_GUIDE.md)** - Quick start guide
- **[Migration Guide](./docs/MIGRATION_GUIDE.md)** - Migrate from NokiPay to NxPay
- **[Project Setup](./docs/PROJECT_SETUP.md)** - Full project configuration
- **[Changelog](./docs/CHANGELOG.md)** - Version history
- **[NxPay README](./docs/README_NXPAY.md)** - Complete French documentation

## Quick Start

```bash
# Install
pnpm install

# Development
pnpm dev              # Playground (port 3000)
pnpm storybook        # Storybook (port 6006)

# Build
pnpm build            # Build module

# Tests
pnpm test             # Run tests
pnpm test:coverage    # With coverage
```

## NxPay Color Palette

NxPay uses 5 harmonious colors forming a green-to-purple gradient:

1. **Green** - `#77F07F` (Primary)
2. **Teal** - `#3FC995` (Secondary)
3. **Blue Turquoise** - `#40A0AE` (Tertiary)
4. **Blue** - `#37669C` (Quaternary)
5. **Purple** - `#3A2F6B` (Accent)

### Signature Gradient

```css
background: linear-gradient(135deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%);
```

## Installation

```bash
pnpm add @nxpay/ui
```

## Usage

```vue
<template>
  <NokiButton color="primary" label="Click me" />
</template>
```

## Project Structure

```
ui/
├── docs/                    # Documentation
├── src/
│   ├── module.ts           # Module definition
│   └── runtime/
│       ├── components/     # Vue components
│       ├── composables/    # Composables
│       ├── utils/          # Utilities & Design Tokens
│       └── assets/         # Assets
├── playground/             # Nuxt playground
├── stories/                # Storybook stories
└── tests/                  # Tests
```

## Scripts

### Development

- `pnpm dev` - Run playground
- `pnpm playground` - Playground only
- `pnpm storybook` - Run Storybook

### Build

- `pnpm build` - Build module
- `pnpm playground:build` - Build playground
- `pnpm storybook:build` - Build Storybook

### Tests

- `pnpm test` - Run tests
- `pnpm test:watch` - Watch mode
- `pnpm test:coverage` - With coverage
- `pnpm test:ui` - UI interface

### Code Quality

- `pnpm lint` - Lint code
- `pnpm lint:fix` - Fix linting
- `pnpm format` - Format code
- `pnpm format:check` - Check formatting

## Features

- TypeScript support
- Nuxt 3.15.4 compatible
- Tailwind CSS integration
- 55 color shades (5 palettes x 11 shades)
- Design tokens system
- Vitest for testing (70% coverage threshold)
- Storybook 7 for documentation
- ESLint + Prettier configured

## License

MIT © 2025 NxPay Team

## Repository

[https://github.com/nxpay/ui](https://github.com/nxpay/ui)

---

**Version:** 2.0.0  
**Built with:** Nuxt 3.15.4 + Vue 3.5 + TypeScript 5.7
