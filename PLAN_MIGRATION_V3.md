# 📋 Plan de Migration - NxPay UI v2.0 → v3.0

**Date :** 17 Octobre 2025  
**Objectif :** Migration progressive sans breaking changes  
**Durée estimée :** 10-12 semaines

---

## 🎯 Vue d'Ensemble

### État Actuel (v2.0.0)
```
📦 @nxpay/ui v2.0.0
├── 28 composants (structure plate)
├── 8 composables
├── ~50 fichiers utils
├── Coverage: 70%
├── Tests: 93/93 passent
└── Status: Production Ready
```

### Objectif (v3.0.0)
```
📦 @nxpay/ui v3.0.0
├── 38 composants génériques (+10)
├── 16 composables (+8)
├── ~60 fichiers utils (+10)
├── Design Tokens TypeScript
├── Schemas Zod pour validation
├── PrecisionMath (BigInt)
├── Coverage: 85%+
└── Apps: Logique métier séparée
```

---

## 🚨 Principes de Migration

### ✅ DO (À Faire)
1. ✅ **Migration Progressive** - Phase par phase, testable
2. ✅ **Backward Compatible** - Anciens composants continuent à fonctionner
3. ✅ **Dual Export** - Ancien et nouveau en parallèle pendant transition
4. ✅ **Tests First** - Créer tests avant de modifier
5. ✅ **Documentation Continue** - Mettre à jour docs au fur et à mesure

### ❌ DON'T (À Éviter)
1. ❌ **Pas de Big Bang** - Pas tout migrer d'un coup
2. ❌ **Pas de Breaking Changes** - Avant v3.0 officiel
3. ❌ **Pas de Refactoring Massif** - Sans tests
4. ❌ **Pas de Suppression** - De code existant avant validation
5. ❌ **Pas de Push Force** - Sur branches partagées

---

## 📅 Timeline Globale

```
┌─────────────────────────────────────────────────────────────┐
│                    12 SEMAINES TOTALES                      │
├─────────────────────────────────────────────────────────────┤
│ Phase 0 │ Phase 1      │ Phase 2     │ Phase 3  │ Phase 4  │
│ Setup   │ Fintech Core │ UX          │ Forms    │ Polish   │
│ 1 sem   │ 4 semaines   │ 3 semaines  │ 2 sem    │ 2 sem    │
└─────────────────────────────────────────────────────────────┘
   Week 1   Week 2-5       Week 6-8      Week 9-10  Week 11-12

Release Points:
├── v2.1.0-alpha (après Phase 0)
├── v2.1.0-beta (après Phase 1) ⭐ Fintech Core
├── v2.2.0-beta (après Phase 2)
├── v2.3.0-rc (après Phase 3)
└── v3.0.0 (après Phase 4) 🎉
```

---

## 🔧 Phase 0 : Préparation & Setup (Semaine 1)

### Objectifs
- Setup infrastructure
- Créer structure de dossiers
- Installer dépendances
- Configurer tooling
- Pas de code métier

### Tasks Détaillées

#### Jour 1-2 : Setup Dépendances

```bash
# 1. Créer branche de migration
git checkout -b feat/migration-v3
git push -u origin feat/migration-v3

# 2. Installer Zod
cd ui
pnpm add zod

# 3. Installer dépendances dev (si manquantes)
pnpm add -D @types/node

# 4. Vérifier que tout compile
pnpm run build

# 5. Vérifier que tests passent
pnpm test
```

**Validation :**
- [ ] ✅ Branche créée
- [ ] ✅ Zod installé
- [ ] ✅ Build réussit
- [ ] ✅ Tests passent (93/93)

---

#### Jour 3-4 : Créer Structure de Dossiers

```bash
# Créer nouveaux dossiers (vides pour l'instant)
cd src/runtime

# Design Tokens
mkdir -p assets/tokens
touch assets/tokens/index.ts
touch assets/tokens/colors.ts
touch assets/tokens/typography.ts
touch assets/tokens/spacing.ts
touch assets/tokens/shadows.ts
touch assets/tokens/gradients.ts
touch assets/tokens/animations.ts
touch assets/tokens/breakpoints.ts
touch assets/tokens/zIndex.ts
touch assets/tokens/README.md

# Nouveaux composants
mkdir -p components/Fintech
mkdir -p components/Modal
mkdir -p components/Alert
mkdir -p components/Loading
mkdir -p components/Empty
mkdir -p components/Dropdown
mkdir -p components/Tabs
mkdir -p components/Tooltip
mkdir -p components/Avatar

# Nouveaux utils
mkdir -p utils/schemas/fintech
mkdir -p utils/helpers/fintech
mkdir -p utils/types

# Tests correspondants
mkdir -p ../../tests/schemas
mkdir -p ../../tests/helpers/fintech
```

