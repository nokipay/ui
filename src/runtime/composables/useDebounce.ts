import { ref, watch, type Ref } from 'vue'

/**
 * Composable pour debouncer une valeur
 * 
 * @param value - Ref à debouncer
 * @param delay - Délai en ms
 * @returns Valeur debouncée
 * 
 * @example
 * ```typescript
 * const searchTerm = ref('')
 * const debouncedSearch = useDebounce(searchTerm, 500)
 * 
 * watch(debouncedSearch, (value) => {
 *   // Appelé seulement 500ms après la dernière saisie
 *   search(value)
 * })
 * ```
 */
export function useDebounce<T>(value: Ref<T>, delay: number = 300): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  watch(value, (newValue) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })
  
  return debouncedValue
}

/**
 * Créer une fonction debouncée
 * 
 * @param fn - Fonction à debouncer
 * @param delay - Délai en ms
 * @returns Fonction debouncée
 * 
 * @example
 * ```typescript
 * const debouncedSearch = useDebounceFn((term: string) => {
 *   search(term)
 * }, 500)
 * 
 * // Appeler plusieurs fois, exécuté qu'une fois
 * debouncedSearch('test')
 * debouncedSearch('test2') // Annule le précédent
 * ```
 */
export function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

