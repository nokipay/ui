<script setup lang="ts">
import { useLanguage } from '../../composables/useLanguage'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'button' | 'dropdown' | 'toggle'
  showLabel?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'button',
  showLabel: true,
  className: '',
})

const { currentLanguageConfig, nextLanguage, switchLanguage, setLanguage, languages } =
  useLanguage()

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

const buttonSizeClasses = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
}
</script>

<template>
  <div :class="className">
    <!-- Variant Button -->
    <button
      v-if="variant === 'button'"
      @click="switchLanguage"
      :class="[
        'flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200',
        buttonSizeClasses[size],
      ]"
      :title="`Switch to ${nextLanguage.name}`"
    >
      <span class="text-lg">{{ currentLanguageConfig.flag }}</span>
      <span v-if="showLabel" class="hidden sm:inline">{{
        currentLanguageConfig.code.toUpperCase()
      }}</span>
      <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 text-gray-400" />
    </button>

    <!-- Variant Toggle -->
    <button
      v-else-if="variant === 'toggle'"
      @click="switchLanguage"
      :class="[
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        currentLanguageConfig.code === 'fr' ? 'bg-blue-600' : 'bg-gray-200',
      ]"
      :title="`Switch to ${nextLanguage.name}`"
    >
      <span
        :class="[
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          currentLanguageConfig.code === 'fr' ? 'translate-x-6' : 'translate-x-1',
        ]"
      />
      <span class="absolute left-1 text-xs">🇫🇷</span>
      <span class="absolute right-1 text-xs">🇬🇧</span>
    </button>

    <!-- Variant Dropdown -->
    <UDropdown
      v-else-if="variant === 'dropdown'"
      :items="
        languages.map((lang) => ({
          label: lang.name,
          icon: lang.icon,
          click: () => setLanguage(lang.code),
        }))
      "
    >
      <button
        :class="[
          'flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200',
          buttonSizeClasses[size],
        ]"
      >
        <span class="text-lg">{{ currentLanguageConfig.flag }}</span>
        <span v-if="showLabel" class="hidden sm:inline">{{ currentLanguageConfig.name }}</span>
        <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-gray-400" />
      </button>
    </UDropdown>
  </div>
</template>
