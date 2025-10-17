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
  /** Indeterminate */
  indeterminate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <label :class="['checkbox-container', { 'checkbox-disabled': disabled }]">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      class="checkbox-input"
      @change="handleChange"
    />
    
    <span class="checkbox-box">
      <UIcon 
        v-if="modelValue && !indeterminate"
        name="i-heroicons-check"
        class="checkbox-icon"
      />
      <UIcon 
        v-else-if="indeterminate"
        name="i-heroicons-minus"
        class="checkbox-icon"
      />
    </span>
    
    <div v-if="label || description" class="checkbox-content">
      <span v-if="label" class="checkbox-label">
        {{ label }}
      </span>
      <span v-if="description" class="checkbox-description">
        {{ description }}
      </span>
    </div>
    
    <slot />
  </label>
</template>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  transition: all 0.2s;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.checkbox-input:checked + .checkbox-box {
  background: #77F07F;
  border-color: #77F07F;
}

.checkbox-input:indeterminate + .checkbox-box {
  background: #77F07F;
  border-color: #77F07F;
}

.checkbox-input:focus + .checkbox-box {
  box-shadow: 0 0 0 3px rgba(119, 240, 127, 0.1);
}

.checkbox-icon {
  width: 1rem;
  height: 1rem;
  color: white;
}

.checkbox-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.checkbox-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.checkbox-description {
  font-size: 0.75rem;
  color: #6b7280;
}
</style>

