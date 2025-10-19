<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Fintech Components V3</h1>
      <p class="text-gray-600">Phase 1 - Core Fintech components with BigInt precision</p>
    </div>

    <!-- AmountDisplay -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">AmountDisplay</h2>
      <p class="text-gray-600 mb-4">Display formatted amounts with precision</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-4 border rounded-lg">
          <p class="text-sm text-gray-500 mb-2">Default (EUR)</p>
          <AmountDisplay :amount="1234.56" currency="EUR" />
        </div>
        
        <div class="p-4 border rounded-lg">
          <p class="text-sm text-gray-500 mb-2">USD - Large</p>
          <AmountDisplay :amount="9876543.21" currency="USD" size="xl" color="primary" />
        </div>
        
        <div class="p-4 border rounded-lg">
          <p class="text-sm text-gray-500 mb-2">XOF - Success</p>
          <AmountDisplay :amount="500000" currency="XOF" color="success" size="lg" />
        </div>
        
        <div class="p-4 border rounded-lg">
          <p class="text-sm text-gray-500 mb-2">GBP - Error</p>
          <AmountDisplay :amount="999.99" currency="GBP" color="error" />
        </div>
        
        <div class="p-4 border rounded-lg">
          <p class="text-sm text-gray-500 mb-2">XAF - Warning</p>
          <AmountDisplay :amount="250000" currency="XAF" color="warning" size="md" />
        </div>
        
        <div class="p-4 border rounded-lg">
          <p class="text-sm text-gray-500 mb-2">Small - No Symbol</p>
          <AmountDisplay :amount="42.50" currency="EUR" size="sm" :show-currency="false" />
        </div>
      </div>
    </section>

    <!-- FormCurrencyInput -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">FormCurrencyInput</h2>
      <p class="text-gray-600 mb-4">Currency input with validation and Money class integration</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormCurrencyInput
            v-model="amount1"
            label="Amount (EUR)"
            currency="EUR"
            :min="0"
            :max="10000"
            required
            placeholder="0.00"
          />
          <p class="mt-2 text-sm text-gray-600">Value: {{ amount1 }}</p>
        </div>
        
        <div>
          <FormCurrencyInput
            v-model="amount2"
            label="Transfer Amount (USD)"
            currency="USD"
            :min="10"
            :max="1000000"
            required
          />
          <p class="mt-2 text-sm text-gray-600">Value: {{ amount2 }}</p>
        </div>
        
        <div>
          <FormCurrencyInput
            v-model="amount3"
            label="Optional Amount (XOF)"
            currency="XOF"
            :required="false"
          />
        </div>
        
        <div>
          <FormCurrencyInput
            v-model="amount4"
            label="Disabled"
            currency="EUR"
            :disabled="true"
            :model-value="500"
          />
        </div>
      </div>
    </section>

    <!-- TransactionStatusBadge -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">TransactionStatusBadge</h2>
      <p class="text-gray-600 mb-4">Status badges for transactions</p>
      
      <div class="flex flex-wrap gap-3">
        <TransactionStatusBadge status="PENDING" />
        <TransactionStatusBadge status="PROCESSING" />
        <TransactionStatusBadge status="COMPLETED" />
        <TransactionStatusBadge status="FAILED" />
        <TransactionStatusBadge status="CANCELLED" />
        <TransactionStatusBadge status="REFUNDED" />
        <TransactionStatusBadge status="DISPUTED" />
      </div>
    </section>

    <!-- WalletBalance -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">WalletBalance</h2>
      <p class="text-gray-600 mb-4">Display wallet balance with actions</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WalletBalance
          :balance="5432.10"
          currency="EUR"
          show-actions
          @deposit="handleDeposit"
          @withdraw="handleWithdraw"
        />
        
        <WalletBalance
          :balance="12500000"
          currency="XOF"
          show-actions
        />
      </div>
    </section>

    <!-- FeeCalculator -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">FeeCalculator</h2>
      <p class="text-gray-600 mb-4">Calculate fees with different structures</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Fixed Fee</h3>
          <FeeCalculator
            :amount="1000"
            currency="EUR"
            :fee-structure="{
              type: 'FIXED',
              amount: { value: 5, currency: 'EUR' }
            }"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Percentage Fee (2.5% with cap)</h3>
          <FeeCalculator
            :amount="500"
            currency="EUR"
            :fee-structure="{
              type: 'PERCENTAGE',
              rate: 0.025,
              cap: { value: 10, currency: 'EUR' }
            }"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Tiered Fee</h3>
          <FeeCalculator
            :amount="2500"
            currency="EUR"
            :fee-structure="{
              type: 'TIERED',
              tiers: [
                { min: 0, max: 1000, rate: 0.03 },
                { min: 1000, max: 5000, rate: 0.02 },
                { min: 5000, rate: 0.01 }
              ]
            }"
          />
        </div>
      </div>
    </section>

    <!-- Money Class Demo -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Money Class (BigInt Precision)</h2>
      <p class="text-gray-600 mb-4">Demonstration of precise financial calculations</p>
      
      <div class="space-y-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="text-sm font-medium text-gray-700 mb-2">Addition: 1000 + 250.50</p>
          <p class="text-lg font-bold text-nxGreen-600">{{ moneyCalculations.addition }}</p>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="text-sm font-medium text-gray-700 mb-2">Subtraction: 1000 - 250.50</p>
          <p class="text-lg font-bold text-nxGreen-600">{{ moneyCalculations.subtraction }}</p>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="text-sm font-medium text-gray-700 mb-2">Multiplication: 100 × 1.5</p>
          <p class="text-lg font-bold text-nxGreen-600">{{ moneyCalculations.multiplication }}</p>
        </div>
        
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="text-sm font-medium text-gray-700 mb-2">Division: 1000 ÷ 3</p>
          <p class="text-lg font-bold text-nxGreen-600">{{ moneyCalculations.division }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Money } from '../../src/runtime/utils/helpers/fintech/precisionMath'

const amount1 = ref(0)
const amount2 = ref(0)
const amount3 = ref(0)
const amount4 = ref(500)

const handleDeposit = () => {
  console.log('Deposit clicked')
}

const handleWithdraw = () => {
  console.log('Withdraw clicked')
}

// Money class calculations
const moneyCalculations = computed(() => {
  const money1 = new Money(1000, 'EUR')
  const money2 = new Money(250.50, 'EUR')
  const money3 = new Money(100, 'EUR')
  const money4 = new Money(1000, 'EUR')
  
  return {
    addition: money1.add(money2).format(),
    subtraction: money1.subtract(money2).format(),
    multiplication: money3.multiply(1.5).format(),
    division: money4.divide(3).format(),
  }
})
</script>

