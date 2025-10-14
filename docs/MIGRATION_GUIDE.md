# 🚀 Guide de Migration : NokiPay → NxPay

Ce guide vous aide à migrer votre application de **NokiPay** vers **NxPay** avec le nouveau design system.

---

## 📋 Vue d'ensemble

### Changements Majeurs

1. **Nom du package** : `@nokipay/ui` → `@nxpay/ui`
2. **Couleur principale** : Jaune (`#ffdd0f`) → Vert (`#77F07F`)
3. **Palette complète** : 5 nouvelles couleurs (vert → violet)
4. **Version** : 0.2.x → 2.0.0

---

## 🔧 Étape 1 : Mise à jour du package

### 1.1 Désinstaller l'ancienne version

```bash
# Dans vos projets Admin/Merchant
pnpm remove @nokipay/ui
# ou
npm uninstall @nokipay/ui
```

### 1.2 Installer la nouvelle version

```bash
pnpm add @nxpay/ui@^2.0.0
# ou
npm install @nxpay/ui@^2.0.0
```

### 1.3 Mettre à jour `nuxt.config.ts`

**Avant :**
```typescript
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nokipay/ui"  // ❌ Ancien
  ],
  ui: {
    safelistColors: ["nokiYellow"],  // ❌ Ancien
  }
})
```

**Après :**
```typescript
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nxpay/ui"  // ✅ Nouveau
  ],
  ui: {
    safelistColors: ["nxGreen", "nxTeal", "nxBlueTurquoise", "nxBlue", "nxPurple"],  // ✅ Nouveau
  }
})
```

---

## 🎨 Étape 2 : Migration des couleurs dans Tailwind

### 2.1 Mettre à jour `tailwind.config.ts`

**Avant (NokiPay) :**
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        nokiYellow: {
          500: '#ffdd0f',
        },
        "primary-color": "#fbdd19",
      }
    }
  }
}
```

**Après (NxPay) :**
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Couleurs principales NxPay
        nxGreen: {
          50: '#f0fdf4',
          500: '#77F07F',  // Vert principal
          // ... autres teintes
        },
        nxTeal: {
          500: '#3FC995',  // Teal secondaire
        },
        // Alias de compatibilité
        primary: '#77F07F',
        secondary: '#3FC995',
      }
    }
  }
}
```

### 2.2 Script de remplacement automatique

Créez un fichier `migrate-colors.sh` :

```bash
#!/bin/bash

# Remplacer nokiYellow par nxGreen
find . -type f \( -name "*.vue" -o -name "*.ts" -o -name "*.js" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.nuxt/*" \
  -exec sed -i 's/nokiYellow/nxGreen/g' {} +

# Remplacer bg-yellow-400 par bg-nxGreen-500
find . -type f -name "*.vue" \
  -not -path "*/node_modules/*" \
  -not -path "*/.nuxt/*" \
  -exec sed -i 's/bg-yellow-400/bg-nxGreen-500/g' {} +

# Remplacer text-yellow-500 par text-nxGreen-500
find . -type f -name "*.vue" \
  -not -path "*/node_modules/*" \
  -not -path "*/.nuxt/*" \
  -exec sed -i 's/text-yellow-500/text-nxGreen-500/g' {} +

echo "✅ Migration des couleurs terminée !"
```

Exécutez :
```bash
chmod +x migrate-colors.sh
./migrate-colors.sh
```

---

## 🔀 Étape 3 : Migration des composants

### 3.1 Boutons

**Avant :**
```vue
<NokiButton color="yellow" label="Action" />
```

**Après :**
```vue
<NokiButton color="green" label="Action" />
<!-- ou -->
<NokiButton color="primary" label="Action" />
```

### 3.2 Badges

**Avant :**
```vue
<span class="bg-nokiYellow-100 text-nokiYellow-800">
  Actif
</span>
```

**Après :**
```vue
<span class="bg-nxGreen-100 text-nxGreen-800">
  Actif
</span>
```

### 3.3 Cards avec gradient

**Nouveau (NxPay) :**
```vue
<div class="bg-gradient-to-br from-nxGreen-500 to-nxTeal-500 p-6 rounded-2xl text-white">
  <h3>Card moderne NxPay</h3>
</div>
```

---

## 📝 Étape 4 : Migration du code TypeScript

### 4.1 Imports

**Avant :**
```typescript
import { colors } from '@nokipay/ui/utils/colors';
```

**Après :**
```typescript
import { designTokens, colors } from '@nxpay/ui/utils/designTokens';
```

### 4.2 Utilisation des couleurs

**Avant :**
```typescript
const primaryColor = '#ffdd0f';
```

**Après :**
```typescript
import { colors } from '@nxpay/ui/utils/designTokens';

const primaryColor = colors.nxGreen; // '#77F07F'
```

---

## 🎯 Étape 5 : Remplacement des références de couleurs

### Table de correspondance

