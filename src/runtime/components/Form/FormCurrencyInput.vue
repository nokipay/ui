<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Money } from '../../utils/helpers/fintech/precisionMath'
import { AmountSchema } from '../../utils/schemas/fintech/amount'
import FormGroup from './FormGroup.vue'

interface Props {
  /** Valeur du montant */
  modelValue: number | null
  /** Code devise ISO */
  currency?: string
  /** Locale pour formatage */
  locale?: string
  /** Label du champ */
  label?: string
  /** Placeholder */
  placeholder?: string
  /** Message d'aide */
  hint?: string
  /** Champ requis */
  required?: boolean
  /** Désactivé */
  disabled?: boolean
  /** Lecture seule */
  readonly?: boolean
  /** Montant minimum */
  min?: number
  /** Montant maximum */
  max?: number
  /** Afficher le code devise */
  showCurrencyCode?: boolean
  /** ID pour label */
  htmlFor?: string
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'EUR',
  locale: 'fr-FR',
  placeholder: '0,00',
  showCurrencyCode: true,
  min: 0,
  max: 1000000
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  'validate': [isValid: boolean]
  'blur': []
  'focus': []
}>()

const inputRef = ref<HTMLInputElement>()
const displayValue = ref('')
const errorMessage = ref('')
const isFocused = ref(false)

// Symbole devise
const currencySymbol = computed(() => {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    XOF: 'CFA',
    XAF: 'CFA'
  }
  return symbols[props.currency] || props.currency
})

// Séparateur décimal selon locale
const decimalSeparator = computed(() => {
  return props.locale.startsWith('fr') ? ',' : '.'
})

// Initialiser display value quand modelValue change
watch(() => props.modelValue, (newVal) => {
  if (newVal !== null && !isFocused.value) {
    formatDisplayValue(newVal)
  }
}, { immediate: true })

const formatDisplayValue = (value: number) => {
  if (value === null || value === undefined) {
    displayValue.value = ''
    return
  }
  
  try {
    const money = new Money(value, props.currency)
    const formatted = money.format(props.locale)
    
    // Retirer symbole devise et code pour afficher seulement le nombre
    displayValue.value = formatted
      .replace(/[€$£]/g, '')
      .replace(/CFA/g, '')
      .replace(props.currency, '')
      .trim()
  } catch (e) {
    displayValue.value = value.toString().replace('.', decimalSeparator.value)
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value
  
  // Permettre seulement chiffres, espaces, virgule, point
  value = value.replace(/[^0-9\s.,]/g, '')
  
  // Remplacer virgule par point pour parsing (normalisation)
  const normalized = value
    .replace(/\s/g, '') // Retirer espaces
    .replace(',', '.') // Normaliser séparateur décimal
  
  displayValue.value = value
  
  // Cas spéciaux
  if (normalized === '' || normalized === '.') {
    emit('update:modelValue', null)
    errorMessage.value = ''
    return
  }
  
  // Parser le nombre
  const numValue = parseFloat(normalized)
  
  if (isNaN(numValue)) {
    errorMessage.value = 'Montant invalide'
    emit('validate', false)
    return
  }
  
  // Validation avec Zod
  const result = AmountSchema.safeParse({
    value: numValue,
    currency: props.currency
  })
  
  if (!result.success) {
    errorMessage.value = result.error.errors[0].message
    emit('validate', false)
    return
  }
  
  // Vérifier limites min/max
  if (numValue < props.min) {
    errorMessage.value = `Montant minimum : ${props.min} ${currencySymbol.value}`
    emit('validate', false)
    return
  }
  
  if (numValue > props.max) {
    errorMessage.value = `Montant maximum : ${props.max} ${currencySymbol.value}`
    emit('validate', false)
    return
  }
  
  // Tout est valide
  errorMessage.value = ''
  emit('update:modelValue', numValue)
  emit('validate', true)
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
  
  // Formater sur blur
  if (props.modelValue !== null && props.modelValue !== undefined) {
    formatDisplayValue(props.modelValue)
  }
}

const handleFocus = () => {
  isFocused.value = true
  emit('focus')
  
  // Afficher valeur brute en focus (plus facile à éditer)
  if (props.modelValue !== null && props.modelValue !== undefined) {
    displayValue.value = props.modelValue
      .toString()
      .replace('.', decimalSeparator.value)
  }
}

// Exposer méthodes pour parent
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  clear: () => {
    displayValue.value = ''
    emit('update:modelValue', null)
    errorMessage.value = ''
  }
})
</script>

<template>
  <FormGroup 
    :label="label" 
    :error="errorMessage"
    :hint="hint"
    :required="required"
    :html-for="htmlFor"
    :disabled="disabled"
  >
    <div 
      class="currency-input-wrapper"
      :class="{
        'input-error': errorMessage,
        'input-disabled': disabled,
        'input-readonly': readonly,
        'input-focused': isFocused
      }"
    >
      <!-- Symbole devise avant -->
      <span class="currency-symbol">{{ currencySymbol }}</span>
      
      <!-- Input -->
      <input
        :id="htmlFor"
        ref="inputRef"
        type="text"
        inputmode="decimal"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="currency-input"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <!-- Code devise après -->
      <span v-if="showCurrencyCode" class="currency-code">
        {{ currency }}
      </span>
    </div>
  </FormGroup>
</template>

<style scoped>
.currency-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  transition: all 0.2s ease;
}

.currency-input-wrapper:hover:not(.input-disabled):not(.input-readonly) {
  border-color: #9ca3af;
}

.input-focused {
  border-color: #77F07F;
  box-shadow: 0 0 0 3px rgba(119, 240, 127, 0.1);
  outline: none;
}

.input-error {
  border-color: #ef4444;
  background: #fef2f2;
}

.input-error:focus-within {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f3f4f6;
}

.input-readonly {
  background: #f9fafb;
  cursor: default;
}

.currency-symbol {
  color: #6b7280;
  font-weight: 500;
  font-size: 1rem;
  user-select: none;
}

.currency-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  min-width: 0; /* Pour permettre shrinking dans flex */
}

.currency-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.currency-input:disabled {
  cursor: not-allowed;
}

.currency-input:readonly {
  cursor: default;
}

.currency-code {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  user-select: none;
}

/* Dark mode support (optionnel) */
@media (prefers-color-scheme: dark) {
  .currency-input-wrapper {
    background: #1f2937;
    border-color: #374151;
  }
  
  .currency-input {
    color: #f3f4f6;
  }
  
  .input-disabled {
    background: #111827;
  }
}
</style>

