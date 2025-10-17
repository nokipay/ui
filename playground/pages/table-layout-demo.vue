<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStatusBadge } from '../../src/runtime/composables/useStatusBadge'

const { getTransactionStatusBadge, getActiveBadge } = useStatusBadge()

// Data
const users = ref([
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'Admin',
    is_active: true,
    created_at: '2025-01-15',
  },
  {
    id: 2,
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    role: 'User',
    is_active: true,
    created_at: '2025-02-20',
  },
  {
    id: 3,
    name: 'Pierre Bernard',
    email: 'pierre.bernard@example.com',
    role: 'Manager',
    is_active: false,
    created_at: '2025-03-10',
  },
  {
    id: 4,
    name: 'Sophie Lefebvre',
    email: 'sophie.lefebvre@example.com',
    role: 'User',
    is_active: true,
    created_at: '2025-04-05',
  },
  {
    id: 5,
    name: 'Luc Dubois',
    email: 'luc.dubois@example.com',
    role: 'Admin',
    is_active: true,
    created_at: '2025-05-12',
  },
])

// Table controls
const searchQuery = ref('')
const page = ref(1)
const pageCount = ref(10)

// Filtered data
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value

  const query = searchQuery.value.toLowerCase()
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
  )
})

// Paginated data
const paginatedUsers = computed(() => {
  const start = (page.value - 1) * pageCount.value
  const end = start + pageCount.value
  return filteredUsers.value.slice(start, end)
})

// Columns
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Rôle' },
  { key: 'is_active', label: 'Statut' },
  { key: 'created_at', label: 'Créé le' },
  { key: 'actions', label: 'Actions' },
]

// Actions
const handleCreate = () => {
  console.log('Créer un nouvel utilisateur')
  alert('Créer un nouvel utilisateur')
}

const handleEdit = (user: any) => {
  console.log('Éditer:', user)
  alert(`Éditer ${user.name}`)
}

const handleDelete = (user: any) => {
  console.log('Supprimer:', user)
  if (confirm(`Supprimer ${user.name} ?`)) {
    const index = users.value.findIndex((u) => u.id === user.id)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }
}
</script>

<template>
  <div>
    <!-- Titre page -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">TableLayout Component</h1>
      <p class="text-gray-600">
        Layout complet pour pages CRUD avec header, search, pagination intégrés
      </p>
    </div>

    <!-- Démo TableLayout Complet -->
    <TableLayout
      title="Utilisateurs"
      subtitle="Gérez les utilisateurs de votre plateforme"
      icon="i-heroicons-users"
      search-placeholder="Rechercher un utilisateur..."
      :total-count="filteredUsers.length"
      total-label="utilisateurs"
      :show-create-button="true"
      create-button-label="Nouvel Utilisateur"
      v-model:search-query="searchQuery"
      v-model:page="page"
      v-model:page-count="pageCount"
      @create="handleCreate"
    >
      <!-- Actions header custom -->
      <template #header-actions>
        <div class="flex gap-2">
          <UButton icon="i-heroicons-funnel" label="Filtrer" color="gray" variant="outline" />
          <UButton
            icon="i-heroicons-arrow-down-tray"
            label="Exporter"
            color="gray"
            variant="outline"
          />
          <UButton icon="i-heroicons-plus" label="Créer" color="primary" @click="handleCreate" />
        </div>
      </template>

      <!-- Table -->
      <template #table>
        <UTable :rows="paginatedUsers" :columns="columns">
          <!-- Status column avec badge -->
          <template #is_active-data="{ row }">
            <UBadge v-bind="getActiveBadge(row.is_active)" />
          </template>

          <!-- Actions column -->
          <template #actions-data="{ row }">
            <div class="flex gap-2">
              <UButton
                icon="i-heroicons-pencil"
                size="xs"
                color="blue"
                variant="soft"
                @click="handleEdit(row)"
              />
              <UButton
                icon="i-heroicons-trash"
                size="xs"
                color="red"
                variant="soft"
                @click="handleDelete(row)"
              />
            </div>
          </template>
        </UTable>
      </template>
    </TableLayout>

    <!-- Exemples supplémentaires -->
    <div class="mt-16 space-y-8">
      <h2 class="text-2xl font-bold text-gray-800">Variantes TableLayout</h2>

      <!-- Sans bouton créer -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Sans Bouton Créer</h3>
        <TableLayout
          title="Transactions"
          subtitle="Historique des transactions"
          icon="i-heroicons-banknotes"
          :total-count="3"
          total-label="transactions"
          :show-create-button="false"
        >
          <template #table>
            <UTable
              :rows="[
                { id: 1, type: 'Recharge', montant: '50 000 FCFA', status: 'approved' },
                { id: 2, type: 'Transfert', montant: '25 000 FCFA', status: 'pending' },
                { id: 3, type: 'Retrait', montant: '100 000 FCFA', status: 'approved' },
              ]"
              :columns="[
                { key: 'id', label: 'ID' },
                { key: 'type', label: 'Type' },
                { key: 'montant', label: 'Montant' },
                { key: 'status', label: 'Statut' },
              ]"
            >
              <template #status-data="{ row }">
                <UBadge v-bind="getTransactionStatusBadge(row.status)" />
              </template>
            </UTable>
          </template>
        </TableLayout>
      </div>

      <!-- Avec filtres custom -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Avec Filtres Custom</h3>
        <TableLayout
          title="Produits"
          subtitle="Catalogue de produits"
          icon="i-heroicons-shopping-bag"
          :total-count="2"
          total-label="produits"
        >
          <template #header-actions>
            <div class="flex gap-2">
              <USelect
                placeholder="Catégorie"
                :options="['Tous', 'Électronique', 'Vêtements']"
                class="w-40"
              />
              <USelect placeholder="Statut" :options="['Tous', 'Actif', 'Inactif']" class="w-32" />
            </div>
          </template>

          <template #table>
            <UTable
              :rows="[
                { id: 1, name: 'Product 1', category: 'Électronique', price: '25 000 FCFA' },
                { id: 2, name: 'Product 2', category: 'Vêtements', price: '15 000 FCFA' },
              ]"
              :columns="[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Nom' },
                { key: 'category', label: 'Catégorie' },
                { key: 'price', label: 'Prix' },
              ]"
            />
          </template>
        </TableLayout>
      </div>

      <!-- Code Examples -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Exemple de Code</h2>

        <pre
          class="bg-gray-800 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm"
        ><code>&lt;TableLayout
  title="Utilisateurs"
  subtitle="Gérez les utilisateurs"
  icon="i-heroicons-users"
  search-placeholder="Rechercher..."
  :total-count="users.length"
  total-label="utilisateurs"
  :show-create-button="true"
  v-model:search-query="searchQuery"
  v-model:page="page"
  v-model:page-count="pageCount"
  @create="handleCreate"
&gt;
  &lt;template #table&gt;
    &lt;UTable :rows="paginatedUsers" :columns="columns"&gt;
      &lt;template #is_active-data="{ row }"&gt;
        &lt;UBadge v-bind="getActiveBadge(row.is_active)" /&gt;
      &lt;/template&gt;
      
      &lt;template #actions-data="{ row }"&gt;
        &lt;UButton @click="handleEdit(row)" /&gt;
      &lt;/template&gt;
    &lt;/UTable&gt;
  &lt;/template&gt;
&lt;/TableLayout&gt;</code></pre>
      </div>
    </div>
  </div>
</template>
