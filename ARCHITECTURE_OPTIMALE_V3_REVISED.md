# 🏗️ Architecture Optimale NxPay UI v3.0 - RÉVISÉE

**Date :** 17 Octobre 2025  
**Version :** 3.0 Revised  
**Objectif :** UI Library générique - Apps gardent la logique métier

---

## 🎯 Philosophie de Design

### Principes Directeurs

1. ✅ **UI Library = Composants GÉNÉRIQUES uniquement** - Pas de logique métier
2. ✅ **Apps = Logique métier** - Admin/Merchant gardent leurs spécificités
3. ✅ **Configuration via Props/Slots** - Flexibilité maximale
4. ✅ **Type Safety** - TypeScript + Zod pour validation
5. ✅ **Developer Experience** - Auto-import, autocomplétion, documentation
6. ✅ **Security First** - Helpers sécurisés, pas de données sensibles
7. ✅ **Performance** - Bundle optimisé, tree-shaking, lazy loading

---

## ⚠️ RÈGLE D'OR : Séparation UI Library vs Apps

```
✅ UI LIBRARY (@nxpay/ui)
└── Composants d'interface GÉNÉRIQUES
    └── Pas de logique métier spécifique
    └── Pas d'appels API spécifiques
    └── Pas de rules business hardcodées
    └── Configuration via props/slots/params

❌ APPLICATIONS (Admin/Merchant)
└── Logique métier SPÉCIFIQUE
    └── Composants avec business logic
    └── Appels API spécifiques
    └── Pages et layouts complets
    └── Routes et navigation métier
    └── Constants métier (permissions, fee structures, etc.)
```

**Exemple concret :**
- ✅ `Sidebar.vue` (structure générique) → UI Library
- ❌ `AdminSidebar.vue` (liens + permissions Admin) → Admin App
- ❌ `MerchantSidebar.vue` (liens Merchant) → Merchant App

---

## 📦 Structure UI Library - CE QUI EST INCLUS

