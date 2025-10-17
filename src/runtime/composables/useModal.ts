import { ref } from 'vue'

export interface ModalOptions {
  /** Titre du modal */
  title?: string
  /** Taille du modal */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Empêcher fermeture */
  preventClose?: boolean
}

/**
 * Composable pour gérer l'état des modals
 * 
 * @param options - Options par défaut du modal
 * @returns État et méthodes du modal
 * 
 * @example
 * ```typescript
 * const modal = useModal({ title: 'Mon Modal' })
 * 
 * modal.open() // Ouvrir
 * modal.close() // Fermer
 * modal.toggle() // Toggle
 * ```
 */
export const useModal = (options: ModalOptions = {}) => {
  const isOpen = ref(false)
  const modalOptions = ref<ModalOptions>(options)
  
  /**
   * Ouvrir le modal
   * @param newOptions - Options à merger
   */
  const open = (newOptions?: ModalOptions) => {
    if (newOptions) {
      modalOptions.value = { ...modalOptions.value, ...newOptions }
    }
    isOpen.value = true
  }
  
  /**
   * Fermer le modal
   */
  const close = () => {
    isOpen.value = false
  }
  
  /**
   * Toggle le modal
   */
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  
  /**
   * Mettre à jour les options
   */
  const setOptions = (newOptions: Partial<ModalOptions>) => {
    modalOptions.value = { ...modalOptions.value, ...newOptions }
  }
  
  return {
    // State
    isOpen,
    options: modalOptions,
    
    // Methods
    open,
    close,
    toggle,
    setOptions
  }
}

