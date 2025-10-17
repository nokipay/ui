# 🎯 Séparation UI Library vs Applications

**Date :** 17 Octobre 2025  
**Objectif :** Définir ce qui va dans `@nxpay/ui` vs ce qui reste dans Admin/Merchant

---

## 📋 Principe Fondamental

### Règle d'Or

```
✅ UI Library (@nxpay/ui)
└── Composants/Utils GÉNÉRIQUES et RÉUTILISABLES
    └── Pas de logique métier spécifique
    └── Pas de dépendances API spécifiques
    └── Configuration via props/slots

❌ Applications (Admin/Merchant)
└── Composants/Utils SPÉCIFIQUES au métier
    └── Logique business complexe
    └── Intégration API spécifique
    └── Layouts complets de pages
    └── Routes et navigation métier
```

---

## 🧩 COMPOSANTS - Où les mettre ?

### ✅ Dans UI Library - Composants Génériques

#### Button, Badge, Card, Form, Table - OUI ✅
```typescript
// ✅ UI Library - Composant générique configurable
<NokiButton 
  color="primary" 
  label="Valider" 
  @click="handleClick"
/>

// ✅ Utilisé dans Admin
<NokiButton 
  color="primary" 
  label="Approuver Transaction" 
  @click="approveTransaction"
/>

// ✅ Utilisé dans Merchant
<NokiButton 
  color="primary" 
  label="Créer Paiement" 
  @click="createPayment"
/>
```

**Pourquoi :** Même composant, différents contextes

---

#### Modal, Alert, Loading, Empty - OUI ✅
```typescript
// ✅ UI Library - Composants d'interface génériques
<NokiModal 
  :open="isOpen" 
  title="Titre"
  @close="isOpen = false"
>
  <slot /> <!-- Contenu vient des apps -->
</NokiModal>

<NokiEmptyState 
  icon="inbox"
  title="Pas de données"
  description="Aucune transaction trouvée"
>
  <template #action>
    <NokiButton label="Créer" /> <!-- Action définie par l'app -->
  </template>
</NokiEmptyState>
```

**Pourquoi :** Structure générique, contenu spécifique via slots

---

#### Navigation (Sidebar, Navbar) - ⚠️ BASE ONLY

```typescript
// ✅ UI Library - Composant de BASE
// src/runtime/components/Navigation/Sidebar.vue
<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <slot name="header" />
    </div>
    
    <nav class="sidebar-nav">
      <slot name="navigation" /> <!-- Links fournis par l'app -->
    </nav>
    
    <div class="sidebar-footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

// ❌ Apps - Composant SPÉCIFIQUE avec logique métier
// admin/app/base/components/Sidebar/AdminSidebar.vue
<template>
  <NokiSidebar>
    <template #header>
      <img src="@/assets/logo.png" alt="Admin" />
      <h1>Admin Dashboard</h1>
    </template>
    
    <template #navigation>
      <!-- ❌ LOGIQUE MÉTIER : Permissions, roles, etc. -->
      <NokiSidebarLink 
        v-for="link in adminLinks"
        v-if="hasPermission(link.permission)"
        :key="link.id"
        :to="link.to"
        :icon="link.icon"
        :label="link.label"
        :badge="getNotificationCount(link.id)"
      />
    </template>
    
    <template #footer>
      <UserProfile :user="currentUser" />
      <NokiButton @click="logout">Déconnexion</NokiButton>
    </template>
  </NokiSidebar>
</template>

<script setup>
// ❌ LOGIQUE MÉTIER
const adminLinks = computed(() => {
  return [
    { id: 'dashboard', to: '/dashboard', icon: 'home', label: 'Tableau de bord', permission: 'view_dashboard' },
    { id: 'transactions', to: '/transactions', icon: 'money', label: 'Transactions', permission: 'view_transactions' },
    { id: 'users', to: '/users', icon: 'users', label: 'Utilisateurs', permission: 'manage_users' },
    // ... Spécifique Admin
  ]
})

const hasPermission = (permission) => {
  // ❌ Logique de permissions spécifique
  return currentUser.value.permissions.includes(permission)
}
</script>

// merchant/app/base/components/Sidebar/MerchantSidebar.vue
<template>
  <NokiSidebar>
    <template #navigation>
      <!-- ❌ LIENS DIFFÉRENTS pour Merchant -->
      <NokiSidebarLink to="/sales" label="Ventes" />
      <NokiSidebarLink to="/products" label="Produits" />
      <NokiSidebarLink to="/customers" label="Clients" />
      <!-- ... Spécifique Merchant -->
    </template>
  </NokiSidebar>
</template>
```

