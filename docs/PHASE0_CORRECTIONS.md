# Phase 0 - Corrections Composants Existants

**Date de début :** 15 Octobre 2025  
**Statut :** En cours  
**Objectif :** Corriger les composants existants avant migration

---

## PROGRESSION

```
✅ Card Component - TERMINÉ
✅ FormWrapper - TERMINÉ
⏳ Navigation Components - EN COURS
⏳ useCurrencyFormat - EN ATTENTE
⏳ Tests - EN ATTENTE
⏳ Storybook - EN ATTENTE
```

---

## 1. CARD COMPONENT ✅ TERMINÉ

### Props Ajoutées

```typescript
// Nouvelles props depuis Admin
difference?: number            // Pourcentage vs période précédente
isLoading?: boolean           // État de chargement
color?: string                // Couleur border-top et icône
showIcon?: boolean            // Afficher/masquer l'icône
```

### Features Ajoutées

- ✅ **Loading State** : Affiche `...` pendant le chargement
- ✅ **Difference Percentage** : Affiche +X% ou -X% avec icône flèche
- ✅ **Border Color Configurable** : `color` prop pour personnaliser
- ✅ **Icon Toggle** : Peut masquer l'icône avec `showIcon`

### Exemples d'Utilisation

```vue
<!-- Card basique -->
<Card title="Solde Total" :number="5678900" icon="heroicons:banknotes" />

<!-- Card avec différence positive -->
<Card
  title="Revenus"
  :number="12345678"
  icon="heroicons:arrow-trending-up"
  :difference="15.5"
  accentColor="success"
  color="green-600"
/>

<!-- Card en chargement -->
<Card title="Chargement..." :number="0" icon="heroicons:arrow-path" :isLoading="true" />
```

### Stories Storybook Mises à Jour

- ✅ 8 stories créées
- ✅ Tous les nouveaux props documentés
- ✅ Galerie AllCards avec 8 variantes

### Fichiers Modifiés

- `src/runtime/components/Card/index.vue` (69 → 127 lignes)
- `src/runtime/components/Card/Card.stories.ts` (114 → 198 lignes)

---

## 2. FORMWRAPPER COMPONENT ✅ TERMINÉ

### Props Ajoutées

```typescript
subtitle?: string              // Sous-titre
icon?: string                  // Icône du header
successMessage?: string        // Message de succès
showBackButton?: boolean       // Afficher bouton retour
backButtonLabel?: string       // Label bouton retour
showBackground?: boolean       // Background bg-gray-50
```

### Events Ajoutés

```typescript
@back  // Émis quand bouton retour cliqué
@submit // Émis lors de la soumission
```

### Slots Ajoutés

```vue
<FormWrapper>
  <template #headerActions>
    <!-- Actions header (ex: bouton aide) -->
  </template>
  
  <!-- Contenu formulaire (slot default) -->
  
  <template #footer>
    <!-- Boutons d'action (ex: Annuler, Soumettre) -->
  </template>
</FormWrapper>
```

### Features Ajoutées

- ✅ **Header Complet** : Titre + sous-titre + icône + bouton retour
- ✅ **Message de Succès** : Zone verte pour succès
- ✅ **Background Configurable** : `bg-gray-50` optionnel
- ✅ **Footer Slot** : Zone pour boutons d'action
- ✅ **Header Actions Slot** : Actions supplémentaires dans header

### Exemples d'Utilisation

```vue
<FormWrapper
  title="Créer un Compte"
  subtitle="Remplissez le formulaire ci-dessous"
  icon="i-heroicons-user-plus"
  :error-message="errorMessage"
  :errors-message="errorsMessage"
  :success-message="successMessage"
  :show-back-button="true"
  back-button-label="Retour"
  @back="handleBack"
>
  <template #headerActions>
    <UButton icon="i-heroicons-question-mark-circle" label="Aide" />
  </template>

  <!-- Formulaire -->
  <form @submit.prevent="handleSubmit">
    <UFormGroup label="Nom">
      <UInput v-model="formData.name" />
    </UFormGroup>
  </form>

  <template #footer>
    <div class="flex justify-end gap-3">
      <UButton label="Annuler" @click="handleBack" />
      <UButton label="Créer" color="primary" @click="handleSubmit" />
    </div>
  </template>
</FormWrapper>
```

### Page Démo Créée

- ✅ `playground/pages/form-wrapper-demo.vue`
- ✅ Formulaire interactif complet
- ✅ 4 variantes démontrées

### Fichiers Modifiés

- `src/runtime/components/Form/Wrapper.vue` (89 → 153 lignes)
- `playground/pages/form-wrapper-demo.vue` (nouveau, 163 lignes)

---

## 3. NAVIGATION COMPONENTS ⏳ EN COURS

### Status

❌ **ABSENTS DANS @nxpay/ui** - À créer de toutes pièces

### Composants à Créer

#### 3.1 NavigationSidebar

**Fichier à créer :** `src/runtime/components/Navigation/Sidebar/index.vue`

**Fonctionnalités :**

