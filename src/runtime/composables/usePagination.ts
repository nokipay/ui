import { ref, computed } from 'vue'

export interface PaginationOptions {
  /** Page initiale */
  initialPage?: number
  /** Éléments par page */
  perPage?: number
  /** Total d'éléments */
  total?: number
}

/**
 * Composable pour gérer la pagination
 * 
 * @param options - Options de pagination
 * @returns État et méthodes de pagination
 * 
 * @example
 * ```typescript
 * const pagination = usePagination({
 *   perPage: 10,
 *   total: 100
 * })
 * 
 * pagination.next() // Page suivante
 * pagination.goToPage(5) // Aller à page 5
 * ```
 */
export const usePagination = (options: PaginationOptions = {}) => {
  const currentPage = ref(options.initialPage || 1)
  const perPage = ref(options.perPage || 10)
  const total = ref(options.total || 0)
  
  const totalPages = computed(() => {
    return Math.ceil(total.value / perPage.value)
  })
  
  const hasNext = computed(() => {
    return currentPage.value < totalPages.value
  })
  
  const hasPrevious = computed(() => {
    return currentPage.value > 1
  })
  
  const from = computed(() => {
    return (currentPage.value - 1) * perPage.value + 1
  })
  
  const to = computed(() => {
    return Math.min(currentPage.value * perPage.value, total.value)
  })
  
  const next = () => {
    if (hasNext.value) {
      currentPage.value++
    }
  }
  
  const previous = () => {
    if (hasPrevious.value) {
      currentPage.value--
    }
  }
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }
  
  const goToFirst = () => {
    currentPage.value = 1
  }
  
  const goToLast = () => {
    currentPage.value = totalPages.value
  }
  
  const setPerPage = (newPerPage: number) => {
    perPage.value = newPerPage
    // Reset à page 1 quand on change perPage
    currentPage.value = 1
  }
  
  const setTotal = (newTotal: number) => {
    total.value = newTotal
    // Vérifier qu'on est pas sur une page qui n'existe plus
    if (currentPage.value > totalPages.value) {
      currentPage.value = Math.max(1, totalPages.value)
    }
  }
  
  return {
    // State
    currentPage,
    perPage,
    total,
    
    // Computed
    totalPages,
    hasNext,
    hasPrevious,
    from,
    to,
    
    // Methods
    next,
    previous,
    goToPage,
    goToFirst,
    goToLast,
    setPerPage,
    setTotal
  }
}

