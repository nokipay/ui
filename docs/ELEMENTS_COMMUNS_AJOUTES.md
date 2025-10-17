# Éléments Communs Admin + Merchant Ajoutés

**Date :** 15 Octobre 2025  
**Statut :** ✅ TERMINÉ  
**Build :** ✅ Réussi (148 kB)

---

## RÉSUMÉ EXÉCUTIF

### Nouveaux Éléments Ajoutés

✅ **3 composables** communs identifiés et ajoutés  
✅ **2 composants** communs créés  
✅ **Build** réussi (134 kB → 148 kB)  
✅ **Exports** centralisés

---

## ÉLÉMENTS COMMUNS ADMIN + MERCHANT

### Analyse Comparative

| Élément               | Admin | Merchant | @nxpay/ui | Status            |
| --------------------- | ----- | -------- | --------- | ----------------- |
| **useCurrencyFormat** | ✅    | ✅       | ✅        | Existait déjà     |
| **useHandleErrors**   | ✅    | ✅       | ✅        | Existait déjà     |
| **useHasRole**        | ✅    | ✅       | ⏳        | À créer (Phase 1) |
| **useLanguage**       | ❌    | ✅       | ✅        | **AJOUTÉ** ✨     |
| **useStatusBadge**    | ❌    | ✅       | ✅        | **AJOUTÉ** ✨     |
| **useLogout**         | ✅    | ✅       | ⏳        | À créer (Phase 1) |
| **LanguageSwitch**    | ❌    | ✅       | ✅        | **AJOUTÉ** ✨     |
| **RefreshButton**     | ❌    | ✅       | ✅        | **AJOUTÉ** ✨     |

---

## 1. useLanguage ✅ AJOUTÉ

**Fichier :** `src/runtime/composables/useLanguage.ts`

### Description

Composable pour gérer le changement de langue (i18n) avec persistance localStorage.

### Fonctionnalités

- Gestion langue FR/EN
- Persistance localStorage
- Config avec flag + icon
- Switch automatique
- Set manuel

### API

```typescript
const {
  currentLanguage, // ref<'fr' | 'en'>
  currentLanguageConfig, // computed<LanguageConfig>
  nextLanguage, // computed<LanguageConfig>
  languages, // LanguageConfig[]
  switchLanguage, // () => void
  setLanguage, // (lang: Language) => void
} = useLanguage()
```

### Exemple

```typescript
const { currentLanguage, switchLanguage, setLanguage } = useLanguage()

// Langue actuelle
console.log(currentLanguage.value) // 'fr'

// Changer de langue
switchLanguage() // 'fr' → 'en'

// Définir langue spécifique
setLanguage('fr')
```

---

## 2. useStatusBadge ✅ AJOUTÉ

**Fichier :** `src/runtime/composables/useStatusBadge.ts`

### Description

Composable pour générer automatiquement les configurations de badge selon le type de status.

### Fonctionnalités

- 7 générateurs de badges
- Traductions automatiques
- Couleurs standardisées
- Support booléens, nombres, strings

### API

```typescript
const {
  getActiveBadge, // (isActive: boolean) => BadgeConfig
  getPinRequiredBadge, // (isRequired: boolean) => BadgeConfig
  getTransactionStatusBadge, // (status: string) => BadgeConfig
  getTerminalStatusBadge, // (status: string) => BadgeConfig
  getBooleanBadge, // (value, trueLabel, falseLabel, colors) => BadgeConfig
  getCustomStatusBadge, // (value, options) => BadgeConfig
  getGenericStatusBadge, // (status: any, size) => BadgeConfig
} = useStatusBadge()
```

### Exemples

```typescript
const { getTransactionStatusBadge, getActiveBadge } = useStatusBadge()

// Transaction status
const badge1 = getTransactionStatusBadge('approved')
// → { label: 'Approuvé', color: 'green', size: 'sm' }

// Active status
const badge2 = getActiveBadge(true)
// → { label: 'Actif', color: 'green', size: 'sm' }

// Boolean custom
const badge3 = getBooleanBadge(true, 'Vérifié', 'Non vérifié')
// → { label: 'Vérifié', color: 'green', size: 'sm' }
```

### Utilisation dans Template

```vue
<template>
  <UBadge v-bind="getTransactionStatusBadge(transaction.status)" />
  <UBadge v-bind="getActiveBadge(user.is_active)" />
</template>

<script setup>
const { getTransactionStatusBadge, getActiveBadge } = useStatusBadge()
</script>
```