- Sidebar fixe avec logo
- Liste de liens avec NavigationLink
- Footer avec overflow detection
- Scrollable avec shadow

**Référence Admin :** `admin/app/base/components/navigation/sidebar/index.vue`

#### 3.2 NavigationNavbar

**Fichier à créer :** `src/runtime/components/Navigation/Navbar/index.vue`

**Fonctionnalités :**

- Barre de navigation responsive
- Hamburger menu mobile
- Titre de page dynamique
- Actions header (notifications, etc.)

**Référence Admin :** `admin/app/base/components/navigation/navbar.vue`

#### 3.3 NavigationLink

**Fichier à créer :** `src/runtime/components/Navigation/Link/index.vue`

**Fonctionnalités :**

- Lien sidebar avec icône
- Support children routes
- Permissions intégrées (directive v-permission)
- Active state
- Collapse/expand children

**Référence Admin :** `admin/app/base/components/navigation/link.vue`

---

## 4. useCurrencyFormat ⏳ EN ATTENTE

### Problème Identifié

**Admin :** 499 lignes, support jusqu'à 1e+75 (énormes nombres)  
**@nxpay/ui :** 214 lignes, support limité (K/M/B/T seulement)

### À Ajouter

```typescript
// Support nombres énormes (comme Admin)
if (absAmount >= 1e75) {
  // Quattuorvigintillion
  formatted = (absAmount / 1e75).toFixed(1).replace('.', ',')
  suffix = 'Qv'
} else if (absAmount >= 1e72) {
  // Tresvigintillion
  formatted = (absAmount / 1e72).toFixed(1).replace('.', ',')
  suffix = 'Tv'
}
// ... + 48 autres suffixes

// Fonctions manquantes
const getExactAmount = (amount: number): string => {
  // Pour tooltips
}

const parseAmount = (formattedAmount: string): number => {
  // Parse montant formaté en nombre
}
```

---

## 5. TESTS ⏳ EN ATTENTE

### Tests à Mettre à Jour

#### Card.spec.ts

- ✅ Ajouter tests `difference` prop
- ✅ Ajouter tests `isLoading` state
- ✅ Ajouter tests `color` prop
- ✅ Ajouter tests `showIcon` prop

#### Form.spec.ts (FormWrapper)

- ✅ Ajouter tests `subtitle` prop
- ✅ Ajouter tests `icon` prop
- ✅ Ajouter tests `successMessage` prop
- ✅ Ajouter tests `showBackButton` prop
- ✅ Ajouter tests event `@back`
- ✅ Ajouter tests slots (`headerActions`, `footer`)

#### Navigation Tests (nouveaux)

- ⏳ Créer Sidebar.spec.ts
- ⏳ Créer Navbar.spec.ts
- ⏳ Créer Link.spec.ts

---

## 6. STORYBOOK ⏳ EN ATTENTE

### Stories à Mettre à Jour

#### Card

✅ **TERMINÉ** - 8 stories créées

#### FormWrapper

⏳ **À FAIRE** - Créer FormWrapper.stories.ts avec:

- Default story
- With errors
- With success
- With multiple errors
- Without background
- Without back button

#### Navigation (nouveaux)

⏳ **À FAIRE** - Créer stories pour:

- Sidebar.stories.ts
- Navbar.stories.ts
- Link.stories.ts

---

## STATISTIQUES

### Avant Corrections

```
Card Component:
├── 7 props
├── 69 lignes
└── 5 stories

FormWrapper:
├── 4 props
├── 89 lignes
└── 0 stories

Navigation:
├── ❌ ABSENTS
```

### Après Corrections (Objectif)

```
Card Component:
├── 11 props (+4)
├── 127 lignes (+58)
└── 8 stories (+3)

FormWrapper:
├── 10 props (+6)
├── 153 lignes (+64)
├── 2 events (nouveaux)
├── 2 slots (nouveaux)
└── 6 stories (nouveaux)

Navigation:
├── 3 composants (nouveaux)
├── ~300 lignes (nouveaux)
└── 6+ stories (nouveaux)
```

---

## TIMELINE

### Jour 1 (15 Oct) - Composants Existants

- [x] Card Component amélioré
- [x] FormWrapper refactoré
- [x] Documentation mise à jour

### Jour 2 (16 Oct) - Navigation

- [ ] NavigationSidebar créé
- [ ] NavigationNavbar créé
- [ ] NavigationLink créé

### Jour 3 (17 Oct) - Finitions

- [ ] useCurrencyFormat amélioré
- [ ] Tests mis à jour
- [ ] Stories Storybook complétées

---

## PROCHAINES ÉTAPES

### Immédiat

1. ✅ Marquer FormWrapper comme complété
2. ⏳ Créer NavigationSidebar
3. ⏳ Créer NavigationNavbar
4. ⏳ Créer NavigationLink

### Ensuite

5. Améliorer useCurrencyFormat
6. Mettre à jour tests
7. Compléter Storybook
8. Build final + documentation

---

**Dernière mise à jour :** 15 Octobre 2025 09:58
**Progression :** 2/8 terminés (25%)
**Temps estimé restant :** 2-3 jours
