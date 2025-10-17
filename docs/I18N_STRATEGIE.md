# Stratégie i18n - @nxpay/ui

**Date :** 15 Octobre 2025  
**Question :** La langue doit-elle être dans la bibliothèque UI ?

---

## ✅ RÉPONSE : OUI ET NON

### ✅ OUI - Infrastructure i18n dans @nxpay/ui

**Ce qui doit être dans la library :**

1. **useLanguage** - Composable de gestion langue
2. **LanguageSwitch** - Composant UI switcher
3. **Types Language** - Types TypeScript
4. **Traductions UI Library** - Labels des composants de la library

### ❌ NON - Traductions Apps spécifiques

**Ce qui doit rester dans Admin/Merchant :**

1. **Messages métier** - "Transaction approuvée", "Solde insuffisant"
2. **Labels pages** - "Tableau de bord", "Paramètres"
3. **Erreurs spécifiques** - Messages d'erreur métier
4. **Contenus dynamiques** - Descriptions, help texts

---

## ARCHITECTURE RECOMMANDÉE

### @nxpay/ui (Infrastructure)

```typescript
// Composable de base
export function useLanguage() {
  const currentLanguage = ref<'fr' | 'en'>('fr')
  const switchLanguage = () => {
    /* ... */
  }
  return { currentLanguage, switchLanguage }
}

// Traductions composants UI library uniquement
export const uiTranslations = {
  fr: {
    // Labels composants
    'button.submit': 'Soumettre',
    'button.cancel': 'Annuler',
    'button.back': 'Retour',
    'form.required': 'Champ requis',
    'table.noData': 'Aucune donnée',
    'pagination.previous': 'Précédent',
    'pagination.next': 'Suivant',
    // Status badges
    'status.active': 'Actif',
    'status.inactive': 'Inactif',
    'status.pending': 'En attente',
    'status.approved': 'Approuvé',
  },
  en: {
    'button.submit': 'Submit',
    'button.cancel': 'Cancel',
    'button.back': 'Back',
    'form.required': 'Required field',
    'table.noData': 'No data',
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.pending': 'Pending',
    'status.approved': 'Approved',
  },
}
```

### Admin/Merchant (Traductions métier)

```typescript
// Dans chaque app
export const appTranslations = {
  fr: {
    // Pages
    'pages.dashboard': 'Tableau de bord',
    'pages.users': 'Utilisateurs',
    'pages.transactions': 'Transactions',

    // Messages métier
    'transaction.approved': 'Transaction approuvée avec succès',
    'user.created': 'Utilisateur créé avec succès',
    'balance.insufficient': 'Solde insuffisant',

    // Erreurs spécifiques
    'error.payment.failed': 'Le paiement a échoué',
    'error.user.exists': 'Cet utilisateur existe déjà',
  },
  en: {
    'pages.dashboard': 'Dashboard',
    'pages.users': 'Users',
    'pages.transactions': 'Transactions',
    // ...
  },
}

// Utiliser les deux
const { t: tUi } = useUiTranslations() // Depuis @nxpay/ui
const { t: tApp } = useAppTranslations() // Depuis app locale
```

---

## IMPLÉMENTATION ACTUELLE

### ✅ Ce qui est fait

**Dans @nxpay/ui :**

```typescript
// useLanguage.ts
export function useLanguage() {
  const currentLanguage = ref<'fr' | 'en'>('fr')
  // Persistance localStorage
  // Switch automatique
  return { currentLanguage, switchLanguage, setLanguage }
}

// LanguageSwitch.vue
<LanguageSwitch variant="dropdown" />
```

**Avantage :** Infrastructure réutilisable

### ⚠️ Ce qui manque

**Traductions des composants UI :**

Actuellement, les labels sont en dur dans les composants :

```typescript
// useStatusBadge.ts - Labels en français uniquement
const getActiveBadge = (isActive: boolean) => ({
  label: isActive ? 'Actif' : 'Inactif', // ← EN DUR
  color: isActive ? 'green' : 'gray',
  size: 'sm',
})
```

**Problème :** Pas de support multilingue des labels

---

## SOLUTION RECOMMANDÉE

