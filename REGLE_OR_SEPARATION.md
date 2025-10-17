# 🎯 RÈGLE D'OR - Séparation @nxpay/ui vs Projets

**Date :** 17 Octobre 2025  
**Principe Fondamental :** Réutilisabilité vs Spécificité

---

## 📏 LA RÈGLE D'OR

```
┌────────────────────────────────────────────────────────┐
│  RÈGLE D'OR                                            │
├────────────────────────────────────────────────────────┤
│  Si c'est IDENTIQUE dans toutes les apps → @nxpay/ui  │
│  Si c'est SPÉCIFIQUE à une app → Dans le projet       │
└────────────────────────────────────────────────────────┘
```

---

## 📦 @NXPAY/UI - Bibliothèque Générique

```
┌────────────────────────────────────────────────────────┐
│  @NXPAY/UI (UI LIBRARY)                                │
├────────────────────────────────────────────────────────┤
│  ✅ Schemas BASE réutilisables                         │
│  ✅ Factories pour créer schemas custom                │
│  ✅ Validations GÉNÉRIQUES                             │
│  ✅ Composants UI purs                                 │
│  ✅ Algorithmes sans données métier                    │
│  ✅ Helpers mathématiques/formatage                    │
│                                                        │
│  ❌ PAS de logique métier                              │
│  ❌ PAS de règles business spécifiques                 │
│  ❌ PAS de données hardcodées                          │
│  ❌ PAS d'appels API spécifiques                       │
└────────────────────────────────────────────────────────┘
```

### Pourquoi dans la librairie ?

```
✅ Réutilisables dans TOUS les projets
   → Admin, Merchant, Agent, Customer

✅ Validation UNIFORME des données de base
   → Cohérence garantie

✅ DRY (Don't Repeat Yourself)
   → Pas de duplication de code

✅ Maintenance centralisée
   → Fix une fois, benefit partout

✅ Garantit cohérence validation entre apps
   → Même règles de base partout
```

---

## 🏢 PROJETS - Applications Métier

```
┌────────────────────────────────────────────────────────┐
│  PROJETS (Admin/Merchant/Agent/Customer)               │
├────────────────────────────────────────────────────────┤
│  ✅ Schemas MÉTIER spécifiques                         │
│  ✅ Validations COMPLEXES                              │
│  ✅ Règles BUSINESS                                    │
│  ✅ COMPOSE les schemas de base                        │
│  ✅ Extends les composants UI                          │
│  ✅ Données métier (fee structures, limits, etc.)      │
│                                                        │
│  ❌ NE duplique PAS les validations base               │
│  ❌ NE réimplémente PAS les helpers                    │
└────────────────────────────────────────────────────────┘
```

### Pourquoi dans le projet ?

```
✅ Logique métier SPÉCIFIQUE à l'app
   → Règles différentes Admin vs Merchant

✅ Validations complexes avec règles business
   → Permissions, limites, compliance

✅ Évolutions indépendantes de la librairie
   → Pas de blocking sur lib updates

✅ Pas de couplage fort entre apps
   → Admin ≠ Merchant ≠ Agent

✅ Plus rapide à modifier sans toucher la lib
   → Deploy indépendant
```

---

## 🎯 Exemples Concrets

### Exemple 1 : Validation de Montant

#### ✅ Dans @nxpay/ui - Schema BASE
```typescript
// src/runtime/utils/schemas/fintech/amount.ts

export const AmountSchema = z.object({
  value: z.number()
    .positive('Le montant doit être positif')
    .finite('Le montant doit être fini')
    .refine(
      (val) => (val * 100) % 1 === 0,
      'Maximum 2 décimales autorisées'
    ),
  currency: z.enum(['EUR', 'USD', 'GBP', 'XOF', 'XAF'])
})

// ✅ FACTORY pour custom limits
export const createAmountSchema = (options?: {
  min?: number
  max?: number
}) => {
  // Retourne schema configurable
}
```

**Pourquoi ici ?**
- Validation de base IDENTIQUE partout
- Format montant (positif, 2 décimales) = universel
- Devises supportées = partagées