```
📂 @nxpay/ui/
│
├── 📂 src/
│   ├── 📄 module.ts                    # Nuxt module entry
│   │
│   └── 📂 runtime/
│       │
│       ├── 📄 plugin.ts                # Plugin global
│       │
│       ├── 📂 assets/
│       │   │
│       │   ├── 📂 tokens/              # Design Tokens (TypeScript)
│       │   │   ├── index.ts            # Export centralisé
│       │   │   ├── colors.ts           # ✅ Palette NxPay (5 couleurs)
│       │   │   ├── typography.ts       # ✅ Fonts, sizes, weights
│       │   │   ├── spacing.ts          # ✅ Espacements (8-point grid)
│       │   │   ├── shadows.ts          # ✅ Ombres + variants NxPay
│       │   │   ├── gradients.ts        # ✅ Dégradés signature
│       │   │   ├── animations.ts       # ✅ Transitions, keyframes
│       │   │   ├── breakpoints.ts      # ✅ Responsive
│       │   │   ├── zIndex.ts           # ✅ Hiérarchie z-index
│       │   │   └── README.md           # Documentation tokens
│       │   │
│       │   ├── 📂 styles/              # CSS Global
│       │   │   ├── index.css           # Import principal
│       │   │   ├── base.css            # Reset + base styles
│       │   │   ├── utilities.css       # Classes custom Tailwind
│       │   │   └── fonts.css           # @font-face declarations
│       │   │
│       │   ├── 📂 images/
│       │   │   ├── logo.png
│       │   │   ├── logo-dark.png
│       │   │   ├── cloud-offline.png
│       │   │   └── index.ts            # Export typed
│       │   │
│       │   └── 📂 icons/               # SVG icons génériques
│       │       ├── index.ts
│       │       └── *.svg
│       │
│       ├── 📂 components/              # [~38 composants GÉNÉRIQUES]
│       │   │
│       │   ├── 📄 index.ts             # Export centralisé
│       │   │
│       │   ├── 📂 Button/              # (4 composants)
│       │   │   ├── Button.vue          # ✅ Bouton générique
│       │   │   ├── ButtonAction.vue    # ✅ Bouton action
│       │   │   ├── ButtonGroup.vue     # 🆕 Groupe de boutons
│       │   │   └── ButtonIcon.vue      # 🆕 Bouton icon seul
│       │   │
│       │   ├── 📂 Badge/               # (3 composants)
│       │   │   ├── Badge.vue           # ✅ Badge générique
│       │   │   ├── BadgeStatus.vue     # 🆕 Badge avec dot indicator
│       │   │   └── BadgePulse.vue      # 🆕 Badge animé (live)
│       │   │
│       │   ├── 📂 Card/                # (3 composants)
│       │   │   ├── Card.vue            # ✅ Card générique
│       │   │   ├── CardStat.vue        # 🆕 Card pour KPI (structure)
│       │   │   └── CardEmpty.vue       # 🆕 Card état vide
│       │   │
│       │   ├── 📂 Form/                # (15 composants) ⭐ CRITIQUE
│       │   │   ├── Form.vue            # ✅ Formulaire base
│       │   │   ├── FormGroup.vue       # 🆕 Wrapper label+input+error
│       │   │   ├── FormInput.vue       # ✅ Input texte
│       │   │   ├── FormTextarea.vue    # 🆕 Zone de texte
│       │   │   ├── FormSelect.vue      # 🆕 Select stylé
│       │   │   ├── FormCheckbox.vue    # 🆕 Checkbox
│       │   │   ├── FormRadio.vue       # 🆕 Radio button
│       │   │   ├── FormSwitch.vue      # 🆕 Toggle switch
│       │   │   ├── FormPhoneInput.vue  # ✅ Input téléphone
│       │   │   ├── FormCurrencyInput.vue # 🆕 Input montant ⭐ FINTECH
│       │   │   ├── FormDatePicker.vue  # 🆕 Date picker
│       │   │   ├── FormFileUploader.vue # ✅ Upload fichier
│       │   │   ├── FormImageUploader.vue # 🆕 Upload image
│       │   │   ├── FormAuth.vue        # ✅ Form auth (email+password)
│       │   │   └── FormWrapper.vue     # ✅ Wrapper de form
│       │   │
│       │   ├── 📂 Table/               # (8 composants)
│       │   │   ├── Table.vue           # ✅ Table base
│       │   │   ├── TableWrapper.vue    # ✅ Wrapper de table
│       │   │   ├── TableLayout.vue     # ✅ Layout de table
│       │   │   ├── TablePagination.vue # 🆕 Pagination complète
│       │   │   ├── TablePaginationInfo.vue # ✅ Info pagination
│       │   │   ├── TableElementByPage.vue # ✅ Sélecteur nb éléments
│       │   │   ├── TableSearch.vue     # 🆕 Recherche intégrée
│       │   │   └── TableEmpty.vue      # 🆕 État vide de table
│       │   │
│       │   ├── 📂 Modal/               # (3 composants)
│       │   │   ├── Modal.vue           # 🆕 Modal standard
│       │   │   ├── ModalConfirm.vue    # 🆕 Modal confirmation
│       │   │   └── ModalDrawer.vue     # 🆕 Drawer/SlideOver
│       │   │
│       │   ├── 📂 Alert/               # (3 composants)
│       │   │   ├── Alert.vue           # 🆕 Alert inline
│       │   │   ├── AlertDialog.vue     # 🆕 Alert dialog
│       │   │   └── AlertBanner.vue     # 🆕 Alert banner top
│       │   │
│       │   ├── 📂 Loading/             # (4 composants)
│       │   │   ├── Preloader.vue       # ✅ Preloader full page
│       │   │   ├── Spinner.vue         # 🆕 Spinner simple
│       │   │   ├── Skeleton.vue        # 🆕 Skeleton loader
│       │   │   └── ProgressBar.vue     # 🆕 Barre de progression
│       │   │
│       │   ├── 📂 Empty/               # (3 composants)
│       │   │   ├── EmptyState.vue      # 🆕 État vide générique
│       │   │   ├── NoData.vue          # 🆕 Pas de données
│       │   │   └── NoResults.vue       # 🆕 Pas de résultats
│       │   │
│       │   ├── 📂 Navigation/          # (5 composants) ⚠️ STRUCTURE SEULEMENT
│       │   │   ├── Sidebar.vue         # ✅ Structure sidebar (slots)
│       │   │   ├── SidebarMobile.vue   # ✅ Structure sidebar mobile
│       │   │   ├── SidebarLink.vue     # 🆕 Lien de sidebar générique
│       │   │   ├── Navbar.vue          # ✅ Structure navbar (slots)
│       │   │   └── Breadcrumbs.vue     # 🆕 Fil d'ariane
│       │   │
│       │   ├── 📂 Dropdown/            # (2 composants)
│       │   │   ├── Dropdown.vue        # 🆕 Dropdown menu
│       │   │   └── DropdownItem.vue    # 🆕 Item de dropdown
│       │   │
│       │   ├── 📂 Tabs/                # (2 composants)
│       │   │   ├── Tabs.vue            # 🆕 Onglets
│       │   │   └── TabPanel.vue        # 🆕 Panneau d'onglet
│       │   │
│       │   ├── 📂 Tooltip/             # (1 composant)
│       │   │   └── Tooltip.vue         # 🆕 Tooltip
│       │   │
│       │   ├── 📂 Avatar/              # (2 composants)
│       │   │   ├── Avatar.vue          # 🆕 Avatar utilisateur
│       │   │   └── AvatarGroup.vue     # 🆕 Groupe d'avatars
│       │   │
│       │   ├── 📂 Fintech/             # (6 composants) ⭐⭐⭐ GÉNÉRIQUES FINTECH
│       │   │   ├── AmountDisplay.vue         # Affichage montant formaté
│       │   │   ├── AmountInput.vue           # Input montant avec validation
│       │   │   ├── CurrencyBadge.vue         # Badge devise
│       │   │   ├── TransactionStatus.vue     # Badge statut générique
│       │   │   ├── TransactionItem.vue       # Item de transaction (liste)
│       │   │   └── WalletBalance.vue         # Affichage balance wallet
│       │   │
│       │   ├── 📂 Utility/             # (4 composants)
│       │   │   ├── LanguageSwitch.vue  # ✅ Sélecteur de langue
│       │   │   ├── NetworkStatus.vue   # ✅ Statut réseau
│       │   │   ├── InitData.vue        # ✅ Init données
│       │   │   └── CopyButton.vue      # 🆕 Copier dans presse-papier
│       │   │
│       │   └── 📄 Header.vue           # ✅ Header générique (slots)
│       │
│       ├── 📂 composables/             # [15 composables GÉNÉRIQUES]
│       │   │
│       │   ├── 📄 index.ts
│       │   │
│       │   ├── 🔵 API & Errors/
│       │   │   ├── useApi.ts               # ✅ Wrapper API générique
│       │   │   ├── useApiErrorLabel.ts     # ✅ Labels d'erreurs
│       │   │   └── useHandleErrors.ts      # ✅ Gestion erreurs
│       │   │
│       │   ├── 🔵 Formatting/
│       │   │   ├── useCurrencyFormat.ts    # ✅ Format devises ⭐
│       │   │   ├── useNumberFormat.ts      # 🆕 Format nombres
│       │   │   └── useDateFormat.ts        # 🆕 Format dates
│       │   │
│       │   ├── 🔵 UI Interactions/
│       │   │   ├── useCustomConfirm.ts     # ✅ Modal confirmation
│       │   │   ├── useToast.ts             # 🆕 Notifications toast
│       │   │   ├── useModal.ts             # 🆕 Gestion modals
│       │   │   └── useCopyToClipboard.ts   # 🆕 Copier texte
│       │   │
│       │   ├── 🔵 Table & Data/
│       │   │   ├── useTableFilter.ts       # ✅ Filtres table
│       │   │   ├── useTableSort.ts         # 🆕 Tri table
│       │   │   ├── usePagination.ts        # 🆕 Pagination générique
│       │   │   └── useDebounce.ts          # 🆕 Debounce inputs
│       │   │
│       │   └── 🔵 Fintech Validation/      # ⭐ VALIDATION GÉNÉRIQUE
│       │       ├── useAmountValidation.ts  # 🆕 Validation montants
│       │       └── useFeeCalculation.ts    # 🆕 Calcul frais (algo)
│       │
│       ├── 📂 utils/
│       │   │
│       │   ├── 📂 constants/               # Constants GÉNÉRIQUES uniquement
│       │   │   ├── index.ts
│       │   │   ├── buttonStyles.ts         # ✅ Styles boutons
│       │   │   ├── commonState.ts          # ✅ États communs
│       │   │   ├── errorMessages.ts        # ✅ Messages erreurs (262)
│       │   │   ├── numberFormat.ts         # ✅ Formats nombres (33 scales)
│       │   │   ├── dateFormats.ts          # 🆕 Formats de dates
│       │   │   ├── statusColors.ts         # 🆕 Couleurs par statut
│       │   │   └── currencies.ts           # 🆕 Liste devises supportées
│       │   │
│       │   ├── 📂 enums/
│       │   │   ├── index.ts
│       │   │   ├── AppUsage.ts             # ✅ Usage app
│       │   │   ├── TransactionStatus.ts    # 🆕 Statuts transaction
│       │   │   └── TransactionType.ts      # 🆕 Types transaction
│       │   │
│       │   ├── 📂 helpers/
│       │   │   ├── index.ts
│       │   │   ├── numberFormatter.ts      # ✅ Format nombres
│       │   │   ├── dateFormatter.ts        # 🆕 Format dates
│       │   │   ├── stringFormatter.ts      # 🆕 Format strings
│       │   │   ├── validator.ts            # 🆕 Validations génériques
│       │   │   │
│       │   │   └── 🔵 fintech/             # ⭐⭐⭐ HELPERS FINTECH CRITIQUES
│       │   │       ├── precisionMath.ts      # Calculs précis (bigint) ⭐
│       │   │       ├── feeCalculator.ts      # Algo calcul frais tiered
│       │   │       └── currencyConverter.ts  # Conversion devises
│       │   │
│       │   ├── 📂 models/                  # Types TypeScript génériques
│       │   │   ├── index.ts
│       │   │   ├── base.ts                 # ✅ Timestamps, JsonResponse
│       │   │   ├── api.ts                  # 🆕 Types API
│       │   │   ├── form.ts                 # 🆕 Types formulaires
│       │   │   └── table.ts                # 🆕 Types tables
│       │   │
│       │   ├── 📂 schemas/                 # 🆕 Validation Zod GÉNÉRIQUE
│       │   │   ├── index.ts
│       │   │   ├── user.ts                 # 🆕 Schéma user (base)
│       │   │   ├── auth.ts                 # 🆕 Schéma auth
│       │   │   ├── pagination.ts           # 🆕 Schéma pagination
│       │   │   │
│       │   │   └── 🔵 fintech/             # ⭐ SCHEMAS FINTECH
│       │   │       ├── amount.ts             # Validation montants
│       │   │       ├── transaction.ts        # Schéma transaction (base)
│       │   │       ├── fee.ts                # Schéma frais
│       │   │       └── wallet.ts             # Schéma wallet
│       │   │
│       │   └── 📂 types/                   # Types TypeScript complexes
│       │       ├── index.ts
│       │       ├── components.ts           # Types props composants
│       │       └── composables.ts          # Types retours composables
│       │
│       └── 📄 README.md                    # Documentation
│
├── 📂 playground/                          # Playground de démo
│   ├── app.vue
│   ├── nuxt.config.ts
│   └── pages/                              # Pages de démo
│       ├── index.vue
│       ├── components.vue
│       ├── fintech.vue                     # 🆕 Démo fintech
│       └── ...
│
├── 📂 tests/                               # Tests (85%+ coverage)
│   ├── components/
│   ├── composables/
│   └── utils/
│
└── 📂 docs/                                # Documentation
    ├── INDEX.md
    ├── INSTALLATION_GUIDE.md
    ├── DESIGN_SYSTEM.md
    ├── FINTECH_COMPONENTS.md              # 🆕 Doc composants fintech
    └── ...
```

