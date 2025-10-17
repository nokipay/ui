<script setup lang="ts">
interface Props {
  /** Valeur (checked) */
  modelValue?: boolean
  /** Label */
  label?: string
  /** Description */
  description?: string
  /** Disabled */
  disabled?: boolean
  /** Taille */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

const sizeClasses = computed(() => {
  const sizes = {
    sm: { track: 'w-9 h-5', thumb: 'w-4 h-4', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' }
  }
  return sizes[props.size]
})
</script>

<template>
  <label :class="['switch-container', { 'switch-disabled': disabled }]">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      :class="[
        'switch-track',
        sizeClasses.track,
        { 'switch-checked': modelValue }
      ]"
      @click="toggle"
    >
      <span 
        :class="[
          'switch-thumb',
          sizeClasses.thumb,
          modelValue ? sizeClasses.translate : 'translate-x-0.5'
        ]"
      />
    </button>
    
    <div v-if="label || description" class="switch-content">
      <span v-if="label" class="switch-label">
        {{ label }}
      </span>
      <span v-if="description" class="switch-description">
        {{ description }}
      </span>
    </div>
    
    <slot />
  </label>
</template>

<style scoped>
.switch-container {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}

.switch-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.switch-track {
  position: relative;
  border: none;
  border-radius: 9999px;
  background: #d1d5db;
  transition: background-color 0.2s;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  margin-top: 0.125rem;
}

.switch-track:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(119, 240, 127, 0.1);
}

.switch-checked {
  background: #77F07F;
}

.switch-thumb {
  display: block;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.switch-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.switch-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.switch-description {
  font-size: 0.75rem;
  color: #6b7280;
}
</style>