---

#### ❌ Dans Projets - Validations MÉTIER

**Admin :**
```typescript
// admin/utils/schemas/adminTransaction.ts

import { AmountSchema } from '@nxpay/ui/schemas'

// ❌ COMPOSE le schema de base
export const AdminTransactionAmountSchema = AmountSchema.extend({
  value: z.number()
    .refine(
      (val) => val <= ADMIN_MAX_TRANSACTION, // Règle Admin
      `Maximum Admin : ${ADMIN_MAX_TRANSACTION}`
    )
    .refine(
      async (val) => await checkAdminLimits(val), // Vérif async Admin
      'Dépassement limite administrateur'
    )
})

// ❌ Règles métier Admin
export const ADMIN_TRANSACTION_RULES = {
  requiresApproval: (amount: number) => amount > 10000,
  requiresKYC: (amount: number) => amount > 5000,
  requiresCompliance: (amount: number) => amount > 50000
}
```

**Merchant :**
```typescript
// merchant/utils/schemas/merchantPayment.ts

import { AmountSchema } from '@nxpay/ui/schemas'

// ❌ COMPOSE avec règles Merchant différentes
export const MerchantPaymentAmountSchema = AmountSchema.extend({
  value: z.number()
    .refine(
      (val) => val <= merchantAccount.dailyLimit, // Règle Merchant
      'Limite journalière dépassée'
    )
    .refine(
      (val) => val >= MERCHANT_MIN_PAYMENT, // Min différent
      `Paiement minimum : ${MERCHANT_MIN_PAYMENT}`
    )
})

// ❌ Règles métier Merchant
export const MERCHANT_PAYMENT_RULES = {
  hasSufficientBalance: (amount: number) => 
    amount <= merchantWallet.balance,
  withinMonthlyLimit: (amount: number) => 
    monthlyTotal + amount <= merchantAccount.monthlyLimit
}
```

**Pourquoi dans projets ?**
- Limites différentes Admin vs Merchant
- Règles business spécifiques
- Évolution indépendante

---

### Exemple 2 : Sidebar Navigation

#### ✅ Dans @nxpay/ui - Structure BASE
```vue
<!-- src/runtime/components/Navigation/Sidebar.vue -->

<template>
  <aside class="noki-sidebar">
    <div class="sidebar-header">
      <slot name="header" />
    </div>
    
    <nav class="sidebar-nav">
      <!-- ✅ Apps fournissent les liens -->
      <slot name="navigation" />
    </nav>
    
    <div class="sidebar-footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

<script setup lang="ts">
// ✅ Seulement structure et styles
// ❌ PAS de liens hardcodés
// ❌ PAS de logique permissions
</script>
```

**Pourquoi ici ?**
- Structure sidebar = identique partout
- Styles = cohérence design
- Slots = flexibilité max

---

#### ❌ Dans Projets - Implémentation MÉTIER

**Admin :**
```vue
<!-- admin/components/Sidebar/AdminSidebar.vue -->

<template>
  <NokiSidebar>
    <template #navigation>
      <!-- ❌ Liens spécifiques Admin -->
      <NokiSidebarLink
        v-for="link in visibleLinks"
        v-if="hasPermission(link.permission)"
        :key="link.id"
        :to="link.to"
        :icon="link.icon"
        :label="link.label"
        :badge="getNotificationCount(link.id)"
      />
    </template>
  </NokiSidebar>
</template>

<script setup lang="ts">
// ❌ Logique métier Admin
const ADMIN_LINKS = [
  { id: 'dashboard', to: '/dashboard', permission: 'view_dashboard' },
  { id: 'transactions', to: '/transactions', permission: 'manage_transactions' },
  { id: 'users', to: '/users', permission: 'manage_users' },
  { id: 'compliance', to: '/compliance', permission: 'view_compliance' }
]

const visibleLinks = computed(() => {
  return ADMIN_LINKS.filter(link => 
    currentUser.value.permissions.includes(link.permission)
  )
})

const getNotificationCount = (linkId: string) => {
  if (linkId === 'transactions') return pendingTransactionsCount.value
  if (linkId === 'users') return pendingKycCount.value
  return 0
}
</script>
```

