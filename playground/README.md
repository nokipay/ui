# 🎨 NxPay UI Playground

Interactive playground to test and visualize all NxPay UI v3 components.

## 🚀 Quick Start

```bash
# From the ui root directory
cd playground

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

The playground will be available at `http://localhost:3000`

## 📂 Structure

```
playground/
├── pages/
│   ├── index.vue              # Home page with overview
│   ├── fintech-v3.vue         # Phase 1: Fintech components
│   ├── loading-empty.vue      # Phase 2: Loading & Empty states
│   ├── modals-alerts.vue      # Phase 2: Modals & Alerts
│   ├── ui-components.vue      # Phase 2: UI components
│   ├── forms-v3.vue           # Phase 3: Forms
│   ├── tables-v3.vue          # Phase 3: Tables
│   └── polish.vue             # Phase 4: Polish components
├── app.vue                    # App layout with navigation
└── nuxt.config.ts            # Nuxt configuration
```

## 🎯 Pages Overview

### Phase 1: Fintech Core (`/fintech-v3`)
- **AmountDisplay** - Formatted amount display with precision
- **FormCurrencyInput** - Currency input with validation
- **TransactionStatusBadge** - Transaction status badges
- **WalletBalance** - Wallet balance display
- **FeeCalculator** - Fee calculation (fixed, %, tiered)
- **Money Class Demo** - BigInt precision demonstration

### Phase 2: Loading & Empty (`/loading-empty`)
- **LoadingSpinner** - Animated spinners
- **LoadingOverlay** - Full-screen loading overlay
- **Skeleton** - Skeleton loaders
- **EmptyState** - Empty state component
- **NoData** - Simple no data message

### Phase 2: Modals & Alerts (`/modals-alerts`)
- **Modal** - Modal dialogs
- **ConfirmDialog** - Confirmation dialogs
- **Alert** - Alert messages
- **Notification** - Toast notifications

### Phase 2: UI Components (`/ui-components`)
- **Dropdown** - Dropdown menus
- **Tabs** - Tabbed navigation
- **Tooltip** - Hover tooltips
- **Avatar** - User avatars
- **AvatarGroup** - Avatar groups
- **Card** - Generic cards
- **CardStats** - Statistics cards

### Phase 3: Forms V3 (`/forms-v3`)
- **FormTextarea** - Textarea with character count
- **FormSelect** - Styled select dropdown
- **FormCheckbox** - Checkbox inputs
- **FormRadio** - Radio buttons
- **FormSwitch** - Toggle switches
- **Complete Form** - All form components together

### Phase 3: Tables V3 (`/tables-v3`)
- **TableSearch** - Search input with debounce
- **TablePagination** - Pagination component
- **Complete Table** - Table with search, sort, pagination
- **usePagination** - Pagination composable demo

### Phase 4: Polish (`/polish`)
- **Badge** - Badges with variants
- **Divider** - Horizontal/vertical dividers
- **ProgressBar** - Progress bars
- **Breadcrumb** - Navigation breadcrumbs
- **Chip** - Chips/tags
- **Stepper** - Step indicators

## 🎨 Features

### Interactive Examples
Every component page includes:
- Multiple variant examples
- Size demonstrations
- Color options
- Interactive controls
- Live code examples

### Real-Time Testing
- Modify props in real-time
- Test different states
- Experiment with combinations
- See immediate results

### Complete Scenarios
- Full form examples
- Complete table with sorting
- Multi-step stepper flows
- Modal workflows

## 🛠️ Development

### Hot Module Replacement
The playground uses Nuxt 3's HMR - changes to components are reflected instantly.

### Adding New Examples

1. Create or edit a page in `pages/`
2. Import components from `../src/runtime/components/`
3. Add interactive examples
4. Update navigation in `app.vue` if needed

Example:
```vue
<template>
  <div>
    <AmountDisplay :amount="1234.56" currency="EUR" />
  </div>
</template>
```

### Component Auto-Import
All NxPay UI components are auto-imported. No need for manual imports!

## 📦 Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🎯 Navigation

The playground includes a sticky header with navigation to all component pages:

- **Home** - Overview and quick start
- **Fintech V3** - Financial components
- **Loading** - Loading states
- **Modals** - Modals and alerts
- **UI** - UI components
- **Forms V3** - Form inputs
- **Tables V3** - Table components
- **Polish** - Final polish components
- **Old** - Legacy v2 components

## 💡 Tips

### Testing Components
1. Navigate to the component page
2. Interact with examples
3. Check different variants
4. Test edge cases

### Debugging
- Open browser DevTools
- Check console for logs
- Use Vue DevTools extension
- Inspect component props

### Performance
- Lazy-loaded pages
- Optimized builds
- Tree-shakeable imports
- Fast HMR

## 🔗 Links

- [Main Documentation](../README.md)
- [Migration Guide](../MIGRATION_COMPLETE.md)
- [Architecture](../ARCHITECTURE_OPTIMALE_V3.md)
- [GitHub](https://github.com/nxpay/ui)

## ⚡ Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Linting
pnpm lint             # Lint code
pnpm lint:fix         # Fix linting issues

# Type checking
pnpm typecheck        # Check TypeScript types
```

## 🎉 Enjoy!

The playground is your sandbox to explore, test, and understand all NxPay UI components.

**Happy coding!** 🚀