**Validation :**
- [ ] ✅ Tous les dossiers créés
- [ ] ✅ Structure respecte ARCHITECTURE_OPTIMALE_V3.md
- [ ] ✅ README.md dans assets/tokens/

---

#### Jour 5 : Documentation & Planning

```bash
# Créer fichiers de tracking
touch MIGRATION_STATUS.md
touch CHANGELOG_V3.md
touch BREAKING_CHANGES.md
```

**MIGRATION_STATUS.md :**
```markdown
# Status Migration v3.0

## Phase 0 : Setup ✅
- [x] Dépendances installées
- [x] Structure créée
- [x] Documentation initialisée

## Phase 1 : Fintech Core (En cours)
- [ ] precisionMath.ts
- [ ] AmountDisplay.vue
- [ ] FormCurrencyInput.vue
...
```

**Validation :**
- [ ] ✅ MIGRATION_STATUS.md créé
- [ ] ✅ CHANGELOG_V3.md créé
- [ ] ✅ Team briefée sur le plan

---

### Release Phase 0

```bash
# Commit et push
git add .
git commit -m "feat: Phase 0 - Setup infrastructure for v3.0

- Add Zod dependency
- Create folder structure for new components
- Setup design tokens infrastructure
- Add migration tracking files

Phase: 0/4 (Setup)
Status: Complete"

git push origin feat/migration-v3

# Tag alpha
git tag v2.1.0-alpha.1
git push --tags

# Create PR for review
# Title: [Migration v3.0] Phase 0 - Infrastructure Setup
```

**Validation Phase 0 :**
- [ ] ✅ Build réussit
- [ ] ✅ Tests passent (93/93)
- [ ] ✅ Pas de breaking changes
- [ ] ✅ Documentation à jour
- [ ] ✅ PR créé et reviewée

---

## 🔥 Phase 1 : Fintech Core (Semaines 2-5)

### Objectifs
- Implémenter composants fintech critiques
- PrecisionMath avec BigInt
- Schemas Zod pour validation
- 100% test coverage sur fintech core

### Semaine 2 : PrecisionMath + Schemas Zod

#### Jour 1-2 : precisionMath.ts ⭐ CRITIQUE

**Fichier :** `src/runtime/utils/helpers/fintech/precisionMath.ts`

```typescript
/**
 * Money class - Évite les erreurs de précision des floats
 * CRITIQUE pour applications financières
 * 
 * Problème : 0.1 + 0.2 = 0.30000000000000004
 * Solution : Utiliser BigInt avec centimes
 */

export class Money {
  private readonly cents: bigint
  public readonly currency: string
  
  constructor(amount: number | string, currency: string = 'EUR') {
    if (typeof amount === 'number') {
      // Convertir en centimes
      this.cents = BigInt(Math.round(amount * 100))
    } else {
      // Parser string "19.99" → 1999n
      const [whole, decimal = '00'] = amount.split('.')
      const paddedDecimal = decimal.padEnd(2, '0').slice(0, 2)
      this.cents = BigInt(whole + paddedDecimal)
    }
    this.currency = currency
  }
  
  add(other: Money): Money {
    this.assertSameCurrency(other)
    const result = new Money(0, this.currency)
    // @ts-ignore - On modifie cents directement
    result.cents = this.cents + other.cents
    return result
  }
  
  subtract(other: Money): Money {
    this.assertSameCurrency(other)
    const result = new Money(0, this.currency)
    // @ts-ignore
    result.cents = this.cents - other.cents
    return result
  }
  
  multiply(factor: number): Money {
    const result = new Money(0, this.currency)
    const factorCents = BigInt(Math.round(factor * 100))
    // @ts-ignore
    result.cents = (this.cents * factorCents) / 100n
    return result
  }
  
  divide(divisor: number): Money {
    const result = new Money(0, this.currency)
    const divisorCents = BigInt(Math.round(divisor * 100))
    // @ts-ignore
    result.cents = (this.cents * 100n) / divisorCents
    return result
  }
  
  toNumber(): number {
    return Number(this.cents) / 100
  }
  
  toString(): string {
    const isNegative = this.cents < 0n
    const absoluteCents = isNegative ? -this.cents : this.cents
    const whole = absoluteCents / 100n
    const decimal = (absoluteCents % 100n).toString().padStart(2, '0')
    return `${isNegative ? '-' : ''}${whole}.${decimal}`
  }
  
  format(locale: string = 'fr-FR'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency
    }).format(this.toNumber())
  }
  
  equals(other: Money): boolean {
    return this.currency === other.currency && this.cents === other.cents
  }
  
  greaterThan(other: Money): boolean {
    this.assertSameCurrency(other)
    return this.cents > other.cents
  }
  
  lessThan(other: Money): boolean {
    this.assertSameCurrency(other)
    return this.cents < other.cents
  }
  
  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(
        `Currency mismatch: ${this.currency} vs ${other.currency}`
      )
    }
  }
  
  static zero(currency: string = 'EUR'): Money {
    return new Money(0, currency)
  }
}
```

