# TransactionListItem Component

**Inspiré du design mobile NokiPay**

---

## 📱 Vue d'Ensemble

`TransactionListItem` est un composant de liste de transactions avec un design moderne inspiré de l'app mobile NokiPay.

**Features :**

- ✅ Icône dans cercle
- ✅ Montant coloré (vert crédit / rouge débit)
- ✅ Badge de statut avec icône
- ✅ Format automatique des gros montants (M, G)
- ✅ Date formatée (JJ/MM/AAAA HH:MM)
- ✅ Support dark mode
- ✅ Hover state
- ✅ Border radius mobile (12px)

---

## 🎨 Design

```
┌─────────────────────────────────────────┐
│ [📱] Recharge Mobile              +50K  │
│      Mobile Money         [✓ Réussi]   │
│                           12/10/2025    │
└─────────────────────────────────────────┘
```

---

## 📖 Usage

### Import

```typescript
import { TransactionListItem } from '@nxpay/ui'
```

### Exemple Simple

```vue
<template>
  <TransactionListItem
    title="Recharge Mobile"
    type="Mobile Money"
    :amount="50000"
    status="approved"
    :date="new Date()"
    icon="i-heroicons-phone"
    transaction-type="credit"
  />
</template>
```

### Liste de Transactions

```vue
<template>
  <div class="space-y-3">
    <TransactionListItem
      v-for="transaction in transactions"
      :key="transaction.id"
      :title="transaction.title"
      :type="transaction.type"
      :amount="transaction.amount"
      :status="transaction.status"
      :date="transaction.date"
      :icon="transaction.icon"
      :transaction-type="transaction.transactionType"
      @click="handleClick(transaction)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const transactions = ref([
  {
    id: 1,
    title: 'Recharge Mobile',
    type: 'Mobile Money',
    amount: 50000,
    status: 'approved',
    date: new Date(),
    icon: 'i-heroicons-phone',
    transactionType: 'credit',
  },
  // ...
])

function handleClick(transaction) {
  // Ouvrir modal de détails
  console.log('Transaction:', transaction)
}
</script>
```

---

## 🔧 Props

| Prop              | Type                                  | Required | Default  | Description                           |
| ----------------- | ------------------------------------- | -------- | -------- | ------------------------------------- |
| `title`           | `string`                              | ✅       | -        | Titre de la transaction               |
| `type`            | `string`                              | ✅       | -        | Type/description (ex: "Mobile Money") |
| `amount`          | `number`                              | ✅       | -        | Montant en FCFA                       |
| `status`          | `'pending' \| 'approved' \| 'failed'` | ✅       | -        | Statut de la transaction              |
| `date`            | `string \| Date`                      | ✅       | -        | Date de la transaction                |
| `icon`            | `string`                              | ✅       | -        | Icône Heroicons                       |
| `transactionType` | `'credit' \| 'debit'`                 | ✅       | -        | Crédit (entrée) ou Débit (sortie)     |
| `currency`        | `string`                              | ❌       | `'FCFA'` | Devise à afficher                     |

---

## 🎯 Statuts Disponibles

### Approved (Approuvé)

```vue
<TransactionListItem status="approved" ... />
```

**Badge :** Vert avec icône ✓  
**Label :** "Réussi"

### Pending (En attente)

```vue
<TransactionListItem status="pending" ... />
```

**Badge :** Orange avec icône ⏱  
**Label :** "En attente"

### Failed (Échoué)

```vue
<TransactionListItem status="failed" ... />
```

**Badge :** Rouge avec icône ✕  
**Label :** "Échoué"

---

## 💰 Format des Montants

Le composant format automatiquement les gros montants :

| Montant      | Affiché        |
| ------------ | -------------- |
| `50000`      | `+50 000 FCFA` |
| `1500000`    | `+1.5M FCFA`   |
| `2500000000` | `+2.5G FCFA`   |

**Règles :**

- `< 1 000` : Montant complet
- `>= 1 000 000` : Millions (M)
- `>= 1 000 000 000` : Milliards (G)

---

## 🎨 Couleurs par Type

### Crédit (Entrée d'argent)

```vue
<TransactionListItem transaction-type="credit" ... />
```

**Couleur :** Vert (`text-green-600`)  
**Signe :** `+`

### Débit (Sortie d'argent)

```vue
<TransactionListItem transaction-type="debit" ... />
```

**Couleur :** Rouge (`text-red-600`)  
**Signe :** `-`

---

## 🌓 Dark Mode

Le composant supporte automatiquement le dark mode :

```vue
<div class="dark">
  <TransactionListItem ... />
</div>
```