### Option 1 : Système i18n Complet (RECOMMANDÉ)

Créer un système de traduction pour la library + laisser apps gérer leurs traductions.

**Structure :**

```
@nxpay/ui
├── composables/
│   ├── useLanguage.ts (✅ existant)
│   └── useUiTranslations.ts (à créer)
├── i18n/
│   ├── fr.ts (traductions FR des composants)
│   └── en.ts (traductions EN des composants)
└── components/
    └── LanguageSwitch.vue (✅ existant)

Admin/Merchant
├── i18n/
│   ├── fr.ts (traductions FR app)
│   └── en.ts (traductions EN app)
└── composables/
    └── useAppTranslations.ts (utilise useLanguage depuis @nxpay/ui)
```

**Avantages :**

- Library multilingue
- Apps gèrent leurs traductions
- Cohérence globale
- Réutilisable

---

### Option 2 : Traductions dans Apps (ACTUEL)

Garder les labels en français dans la library, laisser apps gérer i18n.

**Structure actuelle :**

```
@nxpay/ui
├── useLanguage.ts (infrastructure)
├── LanguageSwitch.vue (UI)
└── Labels en français en dur

Admin/Merchant
├── i18n/ (toutes les traductions)
└── Utilise useLanguage de @nxpay/ui
```

**Avantages :**

- Plus simple
- Moins de maintenance
- Apps ont le contrôle

**Inconvénients :**

- Library pas multilingue
- Duplication traductions badges

---

## RECOMMANDATION

### 🎯 Hybride : Infrastructure dans Library + Traductions dans Apps

**Ce qui doit être dans @nxpay/ui :**

1. ✅ **useLanguage** (infrastructure)
2. ✅ **LanguageSwitch** (UI)
3. ✅ **useStatusBadge** (générateur badges)
4. ⏳ **useUiTranslations** (traductions composants library - à créer)

**Ce qui reste dans Admin/Merchant :**

1. ✅ Traductions métier
2. ✅ Messages erreurs spécifiques
3. ✅ Labels pages
4. ✅ Contenus dynamiques

**Pourquoi :**

- Library réutilisable (multilingue)
- Apps flexibles (traductions custom)
- Maintenance centralisée (infrastructure)
- Évolutif (ajout langues facile)

---

## IMPLÉMENTATION PROPOSÉE

### 1. Créer useUiTranslations

**Fichier :** `src/runtime/composables/useUiTranslations.ts`

```typescript
import { computed } from 'vue'
import { useLanguage } from './useLanguage'

const translations = {
  fr: {
    // Buttons
    'button.submit': 'Soumettre',
    'button.cancel': 'Annuler',
    'button.back': 'Retour',
    'button.save': 'Enregistrer',
    'button.delete': 'Supprimer',
    'button.edit': 'Modifier',
    'button.create': 'Créer',
    'button.refresh': 'Actualiser',

    // Forms
    'form.required': 'Ce champ est requis',
    'form.error': 'Erreur',
    'form.success': 'Succès',

    // Table
    'table.noData': 'Aucune donnée disponible',
    'table.loading': 'Chargement...',
    'table.page': 'Page',
    'table.of': 'sur',
    'table.rows': 'lignes',

    // Pagination
    'pagination.previous': 'Précédent',
    'pagination.next': 'Suivant',
    'pagination.showing': 'Affiche',
    'pagination.to': 'à',
    'pagination.on': 'sur',

    // Status
    'status.active': 'Actif',
    'status.inactive': 'Inactif',
    'status.pending': 'En attente',
    'status.approved': 'Approuvé',
    'status.rejected': 'Rejeté',
    'status.completed': 'Terminé',
    'status.failed': 'Échoué',
    'status.yes': 'Oui',
    'status.no': 'Non',

    // Confirm
    'confirm.cancel': 'Annuler',
    'confirm.confirm': 'Confirmer',

    // Common
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.export': 'Exporter',
    'common.loading': 'Chargement...',
  },
  en: {
    // Buttons
    'button.submit': 'Submit',
    'button.cancel': 'Cancel',
    'button.back': 'Back',
    'button.save': 'Save',
    'button.delete': 'Delete',
    'button.edit': 'Edit',
    'button.create': 'Create',
    'button.refresh': 'Refresh',

    // Forms
    'form.required': 'This field is required',
    'form.error': 'Error',
    'form.success': 'Success',

    // Table
    'table.noData': 'No data available',
    'table.loading': 'Loading...',
    'table.page': 'Page',
    'table.of': 'of',
    'table.rows': 'rows',

    // Pagination
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    'pagination.showing': 'Showing',
    'pagination.to': 'to',
    'pagination.on': 'on',

    // Status
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.pending': 'Pending',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    'status.completed': 'Completed',
    'status.failed': 'Failed',
    'status.yes': 'Yes',
    'status.no': 'No',

    // Confirm
    'confirm.cancel': 'Cancel',
    'confirm.confirm': 'Confirm',

    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.loading': 'Loading...',
  },
}

export function useUiTranslations() {
  const { currentLanguage } = useLanguage()

  const t = (key: string, fallback?: string): string => {
    const lang = currentLanguage.value
    return translations[lang]?.[key] || fallback || key
  }

  return { t }
}
```