**Merchant :**
```vue
<!-- merchant/components/Sidebar/MerchantSidebar.vue -->

<template>
  <NokiSidebar>
    <template #navigation>
      <!-- ❌ Liens totalement différents -->
      <NokiSidebarLink to="/sales" label="Ventes" :badge="newSalesCount" />
      <NokiSidebarLink to="/products" label="Produits" />
      <NokiSidebarLink to="/customers" label="Clients" />
      <NokiSidebarLink to="/analytics" label="Analytiques" />
    </template>
  </NokiSidebar>
</template>

<script setup lang="ts">
// ❌ Logique métier Merchant (différente d'Admin)
const MERCHANT_LINKS = [
  { to: '/sales', label: 'Ventes' },
  { to: '/products', label: 'Produits' },
  { to: '/customers', label: 'Clients' }
]
</script>
```

**Pourquoi dans projets ?**
- Liens complètement différents Admin vs Merchant
- Permissions différentes
- Logique de notifications différente

---

### Exemple 3 : Calcul de Frais

#### ✅ Dans @nxpay/ui - ALGORITHME
```typescript
// src/runtime/composables/useFeeCalculation.ts

export const useFeeCalculation = () => {
  const calculateTieredFee = (
    amount: number,
    tiers: FeeTier[] // ✅ Structure passée en paramètre
  ): FeeCalculationResult => {
    // ✅ Algorithme générique de calcul
    let totalFee = 0
    let remaining = amount
    
    for (const tier of tiers) {
      const applicable = Math.min(remaining, tier.max - tier.min)
      totalFee += (applicable * tier.rate) + tier.fixed
      remaining -= applicable
    }
    
    return { totalFee, ... }
  }
  
  return { calculateTieredFee }
}
```

**Pourquoi ici ?**
- Algorithme = identique pour tous
- Pas de données hardcodées
- Configuré par paramètres

---

#### ❌ Dans Projets - DONNÉES MÉTIER

**Admin :**
```typescript
// admin/utils/constants/feeStructures.ts

// ❌ Structures de frais Admin
export const ADMIN_FEE_STRUCTURES = {
  DEFAULT: [
    { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
    { min: 100, max: 1000, rate: 0.015, fixed: 0.30 },
    { min: 1000, max: Infinity, rate: 0.01, fixed: 0.20 }
  ],
  
  PREMIUM: [
    { min: 0, max: Infinity, rate: 0.005, fixed: 0.10 }
  ],
  
  ENTERPRISE: [
    { min: 0, max: Infinity, rate: 0.003, fixed: 0.05 }
  ]
} as const

// ❌ Règles de sélection de structure
export const selectFeeStructure = (user: User) => {
  if (user.accountType === 'ENTERPRISE') return ADMIN_FEE_STRUCTURES.ENTERPRISE
  if (user.accountType === 'PREMIUM') return ADMIN_FEE_STRUCTURES.PREMIUM
  return ADMIN_FEE_STRUCTURES.DEFAULT
}

// Usage
import { useFeeCalculation } from '@nxpay/ui'
const { calculateTieredFee } = useFeeCalculation()

const userStructure = selectFeeStructure(currentUser)
const fee = calculateTieredFee(amount, userStructure)
```

**Merchant :**
```typescript
// merchant/utils/constants/feeStructures.ts

// ❌ Structures complètement différentes pour Merchant
export const MERCHANT_FEE_STRUCTURES = {
  BASIC: [
    { min: 0, max: 500, rate: 0.025, fixed: 0.30 },
    { min: 500, max: Infinity, rate: 0.02, fixed: 0.20 }
  ],
  
  PRO: [
    { min: 0, max: Infinity, rate: 0.015, fixed: 0.15 }
  ]
} as const

// ❌ Règles métier Merchant
export const getMerchantFeeStructure = (merchant: Merchant) => {
  if (merchant.subscriptionPlan === 'PRO') {
    return MERCHANT_FEE_STRUCTURES.PRO
  }
  return MERCHANT_FEE_STRUCTURES.BASIC
}
```