**Test :** `tests/helpers/fintech/precisionMath.spec.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { Money } from '@/utils/helpers/fintech/precisionMath'

describe('Money - Precision Math', () => {
  describe('Construction', () => {
    it('should create from number', () => {
      const money = new Money(19.99, 'EUR')
      expect(money.toNumber()).toBe(19.99)
      expect(money.toString()).toBe('19.99')
    })
    
    it('should create from string', () => {
      const money = new Money('19.99', 'EUR')
      expect(money.toNumber()).toBe(19.99)
    })
  })
  
  describe('Addition', () => {
    it('should handle float precision correctly', () => {
      const a = new Money(0.1, 'EUR')
      const b = new Money(0.2, 'EUR')
      const sum = a.add(b)
      
      expect(sum.toNumber()).toBe(0.3) // ✅ Pas 0.30000000000000004
      expect(sum.toString()).toBe('0.30')
    })
    
    it('should add multiple amounts', () => {
      const a = new Money(10.50, 'EUR')
      const b = new Money(20.25, 'EUR')
      const c = new Money(5.15, 'EUR')
      
      const total = a.add(b).add(c)
      expect(total.toNumber()).toBe(35.90)
    })
    
    it('should throw on currency mismatch', () => {
      const eur = new Money(10, 'EUR')
      const usd = new Money(10, 'USD')
      
      expect(() => eur.add(usd)).toThrow('Currency mismatch')
    })
  })
  
  describe('Subtraction', () => {
    it('should subtract correctly', () => {
      const a = new Money(10.50, 'EUR')
      const b = new Money(3.25, 'EUR')
      
      const result = a.subtract(b)
      expect(result.toNumber()).toBe(7.25)
    })
    
    it('should handle negative results', () => {
      const a = new Money(5, 'EUR')
      const b = new Money(10, 'EUR')
      
      const result = a.subtract(b)
      expect(result.toNumber()).toBe(-5)
      expect(result.toString()).toBe('-5.00')
    })
  })
  
  describe('Multiplication', () => {
    it('should multiply by factor', () => {
      const money = new Money(10, 'EUR')
      const result = money.multiply(3)
      
      expect(result.toNumber()).toBe(30)
    })
    
    it('should multiply by decimal factor', () => {
      const money = new Money(100, 'EUR')
      const result = money.multiply(0.15) // 15% fee
      
      expect(result.toNumber()).toBe(15)
    })
  })
  
  describe('Division', () => {
    it('should divide correctly', () => {
      const money = new Money(100, 'EUR')
      const result = money.divide(4)
      
      expect(result.toNumber()).toBe(25)
    })
  })
  
  describe('Comparison', () => {
    it('should compare equality', () => {
      const a = new Money(10.50, 'EUR')
      const b = new Money(10.50, 'EUR')
      
      expect(a.equals(b)).toBe(true)
    })
    
    it('should compare greater than', () => {
      const a = new Money(20, 'EUR')
      const b = new Money(10, 'EUR')
      
      expect(a.greaterThan(b)).toBe(true)
      expect(b.greaterThan(a)).toBe(false)
    })
  })
  
  describe('Formatting', () => {
    it('should format in French locale', () => {
      const money = new Money(1234.56, 'EUR')
      const formatted = money.format('fr-FR')
      
      expect(formatted).toBe('1 234,56 €')
    })
    
    it('should format in US locale', () => {
      const money = new Money(1234.56, 'USD')
      const formatted = money.format('en-US')
      
      expect(formatted).toBe('$1,234.56')
    })
  })
  
  describe('Edge Cases', () => {
    it('should handle very large amounts', () => {
      const money = new Money(999999999.99, 'EUR')
      expect(money.toNumber()).toBe(999999999.99)
    })
    
    it('should handle very small amounts', () => {
      const money = new Money(0.01, 'EUR')
      expect(money.toNumber()).toBe(0.01)
    })
    
    it('should handle zero', () => {
      const money = Money.zero('EUR')
      expect(money.toNumber()).toBe(0)
      expect(money.toString()).toBe('0.00')
    })
  })
})
```

**Commandes :**
```bash
# Créer les fichiers
touch src/runtime/utils/helpers/fintech/precisionMath.ts
touch tests/helpers/fintech/precisionMath.spec.ts

# Implémenter le code (copier ci-dessus)

# Lancer les tests
pnpm test tests/helpers/fintech/precisionMath.spec.ts

# Vérifier coverage
pnpm test:coverage -- tests/helpers/fintech/precisionMath.spec.ts
```