**Décision :**
- ✅ **`NokiSidebar.vue`** → UI Library (structure générique)
- ✅ **`NokiSidebarLink.vue`** → UI Library (lien générique)
- ❌ **`AdminSidebar.vue`** → Admin App (logique + liens spécifiques)
- ❌ **`MerchantSidebar.vue`** → Merchant App (logique + liens spécifiques)

---

#### Fintech Components - ⚠️ MIXTE

##### ✅ Dans UI Library - Composants Fintech GÉNÉRIQUES

```typescript
// ✅ AmountDisplay.vue - GÉNÉRIQUE
<NokiAmountDisplay 
  :amount="1234.56"
  currency="EUR"
  :show-currency="true"
/>
// Peut être utilisé partout : Admin, Merchant, Mobile

// ✅ TransactionStatus.vue - GÉNÉRIQUE
<NokiTransactionStatus 
  status="COMPLETED"
  :show-icon="true"
/>
// Badge de statut générique, couleurs configurables

// ✅ FormCurrencyInput.vue - GÉNÉRIQUE
<NokiFormCurrencyInput
  v-model="amount"
  currency="EUR"
  :min="0"
  :max="10000"
  @validate="handleValidation"
/>
// Input générique avec validation
```

**Pourquoi :** Composants de présentation/saisie génériques, pas de logique métier

---

##### ❌ Dans Apps - Composants Fintech SPÉCIFIQUES

```typescript
// ❌ TransactionDetailsCard.vue - SPÉCIFIQUE ADMIN
<template>
  <NokiCard>
    <div class="transaction-details">
      <!-- ❌ LOGIQUE MÉTIER : Affichage détails admin -->
      <NokiAmountDisplay :amount="transaction.amount" />
      <NokiTransactionStatus :status="transaction.status" />
      
      <!-- ❌ ADMIN ONLY : Actions de modération -->
      <div v-if="canModerate">
        <NokiButton @click="approveTransaction">Approuver</NokiButton>
        <NokiButton @click="rejectTransaction">Rejeter</NokiButton>
        <NokiButton @click="flagAsFraud">Signaler Fraude</NokiButton>
      </div>
      
      <!-- ❌ ADMIN ONLY : Historique audit -->
      <AuditTrail :transaction-id="transaction.id" />
      
      <!-- ❌ ADMIN ONLY : Détails compliance -->
      <ComplianceDetails :user-id="transaction.senderId" />
    </div>
  </NokiCard>
</template>

<script setup>
// ❌ LOGIQUE MÉTIER ADMIN
const canModerate = computed(() => {
  return user.value.role === 'ADMIN' && 
         user.value.permissions.includes('moderate_transactions')
})

const approveTransaction = async () => {
  // ❌ API Admin spécifique
  await $adminApi.transactions.approve(transaction.id)
  await auditLog.log('APPROVE_TRANSACTION', transaction.id)
}
</script>

// ❌ MerchantTransactionList.vue - SPÉCIFIQUE MERCHANT
<template>
  <div class="merchant-transactions">
    <!-- Utilise composants UI génériques -->
    <NokiTable :data="transactions">
      <template #amount="{ row }">
        <NokiAmountDisplay :amount="row.amount" />
      </template>
      
      <template #actions="{ row }">
        <!-- ❌ MERCHANT ONLY : Actions spécifiques -->
        <NokiButton @click="refund(row)">Rembourser</NokiButton>
        <NokiButton @click="downloadInvoice(row)">Facture</NokiButton>
      </template>
    </NokiTable>
  </div>
</template>
```

