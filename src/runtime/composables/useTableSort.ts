import { ref, computed } from 'vue'

export type SortDirection = 'asc' | 'desc' | null

export interface SortState {
  column: string | null
  direction: SortDirection
}

/**
 * Composable pour gérer le tri de table
 * 
 * @param initialColumn - Colonne triée par défaut
 * @param initialDirection - Direction par défaut
 * @returns État et méthodes de tri
 * 
 * @example
 * ```typescript
 * const { sort, sortBy, sortDirection, toggleSort } = useTableSort('name', 'asc')
 * 
 * const sortedData = computed(() => {
 *   return sort(data.value)
 * })
 * ```
 */
export const useTableSort = (
  initialColumn: string | null = null,
  initialDirection: SortDirection = 'asc'
) => {
  const sortBy = ref<string | null>(initialColumn)
  const sortDirection = ref<SortDirection>(initialDirection)
  
  const isSorted = (column: string) => {
    return sortBy.value === column
  }
  
  const getSortDirection = (column: string): SortDirection => {
    return isSorted(column) ? sortDirection.value : null
  }
  
  const toggleSort = (column: string) => {
    if (sortBy.value === column) {
      // Cycle: asc → desc → null
      if (sortDirection.value === 'asc') {
        sortDirection.value = 'desc'
      } else if (sortDirection.value === 'desc') {
        sortDirection.value = null
        sortBy.value = null
      }
    } else {
      sortBy.value = column
      sortDirection.value = 'asc'
    }
  }
  
  const setSortBy = (column: string, direction: SortDirection = 'asc') => {
    sortBy.value = column
    sortDirection.value = direction
  }
  
  const clearSort = () => {
    sortBy.value = null
    sortDirection.value = null
  }
  
  const sort = <T extends Record<string, any>>(data: T[]): T[] => {
    if (!sortBy.value || !sortDirection.value) {
      return data
    }
    
    return [...data].sort((a, b) => {
      const aValue = a[sortBy.value!]
      const bValue = b[sortBy.value!]
      
      // Handle null/undefined
      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1
      
      // Compare
      let comparison = 0
      if (aValue > bValue) comparison = 1
      if (aValue < bValue) comparison = -1
      
      return sortDirection.value === 'asc' ? comparison : -comparison
    })
  }
  
  const sortState = computed<SortState>(() => ({
    column: sortBy.value,
    direction: sortDirection.value
  }))
  
  return {
    // State
    sortBy,
    sortDirection,
    sortState,
    
    // Methods
    isSorted,
    getSortDirection,
    toggleSort,
    setSortBy,
    clearSort,
    sort
  }
}