| Ancien (NokiPay) | Nouveau (NxPay) | Usage |
|------------------|-----------------|-------|
| `nokiYellow-500` | `nxGreen-500` | Couleur principale |
| `nokiYellow-100` | `nxGreen-100` | Backgrounds clairs |
| `bg-yellow-400` | `bg-nxGreen-500` | Boutons |
| `text-yellow-600` | `text-nxGreen-600` | Textes |
| `border-yellow-500` | `border-nxGreen-500` | Bordures |
| `hover:bg-yellow-500` | `hover:bg-nxGreen-600` | États hover |

### Recherche et remplacement manuel

Utilisez votre IDE pour rechercher et remplacer :

1. **Rechercher :** `nokiYellow`  
   **Remplacer par :** `nxGreen`

2. **Rechercher :** `bg-yellow-400`  
   **Remplacer par :** `bg-nxGreen-500`

3. **Rechercher :** `text-yellow-`  
   **Remplacer par :** `text-nxGreen-`

4. **Rechercher :** `border-yellow-`  
   **Remplacer par :** `border-nxGreen-`

---

## 🖼️ Étape 6 : Migration des assets

### 6.1 Logos et images

Si vous avez des logos ou images avec les couleurs jaunes, vous devrez les mettre à jour :

1. **Ouvrez vos fichiers SVG/PNG dans un éditeur**
2. **Remplacez les couleurs :**
   - `#ffdd0f` → `#77F07F` (vert principal)
   - `#feda00` → `#3FC995` (teal secondaire)

### 6.2 Favicon

Mettez à jour votre favicon avec les nouvelles couleurs NxPay.

---

## 🧪 Étape 7 : Tests et validation

### 7.1 Checklist de vérification

- [ ] Le package `@nxpay/ui` est installé
- [ ] `nuxt.config.ts` est mis à jour
- [ ] `tailwind.config.ts` contient les nouvelles couleurs
- [ ] Toutes les références `nokiYellow` sont remplacées par `nxGreen`
- [ ] Les boutons utilisent `color="green"` ou `color="primary"`
- [ ] Les logos/assets sont mis à jour
- [ ] L'application se compile sans erreurs
- [ ] Les couleurs s'affichent correctement dans le navigateur

### 7.2 Commandes de vérification

```bash
# Vérifier les imports
grep -r "@nokipay/ui" . --exclude-dir={node_modules,.nuxt}

# Vérifier les couleurs
grep -r "nokiYellow" . --exclude-dir={node_modules,.nuxt}
grep -r "bg-yellow" . --exclude-dir={node_modules,.nuxt}

# Si rien n'est retourné, la migration est complète ! ✅
```

---

## 🚨 Problèmes Courants

### Erreur : Module `@nxpay/ui` introuvable

**Solution :**
```bash
# Nettoyer le cache et réinstaller
rm -rf node_modules .nuxt pnpm-lock.yaml
pnpm install
```

### Les couleurs ne s'appliquent pas

**Solution :**
1. Vérifiez que `safelistColors` contient les nouvelles couleurs dans `nuxt.config.ts`
2. Redémarrez le serveur de développement :
   ```bash
   pnpm dev
   ```

### Styles manquants après migration

**Solution :**
```bash
# Rebuild Tailwind
pnpm dev
# Ou forcez la régénération
rm -rf .nuxt && pnpm dev
```

---

## 📚 Ressources Supplémentaires

- [Design System NxPay](./DESIGN_SYSTEM.md)
- [Documentation des Composants](#) (à venir)
- [Exemples d'utilisation](#) (à venir)

---

## 💡 Conseils

### Migration Progressive

Vous pouvez migrer progressivement en utilisant les **alias de compatibilité** :

```typescript
// Ces deux syntaxes fonctionnent !
<div class="bg-nxGreen-500">Nouveau</div>
<div class="bg-primary">Alias (même couleur)</div>
```

### Nouveau Gradient Signature

Profitez du nouveau gradient NxPay pour donner un look moderne :

```vue
<div class="bg-gradient-to-br from-nxGreen-500 via-nxTeal-500 to-nxBlueTurquoise-500">
  Hero Section
</div>
```

### Dark Mode

Les nouvelles couleurs sont optimisées pour le dark mode :

```vue
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Contenu adaptatif
</div>
```

---

## ✅ Checklist Finale

Avant de déployer en production :

- [ ] Tous les tests passent
- [ ] Aucune référence à `@nokipay/ui` restante
- [ ] Aucune référence à `nokiYellow` restante
- [ ] Les logos sont mis à jour
- [ ] Le favicon est mis à jour
- [ ] Les couleurs s'affichent correctement en light/dark mode
- [ ] L'application a été testée sur tous les navigateurs cibles
- [ ] La documentation interne est mise à jour

---

## 🎉 C'est fait !

Félicitations ! Votre application est maintenant propulsée par **NxPay** avec le nouveau design system moderne.

Si vous rencontrez des problèmes, consultez la [documentation complète](./DESIGN_SYSTEM.md) ou contactez l'équipe NxPay.

---

**Version du guide :** 2.0.0  
**Date :** Octobre 2025  
**Auteur :** Équipe NxPay