**Pourquoi :** Logique métier spécifique, actions différentes selon rôle

---

### ❌ JAMAIS dans UI Library

#### 1. Pages Complètes - JAMAIS ❌
```vue
<!-- ❌ PAS dans UI Library -->
<!-- admin/pages/transactions/index.vue -->
<template>
  <div>
    <AdminHeader />
    <AdminSidebar />
    <div class="content">
      <h1>Gestion des Transactions</h1>
      <TransactionFilters @filter="applyFilters" />
      <TransactionTable :data="transactions" />
      <TransactionPagination />
    </div>
  </div>
</template>
```

**Pourquoi :** Page complète = contexte métier spécifique

---

#### 2. Layouts Métier - JAMAIS ❌
```vue
<!-- ❌ PAS dans UI Library -->
<!-- admin/layouts/admin.vue -->
<template>
  <div class="admin-layout">
    <AdminSidebar :user="currentUser" />
    <div class="main">
      <AdminNavbar />
      <NuxtPage />
    </div>
  </div>
</template>
```

**Pourquoi :** Structure spécifique Admin/Merchant

---

#### 3. Composants avec Logique API Spécifique - JAMAIS ❌
```vue
<!-- ❌ PAS dans UI Library -->
<!-- admin/components/UserManager.vue -->
<template>
  <div>
    <NokiTable :data="users">
      <template #actions="{ row }">
        <!-- ❌ Actions Admin spécifiques -->
        <NokiButton @click="banUser(row)">Bannir</NokiButton>
        <NokiButton @click="verifyKYC(row)">Vérifier KYC</NokiButton>
        <NokiButton @click="adjustLimits(row)">Modifier Limites</NokiButton>
      </template>
    </NokiTable>
  </div>
</template>

<script setup>
// ❌ API Admin spécifique
const banUser = async (user) => {
  await $adminApi.users.ban(user.id)
  await sendNotification(user.id, 'account_banned')
  await auditLog.log('BAN_USER', user.id)
}
</script>
```

**Pourquoi :** Logique métier Admin, pas réutilisable

---

## 🪝 COMPOSABLES - Où les mettre ?

### ✅ Dans UI Library - Composables GÉNÉRIQUES

#### Formatting & Validation - OUI ✅
```typescript
// ✅ useCurrencyFormat.ts
export const useCurrencyFormat = () => {
  const format = (amount: number, currency: string, locale: string) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(amount)
  }
  return { format }
}

// ✅ useAmountValidation.ts
export const useAmountValidation = () => {
  const validate = (amount: number, options: ValidationOptions) => {
    // Validation générique : positif, max 2 décimales, etc.
    return AmountSchema.safeParse({ value: amount })
  }
  return { validate }
}

// ✅ useDateFormat.ts
// ✅ useDebounce.ts
// ✅ usePagination.ts
```

**Pourquoi :** Logique de présentation/validation générique

---

#### Math & Calculations - OUI ✅
```typescript
// ✅ useFeeCalculation.ts - AVEC configuration
export const useFeeCalculation = () => {
  const calculate = (amount: number, feeStructure: FeeStructure) => {
    // ✅ Algorithme générique de calcul
    // ❌ PAS de structure de frais hardcodée
    return calculateTieredFee(amount, feeStructure)
  }
  return { calculate }
}
```

**Pourquoi :** Algorithme générique, configuration vient de l'app

---

### ❌ Dans Apps - Composables SPÉCIFIQUES

#### API Calls Spécifiques - NON ❌
```typescript
// ❌ admin/composables/useAdminTransactions.ts
export const useAdminTransactions = () => {
  const { data, error } = useFetch('/api/admin/transactions', {
    // ❌ API Admin spécifique
  })
  
  const approveTransaction = async (id: string) => {
    // ❌ Logique Admin
    await $adminApi.transactions.approve(id)
    await checkComplianceRules(id)
    await notifyMerchant(id)
    await auditLog.log('APPROVE', id)
  }
  
  return { data, approveTransaction }
}

// ❌ merchant/composables/useMerchantSales.ts
export const useMerchantSales = () => {
  const { data } = useFetch('/api/merchant/sales', {
    // ❌ API Merchant spécifique
  })
  
  const createInvoice = async (saleId: string) => {
    // ❌ Logique Merchant
    await $merchantApi.invoices.create(saleId)
    await sendToCustomer(saleId)
  }
  
  return { data, createInvoice }
}
```