**Pourquoi dans projets ?**
- Structures tarifaires = décisions business
- Différentes par app (Admin ≠ Merchant)
- Changent selon stratégie commerciale
- Pas de dépendance lib pour changements rapides

---

### Exemple 4 : Schemas Zod

#### ✅ Dans @nxpay/ui - Schemas BASE

```typescript
// src/runtime/utils/schemas/fintech/transaction.ts

// ✅ Schema BASE réutilisable
export const TransactionSchema = z.object({
  id: z.string().uuid(),
  amount: AmountSchema,
  type: TransactionTypeEnum,
  status: TransactionStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

// ✅ FACTORY pour étendre
export const createTransactionSchema = (extensions?: object) => {
  return TransactionSchema.extend(extensions || {})
}
```

**Pourquoi ici ?**
- Structure de base = universelle
- Tous les projets ont transactions
- Validation base = identique

---

#### ❌ Dans Projets - Schemas MÉTIER

**Admin :**
```typescript
// admin/utils/schemas/adminTransaction.ts

import { TransactionSchema, AmountSchema } from '@nxpay/ui/schemas'

// ❌ ÉTEND le schema de base avec logique Admin
export const AdminTransactionSchema = TransactionSchema.extend({
  // Champs Admin spécifiques
  adminNotes: z.string().optional(),
  approvedBy: z.string().uuid().optional(),
  approvedAt: z.string().datetime().optional(),
  
  // Metadata Admin
  riskScore: z.number().min(0).max(100).optional(),
  complianceStatus: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  
  // Flags Admin
  flaggedForReview: z.boolean().default(false),
  requiresManualApproval: z.boolean().default(false)
})
.refine(
  // ❌ Règle métier Admin
  (data) => {
    if (data.amount.value > 10000) {
      return data.requiresManualApproval === true
    }
    return true
  },
  'Transactions >10K requièrent approbation manuelle'
)
.refine(
  // ❌ Règle compliance Admin
  async (data) => {
    if (data.amount.value > 5000) {
      const kycStatus = await checkKYCStatus(data.senderId)
      return kycStatus === 'VERIFIED'
    }
    return true
  },
  'KYC vérifié requis pour transactions >5K'
)

export type AdminTransaction = z.infer<typeof AdminTransactionSchema>
```

**Merchant :**
```typescript
// merchant/utils/schemas/merchantPayment.ts

import { TransactionSchema } from '@nxpay/ui/schemas'

// ❌ ÉTEND avec logique Merchant (différente d'Admin)
export const MerchantPaymentSchema = TransactionSchema.extend({
  // Champs Merchant spécifiques
  merchantId: z.string().uuid(),
  customerId: z.string().uuid(),
  invoiceId: z.string().optional(),
  productIds: z.array(z.string()).optional(),
  
  // Metadata Merchant
  paymentMethod: z.enum(['CARD', 'WALLET', 'BANK_TRANSFER']),
  isRecurring: z.boolean().default(false),
  
  // Commission Merchant
  merchantCommission: AmountSchema.optional()
})
.refine(
  // ❌ Règle métier Merchant
  (data) => {
    // Vérifier solde merchant
    return data.amount.value <= merchantWallet.balance
  },
  'Solde insuffisant'
)
.refine(
  // ❌ Règle limite journalière Merchant
  (data) => {
    const dailyTotal = getTodayTransactionTotal()
    return dailyTotal + data.amount.value <= MERCHANT_DAILY_LIMIT
  },
  'Limite journalière dépassée'
)

export type MerchantPayment = z.infer<typeof MerchantPaymentSchema>
```

**Pourquoi dans projets ?**
- Champs spécifiques (adminNotes vs invoiceId)
- Règles différentes (approval vs balance check)
- Évolution indépendante

---

### Exemple 5 : Composants

#### ✅ Dans @nxpay/ui - Composant GÉNÉRIQUE

