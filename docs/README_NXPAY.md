# 🎨 Bibliothèque UI NxPay v2.0

> **Transformation complète : NokiPay → NxPay**  
> Design system moderne avec palette de couleurs vert-violet

---

## ✨ Nouveautés de la Version 2.0

### 🎨 Nouvelle Identité Visuelle

La bibliothèque a été entièrement rebrandée de **NokiPay** (jaune) vers **NxPay** (vert-violet) avec une palette de **5 couleurs harmonieuses**.

#### Palette de Couleurs NxPay

```
#77F07F  →  Vert Clair      (Priorité 1 - Primary)
#3FC995  →  Teal            (Priorité 2 - Secondary)
#40A0AE  →  Bleu Turquoise  (Priorité 3 - Tertiary)
#37669C  →  Bleu Moyen      (Priorité 4 - Quaternary)
#3A2F6B  →  Violet Foncé    (Priorité 5 - Accent)
```

#### Gradient Signature NxPay

```css
background: linear-gradient(135deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%);
```

---

## 📦 Installation

### Dans vos projets Admin/Merchant

```bash
# Installer la nouvelle version
pnpm add @nxpay/ui@^2.0.0

# Ou avec npm
npm install @nxpay/ui@^2.0.0
```

### Configuration Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nxpay/ui'  // ✅ Nouveau nom
  ],
  
  ui: {
    safelistColors: [
      'nxGreen',
      'nxTeal', 
      'nxBlueTurquoise',
      'nxBlue',
      'nxPurple'
    ]
  }
})
```

### Configuration Tailwind

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        // Les couleurs NxPay sont déjà incluses !
        nxGreen: { /* ... */ },
        nxTeal: { /* ... */ },
        // etc.
      }
    }
  }
}
```

---

## 🚀 Utilisation Rapide

### Boutons

```vue
<template>
  <!-- Bouton Primary (Vert) -->
  <NokiButton color="primary" label="Action Principale" />
  
  <!-- Bouton Secondary (Teal) -->
  <NokiButton color="secondary" label="Action Secondaire" />
  
  <!-- Avec shadow NxPay -->
  <NokiButton 
    color="primary" 
    shadowType="dark" 
    label="Bouton avec Glow"
  />
</template>
```

### Cards avec Gradient

```vue
<template>
  <div class="bg-gradient-to-br from-nxGreen-500 to-nxTeal-500 p-6 rounded-2xl text-white">
    <h3 class="text-2xl font-bold">Card NxPay</h3>
    <p>Avec le gradient signature vert-teal</p>
  </div>
</template>
```

### Badges de Statut

```vue
<template>
  <!-- Success (Vert) -->
  <span class="bg-nxGreen-100 text-nxGreen-800 px-3 py-1 rounded-full">
    Actif
  </span>
  
  <!-- Info (Bleu Turquoise) -->
  <span class="bg-nxBlueTurquoise-100 text-nxBlueTurquoise-800 px-3 py-1 rounded-full">
    En cours
  </span>
</template>
```

### Utilisation des Design Tokens (TypeScript)

```typescript
import { colors, gradients, shadows } from '@nxpay/ui/utils/designTokens';

// Couleurs
const primary = colors.nxGreen;        // '#77F07F'
const secondary = colors.nxTeal;       // '#3FC995'

// Gradients
const heroGradient = gradients.primary;

// Shadows
const glowEffect = shadows.nxGreen;    // '0 4px 14px 0 rgba(119, 240, 127, 0.39)'
```

---

## 📚 Documentation Complète

- **[Design System](./DESIGN_SYSTEM.md)** - Guide complet du design system NxPay
- **[Migration Guide](./MIGRATION_GUIDE.md)** - Comment migrer depuis NokiPay
- **[Changelog](./CHANGELOG.md)** - Historique des versions

---

## 🎯 Fichiers Modifiés

### Bibliothèque UI (`ui/`)

✅ **Créés :**
- `src/runtime/utils/designTokens.ts` - Tous les design tokens NxPay
- `DESIGN_SYSTEM.md` - Documentation design system
- `MIGRATION_GUIDE.md` - Guide de migration
- `CHANGELOG.md` - Historique des changements
- `README_NXPAY.md` - Ce fichier

