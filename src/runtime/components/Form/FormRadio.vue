<script setup lang="ts">
interface Props {
  /** Valeur du radio */
  value: string | number
  /** Valeur du groupe (v-model) */
  modelValue?: string | number
  /** Label */
  label?: string
  /** Description */
  description?: string
  /** Disabled */
  disabled?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isChecked = computed(() => {
  return props.modelValue === props.value
})

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
  }
}
</script>

<template>
  <label :class="['radio-container', { 'radio-disabled': disabled }]">
    <input
      type="radio"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      class="radio-input"
      @change="handleChange"
    />
    
    <span :class="['radio-box', { 'radio-checked': isChecked }]">
      <span v-if="isChecked" class="radio-dot" />
    </span>
    
    <div v-if="label || description" class="radio-content">
      <span v-if="label" class="radio-label">
        {{ label }}
      </span>
      <span v-if="description" class="radio-description">
        {{ description }}
      </span>
    </div>
    
    <slot />
  </label>
</template>

<style scoped>
.radio-container {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}

.radio-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.radio-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  background: white;
  transition: all 0.2s;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.radio-checked {
  background: white;
  border-color: #77F07F;
}

.radio-input:focus + .radio-box {
  box-shadow: 0 0 0 3px rgba(119, 240, 127, 0.1);
}

.radio-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #77F07F;
}

.radio-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.radio-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.radio-description {
  font-size: 0.75rem;
  color: #6b7280;
}
</style>

