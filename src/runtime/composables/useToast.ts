import { ref } from 'vue'

export interface Toast {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: string
  duration?: number
}

export interface ToastOptions {
  type?: Toast['type']
  title?: string
  description?: string
  duration?: number
}

/**
 * Composable pour gérer les notifications toast
 * 
 * @returns État et méthodes pour les toasts
 * 
 * @example
 * ```typescript
 * const toast = useToast()
 * 
 * toast.success('Opération réussie')
 * toast.error('Erreur survenue', 'Détails de l\'erreur')
 * toast.show({ type: 'info', title: 'Info', duration: 5000 })
 * ```
 */
export const useToast = () => {
  const toasts = ref<Toast[]>([])
  
  /**
   * Afficher un toast
   * @param options - Options du toast
   * @returns ID du toast
   */
  const show = (options: ToastOptions): string => {
    const id = `toast-${Date.now()}-${Math.random()}`
    
    const toast: Toast = {
      id,
      type: options.type || 'info',
      title: options.title,
      description: options.description,
      duration: options.duration || 5000
    }
    
    toasts.value.push(toast)
    
    // Auto-remove après duration
    if (toast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }
    
    return id
  }
  
  /**
   * Toast de succès
   */
  const success = (title: string, description?: string, duration?: number) => {
    return show({ type: 'success', title, description, duration })
  }
  
  /**
   * Toast d'erreur
   */
  const error = (title: string, description?: string, duration?: number) => {
    return show({ type: 'error', title, description, duration })
  }
  
  /**
   * Toast d'avertissement
   */
  const warning = (title: string, description?: string, duration?: number) => {
    return show({ type: 'warning', title, description, duration })
  }
  
  /**
   * Toast d'information
   */
  const info = (title: string, description?: string, duration?: number) => {
    return show({ type: 'info', title, description, duration })
  }
  
  /**
   * Retirer un toast
   */
  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  /**
   * Retirer tous les toasts
   */
  const clear = () => {
    toasts.value = []
  }
  
  return {
    // State
    toasts,
    
    // Methods
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear
  }
}

