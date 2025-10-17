/**
 * Composable pour gérer les badges de statut réutilisables
 * Génère automatiquement les configurations de badge selon le type de status
 */

export interface BadgeConfig {
  label: string
  color: string
  size: 'xs' | 'sm' | 'md' | 'lg'
}

export function useStatusBadge() {
  /**
   * Génère la configuration du badge is_active
   */
  const getActiveBadge = (isActive: boolean): BadgeConfig => ({
    label: isActive ? 'Actif' : 'Inactif',
    color: isActive ? 'green' : 'gray',
    size: 'sm',
  })

  /**
   * Génère la configuration du badge is_pin_required
   */
  const getPinRequiredBadge = (isRequired: boolean): BadgeConfig => ({
    label: isRequired ? 'Oui' : 'Non',
    color: isRequired ? 'green' : 'gray',
    size: 'sm',
  })

  /**
   * Génère la configuration du badge pour un statut de transaction
   */
  const getTransactionStatusBadge = (status: string): BadgeConfig => {
    const statusMap: Record<string, { label: string; color: string }> = {
      pending: { label: 'En attente', color: 'yellow' },
      completed: { label: 'Terminé', color: 'green' },
      failed: { label: 'Échoué', color: 'red' },
      approved: { label: 'Approuvé', color: 'green' },
      rejected: { label: 'Rejeté', color: 'red' },
      cancelled: { label: 'Annulé', color: 'gray' },
      paid: { label: 'Payé', color: 'green' },
      unpaid: { label: 'Non payé', color: 'yellow' },
    }

    const defaultStatus = { label: String(status), color: 'gray' }
    return { ...(statusMap[status.toLowerCase()] || defaultStatus), size: 'sm' }
  }

  /**
   * Génère la configuration du badge pour un statut de terminal
   */
  const getTerminalStatusBadge = (status: string): BadgeConfig => {
    const statusMap: Record<string, { label: string; color: string }> = {
      active: { label: 'Actif', color: 'green' },
      inactive: { label: 'Inactif', color: 'gray' },
      suspended: { label: 'Suspendu', color: 'yellow' },
      revoked: { label: 'Révoqué', color: 'red' },
      online: { label: 'En ligne', color: 'green' },
      offline: { label: 'Hors ligne', color: 'gray' },
    }

    const defaultStatus = { label: String(status), color: 'gray' }
    return { ...(statusMap[status.toLowerCase()] || defaultStatus), size: 'sm' }
  }

  /**
   * Génère la configuration du badge pour un statut booléen personnalisé
   */
  const getBooleanBadge = (
    value: boolean,
    trueLabel: string,
    falseLabel: string,
    trueColor: string = 'green',
    falseColor: string = 'gray'
  ): BadgeConfig => ({
    label: value ? trueLabel : falseLabel,
    color: value ? trueColor : falseColor,
    size: 'sm',
  })

  /**
   * Génère la configuration du badge pour un statut avec options personnalisées
   */
  const getCustomStatusBadge = (
    value: any,
    options: {
      trueLabel: string
      falseLabel: string
      trueColor?: string
      falseColor?: string
      size?: 'xs' | 'sm' | 'md' | 'lg'
    }
  ): BadgeConfig => ({
    label: value ? options.trueLabel : options.falseLabel,
    color: value ? options.trueColor || 'green' : options.falseColor || 'gray',
    size: options.size || 'sm',
  })

  /**
   * Génère la configuration du badge pour un statut générique
   */
  const getGenericStatusBadge = (
    status: string | number | boolean | null | undefined,
    size: 'xs' | 'sm' | 'md' | 'lg' = 'md'
  ): BadgeConfig => {
    if (status === null || status === undefined) {
      return {
        label: 'Inconnu',
        color: 'gray',
        size,
      }
    }

    // Gestion des booléens
    if (typeof status === 'boolean') {
      return {
        label: status ? 'Oui' : 'Non',
        color: status ? 'green' : 'gray',
        size,
      }
    }

    // Gestion des nombres (0/1)
    if (typeof status === 'number') {
      if (status === 1) {
        return {
          label: 'Oui',
          color: 'green',
          size,
        }
      } else if (status === 0) {
        return {
          label: 'Non',
          color: 'gray',
          size,
        }
      }
    }

    // Gestion des chaînes
    const statusStr = String(status).toLowerCase()

    // Mappage des statuts communs
    const commonStatusMap: Record<string, { label: string; color: string }> = {
      'en attente': { label: 'En attente', color: 'yellow' },
      'en cours': { label: 'En cours', color: 'yellow' },
      terminé: { label: 'Terminé', color: 'green' },
      réussi: { label: 'Réussi', color: 'green' },
      échec: { label: 'Échec', color: 'red' },
      échoué: { label: 'Échoué', color: 'red' },
      actif: { label: 'Actif', color: 'green' },
      activé: { label: 'Activé', color: 'green' },
      inactif: { label: 'Inactif', color: 'gray' },
      désactivé: { label: 'Désactivé', color: 'gray' },
      oui: { label: 'Oui', color: 'green' },
      non: { label: 'Non', color: 'gray' },
      pending: { label: 'En attente', color: 'yellow' },
      completed: { label: 'Terminé', color: 'green' },
      failed: { label: 'Échoué', color: 'red' },
      approved: { label: 'Approuvé', color: 'green' },
      rejected: { label: 'Rejeté', color: 'red' },
      cancelled: { label: 'Annulé', color: 'gray' },
      paid: { label: 'Payé', color: 'green' },
      unpaid: { label: 'Non payé', color: 'yellow' },
    }

    const mappedStatus = commonStatusMap[statusStr]
    if (mappedStatus) {
      return {
        ...mappedStatus,
        size,
      }
    }

    // Fallback
    return {
      label: String(status),
      color: 'gray',
      size,
    }
  }

  return {
    getActiveBadge,
    getPinRequiredBadge,
    getTransactionStatusBadge,
    getTerminalStatusBadge,
    getBooleanBadge,
    getCustomStatusBadge,
    getGenericStatusBadge,
  }
}
