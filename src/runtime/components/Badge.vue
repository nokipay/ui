<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'soft' | 'outline';
  className?: string;
  label?: string;
  customSize?: string;
  color?: 'success' | 'warning' | 'error' | 'info' | 'default' | 'purple' | 'pink' | 'orange' | 'teal' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontStyle?: 'normal' | 'italic';
  showEmpty?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'soft',
  className: '',
  label: undefined,
  customSize: undefined,
  color: 'default',
  fontWeight: 'medium',
  fontStyle: 'normal',
  showEmpty: false
});

// Configuration des couleurs par variant
const colorVariants = {
  soft: {
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    error: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    default: 'bg-gray-50 text-gray-700 border border-gray-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
    pink: 'bg-pink-50 text-pink-700 border border-pink-200',
    orange: 'bg-orange-50 text-orange-700 border border-orange-200',
    teal: 'bg-teal-50 text-teal-700 border border-teal-200',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    violet: 'bg-violet-50 text-violet-700 border border-violet-200'
  },
  solid: {
    success: 'bg-green-600 text-white border border-green-600',
    warning: 'bg-yellow-500 text-white border border-yellow-500',
    error: 'bg-red-600 text-white border border-red-600',
    info: 'bg-blue-600 text-white border border-blue-600',
    default: 'bg-gray-600 text-white border border-gray-600',
    purple: 'bg-purple-600 text-white border border-purple-600',
    pink: 'bg-pink-600 text-white border border-pink-600',
    orange: 'bg-orange-600 text-white border border-orange-600',
    teal: 'bg-teal-600 text-white border border-teal-600',
    indigo: 'bg-indigo-600 text-white border border-indigo-600',
    violet: 'bg-violet-600 text-white border border-violet-600'
  },
  outline: {
    success: 'bg-transparent text-green-600 border border-green-600',
    warning: 'bg-transparent text-yellow-600 border border-yellow-600',
    error: 'bg-transparent text-red-600 border border-red-600',
    info: 'bg-transparent text-blue-600 border border-blue-600',
    default: 'bg-transparent text-gray-600 border border-gray-600',
    purple: 'bg-transparent text-purple-600 border border-purple-600',
    pink: 'bg-transparent text-pink-600 border border-pink-600',
    orange: 'bg-transparent text-orange-600 border border-orange-600',
    teal: 'bg-transparent text-teal-600 border border-teal-600',
    blue: 'bg-transparent text-blue-600 border border-blue-600',
    indigo: 'bg-transparent text-indigo-600 border border-indigo-600',
    violet: 'bg-transparent text-violet-600 border border-violet-600'
  }
};

const sizeClasses = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2'
};

const fontWeightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

// Classes calculées
const getSizeClasses = computed(() => {
  return props.customSize || sizeClasses[props.size];
});

const getColorClasses = computed(() => {
  return colorVariants[props.variant][props.color];
});

const getFontWeightClasses = computed(() => {
  return fontWeightClasses[props.fontWeight];
});

const getFontStyleClasses = computed(() => {
  return props.fontStyle === 'italic' ? 'italic' : '';
});

const badgeLabel = computed(() => {
  if (props.label) {
    return props.label;
  }

  if (props.showEmpty) {
    return ' ';
  }

  return '';
});

const finalClasses = computed(() => {
  const classes = [
    getColorClasses.value,
    getSizeClasses.value,
    getFontWeightClasses.value,
    getFontStyleClasses.value,
    'rounded-full'
  ].filter(Boolean);

  if (props.className) {
    classes.push(props.className);
  }

  return classes;
});

// Vérifier si le badge doit être affiché
const shouldShow = computed(() => {
  return props.label || props.showEmpty;
});
</script>

<template>
  <UBadge
    v-if="shouldShow"
    :label="badgeLabel"
    :class="finalClasses"
  />
</template>