```vue
<!-- src/runtime/components/Fintech/AmountDisplay.vue -->

<script setup lang="ts">
// ✅ Props configurables, pas de logique métier
interface Props {
  amount: number
  currency?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'default' | 'positive' | 'negative'
}
</script>

<template>
  <span :class="classes">
    {{ formattedAmount }}
  </span>
</template>
```

**Pourquoi ici ?**
- Affichage formaté = besoin universel
- Pas de logique métier
- Configurable via props

---

#### ❌ Dans Projets - Composants avec LOGIQUE

**Admin :**
```vue
<!-- admin/components/Transaction/TransactionAmountCell.vue -->

<template>
  <div class="transaction-amount-cell">
    <!-- ✅ Utilise composant UI -->
    <AmountDisplay 
      :amount="transaction.amount" 
      :currency="transaction.currency"
      :color="amountColor"
      size="md"
      weight="medium"
    />
    
    <!-- ❌ Logique Admin -->
    <div v-if="requiresApproval" class="approval-badge">
      <span class="text-xs text-orange-600">
        Requiert approbation
      </span>
    </div>
    
    <!-- ❌ Actions Admin -->
    <div v-if="canApprove" class="admin-actions">
      <button @click="approveAmount">✓ Approuver</button>
      <button @click="rejectAmount">✗ Rejeter</button>
    </div>
    
    <!-- ❌ Info compliance Admin -->
    <div v-if="showCompliance" class="compliance-info">
      <span class="text-xs">KYC: {{ transaction.kycStatus }}</span>
      <span class="text-xs">Risk: {{ transaction.riskScore }}/100</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// ❌ Logique métier Admin
const requiresApproval = computed(() => 
  transaction.amount > 10000
)

const canApprove = computed(() => 
  currentAdmin.permissions.includes('approve_transactions') &&
  transaction.status === 'PENDING_APPROVAL'
)

const amountColor = computed(() => {
  if (transaction.flaggedForReview) return 'negative'
  if (transaction.status === 'COMPLETED') return 'positive'
  return 'default'
})
</script>
```

**Merchant :**
```vue
<!-- merchant/components/Payment/PaymentAmountCell.vue -->

<template>
  <div class="payment-amount-cell">
    <!-- ✅ Utilise même composant UI -->
    <AmountDisplay 
      :amount="payment.amount" 
      :currency="payment.currency"
      size="md"
    />
    
    <!-- ❌ Info Merchant -->
    <div class="merchant-info">
      <span class="text-xs">Commission: {{ merchantCommission }}</span>
      <span class="text-xs">Net: {{ netAmount }}</span>
    </div>
    
    <!-- ❌ Actions Merchant -->
    <button v-if="canRefund" @click="refundPayment">
      Rembourser
    </button>
  </div>
</template>

<script setup lang="ts">
// ❌ Calculs métier Merchant
const merchantCommission = computed(() => {
  return payment.amount * MERCHANT_COMMISSION_RATE
})

const netAmount = computed(() => {
  return payment.amount - merchantCommission.value
})

const canRefund = computed(() => {
  return payment.status === 'COMPLETED' &&
         withinRefundPeriod(payment.createdAt) &&
         !payment.isRefunded
})
</script>
```

**Pourquoi dans projets ?**
- Logique d'affichage différente
- Actions différentes (approve vs refund)
- Calculs métier (commission, net amount)

---

## 🎯 Checklist de Décision

### Pour Chaque Nouvel Élément, Se Demander :

#### Question 1 : Est-ce IDENTIQUE partout ?
```
✅ OUI → @nxpay/ui
   Exemple : Formatage de devise, validation base montant

❌ NON → Projet
   Exemple : Liens sidebar, règles approbation
```

#### Question 2 : Y a-t-il de la logique métier ?
```
✅ OUI → Projet
   Exemple : Permissions, limites utilisateur, compliance

❌ NON → @nxpay/ui
   Exemple : Affichage formaté, validation format
```