---

## ❌ CE QUI RESTE DANS LES APPS (Admin/Merchant)

### Composants Métier Spécifiques

```
📦 Admin App
├── 📂 components/
│   ├── 📂 Sidebar/
│   │   └── AdminSidebar.vue            # ❌ Liens + permissions Admin
│   │
│   ├── 📂 Transaction/
│   │   ├── TransactionDetailsCard.vue  # ❌ Card avec actions Admin
│   │   ├── TransactionModerationPanel.vue
│   │   └── TransactionAuditTrail.vue
│   │
│   ├── 📂 User/
│   │   ├── UserManager.vue             # ❌ Gestion users
│   │   ├── KYCVerification.vue         # ❌ Vérification KYC
│   │   └── UserLimitsEditor.vue        # ❌ Édition limites
│   │
│   ├── 📂 Compliance/
│   │   ├── ComplianceDashboard.vue     # ❌ Dashboard compliance
│   │   ├── RiskMonitor.vue             # ❌ Monitoring risques
│   │   └── AuditLog.vue                # ❌ Logs d'audit
│   │
│   └── 📂 Stats/
│       ├── AdminDashboardStats.vue     # ❌ Stats Admin spécifiques
│       ├── RevenueChart.vue            # ❌ Charts revenus
│       └── UserGrowthChart.vue         # ❌ Charts croissance
│
├── 📂 composables/
│   ├── useAdminTransactions.ts         # ❌ API transactions Admin
│   ├── useUserManagement.ts            # ❌ Gestion users
│   ├── useComplianceRules.ts           # ❌ Règles compliance
│   ├── useAdminPermissions.ts          # ❌ Permissions Admin
│   └── useAuditLog.ts                  # ❌ Logging audit (config Admin)
│
├── 📂 utils/
│   ├── constants/
│   │   ├── adminPermissions.ts         # ❌ Permissions Admin
│   │   ├── complianceRules.ts          # ❌ Règles KYC/AML
│   │   ├── kycThresholds.ts            # ❌ Seuils KYC
│   │   ├── feeStructures.ts            # ❌ DONNÉES de frais (pas algo)
│   │   └── transactionLimits.ts        # ❌ Limites transactions
│   │
│   └── helpers/
│       ├── permissionChecker.ts        # ❌ Vérification permissions
│       └── complianceCalculator.ts     # ❌ Calculs compliance
│
└── 📂 pages/
    ├── dashboard.vue
    ├── transactions/
    ├── users/
    └── compliance/

---

📦 Merchant App
├── 📂 components/
│   ├── 📂 Sidebar/
│   │   └── MerchantSidebar.vue         # ❌ Liens Merchant
│   │
│   ├── 📂 Sales/
│   │   ├── SalesWidget.vue             # ❌ Widget ventes
│   │   ├── InvoiceGenerator.vue        # ❌ Génération factures
│   │   └── CustomerList.vue            # ❌ Liste clients
│   │
│   └── 📂 Products/
│       └── ProductManager.vue          # ❌ Gestion produits
│
├── 📂 composables/
│   ├── useMerchantSales.ts             # ❌ API ventes
│   ├── useCustomers.ts                 # ❌ Gestion clients
│   └── useProducts.ts                  # ❌ Gestion produits
│
├── 📂 utils/
│   └── constants/
│       ├── merchantCategories.ts       # ❌ Catégories merchant
│       └── productTypes.ts             # ❌ Types de produits
│
└── 📂 pages/
    ├── dashboard.vue
    ├── sales/
    ├── products/
    └── customers/
```