**Pourquoi :** Endpoints et logique spécifiques à chaque app

---

#### Business Rules Spécifiques - NON ❌
```typescript
// ❌ admin/composables/useComplianceRules.ts
export const useComplianceRules = () => {
  const checkKYC = async (userId: string) => {
    // ❌ Règles métier Admin spécifiques
    const user = await $adminApi.users.get(userId)
    const kycStatus = await $adminApi.kyc.check(userId)
    
    // Règles complexes spécifiques
    if (user.country === 'FR' && user.totalTransactions > 10000) {
      return requireEnhancedKYC(userId)
    }
    
    // ...
  }
  
  return { checkKYC }
}
```

**Pourquoi :** Règles métier complexes et évolutives, spécifiques Admin

---

### ⚠️ Dans UI Library - Composables BASE avec Configuration

#### useAuditLog - OUI ✅ MAIS avec configuration
```typescript
// ✅ UI Library - Composable générique
export const useAuditLog = (config?: AuditConfig) => {
  const log = async (event: AuditEvent) => {
    // ✅ Structure générique
    const entry = {
      eventId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      userId: event.userId,
      action: event.action,
      resource: event.resource,
      // ...
    }
    
    // ✅ Endpoint configurable
    const endpoint = config?.endpoint || '/api/audit'
    await $fetch(endpoint, {
      method: 'POST',
      body: entry
    })
  }
  
  return { log }
}

// ❌ Apps - Configuration spécifique
// admin/plugins/audit.ts
export default defineNuxtPlugin(() => {
  const audit = useAuditLog({
    endpoint: '/api/admin/audit', // ❌ Endpoint Admin
    includeFields: ['ip', 'userAgent', 'adminRole'] // ❌ Champs Admin
  })
  
  return { provide: { adminAudit: audit } }
})
```

**Pourquoi :** Mécanisme générique, configuration spécifique

---

## 🔧 UTILS - Où les mettre ?

### ✅ Dans UI Library - Utils GÉNÉRIQUES

#### Helpers - OUI ✅
```typescript
// ✅ precisionMath.ts - CRITIQUE
export class Money {
  // Calculs précis génériques
}

// ✅ numberFormatter.ts
export const formatNumber = (num: number, locale: string) => { ... }

// ✅ dateFormatter.ts
export const formatDate = (date: Date, format: string) => { ... }

// ✅ validator.ts
export const isValidEmail = (email: string) => { ... }

// ✅ feeCalculator.ts - Algorithme générique
export const calculateTieredFee = (amount: number, tiers: FeeTier[]) => {
  // ✅ Algorithme générique
  // ❌ PAS de tiers hardcodés
}
```

---

#### Constants GÉNÉRIQUES - OUI ✅
```typescript
// ✅ constants/statusColors.ts
export const STATUS_COLORS = {
  PENDING: 'yellow',
  PROCESSING: 'blue',
  COMPLETED: 'green',
  FAILED: 'red',
  CANCELLED: 'gray'
} as const

// ✅ constants/dateFormats.ts
export const DATE_FORMATS = {
  SHORT: 'DD/MM/YYYY',
  LONG: 'DD MMMM YYYY',
  ISO: 'YYYY-MM-DD'
} as const
```

---

#### Schemas Zod GÉNÉRIQUES - OUI ✅
```typescript
// ✅ schemas/amount.ts
export const AmountSchema = z.object({
  value: z.number().positive().finite(),
  currency: z.enum(['EUR', 'USD', 'GBP', 'XOF', 'XAF'])
})

// ✅ schemas/pagination.ts
export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  perPage: z.number().int().positive().max(100)
})
```

