<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Tables V3</h1>
      <p class="text-gray-600">Phase 3 - Table components with pagination and search</p>
    </div>

    <!-- TableSearch -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">TableSearch</h2>
      <p class="text-gray-600 mb-4">Search input with debounce and clear button</p>
      
      <div class="space-y-4">
        <TableSearch
          v-model="searchQuery"
          placeholder="Search transactions..."
          :debounce="300"
          @search="handleSearch"
        />
        
        <p class="text-sm text-gray-600">Search query: "{{ searchQuery }}"</p>
      </div>
    </section>

    <!-- TablePagination -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">TablePagination</h2>
      <p class="text-gray-600 mb-4">Pagination component with page numbers</p>
      
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-semibold mb-3">With First/Last Buttons</h3>
          <TablePagination
            v-model:current-page="currentPage1"
            :total-pages="10"
            :show-first-last="true"
            @change="handlePageChange"
          />
          <p class="mt-2 text-sm text-gray-600">Current page: {{ currentPage1 }}</p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Without First/Last Buttons</h3>
          <TablePagination
            v-model:current-page="currentPage2"
            :total-pages="5"
            :show-first-last="false"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Many Pages</h3>
          <TablePagination
            v-model:current-page="currentPage3"
            :total-pages="50"
            :max-pages="7"
          />
        </div>
      </div>
    </section>

    <!-- Complete Table Example -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Complete Table Example</h2>
      <p class="text-gray-600 mb-4">Table with search, sorting, and pagination</p>
      
      <div class="space-y-4">
        <!-- Search -->
        <div class="flex justify-between items-center">
          <TableSearch
            v-model="tableSearch"
            placeholder="Search users..."
            @search="filterUsers"
          />
          
          <div class="text-sm text-gray-600">
            Showing {{ paginatedUsers.length }} of {{ filteredUsers.length }} results
          </div>
        </div>
        
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  @click="sortBy('name')"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div class="flex items-center gap-2">
                    Name
                    <UIcon
                      v-if="sortColumn === 'name'"
                      :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                      class="w-4 h-4"
                    />
                  </div>
                </th>
                <th
                  @click="sortBy('email')"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div class="flex items-center gap-2">
                    Email
                    <UIcon
                      v-if="sortColumn === 'email'"
                      :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                      class="w-4 h-4"
                    />
                  </div>
                </th>
                <th
                  @click="sortBy('role')"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div class="flex items-center gap-2">
                    Role
                    <UIcon
                      v-if="sortColumn === 'role'"
                      :name="sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                      class="w-4 h-4"
                    />
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <Avatar :alt="user.name" size="sm" class="mr-3" />
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button class="text-nxGreen-600 hover:text-nxGreen-900 mr-3">Edit</button>
                  <button class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- No results -->
        <div v-if="filteredUsers.length === 0" class="text-center py-12">
          <NoData message="No users found matching your search" />
        </div>
        
        <!-- Pagination -->
        <div v-if="filteredUsers.length > 0" class="flex justify-center">
          <TablePagination
            v-model:current-page="tablePage"
            :total-pages="totalPages"
            :show-first-last="true"
          />
        </div>
      </div>
    </section>

    <!-- usePagination Composable Demo -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">usePagination Composable</h2>
      <p class="text-gray-600 mb-4">Pagination state management composable</p>
      
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <button
            @click="pagination.previous()"
            :disabled="!pagination.hasPrevious.value"
            class="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
          >
            Previous
          </button>
          
          <span class="text-sm text-gray-600">
            Page {{ pagination.currentPage.value }} of {{ pagination.totalPages.value }}
            ({{ pagination.from.value }}-{{ pagination.to.value }} of {{ pagination.total.value }})
          </span>
          
          <button
            @click="pagination.next()"
            :disabled="!pagination.hasNext.value"
            class="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
        
        <div class="flex items-center gap-4">
          <label class="text-sm text-gray-600">Items per page:</label>
          <select
            @change="pagination.setPerPage(Number($event.target.value))"
            class="px-3 py-1 border border-gray-300 rounded-lg"
          >
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePagination } from '../../src/runtime/composables/usePagination'

// Search
const searchQuery = ref('')

const handleSearch = (query: string) => {
  console.log('Search:', query)
}

// Pagination
const currentPage1 = ref(1)
const currentPage2 = ref(1)
const currentPage3 = ref(1)

const handlePageChange = (page: number) => {
  console.log('Page changed to:', page)
}

// Table data
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'inactive' },
  { id: 4, name: 'Alice Johnson', email: 'alice@example.com', role: 'Moderator', status: 'active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'active' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active' },
  { id: 7, name: 'Eve Adams', email: 'eve@example.com', role: 'User', status: 'inactive' },
  { id: 8, name: 'Frank Castle', email: 'frank@example.com', role: 'Moderator', status: 'active' },
  { id: 9, name: 'Grace Lee', email: 'grace@example.com', role: 'User', status: 'active' },
  { id: 10, name: 'Henry Ford', email: 'henry@example.com', role: 'User', status: 'inactive' },
  { id: 11, name: 'Ivy Green', email: 'ivy@example.com', role: 'Admin', status: 'active' },
  { id: 12, name: 'Jack Ryan', email: 'jack@example.com', role: 'User', status: 'active' },
])

const tableSearch = ref('')
const tablePage = ref(1)
const perPage = 5
const sortColumn = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

const filteredUsers = computed(() => {
  let filtered = users.value

  // Search
  if (tableSearch.value) {
    const query = tableSearch.value.toLowerCase()
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    )
  }

  // Sort
  if (sortColumn.value) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortColumn.value as keyof typeof a]
      const bVal = b[sortColumn.value as keyof typeof b]
      
      if (sortDirection.value === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage))

const paginatedUsers = computed(() => {
  const start = (tablePage.value - 1) * perPage
  const end = start + perPage
  return filteredUsers.value.slice(start, end)
})

const filterUsers = (query: string) => {
  tablePage.value = 1 // Reset to first page on search
}

const sortBy = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

// usePagination demo
const pagination = usePagination({
  total: 100,
  perPage: 10,
  currentPage: 1,
})
</script>