---

## 📊 Statistiques Révisées

### Composants UI Library

| Catégorie    | Nombre | Détails                              |
| ------------ | ------ | ------------------------------------ |
| Button       | 4      | Button, Action, Group, Icon          |
| Badge        | 3      | Badge, Status, Pulse                 |
| Card         | 3      | Card, StatCard, Empty                |
| Form         | 15     | Inputs variés + CurrencyInput        |
| Table        | 8      | Table + pagination + search          |
| Modal        | 3      | Modal, Confirm, Drawer               |
| Alert        | 3      | Alert, Dialog, Banner                |
| Loading      | 4      | Preloader, Spinner, Skeleton, Bar    |
| Empty        | 3      | EmptyState, NoData, NoResults        |
| Navigation   | 5      | Sidebar, Navbar (BASE), Breadcrumbs  |
| Dropdown     | 2      | Dropdown, Item                       |
| Tabs         | 2      | Tabs, Panel                          |
| Tooltip      | 1      | Tooltip                              |
| Avatar       | 2      | Avatar, Group                        |
| **Fintech**  | 6      | Amount, Status, Wallet, etc.         |
| Utility      | 4      | Language, Network, Init, Copy        |
| Other        | 1      | Header                               |
| **TOTAL**    | **69** | **Composants génériques**            |

