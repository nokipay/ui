<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  status: string | number | boolean | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'soft' | 'outline';
  className?: string;
  type?: 'yesno' | 'activeinactive';
  // Nouvelles props pour personnalisation
  label?: string;                    // Texte personnalisé
  customSize?: string;               // Taille personnalisée (classes CSS)
  showStatus?: boolean;              // Afficher le statut ou seulement le label
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'soft',
  className: '',
  type: 'yesno',
  label: undefined,
  customSize: undefined,
  showStatus: true
});

// Map des couleurs par type de statut (sans texte)
const statusColors = {
  // Statuts positifs/succès
  success: 'bg-green-50 text-green-700 border border-green-200 rounded-full',
  active: 'bg-green-50 text-green-700 border border-green-200 rounded-full',
  approved: 'bg-green-50 text-green-700 border border-green-200 rounded-full',
  paid: 'bg-green-50 text-green-700 border border-green-200 rounded-full',
  online: 'bg-green-50 text-green-700 border border-green-200 rounded-full',
  completed: 'bg-green-50 text-green-700 border border-green-200 rounded-full',
  true: 'bg-green-50 text-green-700 border border-green-200 rounded-full',
  '1': 'bg-green-50 text-green-700 border border-green-200 rounded-full',
  
  // Statuts d'attente/en cours
  pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full',
  unpaid: 'bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full',
  
  // Statuts d'erreur/échec
  failed: 'bg-red-50 text-red-700 border border-red-200 rounded-full',
  rejected: 'bg-red-50 text-red-700 border border-red-200 rounded-full',
  
  // Statuts neutres/inactifs
  inactive: 'bg-gray-50 text-gray-700 border border-gray-200 rounded-full',
  cancelled: 'bg-gray-50 text-gray-700 border border-gray-200 rounded-full',
  offline: 'bg-gray-50 text-gray-700 border border-gray-200 rounded-full',
  false: 'bg-gray-50 text-gray-700 border border-gray-200 rounded-full',
  '0': 'bg-gray-50 text-gray-700 border border-gray-200 rounded-full',
  
  // Statut par défaut
  default: 'bg-blue-50 text-blue-700 border border-blue-200 rounded-full'
};

const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2'
};

// Fonction pour obtenir les classes de taille
const getSizeClasses = computed(() => {
  // Si une taille personnalisée est fournie, l'utiliser
  if (props.customSize) {
    return props.customSize;
  }
  
  // Sinon, utiliser les tailles prédéfinies
  return sizeClasses[props.size || 'md'];
});

const badge = computed(() => {
  // Si un label personnalisé est fourni, l'utiliser directement
  if (props.label) {
    return {
      label: props.label,
      class: statusColors.default
    };
  }

  // Si showStatus est false, ne pas afficher le statut
  if (!props.showStatus) {
    return {
      label: '',
      class: ''
    };
  }

  if (props.status === null || props.status === undefined) {
    return {
      label: 'Inconnu',
      class: statusColors.default
    };
  }

  const statusKey = String(props.status).toLowerCase();
  
  // Gestion spéciale pour les booléens selon le type
  if (props.type === 'activeinactive' && (props.status === true || props.status === false || props.status === 1 || props.status === 0)) {
    if (props.status === true || props.status === 1) {
      return {
        label: 'Activé',
        class: statusColors.active
      };
    } else {
      return {
        label: 'Désactivé',
        class: statusColors.inactive
      };
    }
  }
  
  // Recherche directe dans les couleurs
  if (statusColors[statusKey as keyof typeof statusColors]) {
    return {
      label: String(props.status),
      class: statusColors[statusKey as keyof typeof statusColors]
    };
  }

  // Fallback avec couleur par défaut
  return {
    label: String(props.status),
    class: statusColors.default
  };
});
</script>

<template>
  <UBadge
    v-if="badge.label"
    :label="badge.label"
    :class="[badge.class, getSizeClasses, className]"
    :variant="variant"
  />
</template>
