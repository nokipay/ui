<script setup lang="ts">
import { computed } from 'vue';

interface Badge {
  label: string;
  class?: string;
}

interface StatusBadgeProps {
  status: string | number | boolean | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'soft' | 'outline';
  className?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  icon?: string;
  badge?: Badge;
  statusBadge?: StatusBadgeProps;
  titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  subtitleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  titleSize: '2xl',
  subtitleSize: 'sm'
});

// Map des tailles de titre
const titleSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl'
};

// Map des tailles de sous-titre
const subtitleSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
};

// Classes de titre avec responsive pour les tailles par défaut
const titleClasses = computed(() => {
  const baseSize = titleSizeClasses[props.titleSize];
  
  // Pour les tailles par défaut (2xl, 3xl), ajouter le responsive
  if (props.titleSize === '2xl') {
    return `${baseSize} md:text-3xl`;
  }
  if (props.titleSize === '3xl') {
    return `${baseSize} md:text-4xl`;
  }
  
  return baseSize;
});
</script>

<template>
  <div class="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl shadow-xl mb-8 overflow-hidden">
    <div class="p-6 text-white">
      <div class="flex items-center justify-between">
        <!-- Zone gauche -->
        <div class="flex items-center space-x-4">
          <slot name="left" />
          <div v-if="icon" class="bg-yellow-400 rounded-full p-3 shadow-lg w-12 h-12 flex items-center justify-center">
            <UIcon :name="icon" class="text-2xl text-slate-800" />
          </div>
          <div>
            <h1 :class="[titleClasses, 'font-bold mb-1 text-white']">
              {{ title }}
            </h1>
            <p v-if="subtitle" :class="[subtitleSizeClasses[subtitleSize], 'text-slate-200']">
              {{ subtitle }}
            </p>
            <slot name="extra" />
          </div>
        </div>
        <!-- Zone droite -->
        <div class="flex items-center space-x-2">
          <NokiBadge v-if="statusBadge" v-bind="statusBadge" />
          <UBadge v-else-if="badge" :class="badge.class" :label="badge.label" />
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>
