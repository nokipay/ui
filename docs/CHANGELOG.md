# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Versioning Sémantique](https://semver.org/lang/fr/).

---

## [2.0.0] - 2025-10-14

### 🎨 Changements Majeurs (BREAKING CHANGES)

#### Rebranding : NokiPay → NxPay

- **Package renommé** : `@nokipay/ui` → `@nxpay/ui`
- **Nouvelle identité visuelle** avec palette de 5 couleurs

#### Nouvelle Palette de Couleurs

**Couleurs remplacées :**
- ❌ Ancien : Jaune (`#ffdd0f`) comme couleur principale
- ✅ Nouveau : Vert Clair (`#77F07F`) comme couleur principale

**Nouvelle palette complète :**
1. **Vert Clair** - `#77F07F` (Priorité 1 - Primary)
2. **Teal** - `#3FC995` (Priorité 2 - Secondary)
3. **Bleu Turquoise** - `#40A0AE` (Priorité 3 - Tertiary)
4. **Bleu Moyen** - `#37669C` (Priorité 4 - Quaternary)
5. **Violet Foncé** - `#3A2F6B` (Priorité 5 - Accent)

### ✨ Nouveautés

#### Nouveaux Design Tokens

- Ajout de `designTokens.ts` avec tous les tokens de design
- Gradients prédéfinis pour NxPay
- Shadows avec couleurs NxPay
- Glassmorphism patterns
- Animations presets

#### Nouvelles Couleurs Tailwind

Ajout des classes Tailwind pour toutes les couleurs NxPay :
- `nxGreen-{50-950}` - Vert principal
- `nxTeal-{50-950}` - Teal secondaire
- `nxBlueTurquoise-{50-950}` - Bleu turquoise
- `nxBlue-{50-950}` - Bleu moyen
- `nxPurple-{50-950}` - Violet foncé

#### Nouveaux Gradients

```css
/* Gradient signature NxPay */
background: linear-gradient(135deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%);
```

Variantes disponibles :
- `gradients.primary` - Gradient signature
- `gradients.vertical` - Gradient vertical
- `gradients.button` - Gradient pour boutons
- `gradients.card` - Gradient subtil pour cards

### 🔄 Modifications

#### Composants

**Button :**
- Nouvelle couleur `green` disponible
- Couleur `yellow` conservée pour compatibilité
- `primary` pointe maintenant vers `nxGreen-500`
- Shadow NxPay avec glow vert : `[box-shadow:0_4px_14px_0_rgba(119,240,127,0.39)]`

**Colors :**
- Système de couleurs complètement revu
- `success` utilise maintenant `nxGreen`
- `info` utilise maintenant `nxBlueTurquoise`

#### Configuration

**Tailwind :**
- Nouvelles couleurs ajoutées dans `extend.colors`
- Alias de compatibilité :
  - `primary` → `#77F07F`
  - `secondary` → `#3FC995`
  - `tertiary` → `#40A0AE`

**Nuxt :**
- `safelistColors` mis à jour avec les 5 couleurs NxPay

### 📚 Documentation

- ✨ **Nouveau** : `DESIGN_SYSTEM.md` - Guide complet du design system
- ✨ **Nouveau** : `MIGRATION_GUIDE.md` - Guide de migration NokiPay → NxPay
- ✨ **Nouveau** : `CHANGELOG.md` - Ce fichier

### 🔧 Maintenance

- Mise à jour du `package.json` :
  - `name` : `@nxpay/ui`
  - `version` : `2.0.0`
  - `description` : Mise à jour avec mention de la palette green-to-purple
  - `keywords` : Ajout de "design-system" et "tailwind"
  - `author` : "NxPay Team"
  - `repository` : Pointant vers `github.com/nxpay/ui`

### 📦 Migration

Pour migrer depuis `@nokipay/ui` v0.2.x :

1. **Installer la nouvelle version :**
   ```bash
   pnpm remove @nokipay/ui
   pnpm add @nxpay/ui@^2.0.0
   ```

2. **Mettre à jour les imports :**
   ```typescript
   // Avant
   import { colors } from '@nokipay/ui/utils/colors';
   
   // Après
   import { colors } from '@nxpay/ui/utils/designTokens';
   ```

3. **Remplacer les couleurs :**
   - `nokiYellow` → `nxGreen`
   - `bg-yellow-400` → `bg-nxGreen-500`
   - `text-yellow-500` → `text-nxGreen-500`

Consultez le [Guide de Migration](./MIGRATION_GUIDE.md) complet pour plus de détails.

### ⚠️ Incompatibilités

#### Couleurs supprimées

Les références directes à `nokiYellow` doivent être remplacées par `nxGreen` :

```diff
- <div class="bg-nokiYellow-500">
+ <div class="bg-nxGreen-500">
```

#### Bouton color="yellow"

Toujours disponible pour compatibilité mais déprécié :

```vue
<!-- ⚠️ Déprécié mais fonctionnel -->
<NokiButton color="yellow" />

<!-- ✅ Recommandé -->
<NokiButton color="green" />
<NokiButton color="primary" />
```

### 🎯 Prochaines Étapes (v2.1.0)

- [ ] Storybook pour la documentation visuelle
- [ ] Plus de composants avec les nouvelles couleurs
- [ ] Dark mode amélioré
- [ ] Animations avancées
- [ ] Accessibilité WCAG AAA

---

## [0.2.2] - 2024-XX-XX

### Corrections

- Corrections mineures de bugs

---

## [0.2.1] - 2024-XX-XX

### Corrections

- Améliorations de performance

---

## [0.2.0] - 2024-XX-XX

### Nouveautés

- Version initiale de `@nokipay/ui`
- Composants de base (Button, Input, Card, etc.)
- Design tokens NokiPay avec couleur jaune
- Integration Nuxt 3

---

[2.0.0]: https://github.com/nxpay/ui/releases/tag/v2.0.0
[0.2.2]: https://github.com/nokipay/ui/releases/tag/v0.2.2
[0.2.1]: https://github.com/nokipay/ui/releases/tag/v0.2.1
[0.2.0]: https://github.com/nokipay/ui/releases/tag/v0.2.0

