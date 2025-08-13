<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  status?: string | number | boolean | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'soft' | 'outline';
  className?: string;
  // Props pour personnalisation
  label?: string;                    // Texte personnalisé
  customSize?: string;               // Taille personnalisée (classes CSS)
  color?: 'success' | 'warning' | 'error' | 'info' | 'default' | 'purple' | 'pink' | 'orange' | 'teal' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'italic';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'soft',
  className: '',
  label: undefined,
  customSize: undefined,
  color: 'default',
  fontWeight: 'medium'
});

// Map des couleurs personnalisées
const customColors = {
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  error: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
  default: 'bg-gray-50 text-gray-700 border border-gray-200',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  pink: 'bg-pink-50 text-pink-700 border border-pink-200',
  orange: 'bg-orange-50 text-orange-700 border border-orange-200',
  teal: 'bg-teal-50 text-teal-700 border border-teal-200',
  gray: 'bg-gray-50 text-gray-700 border border-gray-200',
  red: 'bg-red-50 text-red-700 border border-red-200',
  yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  green: 'bg-green-50 text-green-700 border border-green-200',
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
  indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  violet: 'bg-violet-50 text-violet-700 border border-violet-200'
};

const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2'
};

// Map des poids de police
const fontWeightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  italic: 'italic'
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

// Fonction pour obtenir les classes de couleur
const getColorClasses = computed(() => {
  return customColors[props.color || 'default'];
});

// Fonction pour obtenir les classes de poids de police
const getFontWeightClasses = computed(() => {
  return fontWeightClasses[props.fontWeight || 'medium'];
});

// Label du badge
const badgeLabel = computed(() => {
  // Si un label est fourni, l'utiliser
  if (props.label) {
    return props.label;
  }
  
  // Sinon, utiliser le statut si disponible
  if (props.status !== null && props.status !== undefined) {
    return String(props.status);
  }
  
  // Fallback
  return '';
});

// Classes finales du badge
const finalClasses = computed(() => {
  const baseClasses = [
    getColorClasses.value,
    getSizeClasses.value,
    getFontWeightClasses.value,
    'rounded-full'
  ];
  
  // Ajouter les classes personnalisées
  if (props.className) {
    baseClasses.push(props.className);
  }
  
  return baseClasses;
});
</script>

<template>
  <UBadge
    v-if="badgeLabel"
    :label="badgeLabel"
    :class="finalClasses"
    :variant="variant"
  />
</template>
