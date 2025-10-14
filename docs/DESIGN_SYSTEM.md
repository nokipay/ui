# 🎨 Design System NxPay

## Vue d'ensemble

Le Design System NxPay est une bibliothèque de design moderne basée sur une palette de 5 couleurs principales formant un gradient harmonieux du **vert au violet**.

---

## 🌈 Palette de Couleurs

### Couleurs Principales (par priorité d'utilisation)

| Couleur            | Hex       | Priorité | Usage Principal                                    |
| ------------------ | --------- | -------- | -------------------------------------------------- |
| **Vert Clair**     | `#77F07F` | 1        | Couleur primaire, CTAs, boutons principaux, succès |
| **Teal**           | `#3FC995` | 2        | Couleur secondaire, accents, liens                 |
| **Bleu Turquoise** | `#40A0AE` | 3        | Informations, états informatifs                    |
| **Bleu Moyen**     | `#37669C` | 4        | Navigation, éléments secondaires                   |
| **Violet Foncé**   | `#3A2F6B` | 5        | Accents sombres, textes importants                 |

### Gradient Signature NxPay

```css
background: linear-gradient(135deg, #77f07f 0%, #3fc995 50%, #40a0ae 100%);
```

**Variantes disponibles :**

- Horizontal : `linear-gradient(90deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)`
- Vertical : `linear-gradient(180deg, #77F07F 0%, #3FC995 100%)`
- Avec transparence : `linear-gradient(135deg, rgba(119, 240, 127, 0.8) 0%, rgba(63, 201, 149, 0.8) 100%)`

---

## 📦 Utilisation dans Tailwind

### Classes disponibles

#### Couleurs Principales

```html
<!-- Vert (Primary) -->
<div class="bg-nxGreen-500 text-white">Primary Button</div>

<!-- Teal (Secondary) -->
<div class="bg-nxTeal-500 text-white">Secondary Button</div>

<!-- Bleu Turquoise -->
<div class="bg-nxBlueTurquoise-500 text-white">Info Badge</div>

<!-- Bleu Moyen -->
<div class="bg-nxBlue-500 text-white">Navigation</div>

<!-- Violet -->
<div class="bg-nxPurple-500 text-white">Accent Text</div>
```

#### Échelle de teintes (50 à 950)

Chaque couleur possède 11 nuances :

```html
<div class="bg-nxGreen-50">Très clair</div>
<div class="bg-nxGreen-100">...</div>
<div class="bg-nxGreen-500">Standard</div>
<div class="bg-nxGreen-900">Très foncé</div>
<div class="bg-nxGreen-950">Ultra foncé</div>
```

### Alias de compatibilité

Pour faciliter la migration depuis NokiPay, des alias sont disponibles :

```typescript
primary: '#77F07F' // Équivalent à nxGreen-500
secondary: '#3FC995' // Équivalent à nxTeal-500
tertiary: '#40A0AE' // Équivalent à nxBlueTurquoise-500
```

---

## 🎯 Utilisation dans les Composants

### Boutons

```vue
<template>
  <!-- Bouton Primary (Vert) -->
  <NokiButton color="primary" label="Action Principale" />
  <NokiButton color="green" label="Action Principale" />

  <!-- Bouton Secondary (Teal) -->
  <NokiButton color="secondary" label="Action Secondaire" />

  <!-- Avec shadow NxPay -->
  <NokiButton color="primary" shadowType="dark" label="Avec Ombre" />
</template>
```

**Couleurs disponibles :** `white`, `green`, `yellow`, `black`, `primary`, `secondary`

### Cards avec gradient

```vue
<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nxGreen-500 to-nxTeal-500 p-6 text-white"
  >
    <h3 class="text-2xl font-bold">Card avec Gradient NxPay</h3>
    <p>Contenu de la card</p>
  </div>
</template>
```

### Badges de statut

```vue
<template>
  <!-- Success (Vert) -->
  <span
    class="inline-flex items-center rounded-full bg-nxGreen-100 px-3 py-1 text-sm font-medium text-nxGreen-800"
  >
    Actif
  </span>

  <!-- Info (Bleu Turquoise) -->
  <span
    class="inline-flex items-center rounded-full bg-nxBlueTurquoise-100 px-3 py-1 text-sm font-medium text-nxBlueTurquoise-800"
  >
    En cours
  </span>
</template>
```

---

## 🎨 Design Tokens (JavaScript/TypeScript)

### Import des tokens

```typescript
import { designTokens } from '@nxpay/ui/utils/designTokens'
import { colors, gradients, shadows } from '@nxpay/ui/utils/designTokens'

// Utilisation
const primaryColor = colors.nxGreen // '#77F07F'
const gradient = gradients.primary
```

### Couleurs disponibles

```typescript
import { colors } from '@nxpay/ui/utils/designTokens'

colors.nxGreen // '#77F07F'
colors.nxTeal // '#3FC995'
colors.nxBlueTurquoise // '#40A0AE'
colors.nxBlue // '#37669C'
colors.nxPurple // '#3A2F6B'

// Alias
colors.primary // '#77F07F'
colors.secondary // '#3FC995'
colors.tertiary // '#40A0AE'

// Sémantiques
colors.success // '#77F07F' (Vert)
colors.info // '#40A0AE' (Bleu Turquoise)
colors.warning // '#f59e0b'
colors.error // '#ef4444'
```

### Gradients

```typescript
import { gradients } from '@nxpay/ui/utils/designTokens'

gradients.primary // Gradient signature
gradients.button // Gradient pour boutons
gradients.card // Gradient subtil pour cards
```

