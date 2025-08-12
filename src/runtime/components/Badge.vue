<script setup lang="ts">
interface Props {
  status: string | number | boolean | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'soft' | 'outline';
  className?: string;
  type?: 'yesno' | 'activeinactive';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'soft',
  className: '',
  type: 'yesno'
});

// Map des status avec support multi-langue
const statusMap = {
  // Status génériques
  pending: {
    fr: 'En attente',
    en: 'Pending',
    class: 'bg-yellow-50 text-yellow-700 border border-yellow-200'
  },
  completed: {
    fr: 'Terminé',
    en: 'Completed',
    class: 'bg-green-50 text-green-700 border border-green-200'
  },
  failed: {
    fr: 'Échoué',
    en: 'Failed',
    class: 'bg-red-50 text-red-700 border border-red-200'
  },
  active: {
    fr: 'Activé',
    en: 'Active',
    class: 'bg-green-50 text-green-700 border border-green-200'
  },
  inactive: {
    fr: 'Désactivé',
    en: 'Inactive',
    class: 'bg-gray-50 text-gray-700 border border-gray-200'
  },
  
  // Status de transaction
  approved: {
    fr: 'Approuvé',
    en: 'Approved',
    class: 'bg-green-50 text-green-700 border border-green-200'
  },
  rejected: {
    fr: 'Rejeté',
    en: 'Rejected',
    class: 'bg-red-50 text-red-700 border border-red-200'
  },
  cancelled: {
    fr: 'Annulé',
    en: 'Cancelled',
    class: 'bg-gray-50 text-gray-700 border border-gray-200'
  },
  
  // Status de paiement
  paid: {
    fr: 'Payé',
    en: 'Paid',
    class: 'bg-green-50 text-green-700 border border-green-200'
  },
  unpaid: {
    fr: 'Non payé',
    en: 'Unpaid',
    class: 'bg-yellow-50 text-yellow-700 border border-yellow-200'
  },
  
  // Status de terminal
  online: {
    fr: 'En ligne',
    en: 'Online',
    class: 'bg-green-50 text-green-700 border border-green-200'
  },
  offline: {
    fr: 'Hors ligne',
    en: 'Offline',
    class: 'bg-gray-50 text-gray-700 border border-gray-200'
  },
  
  // Valeurs booléennes - Oui/Non
  true: {
    fr: 'Oui',
    en: 'Yes',
    class: 'bg-green-50 text-green-700 border border-green-200'
  },
  false: {
    fr: 'Non',
    en: 'No',
    class: 'bg-gray-50 text-gray-700 border border-gray-200'
  },
  '1': {
    fr: 'Oui',
    en: 'Yes',
    class: 'bg-green-50 text-green-700 border border-green-200'
  },
  '0': {
    fr: 'Non',
    en: 'No',
    class: 'bg-gray-50 text-gray-700 border border-gray-200'
  }
};

const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2'
};

const badge = computed(() => {
  if (props.status === null || props.status === undefined) {
    return {
      label: 'Inconnu',
      class: 'bg-gray-50 text-gray-700 border border-gray-200'
    };
  }

  const statusKey = String(props.status).toLowerCase();
  
  // Gestion spéciale pour les booléens selon le type
  if (props.type === 'activeinactive' && (props.status === true || props.status === false || props.status === 1 || props.status === 0)) {
    if (props.status === true || props.status === 1) {
      return {
        label: 'Activé',
        class: 'bg-green-50 text-green-700 border border-green-200'
      };
    } else {
      return {
        label: 'Désactivé',
        class: 'bg-gray-50 text-gray-700 border border-gray-200'
      };
    }
  }
  
  // Recherche directe
  if (statusMap[statusKey as keyof typeof statusMap]) {
    const status = statusMap[statusKey as keyof typeof statusMap];
    return {
      label: status.fr,
      class: status.class
    };
  }

  // Recherche par alias
  const aliases: Record<string, keyof typeof statusMap> = {
    'en attente': 'pending',
    'en cours': 'pending',
    'pending_approval': 'pending',
    'terminé': 'completed',
    'réussi': 'completed',
    'success': 'completed',
    'échec': 'failed',
    'échoué': 'failed',
    'actif': 'active',
    'activé': 'active',
    'enabled': 'active',
    'inactif': 'inactive',
    'désactivé': 'inactive',
    'disabled': 'inactive',
    'approuvé': 'approved',
    'approuvée': 'approved',
    'rejeté': 'rejected',
    'rejetée': 'rejected',
    'annulé': 'cancelled',
    'annulée': 'cancelled',
    'payé': 'paid',
    'payée': 'paid',
    'non payé': 'unpaid',
    'non payée': 'unpaid',
    'en ligne': 'online',
    'connecté': 'online',
    'hors ligne': 'offline',
    'déconnecté': 'offline',
    'oui': 'true',
    'yes': 'true',
    'non': 'false',
    'no': 'false'
  };

  const aliasKey = aliases[statusKey];
  if (aliasKey && statusMap[aliasKey]) {
    const status = statusMap[aliasKey];
    return {
      label: status.fr,
      class: status.class
    };
  }

  // Fallback
  return {
    label: String(props.status),
    class: 'bg-gray-50 text-gray-700 border border-gray-200'
  };
});
</script>

<template>
  <UBadge
    :label="badge.label"
    :class="[badge.class, sizeClasses[props.size || 'md'], className]"
    :variant="variant"
  />
</template>