#### Question 3 : Utilisable dans 3+ apps différentes ?
```
✅ OUI → @nxpay/ui
   Exemple : AmountDisplay (Admin, Merchant, Agent, Customer)

❌ NON → Projet
   Exemple : AdminDashboardStats (Admin uniquement)
```

#### Question 4 : Contient des données hardcodées ?
```
✅ OUI → Projet (probablement)
   Exemple : Fee structures, limites, permissions

❌ NON → @nxpay/ui (probablement)
   Exemple : Algorithmes, helpers, validators
```

#### Question 5 : Évolue avec la stratégie business ?
```
✅ OUI → Projet
   Exemple : Structures tarifaires, limites transactions

❌ NON → @nxpay/ui
   Exemple : Précision calculs, formatage
```

---

## 📊 Tableau Récapitulatif

| Élément | @nxpay/ui | Projets | Raison |
|---------|-----------|---------|--------|
| **AmountSchema (base)** | ✅ | ❌ | Validation base universelle |
| **AdminTransactionSchema** | ❌ | ✅ | Règles métier Admin |
| **MerchantPaymentSchema** | ❌ | ✅ | Règles métier Merchant |
| **precisionMath.ts** | ✅ | ❌ | Calculs précis universels |
| **calculateTieredFee()** | ✅ | ❌ | Algorithme générique |
| **ADMIN_FEE_STRUCTURES** | ❌ | ✅ | Données métier Admin |
| **MERCHANT_FEE_STRUCTURES** | ❌ | ✅ | Données métier Merchant |
| **Sidebar.vue (base)** | ✅ | ❌ | Structure UI universelle |
| **AdminSidebar.vue** | ❌ | ✅ | Liens + logique Admin |
| **MerchantSidebar.vue** | ❌ | ✅ | Liens + logique Merchant |
| **AmountDisplay** | ✅ | ❌ | Affichage formaté universel |
| **TransactionDetailsCard** | ❌ | ✅ | Logique métier complexe |
| **FormCurrencyInput** | ✅ | ❌ | Input validé universel |
| **ApprovalWorkflow** | ❌ | ✅ | Workflow Admin spécifique |

---

## 💡 Patterns Recommandés

### Pattern 1 : Base + Extend

```typescript
// ✅ @nxpay/ui - Schema BASE
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string()
})

// ❌ Admin - ÉTEND avec métier
export const AdminUserSchema = UserSchema.extend({
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MODERATOR']),
  permissions: z.array(z.string()),
  lastAdminAction: z.string().datetime().optional()
})

// ❌ Merchant - ÉTEND différemment
export const MerchantUserSchema = UserSchema.extend({
  merchantId: z.string().uuid(),
  businessType: z.enum(['RETAIL', 'ECOMMERCE', 'RESTAURANT']),
  subscriptionPlan: z.enum(['BASIC', 'PRO', 'ENTERPRISE'])
})
```

---

### Pattern 2 : Slot-based Components

```vue
<!-- ✅ @nxpay/ui - Base avec slots -->
<template>
  <div class="data-card">
    <slot name="header" />
    <slot />
    <slot name="actions" />
  </div>
</template>

<!-- ❌ Admin - Utilise avec logique -->
<NokiDataCard>
  <template #header>
    <h3>Transaction #{{ id }}</h3>
  </template>
  
  <template #default>
    <AmountDisplay :amount="amount" />
    <AdminComplianceInfo :id="id" />
  </template>
  
  <template #actions>
    <button @click="approve">Approuver</button>
    <button @click="reject">Rejeter</button>
  </template>
</NokiDataCard>

<!-- ❌ Merchant - Utilise différemment -->
<NokiDataCard>
  <template #header>
    <h3>Vente #{{ id }}</h3>
  </template>
  
  <template #actions>
    <button @click="refund">Rembourser</button>
    <button @click="invoice">Facture</button>
  </template>
</NokiDataCard>
```

---

### Pattern 3 : Algorithm + Data Separation