---

### ❌ Dans Apps - Utils SPÉCIFIQUES

#### Constants MÉTIER - NON ❌
```typescript
// ❌ admin/utils/constants/adminPermissions.ts
export const ADMIN_PERMISSIONS = {
  APPROVE_TRANSACTIONS: 'approve_transactions',
  BAN_USERS: 'ban_users',
  MODIFY_LIMITS: 'modify_limits',
  VIEW_AUDIT: 'view_audit',
  // ... Spécifique Admin
} as const

// ❌ merchant/utils/constants/merchantCategories.ts
export const MERCHANT_CATEGORIES = {
  RETAIL: 'retail',
  ECOMMERCE: 'ecommerce',
  RESTAURANT: 'restaurant',
  // ... Spécifique Merchant
} as const

// ❌ admin/utils/constants/complianceRules.ts
export const KYC_THRESHOLDS = {
  LEVEL_1: 1000, // € par mois
  LEVEL_2: 5000,
  LEVEL_3: 10000,
  // Règles métier Admin
} as const
```

**Pourquoi :** Règles métier qui évoluent différemment selon app

---

#### Fee Structures MÉTIER - NON ❌
```typescript
// ❌ admin/utils/constants/feeStructures.ts
export const ADMIN_FEE_STRUCTURES = {
  DEFAULT: [
    { min: 0, max: 100, rate: 0.02, fixed: 0.5 },
    { min: 100, max: 1000, rate: 0.015, fixed: 0.3 },
    { min: 1000, max: Infinity, rate: 0.01, fixed: 0.2 }
  ],
  PREMIUM: [
    { min: 0, max: Infinity, rate: 0.005, fixed: 0.1 }
  ]
  // ❌ Structures de frais qui peuvent changer
}

// ✅ UI Library - Seul l'algorithme
// utils/helpers/feeCalculator.ts
export const calculateTieredFee = (amount: number, structure: FeeTier[]) => {
  // ✅ Algorithme générique de calcul
  // Structure passée en paramètre
}
```

**Pourquoi :** Frais = business logic qui change, pas dans UI lib

---

## 📊 Tableau Récapitulatif

### Composants

| Composant                  | UI Lib | Admin | Merchant | Raison                                      |
| -------------------------- | ------ | ----- | -------- | ------------------------------------------- |
| Button, Badge, Card        | ✅      | ❌     | ❌        | Composants UI génériques                    |
| Form, Input, Select        | ✅      | ❌     | ❌        | Composants formulaire génériques            |
| Table, Pagination          | ✅      | ❌     | ❌        | Composants data génériques                  |
| Modal, Alert, Loading      | ✅      | ❌     | ❌        | Composants UI génériques                    |
| Empty, Tooltip, Dropdown   | ✅      | ❌     | ❌        | Composants UI génériques                    |
| **Sidebar (base)**         | ✅      | ❌     | ❌        | Structure générique                         |
| **AdminSidebar**           | ❌      | ✅     | ❌        | Liens + logique Admin                       |
| **MerchantSidebar**        | ❌      | ❌     | ✅        | Liens + logique Merchant                    |
| **AmountDisplay**          | ✅      | ❌     | ❌        | Affichage formaté générique                 |
| **TransactionStatus**      | ✅      | ❌     | ❌        | Badge statut générique                      |
| **FormCurrencyInput**      | ✅      | ❌     | ❌        | Input montant générique                     |
| **TransactionDetailsCard** | ❌      | ✅     | ❌        | Card avec logique Admin                     |
| **MerchantSalesWidget**    | ❌      | ❌     | ✅        | Widget spécifique Merchant                  |
| **UserManager**            | ❌      | ✅     | ❌        | Gestion users Admin                         |
| Pages complètes            | ❌      | ✅     | ✅        | Context métier complet                      |
| Layouts métier             | ❌      | ✅     | ✅        | Structure app spécifique                    |

### Composables