### 2. Mettre à jour useStatusBadge

```typescript
import { useUiTranslations } from './useUiTranslations'

export function useStatusBadge() {
  const { t } = useUiTranslations()

  const getActiveBadge = (isActive: boolean) => ({
    label: isActive ? t('status.active') : t('status.inactive'),
    color: isActive ? 'green' : 'gray',
    size: 'sm',
  })

  // ... autres méthodes avec t()
}
```

### 3. Apps utilisent les deux

```vue
<script setup>
// Infrastructure depuis @nxpay/ui
import { useLanguage, useUiTranslations, useStatusBadge } from '@nxpay/ui'

// Traductions app depuis local
import { useAppTranslations } from '~/composables/useAppTranslations'

const { currentLanguage } = useLanguage()
const { t: tUi } = useUiTranslations() // Pour composants library
const { t: tApp } = useAppTranslations() // Pour app

// Badges utilisent automatiquement useUiTranslations
const { getTransactionStatusBadge } = useStatusBadge()
</script>
```

---

## AVANTAGES/INCONVÉNIENTS

### Infrastructure dans Library ✅

**Avantages :**

- ✅ Composants library multilingues
- ✅ Badges cohérents FR/EN
- ✅ Réutilisable tous projets
- ✅ Maintenance centralisée
- ✅ Ajout langues facile

**Inconvénients :**

- ⚠️ Plus de code dans library (+5 kB)
- ⚠️ Maintenance traductions library
- ⚠️ Fallback si traduction manquante

### Traductions Apps Séparées ✅

**Avantages :**

- ✅ Flexibilité totale apps
- ✅ Pas de dépendance library
- ✅ Traductions métier dans apps

**Inconvénients :**

- ⚠️ Duplication labels communs
- ⚠️ Apps doivent gérer tout

---

## DÉCISION FINALE RECOMMANDÉE

### 🎯 HYBRIDE : Le meilleur des deux mondes

```
@nxpay/ui
├── useLanguage (infrastructure) ✅
├── LanguageSwitch (UI) ✅
├── useUiTranslations (traductions library) ✅ À CRÉER
└── Labels composants library multilingues

Admin
├── useAppTranslations (traductions Admin)
├── Messages métier
└── Utilise useLanguage + useUiTranslations de @nxpay/ui

Merchant
├── useAppTranslations (traductions Merchant)
├── Messages métier
└── Utilise useLanguage + useUiTranslations de @nxpay/ui
```

---

## PLAN D'IMPLÉMENTATION

### Phase 1 : Infrastructure (1-2 jours)

1. ✅ useLanguage (déjà créé)
2. ✅ LanguageSwitch (déjà créé)
3. ⏳ Créer useUiTranslations
4. ⏳ Ajouter traductions FR/EN library
5. ⏳ Mettre à jour useStatusBadge pour utiliser useUiTranslations
6. ⏳ Mettre à jour composants pour utiliser useUiTranslations

### Phase 2 : Apps (1 jour)

1. Admin : Créer useAppTranslations
2. Merchant : Créer useAppTranslations
3. Tester cohabitation library + app translations