⚠️ **Note :** Nombre légèrement augmenté car on garde les composants génériques mais on retire la logique métier dans les apps

### Composables UI Library

| Catégorie         | Nombre | Détails                                    |
| ----------------- | ------ | ------------------------------------------ |
| API & Errors      | 3      | useApi, useApiErrorLabel, useHandleErrors  |
| Formatting        | 3      | Currency, Number, Date format              |
| UI Interactions   | 4      | Confirm, Toast, Modal, Copy                |
| Table & Data      | 4      | Filter, Sort, Pagination, Debounce         |
| Fintech           | 2      | AmountValidation, FeeCalculation (algo)    |
| **TOTAL**         | **16** | **Composables génériques**                 |

### Utils UI Library

| Catégorie         | Nombre | Détails                                   |
| ----------------- | ------ | ----------------------------------------- |
| Constants         | 8      | Génériques uniquement (pas de rules)      |
| Enums             | 3      | AppUsage, Status, Type                    |
| Helpers           | 6      | Formatters + fintech (precisionMath)      |
| Models            | 4      | Types génériques                          |
| Schemas (Zod)     | 7      | Validation runtime                        |
| Types             | 2      | Types complexes                           |
| **TOTAL**         | **30** | **Utils génériques**                      |

---

## 🔥 Phase 1 : Fintech Core (Priorité Critique)

### Composants à Créer (6 composants)

```typescript
✅ 1. precisionMath.ts          ⭐⭐⭐ CRITIQUE (éviter erreurs float)
✅ 2. AmountDisplay.vue         ⭐⭐⭐ Affichage formaté
✅ 3. FormCurrencyInput.vue     ⭐⭐⭐ Input avec validation
✅ 4. TransactionStatus.vue     ⭐⭐ Badge statut générique
✅ 5. WalletBalance.vue         ⭐⭐ Affichage balance
✅ 6. CurrencyBadge.vue         ⭐ Badge devise
```