| Composable                | UI Lib | Admin | Merchant | Raison                                     |
| ------------------------- | ------ | ----- | -------- | ------------------------------------------ |
| useCurrencyFormat         | ✅      | ❌     | ❌        | Formatage générique                        |
| useAmountValidation       | ✅      | ❌     | ❌        | Validation générique                       |
| useDateFormat             | ✅      | ❌     | ❌        | Formatage générique                        |
| useDebounce               | ✅      | ❌     | ❌        | Utilitaire générique                       |
| usePagination             | ✅      | ❌     | ❌        | Logique pagination générique               |
| useFeeCalculation         | ✅      | ❌     | ❌        | Algorithme générique (config externe)      |
| useAuditLog (base)        | ✅      | ❌     | ❌        | Mécanisme générique (config externe)       |
| **useAdminTransactions**  | ❌      | ✅     | ❌        | API + logique Admin                        |
| **useMerchantSales**      | ❌      | ❌     | ✅        | API + logique Merchant                     |
| **useComplianceRules**    | ❌      | ✅     | ❌        | Règles métier Admin                        |
| **useUserPermissions**    | ❌      | ✅     | ✅        | Logique permissions spécifique             |

### Utils

| Util                      | UI Lib | Admin | Merchant | Raison                                   |
| ------------------------- | ------ | ----- | -------- | ---------------------------------------- |
| precisionMath             | ✅      | ❌     | ❌        | Calculs précis génériques                |
| numberFormatter           | ✅      | ❌     | ❌        | Formatage générique                      |
| dateFormatter             | ✅      | ❌     | ❌        | Formatage générique                      |
| feeCalculator (algo)      | ✅      | ❌     | ❌        | Algorithme générique                     |
| validator                 | ✅      | ❌     | ❌        | Validations génériques                   |
| Schemas Zod (base)        | ✅      | ❌     | ❌        | Schémas validation génériques            |
| **adminPermissions**      | ❌      | ✅     | ❌        | Constants métier Admin                   |
| **merchantCategories**    | ❌      | ❌     | ✅        | Constants métier Merchant                |
| **feeStructures (data)**  | ❌      | ✅     | ✅        | Données métier (pas algorithme)          |
| **complianceRules**       | ❌      | ✅     | ❌        | Règles métier Admin                      |
| **kycThresholds**         | ❌      | ✅     | ❌        | Seuils métier Admin                      |

---

## 🎯 Recommandations Finales

### Structure Proposée RÉVISÉE