**Validation :**
- [ ] ✅ Tous les tests passent
- [ ] ✅ Coverage 100% sur precisionMath.ts
- [ ] ✅ Pas d'erreurs TypeScript
- [ ] ✅ Documentation inline complète

---

#### Jour 3-4 : Schemas Zod

**Fichier :** `src/runtime/utils/schemas/fintech/amount.ts`

```typescript
import { z } from 'zod'

export const AmountSchema = z.object({
  value: z.number()
    .positive('Le montant doit être positif')
    .finite('Le montant doit être fini')
    .refine(
      (val) => Number.isFinite(val) && !Number.isNaN(val),
      'Montant invalide'
    )
    .refine(
      (val) => (val * 100) % 1 === 0,
      'Maximum 2 décimales autorisées'
    )
    .refine(
      (val) => val <= 1000000,
      'Montant maximum (1M) dépassé'
    ),
  
  currency: z.enum(['EUR', 'USD', 'GBP', 'XOF', 'XAF'], {
    errorMap: () => ({ message: 'Devise non supportée' })
  }),
  
  formatted: z.string().optional()
})

export type Amount = z.infer<typeof AmountSchema>

// Helper pour valider
export const validateAmount = (data: unknown) => {
  return AmountSchema.safeParse(data)
}
```

**Autres schemas :** `transaction.ts`, `fee.ts`, `wallet.ts`

```bash
# Créer schemas
touch src/runtime/utils/schemas/fintech/amount.ts
touch src/runtime/utils/schemas/fintech/transaction.ts
touch src/runtime/utils/schemas/fintech/fee.ts
touch src/runtime/utils/schemas/fintech/wallet.ts
touch src/runtime/utils/schemas/index.ts

# Tests
touch tests/schemas/amount.spec.ts
```

**Validation :**
- [ ] ✅ Schemas Zod créés
- [ ] ✅ Tests de validation
- [ ] ✅ Types TypeScript exportés
- [ ] ✅ Documentation des erreurs

---

### Semaine 3 : AmountDisplay.vue

**Fichier :** `src/runtime/components/Fintech/AmountDisplay.vue`

```vue
<template>
  <span :class="amountClasses" :title="title">
    <span v-if="showCurrency && currencyPosition === 'before'" class="currency-symbol">
      {{ currencySymbol }}
    </span>
    
    <span class="amount-value">
      {{ formattedWhole }}
      <span v-if="showDecimals" class="amount-decimals">.{{ decimals }}</span>
    </span>
    
    <span v-if="showCurrency && currencyPosition === 'after'" class="currency-symbol">
      {{ currencySymbol }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Money } from '@/utils/helpers/fintech/precisionMath'

interface Props {
  amount: number
  currency?: string
  locale?: string
  showCurrency?: boolean
  showDecimals?: boolean
  currencyPosition?: 'before' | 'after'
  color?: 'default' | 'positive' | 'negative' | 'muted'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'EUR',
  locale: 'fr-FR',
  showCurrency: true,
  showDecimals: true,
  currencyPosition: 'after',
  color: 'default',
  size: 'md',
  weight: 'normal'
})

// Utiliser Money class pour précision
const money = computed(() => new Money(props.amount, props.currency))

// Format avec Intl
const formatted = computed(() => money.value.format(props.locale))

// Extraire parties
const formattedWhole = computed(() => {
  const parts = formatted.value.replace(/[€$£]/g, '').trim().split(/[.,]/)
  return parts[0]
})

const decimals = computed(() => {
  const parts = formatted.value.replace(/[€$£]/g, '').trim().split(/[.,]/)
  return parts[1] || '00'
})

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

// Classes
const amountClasses = computed(() => [
  'noki-amount-display',
  `amount-${props.size}`,
  `amount-${props.color}`,
  `amount-weight-${props.weight}`
])

// Title pour accessibilité
const title = computed(() => money.value.format(props.locale))
</script>

<style scoped>
.noki-amount-display {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
}

/* Sizes */
.amount-xs { font-size: 0.75rem; }
.amount-sm { font-size: 0.875rem; }
.amount-md { font-size: 1rem; }
.amount-lg { font-size: 1.125rem; }
.amount-xl { font-size: 1.5rem; }
.amount-2xl { font-size: 2rem; }

/* Colors */
.amount-default { color: currentColor; }
.amount-positive { color: #77F07F; }
.amount-negative { color: #ef4444; }
.amount-muted { color: #9ca3af; }

/* Weights */
.amount-weight-normal { font-weight: 400; }
.amount-weight-medium { font-weight: 500; }
.amount-weight-semibold { font-weight: 600; }
.amount-weight-bold { font-weight: 700; }

/* Currency symbol */
.currency-symbol {
  opacity: 0.8;
  font-size: 0.9em;
}

/* Decimals plus petits */
.amount-decimals {
  font-size: 0.85em;
  opacity: 0.9;
}
</style>
```