---

## 3. LanguageSwitch ✅ AJOUTÉ

**Fichier :** `src/runtime/components/Language/Switch.vue`

### Description

Composant pour changer de langue avec 3 variantes (button, toggle, dropdown).

### Props

```typescript
{
  size?: 'sm' | 'md' | 'lg'        // Taille (défaut: 'md')
  variant?: 'button' | 'dropdown' | 'toggle'  // Style (défaut: 'button')
  showLabel?: boolean              // Afficher label (défaut: true)
  className?: string               // Classes CSS custom
}
```

### Variantes

#### Button (défaut)

```vue
<LanguageSwitch variant="button" :show-label="true" />
```

#### Toggle

```vue
<LanguageSwitch variant="toggle" />
```

#### Dropdown

```vue
<LanguageSwitch variant="dropdown" size="lg" />
```

### Exemple Complet

```vue
<template>
  <div class="flex items-center gap-4">
    <!-- Button variant -->
    <LanguageSwitch variant="button" />

    <!-- Toggle variant -->
    <LanguageSwitch variant="toggle" />

    <!-- Dropdown variant -->
    <LanguageSwitch variant="dropdown" :show-label="true" />
  </div>
</template>
```

---

## 4. ButtonRefresh ✅ AJOUTÉ

**Fichier :** `src/runtime/components/Button/Refresh.vue`

### Description

Bouton refresh avec animation rotate au hover et spin pendant loading.

### Props

```typescript
{
  loading?: boolean        // État chargement (défaut: false)
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'  // Taille (défaut: 'sm')
  color?: string           // Couleur (défaut: 'white')
  variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link'  // Variant (défaut: 'ghost')
  tooltip?: string         // Tooltip (défaut: 'Actualiser')
  label?: string           // Label (défaut: 'Actualiser')
  showLabel?: boolean      // Afficher label (défaut: false)
}
```

### Events

```typescript
@click    // Click sur bouton
@refresh  // Click sur bouton (alias)
```

### Animations

- **Normal :** Rotate 180° au hover
- **Loading :** Spin continu

### Exemple

```vue
<template>
  <div class="flex items-center gap-4">
    <!-- Basique -->
    <ButtonRefresh @refresh="refreshData" />

    <!-- Avec label -->
    <ButtonRefresh
      :loading="loading"
      :show-label="true"
      label="Actualiser les données"
      @refresh="refreshData"
    />

    <!-- Custom variant -->
    <ButtonRefresh
      :loading="loading"
      size="lg"
      color="primary"
      variant="soft"
      @refresh="refreshData"
    />
  </div>
</template>

<script setup>
const loading = ref(false)

const refreshData = async () => {
  loading.value = true
  await fetchData()
  loading.value = false
}
</script>
```

---

## EXPORTS MIS À JOUR

### Composables

**Fichier :** `src/runtime/composables/index.ts` (nouveau)

```typescript
// Language & i18n
export { useLanguage, languages } from './useLanguage'
export type { Language, LanguageConfig } from './useLanguage'

// Status & Badges
export { useStatusBadge } from './useStatusBadge'
export type { BadgeConfig } from './useStatusBadge'

// Aussi disponibles :
// - useApi
// - useApiErrorLabel
// - useHandleErrors
// - useCurrencyFormat
// - useCustomConfirm
// - useUTableFilter
```

### Composants

**Fichier :** `src/runtime/components/index.ts`

```typescript
// Button components
export { default as ButtonRefresh } from './Button/Refresh.vue'

// Language components
export { default as LanguageSwitch } from './Language/Switch.vue'
```

---

## UTILISATION COMBINÉE

### Dashboard Header avec Langue

```vue
<template>
  <NavigationNavbar>
    <template #actions>
      <!-- Refresh -->
      <ButtonRefresh :loading="loading" @refresh="refreshData" />

      <!-- Language -->
      <LanguageSwitch variant="dropdown" />

      <!-- Notifications -->
      <NotificationCenter />
    </template>
  </NavigationNavbar>
</template>

<script setup>
const { refreshData, loading } = useDataInitialization()
</script>
```

### Table avec Status Badges