### Composables (2 composables)

```typescript
✅ 1. useAmountValidation()     ⭐⭐⭐ Validation générique
✅ 2. useFeeCalculation()       ⭐⭐ Algorithme calcul (config externe)
```

### Schemas Zod (4 schemas)

```typescript
✅ 1. amount.ts                 ⭐⭐⭐ Validation montants
✅ 2. transaction.ts (base)     ⭐⭐ Structure transaction
✅ 3. fee.ts                    ⭐ Structure frais
✅ 4. wallet.ts                 ⭐ Structure wallet
```

### Helpers (3 helpers)

```typescript
✅ 1. precisionMath.ts          ⭐⭐⭐ MUST HAVE (BigInt)
✅ 2. feeCalculator.ts          ⭐⭐ Algorithme tiered
✅ 3. currencyConverter.ts      ⭐ Conversion devises
```

---

## 💡 Exemples : UI Library vs Apps

### Exemple 1 : Sidebar

```vue
<!-- ✅ UI LIBRARY - Structure générique -->
<!-- @nxpay/ui/components/Navigation/Sidebar.vue -->
<template>
  <aside class="sidebar" :class="sidebarClasses">
    <div v-if="$slots.header" class="sidebar-header">
      <slot name="header" />
    </div>
    
    <nav class="sidebar-nav">
      <slot name="navigation" />
    </nav>
    
    <div v-if="$slots.footer" class="sidebar-footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  collapsed?: boolean
  variant?: 'default' | 'compact'
}>()
// ✅ Pas de logique métier, seulement structure
</script>

<!-- ❌ ADMIN APP - Implémentation spécifique -->
<!-- admin/components/Sidebar/AdminSidebar.vue -->
<template>
  <NokiSidebar :collapsed="isCollapsed">
    <template #header>
      <img src="@/assets/logo.png" alt="Admin" />
      <h1 v-if="!isCollapsed">Admin Panel</h1>
    </template>
    
    <template #navigation>
      <NokiSidebarLink 
        v-for="link in visibleLinks"
        :key="link.id"
        :to="link.to"
        :icon="link.icon"
        :label="link.label"
        :badge="getNotificationCount(link.id)"
        :active="$route.path === link.to"
      />
    </template>
    
    <template #footer>
      <UserProfile :user="currentUser" />
    </template>
  </NokiSidebar>
</template>

<script setup lang="ts">
// ❌ Logique métier Admin
const ADMIN_LINKS = [
  { id: 'dashboard', to: '/dashboard', icon: 'home', label: 'Dashboard', permission: 'view_dashboard' },
  { id: 'transactions', to: '/transactions', icon: 'money', label: 'Transactions', permission: 'view_transactions' },
  { id: 'users', to: '/users', icon: 'users', label: 'Users', permission: 'manage_users' },
  // ...
]

const visibleLinks = computed(() => {
  return ADMIN_LINKS.filter(link => 
    currentUser.value.permissions.includes(link.permission)
  )
})

const getNotificationCount = (linkId: string) => {
  // ❌ Logique de notifications Admin
  if (linkId === 'transactions') return pendingTransactionsCount.value
  if (linkId === 'users') return pendingKycCount.value
  return 0
}
</script>
```

---

### Exemple 2 : Calcul de Frais

```typescript
// ✅ UI LIBRARY - Algorithme générique
// @nxpay/ui/utils/helpers/fintech/feeCalculator.ts

export interface FeeTier {
  min: number
  max: number
  rate: number
  fixed: number
}

export const calculateTieredFee = (
  amount: number, 
  tiers: FeeTier[]
): number => {
  // ✅ Algorithme générique de calcul
  let fee = 0
  let remaining = amount
  
  for (const tier of tiers) {
    if (remaining <= 0) break
    
    const applicable = Math.min(remaining, tier.max - tier.min)
    fee += (applicable * tier.rate) + tier.fixed
    remaining -= applicable
  }
  
  return fee
}

// ❌ ADMIN APP - Structures de frais Admin
// admin/utils/constants/feeStructures.ts

export const ADMIN_FEE_STRUCTURES = {
  DEFAULT: [
    { min: 0, max: 100, rate: 0.02, fixed: 0.5 },
    { min: 100, max: 1000, rate: 0.015, fixed: 0.3 },
    { min: 1000, max: Infinity, rate: 0.01, fixed: 0.2 }
  ] as FeeTier[],
  
  PREMIUM: [
    { min: 0, max: Infinity, rate: 0.005, fixed: 0.1 }
  ] as FeeTier[],
  
  ENTERPRISE: [
    { min: 0, max: Infinity, rate: 0.003, fixed: 0.05 }
  ] as FeeTier[]
}

// Usage dans Admin
import { calculateTieredFee } from '@nxpay/ui/utils'
import { ADMIN_FEE_STRUCTURES } from '@/utils/constants'

const userTier = user.accountType // 'DEFAULT', 'PREMIUM', 'ENTERPRISE'
const feeStructure = ADMIN_FEE_STRUCTURES[userTier]
const fee = calculateTieredFee(1250, feeStructure)
// Résultat : (100 * 0.02 + 0.5) + (900 * 0.015 + 0.3) + (250 * 0.01 + 0.2)

// ❌ MERCHANT APP - Structures différentes
// merchant/utils/constants/feeStructures.ts

export const MERCHANT_FEE_STRUCTURES = {
  BASIC: [
    { min: 0, max: 500, rate: 0.025, fixed: 0.3 },
    { min: 500, max: Infinity, rate: 0.02, fixed: 0.2 }
  ] as FeeTier[],
  
  PRO: [
    { min: 0, max: Infinity, rate: 0.015, fixed: 0.15 }
  ] as FeeTier[]
}
```