**Test :** `tests/components/Fintech/AmountDisplay.spec.ts`

```bash
# Créer composant
mkdir -p src/runtime/components/Fintech
touch src/runtime/components/Fintech/AmountDisplay.vue

# Test
mkdir -p tests/components/Fintech
touch tests/components/Fintech/AmountDisplay.spec.ts

# Story Storybook
touch src/runtime/components/Fintech/AmountDisplay.stories.ts
```

**Validation :**
- [ ] ✅ Composant créé
- [ ] ✅ Tests passent
- [ ] ✅ Storybook story
- [ ] ✅ Accessible (title, aria)

---

### Semaine 4 : FormCurrencyInput.vue

**Fichier :** `src/runtime/components/Form/FormCurrencyInput.vue`

```vue
<template>
  <FormGroup 
    :label="label" 
    :error="errorMessage"
    :required="required"
  >
    <div class="currency-input-wrapper">
      <span class="currency-symbol">{{ currencySymbol }}</span>
      
      <input
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
      
      <span v-if="showCurrency" class="currency-code">
        {{ currency }}
      </span>
    </div>
    
    <template v-if="hint" #hint>
      {{ hint }}
    </template>
  </FormGroup>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Money } from '@/utils/helpers/fintech/precisionMath'
import { AmountSchema } from '@/utils/schemas/fintech/amount'
import FormGroup from './FormGroup.vue'

interface Props {
  modelValue: number | null
  currency?: string
  locale?: string
  label?: string
  placeholder?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  min?: number
  max?: number
  showCurrency?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'EUR',
  locale: 'fr-FR',
  placeholder: '0,00',
  showCurrency: true,
  min: 0,
  max: 1000000
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  'validate': [isValid: boolean]
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

// Initialiser display value
watch(() => props.modelValue, (newVal) => {
  if (newVal !== null && !isFocused.value) {
    formatDisplayValue(newVal)
  }
}, { immediate: true })

const formatDisplayValue = (value: number) => {
  try {
    const money = new Money(value, props.currency)
    const formatted = money.format(props.locale)
    // Retirer symbole devise
    displayValue.value = formatted
      .replace(/[€$£]/g, '')
      .replace(/CFA/g, '')
      .trim()
  } catch (e) {
    displayValue.value = value.toString()
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value
  
  // Permettre seulement chiffres, virgule, point
  value = value.replace(/[^0-9.,]/g, '')
  
  // Remplacer virgule par point pour parsing
  const normalized = value.replace(',', '.')
  
  displayValue.value = value
  
  // Parser et valider
  if (normalized === '' || normalized === '.') {
    emit('update:modelValue', null)
    errorMessage.value = ''
    return
  }
  
  const numValue = parseFloat(normalized)
  
  if (isNaN(numValue)) {
    errorMessage.value = 'Montant invalide'
    emit('validate', false)
    return
  }
  
  // Validation Zod
  const result = AmountSchema.safeParse({
    value: numValue,
    currency: props.currency
  })
  
  if (!result.success) {
    errorMessage.value = result.error.errors[0].message
    emit('validate', false)
    return
  }
  
  // Vérifier min/max
  if (numValue < props.min) {
    errorMessage.value = `Montant minimum : ${props.min}`
    emit('validate', false)
    return
  }
  
  if (numValue > props.max) {
    errorMessage.value = `Montant maximum : ${props.max}`
    emit('validate', false)
    return
  }
  
  errorMessage.value = ''
  emit('update:modelValue', numValue)
  emit('validate', true)
}

const handleBlur = () => {
  isFocused.value = false
  
  // Formater sur blur
  if (props.modelValue !== null) {
    formatDisplayValue(props.modelValue)
  }
}

const handleFocus = () => {
  isFocused.value = true
  
  // Afficher valeur brute en focus
  if (props.modelValue !== null) {
    displayValue.value = props.modelValue.toString().replace('.', ',')
  }
}

// Exposer pour parent
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>

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
  transition: all 0.2s;
}

.currency-input-wrapper:focus-within {
  border-color: #77F07F;
  box-shadow: 0 0 0 3px rgba(119, 240, 127, 0.1);
}

.currency-symbol {
  color: #6b7280;
  font-weight: 500;
}

.currency-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 500;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
}

.currency-code {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
}

.currency-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

**Commandes :**
```bash
# Créer composant
touch src/runtime/components/Form/FormCurrencyInput.vue
touch src/runtime/components/Form/FormGroup.vue

# Tests
touch tests/components/Form/FormCurrencyInput.spec.ts

# Story
touch src/runtime/components/Form/FormCurrencyInput.stories.ts