```typescript
// ✅ @nxpay/ui - Algorithme
export const calculateLimit = (
  user: any,
  limits: LimitStructure
): number => {
  // Algorithme générique
  return limits[user.tier] || limits.default
}

// ❌ Admin - Données
export const ADMIN_LIMITS = {
  default: 1000,
  verified: 5000,
  premium: 50000,
  enterprise: Infinity
}

// ❌ Merchant - Données différentes
export const MERCHANT_LIMITS = {
  default: 500,
  pro: 10000,
  enterprise: 100000
}
```

---

## ✅ Bénéfices de cette Séparation

### Pour la UI Library (@nxpay/ui)
- ✅ Reste **générique** et **réutilisable**
- ✅ Évolutions **rares** et **stables**
- ✅ Maintenance **simple**
- ✅ Bundle **optimisé** (pas de code métier)
- ✅ **Scalable** (nouvelles apps faciles)

### Pour les Projets
- ✅ Évoluent **indépendamment**
- ✅ Flexibilité **maximale**
- ✅ Deploy **indépendant**
- ✅ Pas de **couplage** entre apps
- ✅ Changements **rapides** (pas besoin lib update)

### Pour l'Équipe
- ✅ **Clarté** : Tout le monde sait où mettre le code
- ✅ **Efficacité** : Pas de débats "où ça va ?"
- ✅ **Qualité** : Séparation concerns
- ✅ **Onboarding** : Nouveaux devs comprennent vite

---

## 🚨 Erreurs Courantes à Éviter

### ❌ Erreur 1 : Mettre Logique Métier dans UI
```typescript
// ❌ NE PAS FAIRE dans @nxpay/ui
export const ADMIN_PERMISSIONS = {
  APPROVE_TRANSACTIONS: 'approve_transactions',
  BAN_USERS: 'ban_users'
  // Règles métier Admin
}
```

**Pourquoi c'est mal ?**
- Merchant ne peut pas utiliser
- Crée dépendance forte
- Difficile à maintenir

---

### ❌ Erreur 2 : Dupliquer Code Base
```typescript
// ❌ NE PAS FAIRE dans projets
// admin/utils/formatCurrency.ts
export const formatCurrency = (amount) => { ... }

// merchant/utils/formatCurrency.ts  
export const formatCurrency = (amount) => { ... }
```

**Solution :**
```typescript
// ✅ Mettre dans @nxpay/ui
import { useCurrencyFormat } from '@nxpay/ui'
```

---

### ❌ Erreur 3 : Hardcoder Données dans Composants UI
```vue
<!-- ❌ NE PAS FAIRE -->
<template>
  <div>
    <button v-if="user.role === 'ADMIN'">Approuver</button>
  </div>
</template>
```

**Solution :**
```vue
<!-- ✅ Utiliser slots -->
<template>
  <div>
    <slot name="actions" />
  </div>
</template>
```

---

## 📋 Résumé de la Règle d'Or

### @nxpay/ui (UI Library)
```
✅ HOW (Comment ?)
   - Comment afficher un montant ?
   - Comment valider un input ?
   - Comment calculer des frais ?

✅ STRUCTURE
   - Structure de sidebar
   - Structure de modal
   - Structure de form

✅ ALGORITHMES
   - Calcul frais tiered
   - Formatage devise
   - Précision math
```

### Projets (Admin/Merchant/Agent/Customer)
```
✅ WHAT (Quoi ?)
   - Quels liens dans sidebar ?
   - Quelles limites appliquer ?
   - Quelles actions possibles ?

✅ LOGIQUE MÉTIER
   - Permissions
   - Règles business
   - Workflow approbation

✅ DONNÉES
   - Fee structures
   - Limites
   - Configurations
```

---

## 🎓 Principe Final

> **"Si deux apps différentes ont besoin exactement du MÊME composant avec la MÊME logique, il va dans @nxpay/ui.**
> 
> **Si elles ont besoin de comportements DIFFÉRENTS, seule la base générique va dans @nxpay/ui, le reste dans les apps."**

---

**Document :** REGLE_OR_SEPARATION.md  
**Purpose :** Clarifier séparation UI Library vs Projets  
**Version :** 1.0  
**Status :** ✅ Référence officielle