```
📦 @nxpay/ui (UI Library)
├── 📂 components/
│   ├── Button, Badge, Card, Form, Table ✅
│   ├── Modal, Alert, Loading, Empty ✅
│   ├── Dropdown, Tabs, Tooltip ✅
│   ├── Navigation/
│   │   ├── Sidebar.vue ✅ (base générique)
│   │   ├── SidebarLink.vue ✅
│   │   ├── Navbar.vue ✅ (base générique)
│   │   └── Breadcrumbs.vue ✅
│   └── Fintech/
│       ├── AmountDisplay.vue ✅
│       ├── TransactionStatus.vue ✅
│       ├── FormCurrencyInput.vue ✅
│       └── WalletBalance.vue ✅
│
├── 📂 composables/
│   ├── useCurrencyFormat ✅
│   ├── useAmountValidation ✅
│   ├── useFeeCalculation ✅ (algo only)
│   ├── useDebounce ✅
│   ├── usePagination ✅
│   └── useAuditLog ✅ (base configurable)
│
└── 📂 utils/
    ├── helpers/
    │   ├── precisionMath ✅
    │   ├── numberFormatter ✅
    │   ├── feeCalculator ✅ (algo only)
    │   └── validator ✅
    ├── schemas/
    │   ├── amount ✅
    │   ├── pagination ✅
    │   └── transaction ✅ (base)
    └── constants/
        ├── statusColors ✅
        └── dateFormats ✅

---

📦 Admin App
├── 📂 components/
│   ├── Sidebar/
│   │   └── AdminSidebar.vue ❌ (liens + permissions Admin)
│   ├── Transaction/
│   │   ├── TransactionDetailsCard.vue ❌
│   │   ├── TransactionModerationPanel.vue ❌
│   │   └── TransactionAuditTrail.vue ❌
│   ├── User/
│   │   ├── UserManager.vue ❌
│   │   ├── KYCVerification.vue ❌
│   │   └── UserLimitsEditor.vue ❌
│   └── Compliance/
│       ├── ComplianceDashboard.vue ❌
│       └── RiskMonitor.vue ❌
│
├── 📂 composables/
│   ├── useAdminTransactions ❌
│   ├── useUserManagement ❌
│   ├── useComplianceRules ❌
│   └── useAdminPermissions ❌
│
├── 📂 utils/
│   ├── constants/
│   │   ├── adminPermissions ❌
│   │   ├── complianceRules ❌
│   │   ├── kycThresholds ❌
│   │   └── feeStructures ❌ (data)
│   └── helpers/
│       ├── permissionChecker ❌
│       └── complianceCalculator ❌
│
└── 📂 pages/
    ├── dashboard.vue ❌
    ├── transactions/
    ├── users/
    └── compliance/

---

📦 Merchant App
├── 📂 components/
│   ├── Sidebar/
│   │   └── MerchantSidebar.vue ❌
│   ├── Sales/
│   │   ├── SalesWidget.vue ❌
│   │   ├── InvoiceGenerator.vue ❌
│   │   └── CustomerList.vue ❌
│   └── Products/
│       └── ProductManager.vue ❌
│
├── 📂 composables/
│   ├── useMerchantSales ❌
│   ├── useCustomers ❌
│   └── useProducts ❌
│
├── 📂 utils/
│   ├── constants/
│   │   ├── merchantCategories ❌
│   │   └── productTypes ❌
│   └── helpers/
│       └── invoiceCalculator ❌
│
└── 📂 pages/
    ├── dashboard.vue ❌
    ├── sales/
    ├── products/
    └── customers/
```

---

## 🚨 Erreurs Courantes à Éviter

### ❌ Erreur 1 : Mettre trop dans UI Library
```typescript
// ❌ NE PAS FAIRE
// ui/components/AdminTransactionTable.vue
<template>
  <NokiTable>
    <!-- ❌ Logique Admin hardcodée -->
    <NokiButton @click="banUser">Bannir</NokiButton>
  </NokiTable>
</template>
```

**Problème :** Merchant ne peut pas utiliser, logique Admin hardcodée

---

### ❌ Erreur 2 : Dupliquer trop de code dans Apps
```typescript
// ❌ NE PAS FAIRE
// admin/utils/formatCurrency.ts
export const formatCurrency = (amount) => { ... } // ❌ Dupliqué

// merchant/utils/formatCurrency.ts  
export const formatCurrency = (amount) => { ... } // ❌ Dupliqué
```

**Solution :** Mettre dans UI Library et importer

---

### ❌ Erreur 3 : Composants UI trop spécifiques
```typescript
// ❌ NE PAS FAIRE
// ui/components/AdminApprovalButton.vue
<template>
  <NokiButton 
    label="Approuver Transaction" 
    @click="approveInAdminSystem"
  />
</template>
```

**Solution :** Composant générique + props/slots pour customisation

---

## ✅ Bonnes Pratiques

### ✅ Pattern 1 : Composant Base + Slots
```vue
<!-- ✅ UI Library - Base générique -->
<template>
  <div class="data-card">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<!-- ✅ Admin App - Usage spécifique -->
<NokiDataCard>
  <template #header>
    <h2>Transaction #{{ id }}</h2>
  </template>
  
  <template #default>
    <NokiAmountDisplay :amount="amount" />
    <AdminComplianceInfo :transaction-id="id" />
  </template>
  
  <template #actions>
    <NokiButton @click="approve">Approuver</NokiButton>
    <NokiButton @click="reject">Rejeter</NokiButton>
  </template>
</NokiDataCard>
```

---