# Test dans playground
# Ajouter page playground/pages/fintech.vue
```

**Validation :**
- [ ] ✅ Input créé
- [ ] ✅ Validation temps réel
- [ ] ✅ Format au blur
- [ ] ✅ Tests passent
- [ ] ✅ Accessible

---

### Semaine 5 : Composables + Finalisation Phase 1

#### useAmountValidation.ts

```typescript
import { ref, computed } from 'vue'
import { AmountSchema } from '@/utils/schemas/fintech/amount'

export interface ValidationOptions {
  currency?: string
  min?: number
  max?: number
  required?: boolean
}

export const useAmountValidation = (options: ValidationOptions = {}) => {
  const errors = ref<string[]>([])
  const isValid = computed(() => errors.value.length === 0)
  
  const validate = (amount: number | null) => {
    errors.value = []
    
    // Required check
    if (options.required && (amount === null || amount === undefined)) {
      errors.value.push('Montant requis')
      return false
    }
    
    if (amount === null) return true
    
    // Zod schema validation
    const result = AmountSchema.safeParse({
      value: amount,
      currency: options.currency || 'EUR'
    })
    
    if (!result.success) {
      errors.value = result.error.errors.map(e => e.message)
      return false
    }
    
    // Min/max check
    if (options.min !== undefined && amount < options.min) {
      errors.value.push(`Montant minimum : ${options.min}`)
      return false
    }
    
    if (options.max !== undefined && amount > options.max) {
      errors.value.push(`Montant maximum : ${options.max}`)
      return false
    }
    
    return true
  }
  
  const reset = () => {
    errors.value = []
  }
  
  return {
    errors,
    isValid,
    validate,
    reset
  }
}
```

#### useFeeCalculation.ts

```typescript
import { Money } from '@/utils/helpers/fintech/precisionMath'

export interface FeeTier {
  min: number
  max: number
  rate: number // Pourcentage (0.02 = 2%)
  fixed: number // Montant fixe
}

export const useFeeCalculation = () => {
  const calculateTieredFee = (
    amount: number,
    tiers: FeeTier[],
    currency: string = 'EUR'
  ): Money => {
    let totalFee = Money.zero(currency)
    let remaining = amount
    
    for (const tier of tiers) {
      if (remaining <= 0) break
      
      const tierRange = tier.max - tier.min
      const applicable = Math.min(remaining, tierRange)
      
      // Frais variable (pourcentage)
      const variableFee = applicable * tier.rate
      
      // Frais fixe
      const fixedFee = tier.fixed
      
      // Total tier
      const tierFee = new Money(variableFee + fixedFee, currency)
      totalFee = totalFee.add(tierFee)
      
      remaining -= applicable
    }
    
    return totalFee
  }
  
  return {
    calculateTieredFee
  }
}
```

**Commandes :**
```bash
# Créer composables
touch src/runtime/composables/useAmountValidation.ts
touch src/runtime/composables/useFeeCalculation.ts

# Tests
touch tests/composables/useAmountValidation.spec.ts
touch tests/composables/useFeeCalculation.spec.ts

# Exporter
# Ajouter dans src/runtime/composables/index.ts
```

**Validation :**
- [ ] ✅ Composables créés
- [ ] ✅ Tests 100% coverage
- [ ] ✅ Documentation JSDoc
- [ ] ✅ Exemples d'utilisation

---

### Release Phase 1 🎉

```bash
# Vérifier tout
pnpm test
pnpm lint
pnpm build

# Coverage fintech core
pnpm test:coverage -- tests/helpers/fintech
pnpm test:coverage -- tests/components/Fintech
pnpm test:coverage -- tests/composables/useAmountValidation
pnpm test:coverage -- tests/composables/useFeeCalculation

# Commit
git add .
git commit -m "feat: Phase 1 - Fintech Core complete

COMPONENTS:
- AmountDisplay.vue (affichage précis)
- FormCurrencyInput.vue (input validé)
- TransactionStatus.vue (badge)
- WalletBalance.vue (balance)

HELPERS:
- precisionMath.ts (BigInt) ⭐ CRITIQUE
- feeCalculator.ts (algorithme tiered)

COMPOSABLES:
- useAmountValidation() (validation Zod)
- useFeeCalculation() (calcul frais)

SCHEMAS:
- amount.ts, transaction.ts, fee.ts, wallet.ts

TESTS:
- 100% coverage sur fintech core
- 50+ nouveaux tests

Phase: 1/4 (Fintech Core)
Status: Complete
Breaking Changes: None"

git push origin feat/migration-v3

# Tag beta
git tag v2.1.0-beta.1
git push --tags

# Update MIGRATION_STATUS.md
# Marquer Phase 1 comme complète