---

### Exemple 3 : Affichage Montant

```vue
<!-- ✅ UI LIBRARY - Composant générique -->
<!-- @nxpay/ui/components/Fintech/AmountDisplay.vue -->
<template>
  <span :class="amountClasses">
    <span v-if="showCurrency" class="currency-symbol">
      {{ currencySymbol }}
    </span>
    <span class="amount-value">{{ formattedAmount }}</span>
  </span>
</template>

<script setup lang="ts">
import { Money } from '@/utils/helpers/fintech/precisionMath'

interface Props {
  amount: number
  currency?: string
  locale?: string
  showCurrency?: boolean
  color?: 'default' | 'positive' | 'negative' | 'muted'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'EUR',
  locale: 'fr-FR',
  showCurrency: true,
  color: 'default',
  size: 'md'
})

// ✅ Logique de formatage GÉNÉRIQUE
const money = computed(() => new Money(props.amount, props.currency))

const formattedAmount = computed(() => {
  return money.value.format(props.locale)
})

const currencySymbol = computed(() => {
  const symbols = { EUR: '€', USD: '$', GBP: '£', XOF: 'CFA', XAF: 'CFA' }
  return symbols[props.currency] || props.currency
})

const amountClasses = computed(() => [
  'amount-display',
  `amount-${props.size}`,
  `amount-${props.color}`
])
</script>

<!-- ✅ UTILISABLE PARTOUT -->

<!-- Dans Admin -->
<template>
  <div class="transaction-card">
    <NokiAmountDisplay 
      :amount="transaction.amount" 
      :currency="transaction.currency"
      color="positive"
      size="lg"
    />
  </div>
</template>

<!-- Dans Merchant -->
<template>
  <div class="sale-summary">
    <NokiAmountDisplay 
      :amount="sale.total" 
      currency="USD"
      :show-currency="true"
    />
  </div>
</template>

<!-- Dans Mobile -->
<template>
  <div class="wallet">
    <NokiAmountDisplay 
      :amount="wallet.balance" 
      currency="XOF"
      size="xl"
      color="positive"
    />
  </div>
</template>
```

---

## 🎯 Décisions d'Architecture Clés

### 1. ✅ Composants BASE avec Slots

**Principe :** UI Library fournit la structure, Apps fournissent le contenu

```vue
<!-- UI Library -->
<NokiSidebar>
  <template #navigation>
    <slot name="navigation" />
  </template>
</NokiSidebar>

<!-- Apps injectent le contenu -->
<NokiSidebar>
  <template #navigation>
    <AdminLinks />
  </template>
</NokiSidebar>
```

---

### 2. ✅ Algorithmes in Library, Data in Apps

**Principe :** Séparation algorithm (générique) et data (métier)

```typescript
// ✅ Library : Algorithme
export const calculateTieredFee = (amount, tiers) => { ... }

// ❌ Apps : Données
export const ADMIN_FEE_STRUCTURES = { ... }
```

---

### 3. ✅ PrecisionMath avec BigInt

**Principe :** Jamais de floats pour l'argent

```typescript
// ❌ JAMAIS
const total = 0.1 + 0.2 // = 0.30000000000000004

// ✅ TOUJOURS
const a = new Money(0.1)
const b = new Money(0.2)
const total = a.add(b) // = 0.3
```

---

### 4. ✅ Validation Zod Runtime

**Principe :** Type safety + validation runtime