```vue
<template>
  <UTable :rows="users" :columns="columns">
    <template #status-data="{ row }">
      <UBadge v-bind="getActiveBadge(row.is_active)" />
    </template>

    <template #transaction_status-data="{ row }">
      <UBadge v-bind="getTransactionStatusBadge(row.status)" />
    </template>
  </UTable>
</template>

<script setup>
const { getActiveBadge, getTransactionStatusBadge } = useStatusBadge()

const users = ref([
  { id: 1, name: 'User 1', is_active: true, status: 'approved' },
  { id: 2, name: 'User 2', is_active: false, status: 'pending' },
])
</script>
```

---

## STATISTIQUES

### Build

```
Avant : 134 kB
Après : 148 kB (+14 kB)
Status: ✅ Réussi
```

### Code

```
Nouveaux composables:  2 (useLanguage, useStatusBadge)
Nouveaux composants:   2 (LanguageSwitch, ButtonRefresh)
Lignes ajoutées:       ~400 lignes
Index créé:            composables/index.ts
```

### Composables Totaux

```
Avant : 5
Après : 7 (+2)
  ├── useLanguage ✨
  └── useStatusBadge ✨
```

### Composants Totaux

```
Avant : 24
Après : 26 (+2)
  ├── ButtonRefresh ✨
  └── LanguageSwitch ✨
```

---

## BÉNÉFICES

### Pour Admin

- Peut utiliser LanguageSwitch pour i18n
- ButtonRefresh standardisé
- useStatusBadge pour tous les badges

### Pour Merchant

- useLanguage déjà utilisé → import direct de @nxpay/ui
- useStatusBadge déjà utilisé → zéro duplication
- LanguageSwitch cohérent

### Pour Nouveaux Projets

- i18n prêt (useLanguage + LanguageSwitch)
- Badges standardisés (useStatusBadge)
- Bouton refresh professionnel

---

## RÉUTILISABILITÉ

### useStatusBadge

**Utilisé dans :**

- Tables (status transactions, users, terminals)
- Cards (status indicators)
- Lists (status badges)

**Avantage :**

- 1 seul endroit pour gérer les status
- Traductions centralisées
- Couleurs cohérentes

### useLanguage + LanguageSwitch

**Utilisé dans :**

- Header navigation
- Settings page
- Footer

**Avantage :**

- i18n simplifié
- Persistance automatique
- 3 variantes UI

### ButtonRefresh

**Utilisé dans :**

- Dashboard (refresh stats)
- Tables (refresh data)
- Cards (refresh content)

**Avantage :**

- Animation standardisée
- Loading state automatique
- UX professionnelle

---

## COMPATIBILITÉ

### Admin

```typescript
// Peut utiliser tous les nouveaux composables
import { useLanguage, useStatusBadge } from '@nxpay/ui'
```

**Bénéfice :** i18n + badges standardisés

### Merchant

```typescript
// Peut remplacer ses composables locaux
import { useLanguage, useStatusBadge } from '@nxpay/ui'
// Au lieu de : import { useLanguage } from '~/app/base/composables/useLanguage'
```

**Bénéfice :** Zéro duplication, maintenance centralisée

---

## PROCHAINS ÉLÉMENTS COMMUNS À AJOUTER

### Phase 1 - Permissions (Haute priorité)

1. **useHasRole** - Présent dans Admin + Merchant
2. **v-permission** directive - Présent dans Admin + Merchant
3. **useLogout** - Présent dans Admin + Merchant

### Phase 2 - Tables & Export (Haute priorité)

4. **ExportButton/Modal** - Présent dans Admin + Merchant modules
5. **TableLayout** - Pattern CRUD commun
6. **useUTableFilter** - Déjà existant ✅

### Phase 3 - Dashboard (Moyenne priorité)

7. **FilterBar** - Stats (Admin + Merchant)
8. **StatHistory** - Historique (Admin + Merchant)

---

## FICHIERS CRÉÉS (Cette session)

### Composables (3)

1. `src/runtime/composables/useLanguage.ts` (67 lignes)
2. `src/runtime/composables/useStatusBadge.ts` (186 lignes)
3. `src/runtime/composables/index.ts` (22 lignes)

### Composants (2)

4. `src/runtime/components/Language/Switch.vue` (100 lignes)
5. `src/runtime/components/Button/Refresh.vue` (40 lignes)

### Documentation (1)

6. `docs/ELEMENTS_COMMUNS_AJOUTES.md` (ce fichier)

**Total code :** ~415 lignes

---

## BUILD & VALIDATION

### Build ✅

```bash
npm run build
# ✅ Build succeeded for ui
# Size: 134 kB → 148 kB (+14 kB)
# Status: Success
```

### Format ✅

