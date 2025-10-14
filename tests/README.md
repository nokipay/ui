# Tests NxPay UI

Ce dossier contient tous les tests unitaires pour la bibliothèque NxPay UI.

---

## Structure des Tests

```
tests/
├── setup.ts                      # Configuration globale
├── README.md                     # Ce fichier
├── components/                   # Tests composants Vue
│   ├── Badge.spec.ts
│   ├── Button.spec.ts
│   ├── Card.spec.ts
│   ├── Confirm.spec.ts
│   ├── Form.spec.ts
│   └── Table.spec.ts
├── composables/                  # Tests composables
│   └── useCurrencyFormat.spec.ts
├── utils/                        # Tests utilitaires
│   ├── designTokens.spec.ts
│   ├── constants/
│   │   └── buttonStyles.spec.ts
│   └── helpers/
│       └── numberFormatter.spec.ts
└── assets/                       # Tests assets
    └── colors.spec.ts
```

---

## Lancer les Tests

### Tous les tests

```bash
pnpm test
```

### Mode watch

```bash
pnpm test:watch
```

### Avec coverage

```bash
pnpm test:coverage
```

### Interface UI

```bash
pnpm test:ui
```

---

## Coverage Requis

Minimum 70% de coverage sur :

- Lines
- Functions
- Branches
- Statements

---

## Écrire un Test

### Template de base

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../../src/runtime/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(MyComponent, {
      props: {
        title: 'Test',
      },
    })
    expect(wrapper.text()).toContain('Test')
  })
})
```

### Pour les composables

```typescript
import { describe, it, expect } from 'vitest'
import { useMyComposable } from '../../src/runtime/composables/useMyComposable'

describe('useMyComposable', () => {
  it('returns expected values', () => {
    const { value, method } = useMyComposable()
    expect(value).toBeDefined()
    expect(typeof method).toBe('function')
  })
})
```

---

## Tests Créés

### Composants (6 fichiers)

- Badge.spec.ts - Badge component
- Button.spec.ts - Button avec toutes les couleurs
- Card.spec.ts - Card avec stats
- Confirm.spec.ts - Modal confirm
- Form.spec.ts - FormWrapper + FormAuth
- Table.spec.ts - Table, ElementByPage, PaginationInfo

### Composables (1 fichier)

- useCurrencyFormat.spec.ts - Formatage FCFA complet

### Utils (3 fichiers)

- designTokens.spec.ts - Tous les design tokens
- buttonStyles.spec.ts - Styles de boutons
- numberFormatter.spec.ts - Formatage nombres

### Assets (1 fichier)

- colors.spec.ts - Système de couleurs

**Total : 11 fichiers de tests**

---

## Convention de Nommage

- Fichiers tests : `*.spec.ts`
- Même structure que `src/runtime/`
- Un fichier de test par composant/composable/util

---

## Stubs Utilisés

Pour les composants Nuxt UI (@nuxt/ui) :

```typescript
global: {
  stubs: {
    UIcon: true,
    UModal: true,
    UCard: true,
    UAlert: true,
    UTooltip: { template: '<div><slot /></div>' }
  }
}
```

---

## Prochains Tests à Ajouter

- InitData.spec.ts
- NetworkStatus.spec.ts
- Preloader.spec.ts
- Header.spec.ts
- FileUploader.spec.ts
- useApi.spec.ts
- useCustomConfirm.spec.ts
- useUTableFilter.spec.ts

---

**Coverage Actuel :** À calculer avec `pnpm test:coverage`  
**Objectif :** 70% minimum