```typescript
// UI Library : Schema générique
export const AmountSchema = z.object({
  value: z.number().positive().finite(),
  currency: z.enum(['EUR', 'USD', 'GBP', 'XOF', 'XAF'])
})

// Apps : Validation avec rules métier
const result = AmountSchema.safeParse({ value: 1000, currency: 'EUR' })
if (result.success) {
  // Puis vérifier limites métier
  await checkUserLimits(result.data.value)
}
```

---

### 5. ✅ Pas de Layouts Métier dans UI Library

**Principe :** Layouts = contexte métier → Apps

```
❌ UI Library : LayoutAuth, LayoutAdmin, LayoutDashboard
✅ Apps : Créent leurs propres layouts avec composants UI
```

---

### 6. ✅ Constants Génériques vs Métier

**Principe :** Séparer constants génériques et règles métier

```typescript
// ✅ UI Library - Génériques
export const STATUS_COLORS = {
  PENDING: 'yellow',
  COMPLETED: 'green',
  FAILED: 'red'
}

export const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'GBP', 'XOF', 'XAF']

// ❌ Apps - Métier
export const ADMIN_PERMISSIONS = { ... }
export const KYC_THRESHOLDS = { ... }
export const FEE_STRUCTURES = { ... }
```

---

## 📈 Roadmap de Migration

### Phase 0 : Préparation (1 semaine)
```bash
✅ Setup Zod
✅ Créer structure dossiers
✅ Documenter séparation UI/Apps
✅ Valider avec équipe
```

### Phase 1 : Fintech Core (3-4 semaines) ⭐⭐⭐
```bash
✅ precisionMath.ts (BigInt)
✅ AmountDisplay.vue
✅ FormCurrencyInput.vue
✅ useAmountValidation.ts
✅ Schemas Zod (amount, transaction, fee, wallet)
✅ Tests 100% coverage
```

### Phase 2 : UX Essentials (3 semaines) ⭐⭐
```bash
✅ Loading (Spinner, Skeleton, ProgressBar)
✅ Empty (EmptyState, NoData, NoResults)
✅ Alert (Alert, Dialog, Banner)
✅ Modal (Modal, Confirm, Drawer)
✅ Dropdown, Tabs, Tooltip
✅ Tests + Storybook
```

### Phase 3 : Forms & Tables (2 semaines) ⭐
```bash
✅ Form components (Group, Textarea, Select, Checkbox, etc.)
✅ Table enrichments (Search, Filters, Pagination)
✅ Composables (useTableSort, usePagination)
✅ Tests + Storybook
```

### Phase 4 : Polish (2 semaines)
```bash
✅ Badge variants, Avatar, Card variants
✅ Documentation complète
✅ Migration guide
✅ Release v3.0
```

---

## ✅ Checklist de Validation

Avant de mettre un élément dans UI Library :

### Questions à Se Poser

- [ ] ✅ Peut être utilisé par Admin **ET** Merchant **ET** Mobile ?
- [ ] ✅ Pas de logique métier spécifique hardcodée ?
- [ ] ✅ Pas d'appels API spécifiques à une app ?
- [ ] ✅ Configuration possible via props/slots/params ?
- [ ] ✅ Pas de rules business (permissions, limites, etc.) ?
- [ ] ✅ Réutilisable tel quel ou avec config simple ?

**Si UNE SEULE réponse est NON → Mettre dans l'App, pas dans UI Library !**

---

## 🎓 Résumé Final

### UI Library (@nxpay/ui)

**Contenu :** ~38 composants + 16 composables + 30 utils
- ✅ Composants d'interface génériques
- ✅ Composants Fintech génériques (affichage, saisie)
- ✅ Composables de formatage/validation
- ✅ Helpers mathématiques (precisionMath)
- ✅ Algorithmes génériques (feeCalculator)
- ✅ Schemas Zod base
- ✅ Design tokens TypeScript
- ❌ Pas de logique métier
- ❌ Pas de rules business
- ❌ Pas de layouts métier
- ❌ Pas de pages

### Applications (Admin/Merchant)

**Contenu :** ~50-60 composants chacune
- ✅ Composants avec logique métier
- ✅ Sidebars avec liens spécifiques
- ✅ Composables API spécifiques
- ✅ Constants métier (permissions, fee structures, limits)
- ✅ Pages et layouts complets
- ✅ Routes et navigation métier

---

**Principe Final :**

> **"UI Library = HOW (comment afficher/formater/calculer)"**  
> **"Apps = WHAT (quoi afficher, quelles actions, quelles règles)"**

---

**Version :** 3.0 Revised  
**Status :** ✅ Validé  
**Next :** Implémentation Phase 1 (Fintech Core)

