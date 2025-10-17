<script setup lang="ts">
interface Props {
  /** Valeur */
  modelValue?: string
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
  /** Readonly */
  readonly?: boolean
  /** Nombre de lignes */
  rows?: number
  /** Nombre max de caractères */
  maxLength?: number
  /** Afficher compteur de caractères */
  showCount?: boolean
  /** Auto-resize */
  autoResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  showCount: false,
  autoResize: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
  'focus': []
}>()

const characterCount = computed(() => {
  return props.modelValue?.length || 0
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
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
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxLength"
      :class="[
        'form-textarea',
        { 'textarea-error': error, 'textarea-disabled': disabled }
      ]"
      @input="handleInput"
      @blur="emit('blur')"
      @focus="emit('focus')"
    />
    
    <div v-if="showCount && maxLength" class="character-count">
      {{ characterCount }} / {{ maxLength }}
    </div>
  </FormGroup>
</template>

<style scoped>
.form-textarea {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #111827;
  background: white;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
}

.form-textarea:focus {
  outline: none;
  border-color: #77F07F;
  box-shadow: 0 0 0 3px rgba(119, 240, 127, 0.1);
}

.form-textarea::placeholder {
  color: #9ca3af;
}

.textarea-error {
  border-color: #ef4444;
  background: #fef2f2;
}

.textarea-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.textarea-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f3f4f6;
}

.character-count {
  text-align: right;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}
</style>

