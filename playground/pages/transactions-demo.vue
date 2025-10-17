<script setup lang="ts">
import { ref } from 'vue'
import { TransactionListItem } from '../../src/runtime/components'

// Données de test
const transactions = ref([
  {
    id: 1,
    title: 'Recharge Mobile',
    type: 'Mobile Money',
    amount: 50000,
    status: 'approved' as const,
    date: new Date('2025-10-15T14:30:00'),
    icon: 'i-heroicons-phone',
    transactionType: 'credit' as const,
  },
  {
    id: 2,
    title: 'Transfert à Marie',
    type: 'Transfert P2P',
    amount: 25000,
    status: 'approved' as const,
    date: new Date('2025-10-15T10:15:00'),
    icon: 'i-heroicons-arrow-up-circle',
    transactionType: 'debit' as const,
  },
  {
    id: 3,
    title: 'Paiement Marchand',
    type: 'Carrefour Market',
    amount: 15500,
    status: 'pending' as const,
    date: new Date('2025-10-15T09:45:00'),
    icon: 'i-heroicons-shopping-cart',
    transactionType: 'debit' as const,
  },
  {
    id: 4,
    title: 'Salaire Octobre',
    type: 'Virement',
    amount: 450000,
    status: 'approved' as const,
    date: new Date('2025-10-01T08:00:00'),
    icon: 'i-heroicons-banknotes',
    transactionType: 'credit' as const,
  },
  {
    id: 5,
    title: 'Retrait DAB',
    type: 'Ecobank ATM',
    amount: 100000,
    status: 'approved' as const,
    date: new Date('2025-09-30T16:20:00'),
    icon: 'i-heroicons-credit-card',
    transactionType: 'debit' as const,
  },
  {
    id: 6,
    title: 'Paiement Échoué',
    type: 'Transaction refusée',
    amount: 75000,
    status: 'failed' as const,
    date: new Date('2025-09-28T12:00:00'),
    icon: 'i-heroicons-x-circle',
    transactionType: 'debit' as const,
  },
  {
    id: 7,
    title: 'Recharge en cours',
    type: 'Orange Money',
    amount: 10000,
    status: 'pending' as const,
    date: new Date('2025-10-15T15:30:00'),
    icon: 'i-heroicons-phone',
    transactionType: 'credit' as const,
  },
])

function handleTransactionClick(transaction: any) {
  console.log('Transaction clicked:', transaction)
  // Ici vous pourriez ouvrir un modal avec les détails
}
</script>

<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Transaction List Item</h1>
      <p class="text-lg text-gray-700">
        Composant de liste de transactions inspiré du design mobile NokiPay
      </p>
    </div>

    <!-- Liste complète -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Liste de Transactions</h2>

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
          @click="handleTransactionClick(transaction)"
        />
      </div>
    </div>

    <!-- Exemples par statut -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Statuts Différents</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Approved -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Approuvé</h3>
          <TransactionListItem
            title="Transfert réussi"
            type="Envoi d'argent"
            :amount="50000"
            status="approved"
            :date="new Date()"
            icon="i-heroicons-check-circle"
            transaction-type="debit"
          />
        </div>

        <!-- Pending -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">En attente</h3>
          <TransactionListItem
            title="Recharge en cours"
            type="Mobile Money"
            :amount="25000"
            status="pending"
            :date="new Date()"
            icon="i-heroicons-clock"
            transaction-type="credit"
          />
        </div>

        <!-- Failed -->
        <div>
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Échoué</h3>
          <TransactionListItem
            title="Paiement refusé"
            type="Solde insuffisant"
            :amount="100000"
            status="failed"
            :date="new Date()"
            icon="i-heroicons-x-circle"
            transaction-type="debit"
          />
        </div>
      </div>
    </div>

    <!-- Types de transactions -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Types de Transactions</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Crédit (entrée d'argent) -->
        <div>
          <h3 class="text-lg font-semibold text-green-600 mb-3">Crédit (Entrée)</h3>
          <div class="space-y-3">
            <TransactionListItem
              title="Salaire"
              type="Virement mensuel"
              :amount="500000"
              status="approved"
              :date="new Date()"
              icon="i-heroicons-banknotes"
              transaction-type="credit"
            />
            <TransactionListItem
              title="Recharge"
              type="Mobile Money"
              :amount="50000"
              status="approved"
              :date="new Date()"
              icon="i-heroicons-phone"
              transaction-type="credit"
            />
          </div>
        </div>

        <!-- Débit (sortie d'argent) -->
        <div>
          <h3 class="text-lg font-semibold text-red-600 mb-3">Débit (Sortie)</h3>
          <div class="space-y-3">
            <TransactionListItem
              title="Paiement Marchand"
              type="Supermarché"
              :amount="35000"
              status="approved"
              :date="new Date()"
              icon="i-heroicons-shopping-cart"
              transaction-type="debit"
            />
            <TransactionListItem
              title="Transfert"
              type="Envoi à un contact"
              :amount="20000"
              status="approved"
              :date="new Date()"
              icon="i-heroicons-arrow-up-circle"
              transaction-type="debit"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Montants variés -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Gros Montants</h2>

      <div class="space-y-3">
        <TransactionListItem
          title="Transaction Milliards"
          type="Grosse transaction"
          :amount="2500000000"
          status="approved"
          :date="new Date()"
          icon="i-heroicons-banknotes"
          transaction-type="credit"
        />
        <TransactionListItem
          title="Transaction Millions"
          type="Moyenne transaction"
          :amount="5500000"
          status="approved"
          :date="new Date()"
          icon="i-heroicons-banknotes"
          transaction-type="debit"
        />
        <TransactionListItem
          title="Transaction Standard"
          type="Petite transaction"
          :amount="12500"
          status="approved"
          :date="new Date()"
          icon="i-heroicons-banknotes"
          transaction-type="credit"
        />
      </div>
    </div>

    <!-- Code example -->
    <div>
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Code d'Utilisation</h2>

      <div class="bg-gray-800 text-gray-100 p-6 rounded-xl overflow-x-auto">
        <pre class="text-sm"><code>&lt;TransactionListItem
  title="Recharge Mobile"
  type="Mobile Money"
  :amount="50000"
  status="approved"
  :date="new Date()"
  icon="i-heroicons-phone"
  transaction-type="credit"
  @click="handleClick"
/&gt;

&lt;!-- Props disponibles --&gt;
interface Props {
  title: string              // Titre de la transaction
  type: string               // Type/description
  amount: number             // Montant en FCFA
  status: 'pending' | 'approved' | 'failed'
  date: string | Date        // Date de la transaction
  icon: string               // Icône Heroicons
  transactionType: 'credit' | 'debit'  // Entrée/Sortie
  currency?: string          // Devise (défaut: 'FCFA')
}</code></pre>
      </div>
    </div>
  </div>
</template>