---

## EXEMPLE COMPLET

### Dans @nxpay/ui

```typescript
// composables/useUiTranslations.ts
export function useUiTranslations() {
  const { currentLanguage } = useLanguage()
  const t = (key: string) => translations[currentLanguage.value][key]
  return { t }
}

// composables/useStatusBadge.ts
export function useStatusBadge() {
  const { t } = useUiTranslations()

  return {
    getActiveBadge: (active) => ({
      label: active ? t('status.active') : t('status.inactive'),
      color: active ? 'green' : 'gray',
    }),
  }
}
```

### Dans Admin

```typescript
// composables/useAppTranslations.ts
export function useAppTranslations() {
  const { currentLanguage } = useLanguage() // Depuis @nxpay/ui

  const appTranslations = {
    fr: {
      'dashboard.title': 'Tableau de bord Admin',
      'user.created': 'Utilisateur créé avec succès',
    },
    en: {
      'dashboard.title': 'Admin Dashboard',
      'user.created': 'User created successfully',
    },
  }

  const t = (key: string) => appTranslations[currentLanguage.value][key]
  return { t }
}
```

### Utilisation dans Component

```vue
<template>
  <div>
    <!-- Titre depuis app -->
    <h1>{{ tApp('dashboard.title') }}</h1>

    <!-- Badge depuis library (utilise useUiTranslations automatiquement) -->
    <UBadge v-bind="getActiveBadge(user.is_active)" />
    <!-- → "Actif" en FR, "Active" en EN -->

    <!-- Message depuis app -->
    <p>{{ tApp('user.created') }}</p>
  </div>
</template>

<script setup>
import { useStatusBadge } from '@nxpay/ui'
import { useAppTranslations } from '~/composables/useAppTranslations'

const { getActiveBadge } = useStatusBadge()
const { t: tApp } = useAppTranslations()
</script>
```

---

## LANGUES SUPPORTÉES

### Actuellement

```
✅ FR - Français (défaut)
✅ EN - English
```

### Facilement Extensible

```typescript
export const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }, // Facile à ajouter
  { code: 'ar', name: 'العربية', flag: '🇲🇦' }, // Facile à ajouter
]
```

---

## COMPATIBILITÉ AVEC @nuxtjs/i18n

### Si Admin/Merchant utilisent @nuxtjs/i18n

```typescript
// Admin peut utiliser @nuxtjs/i18n ET useLanguage de @nxpay/ui
import { useLanguage } from '@nxpay/ui'
import { useI18n } from 'vue-i18n' // Depuis @nuxtjs/i18n

const { currentLanguage } = useLanguage()
const { t, locale } = useI18n()

// Synchroniser
watch(currentLanguage, (newLang) => {
  locale.value = newLang
})
```

**Résultat :** Les deux systèmes cohabitent

---

## CONCLUSION

### ✅ Recommandation Finale

**OUI, la langue doit être dans la bibliothèque, MAIS :**

1. **Infrastructure i18n** → @nxpay/ui ✅
   - useLanguage
   - LanguageSwitch
   - useUiTranslations (à créer)
   - Traductions composants library

2. **Traductions métier** → Admin/Merchant ✅
   - Messages business
   - Labels pages
   - Erreurs spécifiques
   - useAppTranslations

**Résultat :**

- Library multilingue et réutilisable
- Apps flexibles et personnalisables
- Maintenance optimale

---

## PROCHAINES ACTIONS

### Immédiat (Optionnel)

1. Créer `useUiTranslations`
2. Ajouter fichiers `i18n/fr.ts` et `i18n/en.ts`
3. Mettre à jour `useStatusBadge` pour utiliser traductions
4. Tests multilingues

**Durée :** 2-3 heures

### Ou Différer

Garder infrastructure actuelle et implémenter useUiTranslations plus tard si besoin.

---

**Recommandation :** ✅ **OUI, infrastructure i18n dans library**  
**Traductions métier :** ❌ **NON, dans apps**

**C'est la meilleure approche pour réutilisabilité + flexibilité !**

---

**Créé le :** 15 Octobre 2025  
**Statut :** Recommandation stratégique