# Create PR
# Title: [Migration v3.0] Phase 1 - Fintech Core ⭐
```

**Validation Phase 1 :**
- [ ] ✅ precisionMath.ts implémenté et testé
- [ ] ✅ Schemas Zod créés
- [ ] ✅ AmountDisplay.vue fonctionnel
- [ ] ✅ FormCurrencyInput.vue validé
- [ ] ✅ Composables testés
- [ ] ✅ Coverage 100% fintech core
- [ ] ✅ Pas de breaking changes
- [ ] ✅ Build réussit
- [ ] ✅ Tous tests passent
- [ ] ✅ Documentation à jour
- [ ] ✅ Storybook stories créées
- [ ] ✅ Playground demo fonctionnelle

---

## 🎨 Phase 2 : UX Essentials (Semaines 6-8)

### Objectifs
- Composants Loading (Spinner, Skeleton, ProgressBar)
- Composants Empty (EmptyState, NoData, NoResults)
- Composants Modal (Modal, Confirm, Drawer)
- Composants Alert (Alert, Dialog, Banner)
- Dropdown, Tabs, Tooltip

### Semaine 6 : Loading & Empty

**Composants à créer :**
```bash
# Loading
src/runtime/components/Loading/Spinner.vue
src/runtime/components/Loading/Skeleton.vue
src/runtime/components/Loading/ProgressBar.vue

# Empty
src/runtime/components/Empty/EmptyState.vue
src/runtime/components/Empty/NoData.vue
src/runtime/components/Empty/NoResults.vue
```

**Validation :**
- [ ] ✅ 6 composants créés
- [ ] ✅ Tests pour chaque
- [ ] ✅ Stories Storybook
- [ ] ✅ Accessible

---

### Semaine 7 : Modal & Alert

**Composants à créer :**
```bash
# Modal
src/runtime/components/Modal/Modal.vue
src/runtime/components/Modal/ModalConfirm.vue
src/runtime/components/Modal/ModalDrawer.vue

# Alert
src/runtime/components/Alert/Alert.vue
src/runtime/components/Alert/AlertDialog.vue
src/runtime/components/Alert/AlertBanner.vue
```

**Composables :**
```typescript
useModal()
useToast()
```

**Validation :**
- [ ] ✅ 6 composants créés
- [ ] ✅ useModal() implémenté
- [ ] ✅ useToast() implémenté
- [ ] ✅ Tests + Stories

---

### Semaine 8 : Dropdown, Tabs, Tooltip

**Composants à créer :**
```bash
# Dropdown
src/runtime/components/Dropdown/Dropdown.vue
src/runtime/components/Dropdown/DropdownItem.vue

# Tabs
src/runtime/components/Tabs/Tabs.vue
src/runtime/components/Tabs/TabPanel.vue

# Tooltip
src/runtime/components/Tooltip/Tooltip.vue
```

**Validation :**
- [ ] ✅ 5 composants créés
- [ ] ✅ Accessible (ARIA)
- [ ] ✅ Keyboard navigation
- [ ] ✅ Tests + Stories

---

### Release Phase 2

```bash
git add .
git commit -m "feat: Phase 2 - UX Essentials complete

LOADING:
- Spinner, Skeleton, ProgressBar

EMPTY:
- EmptyState, NoData, NoResults

MODAL:
- Modal, ModalConfirm, ModalDrawer
- useModal()

ALERT:
- Alert, AlertDialog, AlertBanner
- useToast()

MISC:
- Dropdown, Tabs, Tooltip

Phase: 2/4 (UX Essentials)
Status: Complete"