### ✅ Pattern 2 : Composable avec Configuration
```typescript
// ✅ UI Library - Base configurable
export const useAuditLog = (config: AuditConfig) => {
  const log = async (event: AuditEvent) => {
    const endpoint = config.endpoint
    const includeFields = config.includeFields
    
    const entry = buildAuditEntry(event, includeFields)
    await $fetch(endpoint, { method: 'POST', body: entry })
  }
  
  return { log }
}

// ✅ Admin App - Configuration Admin
const audit = useAuditLog({
  endpoint: '/api/admin/audit',
  includeFields: ['adminRole', 'permissions']
})

// ✅ Merchant App - Configuration Merchant
const audit = useAuditLog({
  endpoint: '/api/merchant/audit',
  includeFields: ['merchantId', 'businessType']
})
```

---

### ✅ Pattern 3 : Algorithm in Library, Data in Apps
```typescript
// ✅ UI Library - Algorithme générique
export const calculateTieredFee = (
  amount: number, 
  structure: FeeTier[]
) => {
  let fee = 0
  let remaining = amount
  
  for (const tier of structure) {
    const applicable = Math.min(remaining, tier.max - tier.min)
    fee += applicable * tier.rate + tier.fixed
    remaining -= applicable
    if (remaining <= 0) break
  }
  
  return fee
}

// ❌ Admin App - Structure de frais Admin
const ADMIN_FEE_STRUCTURE = [
  { min: 0, max: 100, rate: 0.02, fixed: 0.5 },
  { min: 100, max: 1000, rate: 0.015, fixed: 0.3 },
  // ...
]

const fee = calculateTieredFee(amount, ADMIN_FEE_STRUCTURE)

// ❌ Merchant App - Structure de frais Merchant
const MERCHANT_FEE_STRUCTURE = [
  { min: 0, max: 500, rate: 0.025, fixed: 0.3 },
  // ...
]

const fee = calculateTieredFee(amount, MERCHANT_FEE_STRUCTURE)
```

---

## 📈 Résumé : Règles de Décision

### Checklist : Où mettre ce code ?

#### ✅ Mettre dans UI Library SI :
- [ ] Composant d'interface générique (bouton, input, card, etc.)
- [ ] Pas de logique métier spécifique
- [ ] Réutilisable dans Admin ET Merchant ET Mobile
- [ ] Configuration via props/slots
- [ ] Algorithme générique (pas de données métier hardcodées)
- [ ] Validation/formatage générique
- [ ] Helper mathématique ou string

#### ❌ Mettre dans Apps SI :
- [ ] Logique métier spécifique (permissions, rules, etc.)
- [ ] Appels API spécifiques à l'app
- [ ] Page complète
- [ ] Layout métier
- [ ] Données métier (fee structures, permissions, etc.)
- [ ] Actions métier (approve, ban, refund, etc.)
- [ ] Composant avec logique conditionnelle métier complexe

---

## 🎯 Résumé Final

### Architecture Révisée

**UI Library (@nxpay/ui) - ~35 composants**
- Composants UI génériques (Button, Card, Form, etc.) ✅
- Composants Navigation BASE (Sidebar, Navbar) ✅
- Composants Fintech GÉNÉRIQUES (AmountDisplay, Status) ✅
- Composables de formatage/validation ✅
- Helpers mathématiques (precisionMath) ✅
- Algorithmes génériques (feeCalculator) ✅
- Schemas Zod base ✅

**Admin App - ~50 composants**
- AdminSidebar avec liens spécifiques ❌
- Composants gestion users, transactions, compliance ❌
- Composables API Admin ❌
- Constants métier Admin ❌
- Pages et layouts Admin ❌

**Merchant App - ~40 composants**
- MerchantSidebar avec liens spécifiques ❌
- Composants ventes, produits, clients ❌
- Composables API Merchant ❌
- Constants métier Merchant ❌
- Pages et layouts Merchant ❌

---

**Principe d'Or :**
> "Si deux apps différentes (Admin + Merchant) ont besoin exactement du **même composant avec la même logique**, il va dans UI Library.
> Si elles ont besoin de **comportements différents**, seule la base générique va dans UI Library."

---

**Version :** 1.0  
**Status :** ✅ Final  
**Next :** Valider avec l'équipe et appliquer la séparation

