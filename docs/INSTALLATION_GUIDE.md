# 🚀 Guide d'Installation et Démarrage - NxPay UI v2.0

## ⚡ Installation Rapide

### 1. Installer les Dépendances

```bash
cd ui
pnpm install
```

> **Note :** Cela installera toutes les dépendances incluant Nuxt 3.15.4, Vitest, Storybook 7, Tailwind CSS, ESLint, et Prettier.

---

## 🎯 Démarrer les Outils

### Option A : Playground Nuxt (Recommandé pour tester les composants)

```bash
pnpm dev
# ou
pnpm playground
```

**Accès :** http://localhost:3000

**Pages disponibles :**

- `/` - Page d'accueil avec palette de couleurs
- `/components` - Démo des composants
- `/design-tokens` - Tokens de design

---

### Option B : Storybook (Documentation visuelle)

```bash
pnpm storybook
```

**Accès :** http://localhost:6006

**Features :**

- Documentation auto-générée
- Interface interactive
- 3 backgrounds (light, dark, gradient NxPay)
- Contrôles pour tester les props

---

### Option C : Tests Vitest

```bash
# Tests simples
pnpm test

# Avec coverage
pnpm test:coverage

# Mode watch
pnpm test:watch

# Interface UI
pnpm test:ui
```

---

## 📊 Vérification de l'Installation

### 1. Build du Module

```bash
pnpm build
```

**Résultat attendu :**

```
✓ Built in XX seconds
dist/
  ├── module.mjs
  ├── module.cjs
  └── types.d.ts
```

### 2. Linter

```bash
pnpm lint
```

**Résultat attendu :** Aucune erreur

### 3. Formater le Code

```bash
pnpm format
```

**Résultat attendu :** Code formatté avec Prettier

---

## 🎨 Tester les Couleurs NxPay

### Dans le Playground

1. Démarrez le playground : `pnpm dev`
2. Ouvrez http://localhost:3000
3. Vous devriez voir :
   - Hero avec le gradient NxPay (vert → teal → bleu turquoise)
   - 5 cartes de couleurs
   - Statistiques du projet

### Dans Storybook

1. Démarrez Storybook : `pnpm storybook`
2. Ouvrez http://localhost:6006
3. Naviguez vers `Components > Button`
4. Testez tous les variants de couleurs

---

## 🛠️ Scripts Disponibles

### Développement

| Script            | Description         | Port |
| ----------------- | ------------------- | ---- |
| `pnpm dev`        | Playground + Module | 3000 |
| `pnpm playground` | Playground seul     | 3000 |
| `pnpm storybook`  | Storybook           | 6006 |

### Build

| Script                  | Description      |
| ----------------------- | ---------------- |
| `pnpm build`            | Build module     |
| `pnpm playground:build` | Build playground |
| `pnpm storybook:build`  | Build Storybook  |

### Tests

| Script               | Description     |
| -------------------- | --------------- |
| `pnpm test`          | Tests unitaires |
| `pnpm test:watch`    | Mode watch      |
| `pnpm test:coverage` | Avec coverage   |
| `pnpm test:ui`       | Interface UI    |

### Qualité

| Script              | Description     |
| ------------------- | --------------- |
| `pnpm lint`         | Linter ESLint   |
| `pnpm lint:fix`     | Fix automatique |
| `pnpm format`       | Prettier        |
| `pnpm format:check` | Vérifier format |

---

## 📁 Fichiers de Configuration Créés

### Configuration Principale

- ✅ `package.json` - Dépendances mises à jour
- ✅ `tsconfig.json` - TypeScript
- ✅ `build.config.ts` - Build

### Tests

- ✅ `vitest.config.ts` - Vitest + Coverage
- ✅ `tests/setup.ts` - Setup global

### Storybook

- ✅ `.storybook/main.ts` - Config principale
- ✅ `.storybook/preview.ts` - Preview
- ✅ `stories/Introduction.stories.mdx` - Page intro
- ✅ `src/runtime/components/Button/Button.stories.ts` - Exemple