git tag v2.2.0-beta.1
git push --tags
```

**Validation Phase 2 :**
- [ ] ✅ 15+ nouveaux composants
- [ ] ✅ Coverage >80%
- [ ] ✅ Stories Storybook
- [ ] ✅ Accessible
- [ ] ✅ Build OK

---

## 📝 Phase 3 : Forms & Tables (Semaines 9-10)

### Objectifs
- Enrichir composants Form
- Améliorer composants Table
- Composables table (sort, pagination)

### Semaine 9 : Forms

**Composants à créer :**
```bash
src/runtime/components/Form/FormGroup.vue
src/runtime/components/Form/FormTextarea.vue
src/runtime/components/Form/FormSelect.vue
src/runtime/components/Form/FormCheckbox.vue
src/runtime/components/Form/FormRadio.vue
src/runtime/components/Form/FormSwitch.vue
src/runtime/components/Form/FormDatePicker.vue
src/runtime/components/Form/FormImageUploader.vue
```

**Validation :**
- [ ] ✅ 8 composants form
- [ ] ✅ Validation intégrée
- [ ] ✅ Tests + Stories

---

### Semaine 10 : Tables

**Composants à créer :**
```bash
src/runtime/components/Table/TablePagination.vue
src/runtime/components/Table/TableSearch.vue
src/runtime/components/Table/TableEmpty.vue
```

**Composables :**
```typescript
useTableSort()
usePagination()
useDebounce()
```

**Validation :**
- [ ] ✅ 3 composants table
- [ ] ✅ 3 composables
- [ ] ✅ Tests + Stories

---

### Release Phase 3

```bash
git tag v2.3.0-rc.1
git push --tags
```

---

## ✨ Phase 4 : Polish & Release (Semaines 11-12)

### Objectifs
- Finaliser composants manquants
- Documentation complète
- Migration guide
- Release v3.0.0

### Semaine 11 : Polish

**Tasks :**
- [ ] Badge variants (BadgeStatus, BadgePulse)
- [ ] Avatar (Avatar, AvatarGroup)
- [ ] Card variants (CardStat, CardEmpty)
- [ ] Button variants (ButtonGroup, ButtonIcon)
- [ ] Utility composants (CopyButton, ThemeToggle)

**Validation :**
- [ ] ✅ Tous composants créés
- [ ] ✅ Coverage 85%+
- [ ] ✅ Stories complètes

---

### Semaine 12 : Release

**Tasks :**
- [ ] Documentation complète
- [ ] Migration guide v2→v3
- [ ] Changelog détaillé
- [ ] Breaking changes documentés
- [ ] Tests E2E dans playground
- [ ] Review sécurité

**Release v3.0.0 :**
```bash
# Final checks
pnpm test
pnpm test:coverage
pnpm lint
pnpm build
pnpm playground:build

# Update versions
npm version major # 2.x.x → 3.0.0

# Tag
git tag v3.0.0
git push --tags

# Publish
pnpm publish
```

---

## 📊 Tracking Progress

### Dashbor Migration

Utiliser `MIGRATION_STATUS.md` :

```markdown
# Migration Status

## Summary
- Phase 0: ✅ Complete
- Phase 1: ✅ Complete (100%)
- Phase 2: 🔄 In Progress (60%)
- Phase 3: ⏳ Pending
- Phase 4: ⏳ Pending

## Metrics
- Composants: 32/38 (84%)
- Composables: 12/16 (75%)
- Utils: 25/30 (83%)
- Tests: 150/200 (75%)
- Coverage: 78% (target: 85%)

## Blockers
- Aucun

## Next Steps
1. Finir Modal components
2. Créer useToast()
3. Tests Alert components
```

---

## 🚨 Gestion des Risques

### Risques Identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Breaking changes accidentels | Moyenne | Élevé | Tests exhaustifs + Dual export |
| Dépassement délais | Moyenne | Moyen | Priorisation + Phases flexibles |
| Bugs dans precisionMath | Faible | Critique | Tests edge cases + Review |
| Conflits git | Moyenne | Faible | Branches feature + PR reviews |

### Plan de Rollback

Si problème majeur en Phase X :

```bash
# Revert à tag précédent
git revert <commit-sha>

# Ou reset à tag
git reset --hard v2.x.x

# Republier version stable
git tag v2.x.x+1
pnpm publish
```

---

## ✅ Checklist Finale v3.0

### Code
- [ ] ✅ 38 composants créés
- [ ] ✅ 16 composables créés
- [ ] ✅ 30 utils créés
- [ ] ✅ Tous tests passent
- [ ] ✅ Coverage 85%+
- [ ] ✅ Pas d'erreurs TypeScript
- [ ] ✅ Lint OK
- [ ] ✅ Build OK

### Documentation
- [ ] ✅ README à jour
- [ ] ✅ CHANGELOG complet
- [ ] ✅ Migration guide v2→v3
- [ ] ✅ Breaking changes documentés
- [ ] ✅ Storybook stories (40+)
- [ ] ✅ JSDoc sur tous exports publics

### Testing
- [ ] ✅ Tests unitaires (200+)
- [ ] ✅ Tests E2E playground
- [ ] ✅ Tests accessibilité
- [ ] ✅ Tests performance
- [ ] ✅ Tests browser (Chrome, Firefox, Safari)

### Release
- [ ] ✅ Version bumped (3.0.0)
- [ ] ✅ Tags créés
- [ ] ✅ NPM published
- [ ] ✅ GitHub Release
- [ ] ✅ Annonce équipe

---

## 📞 Support

### Pendant Migration

**Questions :** Créer issue GitHub avec label `migration-v3`  
**Problèmes :** Créer issue avec label `bug` + `migration-v3`  
**Suggestions :** Créer issue avec label `enhancement` + `migration-v3`

### Après v3.0

**Documentation :** `/docs`  
**Storybook :** `pnpm storybook`  
**Playground :** `pnpm dev`

---

**Plan créé :** 17 Octobre 2025  
**Status :** ✅ Prêt pour exécution  
**Durée :** 10-12 semaines  
**Équipe :** À définir

---

**Next Step :** Commencer Phase 0 - Setup 🚀