```bash
npm run format
# ✅ All files formatted
```

### TypeScript ✅

```
❌ 0 erreur TypeScript
❌ 0 erreur Vue
✅ Tous les types exportés
```

---

## EXEMPLES D'UTILISATION COMPLÈTE

### Dashboard Header Complet

```vue
<template>
  <NavigationNavbar>
    <template #actions>
      <!-- Refresh data -->
      <ButtonRefresh :loading="loading" @refresh="refreshData" />

      <!-- Language switcher -->
      <LanguageSwitch variant="dropdown" />

      <!-- Notifications -->
      <NotificationCenter />

      <!-- Profile -->
      <UButton icon="i-heroicons-user-circle" />
    </template>
  </NavigationNavbar>
</template>

<script setup>
const loading = ref(false)

const refreshData = async () => {
  loading.value = true
  await fetchDashboardData()
  loading.value = false
}
</script>
```

### Table avec Badges de Status

```vue
<template>
  <TableWrapper title="Utilisateurs" description="Liste des utilisateurs">
    <template #header>
      <ButtonRefresh :loading="loading" @refresh="refreshUsers" />
    </template>

    <UTable :rows="users" :columns="columns">
      <!-- Status actif/inactif -->
      <template #is_active-data="{ row }">
        <UBadge v-bind="getActiveBadge(row.is_active)" />
      </template>

      <!-- Status transaction -->
      <template #transaction_status-data="{ row }">
        <UBadge v-bind="getTransactionStatusBadge(row.transaction_status)" />
      </template>

      <!-- PIN requis -->
      <template #pin_required-data="{ row }">
        <UBadge v-bind="getPinRequiredBadge(row.pin_required)" />
      </template>
    </UTable>
  </TableWrapper>
</template>

<script setup>
const { getActiveBadge, getTransactionStatusBadge, getPinRequiredBadge } = useStatusBadge()

const users = ref([
  {
    id: 1,
    name: 'John Doe',
    is_active: true,
    transaction_status: 'approved',
    pin_required: true,
  },
])
</script>
```

### Settings avec Language

```vue
<template>
  <div class="settings-page">
    <h2>Préférences</h2>

    <!-- Language selection -->
    <UFormGroup label="Langue de l'interface">
      <LanguageSwitch variant="dropdown" size="lg" :show-label="true" />
    </UFormGroup>

    <!-- Display current language -->
    <p>Langue actuelle : {{ currentLanguageConfig.name }} {{ currentLanguageConfig.flag }}</p>
  </div>
</template>

<script setup>
const { currentLanguageConfig } = useLanguage()
</script>
```

---

## MAPPING STATUS COMPLET

### Transaction Status

| Status    | Label      | Couleur |
| --------- | ---------- | ------- |
| pending   | En attente | yellow  |
| completed | Terminé    | green   |
| failed    | Échoué     | red     |
| approved  | Approuvé   | green   |
| rejected  | Rejeté     | red     |
| cancelled | Annulé     | gray    |
| paid      | Payé       | green   |
| unpaid    | Non payé   | yellow  |

### Terminal Status

| Status    | Label      | Couleur |
| --------- | ---------- | ------- |
| active    | Actif      | green   |
| inactive  | Inactif    | gray    |
| suspended | Suspendu   | yellow  |
| revoked   | Révoqué    | red     |
| online    | En ligne   | green   |
| offline   | Hors ligne | gray    |

### Boolean Status

| Value | Label | Couleur |
| ----- | ----- | ------- |
| true  | Oui   | green   |
| false | Non   | gray    |

---

## CONCLUSION

### ✅ Objectif Atteint

Identifier et implémenter les éléments communs entre Admin et Merchant dans @nxpay/ui.

### 📊 Résultat

- 2 composables ajoutés (useLanguage, useStatusBadge)
- 2 composants ajoutés (LanguageSwitch, ButtonRefresh)
- Build réussi (148 kB)
- Exports centralisés

### 🎯 Impact

- Admin : peut utiliser i18n + badges
- Merchant : peut importer au lieu de dupliquer
- Nouveaux projets : i18n + badges prêts

### 🚀 Prochaine Étape

Continuer Phase 1 avec useHasRole + v-permission + useLogout (communs à Admin + Merchant).

---

**Dernière mise à jour :** 15 Octobre 2025 16:43  
**Build :** ✅ Réussi (148 kB)  
**Status :** ✅ Production Ready  
**Prochaine étape :** Phase 1 Migration (Permissions)