### Shadows

```typescript
import { shadows } from '@nxpay/ui/utils/designTokens'

shadows.nxGreen // '0 4px 14px 0 rgba(119, 240, 127, 0.39)'
shadows.nxTeal // '0 4px 14px 0 rgba(63, 201, 149, 0.39)'
shadows.glass // Shadow pour glassmorphism
```

---

## 🔧 Configuration

### Tailwind Config

Les couleurs sont automatiquement disponibles dans Tailwind via la configuration :

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        nxGreen: {
          50: '#f0fdf4',
          // ... échelle complète
          500: '#77F07F',
          // ...
        },
        nxTeal: {
          /* ... */
        },
        // etc.
      },
    },
  },
}
```

### Nuxt Config

Assurez-vous d'inclure les couleurs dans la safelist :

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ui: {
    safelistColors: ['nxGreen', 'nxTeal', 'nxBlueTurquoise', 'nxBlue', 'nxPurple'],
  },
})
```

---

## 📐 Spacing & Layout

### Spacing Scale

```typescript
spacing.xs    // 4px
spacing.sm    // 8px
spacing.md    // 16px
spacing.lg    // 24px
spacing.xl    // 32px
spacing.2xl   // 48px
spacing.3xl   // 64px
spacing.4xl   // 96px
```

### Border Radius

```typescript
borderRadius.sm    // 8px
borderRadius.md    // 12px
borderRadius.lg    // 16px
borderRadius.xl    // 20px
borderRadius.2xl   // 24px
borderRadius.full  // 9999px (circle)
```

---

## ✨ Glassmorphism

### Styles prédéfinis

```typescript
import { glassmorphism } from '@nxpay/ui/utils/designTokens'

// Light glassmorphism
glassmorphism.light
// {
//   background: 'rgba(255, 255, 255, 0.1)',
//   backdropFilter: 'blur(10px)',
//   border: '1px solid rgba(255, 255, 255, 0.2)'
// }

// Glassmorphism avec couleur NxPay
glassmorphism.nxGreen
```

### Exemple d'utilisation

```vue
<template>
  <div class="glassmorphic-card">Contenu avec effet glass</div>
</template>

<style scoped>
.glassmorphic-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
}
</style>
```

---

## 🎭 Transitions & Animations

### Durées

```typescript
transitions.duration.fast // 150ms
transitions.duration.normal // 300ms
transitions.duration.slow // 500ms
```

### Timing Functions

```typescript
transitions.timing.linear
transitions.timing.easeIn
transitions.timing.easeOut
transitions.timing.easeInOut
```

### Transitions prédéfinies

```typescript
transitions.all // 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
transitions.colors // Pour transitions de couleurs
transitions.transform // Pour transitions de transformation
```

---

## 📱 Breakpoints

```typescript
breakpoints.sm // 640px
breakpoints.md // 768px
breakpoints.lg // 1024px
breakpoints.xl // 1280px
breakpoints['2xl'] // 1536px
```

---

## 🎯 Best Practices

### 1. Hiérarchie des couleurs

Utilisez les couleurs selon leur priorité :

1. **nxGreen (Vert)** → Actions principales, CTAs, confirmations
2. **nxTeal** → Actions secondaires, liens importants
3. **nxBlueTurquoise** → Informations, badges informatifs
4. **nxBlue** → Navigation, éléments de structure
5. **nxPurple** → Accents spéciaux, éléments premium

### 2. Contraste et accessibilité

- Utilisez les teintes foncées (600-900) pour le texte sur fond clair
- Utilisez le blanc ou les teintes claires (50-100) pour le texte sur fond foncé
- Testez toujours le contraste (WCAG AA minimum : 4.5:1)

### 3. Cohérence visuelle

- Préférez le gradient signature pour les éléments hero
- Utilisez le même niveau de teinte (ex: toujours 500) pour une même catégorie d'éléments
- Limitez à 2-3 couleurs principales par vue

### 4. États interactifs

```vue
<!-- Bon exemple -->
<button class="bg-nxGreen-500 hover:bg-nxGreen-600 active:bg-nxGreen-700 transition-colors">
  Action
</button>
```

---

## 🔄 Migration depuis NokiPay

### Remplacement des couleurs

| Ancien (NokiPay) | Nouveau (NxPay)       | Commentaire        |
| ---------------- | --------------------- | ------------------ |
| `nokiYellow-500` | `nxGreen-500`         | Couleur principale |
| `bg-yellow-400`  | `bg-nxGreen-500`      | Boutons primaires  |
| `dark-green`     | `nxTeal-500`          | Couleur secondaire |
| `light-blue`     | `nxBlueTurquoise-500` | Éléments info      |
| `dark-blue`      | `nxBlue-500`          | Navigation         |

### Script de migration (exemple)

```bash
# Remplacer nokiYellow par nxGreen
find . -type f -name "*.vue" -exec sed -i 's/nokiYellow/nxGreen/g' {} +

# Remplacer bg-yellow-400 par bg-nxGreen-500
find . -type f -name "*.vue" -exec sed -i 's/bg-yellow-400/bg-nxGreen-500/g' {} +
```

---

## 📚 Resources

- [Figma Design System](#) (à venir)
- [Storybook Components](#) (à venir)
- [Guidelines de contribution](#) (à venir)

---

## 📄 License

Propriétaire - NxPay © 2025

---

**Version :** 2.0.0  
**Dernière mise à jour :** Octobre 2025  
**Mainteneur :** Équipe Design NxPay