### Playground

- ✅ `playground/nuxt.config.ts` - Config Nuxt
- ✅ `playground/tailwind.config.ts` - Tailwind
- ✅ `playground/assets/css/tailwind.css` - CSS custom
- ✅ `playground/app.vue` - Layout
- ✅ `playground/pages/index.vue` - Accueil
- ✅ `playground/pages/components.vue` - Composants
- ✅ `playground/pages/design-tokens.vue` - Tokens

### Qualité du Code

- ✅ `eslint.config.mjs` - ESLint
- ✅ `.prettierrc` - Prettier
- ✅ `.prettierignore` - Exclusions

---

## 🎯 Prochaines Étapes

### 1. Écrire des Tests

Créez un fichier `tests/Button.spec.ts` :

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NokiButton from '@/components/Button/index.vue'

describe('NokiButton', () => {
  it('affiche le label correctement', () => {
    const wrapper = mount(NokiButton, {
      props: { label: 'Test' },
    })
    expect(wrapper.text()).toContain('Test')
  })

  it('applique la couleur primary', () => {
    const wrapper = mount(NokiButton, {
      props: { label: 'Test', color: 'primary' },
    })
    expect(wrapper.classes()).toContain('bg-nxGreen-500')
  })
})
```

Exécutez :

```bash
pnpm test
```

### 2. Créer des Stories

Créez `src/runtime/components/Badge/Badge.stories.ts` :

```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import NokiBadge from './index.vue'

const meta: Meta<typeof NokiBadge> = {
  title: 'Components/Badge',
  component: NokiBadge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NokiBadge>

export const Default: Story = {
  args: {
    label: 'Badge',
  },
}
```

### 3. Développer de Nouveaux Composants

```bash
# 1. Créer le composant
mkdir src/runtime/components/MyComponent
touch src/runtime/components/MyComponent/index.vue

# 2. Créer la story
touch src/runtime/components/MyComponent/MyComponent.stories.ts

# 3. Créer le test
touch tests/MyComponent.spec.ts

# 4. Tester dans le playground
# Ajoutez-le dans playground/pages/components.vue
```

---

## ✅ Checklist Post-Installation

- [ ] `pnpm install` réussi
- [ ] `pnpm build` réussi
- [ ] `pnpm dev` démarre sur port 3000
- [ ] `pnpm storybook` démarre sur port 6006
- [ ] `pnpm test` exécute les tests
- [ ] `pnpm lint` sans erreurs
- [ ] Playground affiche les couleurs NxPay
- [ ] Storybook affiche les boutons

---

## 🐛 Dépannage

### Erreur : Module not found

```bash
# Nettoyer et réinstaller
rm -rf node_modules .nuxt dist
pnpm install
```

### Erreur : Port déjà utilisé

```bash
# Changer le port dans playground/nuxt.config.ts
devServer: {
  port: 3001  // Au lieu de 3000
}
```

### Erreur de build

```bash
# Nettoyer le cache
rm -rf .nuxt dist
pnpm build
```

### Tests qui échouent

```bash
# Vérifier la config
cat vitest.config.ts

# Lancer en mode verbose
pnpm test --reporter=verbose
```

---

## 📞 Support

Pour toute question :

1. Consultez `PROJECT_SETUP.md` pour la config complète
2. Lisez `DESIGN_SYSTEM.md` pour le design
3. Voir `MIGRATION_GUIDE.md` si vous migrez

---

## 🎉 C'est Parti !

Votre environnement de développement NxPay UI est **prêt** !

Commencez par :

```bash
# 1. Lancer le playground
pnpm dev

# 2. Ouvrir http://localhost:3000

# 3. Explorer les pages :
#    - / (accueil)
#    - /components (démo)
#    - /design-tokens (tokens)

# 4. Lancer Storybook
pnpm storybook

# 5. Ouvrir http://localhost:6006
```

**Happy Coding ! 🚀**

---

**Version :** 2.0.0  
**Date :** Octobre 2025  
**Équipe :** NxPay Team