✅ **Modifiés :**
- `package.json` - Renommé `@nxpay/ui` v2.0.0
- `src/runtime/assets/styles/colors.ts` - Nouvelles couleurs NxPay
- `src/runtime/utils/constants/buttonStyles.ts` - Support couleurs NxPay

### Applications Admin & Merchant

✅ **Modifiés dans les deux :**
- `package.json` - Dépendance `@nxpay/ui@^2.0.0`
- `nuxt.config.ts` - Module `@nxpay/ui` et safelistColors
- `tailwind.config.ts` - Palette complète NxPay avec 5 couleurs

---

## 🌈 Classes Tailwind Disponibles

### Couleurs de Base

```html
<!-- Vert (Primary) -->
<div class="bg-nxGreen-500">Vert Principal</div>
<div class="text-nxGreen-600">Texte Vert</div>
<div class="border-nxGreen-500">Bordure Verte</div>

<!-- Teal (Secondary) -->
<div class="bg-nxTeal-500">Teal</div>

<!-- Bleu Turquoise -->
<div class="bg-nxBlueTurquoise-500">Bleu Turquoise</div>

<!-- Bleu Moyen -->
<div class="bg-nxBlue-500">Bleu Moyen</div>

<!-- Violet -->
<div class="bg-nxPurple-500">Violet Foncé</div>
```

### Échelle de Teintes

Chaque couleur a 11 nuances (50 à 950) :

```html
<div class="bg-nxGreen-50">Très clair</div>
<div class="bg-nxGreen-100">...</div>
<div class="bg-nxGreen-500">Standard</div>
<div class="bg-nxGreen-900">Très foncé</div>
<div class="bg-nxGreen-950">Ultra foncé</div>
```

### Gradients

```html
<!-- Gradient Signature -->
<div class="bg-gradient-to-br from-nxGreen-500 via-nxTeal-500 to-nxBlueTurquoise-500">
  Gradient NxPay
</div>

<!-- Gradient Simple -->
<div class="bg-gradient-to-r from-nxGreen-500 to-nxTeal-500">
  Vert vers Teal
</div>
```

---

## 🔧 Compatibilité

### Rétrocompatibilité

Pour faciliter la migration, des **alias** sont disponibles :

```typescript
// Ces syntaxes fonctionnent toutes !
primary: '#77F07F'      // Alias vers nxGreen-500
secondary: '#3FC995'    // Alias vers nxTeal-500
tertiary: '#40A0AE'     // Alias vers nxBlueTurquoise-500
```

Exemple :
```vue
<!-- Les deux fonctionnent -->
<div class="bg-nxGreen-500">Nouveau</div>
<div class="bg-primary">Alias (même couleur)</div>
```

### Migration depuis NokiPay

Si vous migrez depuis l'ancienne version :

1. Remplacer `nokiYellow` → `nxGreen`
2. Remplacer `@nokipay/ui` → `@nxpay/ui`
3. Mettre à jour les imports

Consultez le [Guide de Migration](./MIGRATION_GUIDE.md) complet.

---

## 🎨 Design Tokens Disponibles

### Couleurs

```typescript
import { colors } from '@nxpay/ui/utils/designTokens';

colors.nxGreen          // '#77F07F'
colors.nxTeal           // '#3FC995'
colors.nxBlueTurquoise  // '#40A0AE'
colors.nxBlue           // '#37669C'
colors.nxPurple         // '#3A2F6B'
```

### Gradients

```typescript
import { gradients } from '@nxpay/ui/utils/designTokens';

gradients.primary       // Gradient signature
gradients.button        // Pour boutons
gradients.card          // Pour cards
```

### Shadows

```typescript
import { shadows } from '@nxpay/ui/utils/designTokens';

shadows.nxGreen         // Shadow avec glow vert
shadows.nxTeal          // Shadow avec glow teal
shadows.glass           // Pour glassmorphism
```

### Spacing, Border Radius, etc.

