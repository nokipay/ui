<script setup lang="ts">
interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  /** Valeur */
  modelValue?: string | number | null
  /** Options */
  options?: SelectOption[]
  /** Label */
  label?: string
  /** Placeholder */
  placeholder?: string
  /** Hint */
  hint?: string
  /** Erreur */
  error?: string
  /** Requis */
  required?: boolean
  /** Disabled */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: 'Sélectionnez une option'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'change': [value: string | number | null]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value === '' ? null : target.value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <FormGroup
    :label="label"
    :error="error"
    :hint="hint"
    :required="required"
    :disabled="disabled"
  >
    <div class="select-wrapper">
      <select
        :value="modelValue"
        :disabled="disabled"
        :class="[
          'form-select',
          { 'select-error': error, 'select-disabled': disabled }
        ]"
        @change="handleChange"
      >
        <option value="" disabled selected v-if="placeholder">
          {{ placeholder }}
        </option>
        
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      
      <UIcon 
        name="i-heroicons-chevron-down" 
        class="select-icon"
      />
    </div>
  </FormGroup>
</template>

<style scoped>
.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 0.625rem 2.5rem 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #111827;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none;
}

.form-select:focus {
  outline: none;
  border-color: #77F07F;
  box-shadow: 0 0 0 3px rgba(119, 240, 127, 0.1);
}

.select-error {
  border-color: #ef4444;
  background: #fef2f2;
}

.select-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f3f4f6;
}

.select-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  pointer-events: none;
}
</style>