**Changements dark mode :**

- Background : `bg-gray-800`
- Text : `text-gray-100`
- Border : `border-gray-700`
- Icon background : `bg-gray-700`

---

## 🎯 Icônes Recommandées

| Type Transaction | Icône                         |
| ---------------- | ----------------------------- |
| Recharge         | `i-heroicons-phone`           |
| Transfert        | `i-heroicons-arrow-up-circle` |
| Paiement         | `i-heroicons-shopping-cart`   |
| Salaire          | `i-heroicons-banknotes`       |
| Retrait          | `i-heroicons-credit-card`     |
| Échec            | `i-heroicons-x-circle`        |

---

## 📅 Format de Date

**Input :**

```typescript
new Date('2025-10-15T14:30:00')
```

**Output :**

```
15/10/2025, 14:30
```

**Format :** `JJ/MM/AAAA, HH:MM` (locale française)

---

## ✨ Exemples Complets

### Liste de Transactions Récentes

```vue
<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6">Transactions Récentes</h2>

    <div class="space-y-3">
      <TransactionListItem
        title="Recharge Mobile"
        type="Mobile Money"
        :amount="50000"
        status="approved"
        :date="new Date('2025-10-15T14:30:00')"
        icon="i-heroicons-phone"
        transaction-type="credit"
      />

      <TransactionListItem
        title="Paiement Marchand"
        type="Carrefour Market"
        :amount="35000"
        status="approved"
        :date="new Date('2025-10-15T10:15:00')"
        icon="i-heroicons-shopping-cart"
        transaction-type="debit"
      />

      <TransactionListItem
        title="Transfert en cours"
        type="Envoi à Marie"
        :amount="25000"
        status="pending"
        :date="new Date('2025-10-15T09:00:00')"
        icon="i-heroicons-arrow-up-circle"
        transaction-type="debit"
      />
    </div>
  </div>
</template>
```

### Avec Filtrage par Statut

```vue
<template>
  <div>
    <!-- Filtres -->
    <div class="flex gap-2 mb-4">
      <UButton
        v-for="status in ['all', 'approved', 'pending', 'failed']"
        :key="status"
        :variant="selectedStatus === status ? 'solid' : 'outline'"
        @click="selectedStatus = status"
      >
        {{ statusLabels[status] }}
      </UButton>
    </div>

    <!-- Liste filtrée -->
    <div class="space-y-3">
      <TransactionListItem
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        v-bind="transaction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedStatus = ref('all')

const statusLabels = {
  all: 'Toutes',
  approved: 'Approuvées',
  pending: 'En attente',
  failed: 'Échouées',
}

const transactions = ref([...])

const filteredTransactions = computed(() => {
  if (selectedStatus.value === 'all') return transactions.value
  return transactions.value.filter(t => t.status === selectedStatus.value)
})
</script>
```

---

## 🎨 Personnalisation

### Avec Click Handler

```vue
<TransactionListItem ... @click="handleClick" class="cursor-pointer" />
```

### Currency Custom

```vue
<TransactionListItem ... currency="EUR" />
```

**Output :** `+50 000 EUR`

---

## 🌟 Bonnes Pratiques

1. **Toujours fournir une icône appropriée**

   ```vue
   icon="i-heroicons-phone" // ✅ Bon icon="" // ❌ Mauvais
   ```

2. **Utiliser le bon transactionType**

   ```vue
   <!-- Recharge = crédit -->
   transaction-type="credit" // ✅

   <!-- Paiement = débit -->
   transaction-type="debit" // ✅
   ```

3. **Grouper par date**
   ```vue
   <div v-for="group in transactionsByDate" :key="group.date">
     <h3>{{ group.date }}</h3>
     <TransactionListItem v-for="tx in group.transactions" ... />
   </div>
   ```

---

## 📊 Performance

**Optimisations :**

- Format des montants calculé une seule fois (computed)
- Format de date calculé une seule fois (computed)
- Pas de watchers inutiles
- Classes CSS statiques

**Recommandation :**

- Utiliser `v-for` avec `:key` unique
- Limiter à 50-100 items par page
- Implémenter pagination/lazy loading si > 100 items

---

## 🔗 Voir Aussi

- [TableLayout](/table-layout-demo) - Pour afficher dans un tableau
- [useStatusBadge](/docs/composables) - Génération automatique de badges
- [Playground Demo](/transactions-demo) - Exemples interactifs

---

**Créé :** 15 Octobre 2025  
**Inspiré de :** NokiPay Mobile App  
**Build :** 159 kB (+3 kB)