Tous les design tokens sont disponibles :
- `spacing` - Espacements (xs à 4xl)
- `borderRadius` - Rayons de bordure (sm à full)
- `typography` - Typographie (font sizes, weights, etc.)
- `breakpoints` - Points de rupture responsive
- `transitions` - Transitions et animations
- `glassmorphism` - Effets de verre

---

## 🎯 Best Practices

### 1. Utiliser la Hiérarchie des Couleurs

```vue
<!-- ✅ Bon -->
<button class="bg-nxGreen-500">      <!-- Primary action -->
<button class="bg-nxTeal-500">       <!-- Secondary action -->
<span class="bg-nxBlueTurquoise-100"><!-- Info badge -->

<!-- ❌ À éviter -->
<button class="bg-nxPurple-500">     <!-- Trop d'accent pour un bouton principal -->
```

### 2. Cohérence Visuelle

Utilisez le même niveau de teinte pour des éléments similaires :

```vue
<!-- ✅ Cohérent -->
<div class="bg-nxGreen-500 text-white">Primary</div>
<div class="bg-nxTeal-500 text-white">Secondary</div>

<!-- ❌ Incohérent -->
<div class="bg-nxGreen-500 text-white">Primary</div>
<div class="bg-nxTeal-200 text-gray-800">Secondary</div>
```

### 3. Accessibilité

Assurez un contraste suffisant (WCAG AA minimum : 4.5:1) :

```vue
<!-- ✅ Bon contraste -->
<div class="bg-nxGreen-500 text-white">Texte lisible</div>
<div class="bg-white text-nxGreen-700">Texte lisible</div>

<!-- ❌ Faible contraste -->
<div class="bg-nxGreen-100 text-nxGreen-200">Difficile à lire</div>
```

---

## 📊 Statistiques de la Migration

### Fichiers Modifiés : **11 fichiers**

- **Bibliothèque UI :** 8 fichiers
  - 5 créés (design tokens, docs)
  - 3 modifiés (colors, buttons, package.json)

- **Admin App :** 3 fichiers
  - package.json, nuxt.config.ts, tailwind.config.ts

- **Merchant App :** 3 fichiers
  - package.json, nuxt.config.ts, tailwind.config.ts

### Nouvelles Couleurs : **5 palettes complètes**

- nxGreen (11 teintes)
- nxTeal (11 teintes)
- nxBlueTurquoise (11 teintes)
- nxBlue (11 teintes)
- nxPurple (11 teintes)

**Total : 55 nouvelles couleurs !**

### Design Tokens : **10+ catégories**

- Colors
- Gradients
- Shadows
- Spacing
- Border Radius
- Typography
- Breakpoints
- Transitions
- Glassmorphism
- Animations

---

## 🚀 Prochaines Étapes

Pour commencer à utiliser NxPay dans vos projets :

1. **Installer les dépendances :**
   ```bash
   cd admin
   pnpm install
   
   cd ../merchant
   pnpm install
   ```

2. **Rebuild la bibliothèque UI :**
   ```bash
   cd ../ui
   pnpm build
   ```

3. **Lancer les applications :**
   ```bash
   # Admin
   cd ../admin
   pnpm dev  # Port 3007
   
   # Merchant (dans un autre terminal)
   cd ../merchant
   pnpm dev  # Port 3008
   ```

4. **Vérifier les couleurs :**
   - Ouvrez http://localhost:3007 (Admin)
   - Ouvrez http://localhost:3008 (Merchant)
   - Les nouvelles couleurs NxPay devraient s'afficher ! 🎉

---

## 📞 Support

Pour toute question ou problème :

1. Consultez la [Documentation complète](./DESIGN_SYSTEM.md)
2. Lisez le [Guide de Migration](./MIGRATION_GUIDE.md)
3. Contactez l'équipe NxPay

---

## 📄 License

MIT © 2025 NxPay Team

---

**Version :** 2.0.0  
**Date de Release :** Octobre 2025  
**Breaking Changes :** Oui (voir CHANGELOG.md)  
**Migration Required :** Oui (voir MIGRATION_GUIDE.md)

---

## 🎊 Félicitations !

Vous disposez maintenant d'un **design system moderne et cohérent** pour vos applications NxPay !

La transformation de NokiPay vers NxPay est **complète et prête pour production**. 🚀

