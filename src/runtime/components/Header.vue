<script setup lang="ts">
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
}

const props = defineProps<Props>();
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
            <h1 class="text-2xl md:text-3xl font-bold mb-1 text-white">
              {{ title }}
            </h1>
            <p v-if="subtitle" class="text-slate-200 text-sm">
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
