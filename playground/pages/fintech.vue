<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAmountValidation, useFeeCalculation } from '../../src/runtime/composables'

// State
const amount = ref<number | null>(null)
const currency = ref('EUR')

// Validation
const { validate, errors, isValid } = useAmountValidation({
  min: 1,
  max: 10000,
  required: false
})

// Fee calculation
const { calculateFee } = useFeeCalculation()

const FEE_STRUCTURE = {
  name: 'Standard',
  tiers: [
    { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
    { min: 100, max: 1000, rate: 0.015, fixed: 0.30 },
    { min: 1000, max: Infinity, rate: 0.01, fixed: 0.20 }
  ],
  currency: 'EUR',
  active: true
}

// Calcul des frais
const feeResult = computed(() => {
  if (!amount.value) return null
  return calculateFee(amount.value, FEE_STRUCTURE)
})

const handleValidate = (valid: boolean) => {
  if (amount.value !== null) {
    validate(amount.value)
  }
}

// Exemples de montants
const exampleAmounts = [
  { value: 49.99, label: 'Petit paiement (49,99 €)' },
  { value: 249.99, label: 'Paiement moyen (249,99 €)' },
  { value: 1499.99, label: 'Grand paiement (1 499,99 €)' },
  { value: 9999.99, label: 'Très grand (9 999,99 €)' }
]

const setExampleAmount = (value: number) => {
  amount.value = value
  validate(value)
}

// Démonstration précision float
const floatPrecisionDemo = computed(() => {
  const jsResult = 0.1 + 0.2
  return {
    js: jsResult,
    isWrong: jsResult !== 0.3
  }
})
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Composants Fintech
      </h1>
      <p class="text-gray-600">
        Composants critiques pour applications financières avec précision garantie
      </p>
    </div>

    <!-- Précision Float Demo -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h2 class="text-xl font-semibold text-yellow-900 mb-4">
        ⚠️ Pourquoi precisionMath.ts est CRITIQUE
      </h2>
      
      <div class="space-y-4">
        <div>
          <p class="text-sm font-medium text-gray-700 mb-2">JavaScript natif (DANGER) :</p>
          <code class="block bg-red-100 text-red-700 px-4 py-2 rounded font-mono text-sm">
            0.1 + 0.2 = {{ floatPrecisionDemo.js }}
            <span v-if="floatPrecisionDemo.isWrong" class="text-red-600 font-bold">❌ ERREUR</span>
          </code>
        </div>
        
        <div>
          <p class="text-sm font-medium text-gray-700 mb-2">Avec Money class (PRÉCIS) :</p>
          <div class="bg-green-100 text-green-700 px-4 py-2 rounded font-mono text-sm">
            <AmountDisplay :amount="0.3" currency="EUR" size="md" weight="bold" />
            <span class="text-green-600 font-bold ml-2">✅ CORRECT</span>
          </div>
        </div>
      </div>
    </div>

    <!-- FormCurrencyInput Demo -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">
        FormCurrencyInput - Saisie de Montant
      </h2>
      
      <div class="max-w-md space-y-6">
        <!-- Input -->
        <FormCurrencyInput
          v-model="amount"
          label="Montant de la transaction"
          hint="Entre 1 € et 10 000 €"
          :currency="currency"
          :min="1"
          :max="10000"
          required
          @validate="handleValidate"
        />
        
        <!-- Validation Status -->
        <div v-if="amount !== null" class="text-sm">
          <div 
            v-if="isValid" 
            class="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded"
          >
            <span class="text-lg">✅</span>
            <span>Montant valide</span>
          </div>
          <div 
            v-else 
            class="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded"
          >
            <span class="text-lg">❌</span>
            <div>
              <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>
          </div>
        </div>
        
        <!-- Exemples rapides -->
        <div>
          <p class="text-sm font-medium text-gray-700 mb-2">Exemples :</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="example in exampleAmounts"
              :key="example.value"
              class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
              @click="setExampleAmount(example.value)"
            >
              {{ example.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- AmountDisplay Demo -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">
        AmountDisplay - Affichage de Montant
      </h2>
      
      <div class="space-y-6">
        <!-- Tailles -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Tailles :</h3>
          <div class="space-y-2">
            <div><AmountDisplay :amount="1234.56" currency="EUR" size="xs" /> - xs</div>
            <div><AmountDisplay :amount="1234.56" currency="EUR" size="sm" /> - sm</div>
            <div><AmountDisplay :amount="1234.56" currency="EUR" size="md" /> - md</div>
            <div><AmountDisplay :amount="1234.56" currency="EUR" size="lg" /> - lg</div>
            <div><AmountDisplay :amount="1234.56" currency="EUR" size="xl" /> - xl</div>
            <div><AmountDisplay :amount="1234.56" currency="EUR" size="2xl" /> - 2xl</div>
          </div>
        </div>
        
        <!-- Couleurs -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Couleurs :</h3>
          <div class="space-y-2">
            <div><AmountDisplay :amount="100" color="default" /> - Default</div>
            <div><AmountDisplay :amount="100" color="positive" /> - Positive (Gain)</div>
            <div><AmountDisplay :amount="-50" color="negative" /> - Negative (Perte)</div>
            <div><AmountDisplay :amount="100" color="muted" /> - Muted</div>
          </div>
        </div>
        
        <!-- Devises -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Devises :</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gray-50 rounded">
              <p class="text-xs text-gray-500 mb-1">EUR</p>
              <AmountDisplay :amount="1234.56" currency="EUR" size="lg" weight="semibold" />
            </div>
            <div class="p-4 bg-gray-50 rounded">
              <p class="text-xs text-gray-500 mb-1">USD</p>
              <AmountDisplay :amount="1234.56" currency="USD" size="lg" weight="semibold" />
            </div>
            <div class="p-4 bg-gray-50 rounded">
              <p class="text-xs text-gray-500 mb-1">GBP</p>
              <AmountDisplay :amount="1234.56" currency="GBP" size="lg" weight="semibold" />
            </div>
            <div class="p-4 bg-gray-50 rounded">
              <p class="text-xs text-gray-500 mb-1">XOF (CFA)</p>
              <AmountDisplay :amount="50000" currency="XOF" size="lg" weight="semibold" :show-decimals="false" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fee Calculation Demo -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">
        Calcul de Frais - Structure à Paliers
      </h2>
      
      <div v-if="feeResult" class="space-y-6">
        <!-- Résumé -->
        <div class="grid grid-cols-3 gap-4">
          <div class="p-4 bg-blue-50 rounded-lg">
            <p class="text-xs text-blue-600 mb-1">Montant de base</p>
            <AmountDisplay 
              :amount="feeResult.baseAmount" 
              :currency="feeResult.currency"
              size="lg" 
              weight="bold"
            />
          </div>
          
          <div class="p-4 bg-yellow-50 rounded-lg">
            <p class="text-xs text-yellow-600 mb-1">Frais calculés</p>
            <AmountDisplay 
              :amount="feeResult.totalFee" 
              :currency="feeResult.currency"
              size="lg" 
              weight="bold"
              color="muted"
            />
          </div>
          
          <div class="p-4 bg-green-50 rounded-lg">
            <p class="text-xs text-green-600 mb-1">Total à payer</p>
            <AmountDisplay 
              :amount="feeResult.finalAmount" 
              :currency="feeResult.currency"
              size="lg" 
              weight="bold"
              color="positive"
            />
          </div>
        </div>
        
        <!-- Breakdown -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Détail du calcul :</h3>
          <div class="space-y-2">
            <div
              v-for="(item, index) in feeResult.breakdown"
              :key="index"
              class="p-3 bg-gray-50 rounded text-sm"
            >
              <div class="flex justify-between items-center">
                <span class="text-gray-600">
                  Palier {{ index + 1 }} 
                  ({{ item.tier.min }} - {{ item.tier.max === Infinity ? '∞' : item.tier.max }})
                </span>
                <span class="font-mono font-medium">
                  {{ item.applicableAmount.toFixed(2) }} × {{ (item.tier.rate * 100).toFixed(1) }}% + {{ item.tier.fixed }}
                  = {{ item.totalFee.toFixed(2) }} €
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Structure de frais -->
        <details class="text-sm">
          <summary class="cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
            Voir la structure de frais
          </summary>
          <pre class="mt-2 p-4 bg-gray-900 text-green-400 rounded overflow-auto text-xs">{{ JSON.stringify(FEE_STRUCTURE, null, 2) }}</pre>
        </details>
      </div>
      
      <div v-else class="text-center text-gray-500 py-8">
        Saisissez un montant ci-dessus pour voir le calcul des frais
      </div>
    </div>

    <!-- Exemple d'utilisation dans tableau -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">
        Exemple : Tableau de Transactions
      </h2>
      
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Description
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Montant
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Statut
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 text-sm text-gray-900">Paiement client #1234</td>
            <td class="px-6 py-4 text-right">
              <AmountDisplay :amount="149.99" currency="EUR" color="positive" weight="medium" />
            </td>
            <td class="px-6 py-4 text-right">
              <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Complété
              </span>
            </td>
          </tr>
          
          <tr>
            <td class="px-6 py-4 text-sm text-gray-900">Transfert sortant</td>
            <td class="px-6 py-4 text-right">
              <AmountDisplay :amount="-75.50" currency="EUR" color="negative" weight="medium" />
            </td>
            <td class="px-6 py-4 text-right">
              <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                En attente
              </span>
            </td>
          </tr>
          
          <tr>
            <td class="px-6 py-4 text-sm text-gray-900">Dépôt XOF</td>
            <td class="px-6 py-4 text-right">
              <AmountDisplay :amount="50000" currency="XOF" color="positive" weight="medium" :show-decimals="false" />
            </td>
            <td class="px-6 py-4 text-right">
              <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Complété
              </span>
            </td>
          </tr>
          
          <tr class="bg-gray-50">
            <td class="px-6 py-4 text-sm font-semibold text-gray-900">Solde actuel</td>
            <td class="px-6 py-4 text-right" colspan="2">
              <AmountDisplay :amount="2543.78" currency="EUR" size="lg" weight="bold" color="default" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Code Examples -->
    <div class="bg-gray-900 rounded-lg p-6 text-sm">
      <h2 class="text-xl font-semibold text-green-400 mb-4">
        Exemples de Code
      </h2>
      
      <div class="space-y-4 text-green-300 font-mono">
        <div>
          <p class="text-gray-400 mb-2">// 1. Afficher un montant</p>
          <code>&lt;AmountDisplay :amount="1234.56" currency="EUR" size="lg" /&gt;</code>
        </div>
        
        <div>
          <p class="text-gray-400 mb-2">// 2. Input avec validation</p>
          <code>&lt;FormCurrencyInput v-model="amount" :min="1" :max="10000" /&gt;</code>
        </div>
        
        <div>
          <p class="text-gray-400 mb-2">// 3. Valider un montant</p>
          <code>const { validate } = useAmountValidation({ min: 1, max: 1000 })</code>
          <br>
          <code>const result = validate(100)</code>
        </div>
        
        <div>
          <p class="text-gray-400 mb-2">// 4. Calculer des frais</p>
          <code>const { calculateFee } = useFeeCalculation()</code>
          <br>
          <code>const result = calculateFee(amount, feeStructure)</code>
        </div>
        
        <div>
          <p class="text-gray-400 mb-2">// 5. Précision avec Money class</p>
          <code>const price = new Money(19.99, 'EUR')</code>
          <br>
          <code>const tax = price.multiply(0.20)</code>
          <br>
          <code>const total = price.add(tax) // Précis ✅</code>
        </div>
      </div>
    </div>
  </div>
</template>

