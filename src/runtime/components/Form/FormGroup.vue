<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Label du champ */
  label?: string
  /** Message d'erreur */
  error?: string
  /** Message d'aide */
  hint?: string
  /** Champ requis */
  required?: boolean
  /** ID du champ (pour label for) */
  htmlFor?: string
  /** Désactivé */
  disabled?: boolean
}

const props = defineProps<Props>()

const groupClasses = computed(() => [
  'noki-form-group',
  {
    'form-group-error': props.error,
    'form-group-disabled': props.disabled
  }
])

const labelClasses = computed(() => [
  'form-label',
  {
    'text-red-600': props.error,
    'text-gray-500': props.disabled
  }
])
</script>

<template>
  <div :class="groupClasses">
    <!-- Label -->
    <label 
      v-if="label" 
      :for="htmlFor"
      :class="labelClasses"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <!-- Input slot -->
    <div class="form-input-wrapper">
      <slot />
    </div>
    
    <!-- Hint -->
    <p v-if="hint && !error" class="form-hint">
      <slot name="hint">
        {{ hint }}
      </slot>
    </p>
    
    <!-- Error message -->
    <p v-if="error" class="form-error">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.noki-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-group-disabled .form-label {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-input-wrapper {
  position: relative;
}

.form-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

.form-error {
  font-size: 0.75rem;
  color: #ef4444;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.form-error::before {
  content: '⚠';
  font-size: 0.875rem;
}

.form-group-error .form-input-wrapper {
  /* Error styling will be applied by child input */
}
</style>

