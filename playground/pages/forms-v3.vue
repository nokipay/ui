<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Forms V3</h1>
      <p class="text-gray-600">Phase 3 - Enhanced form components</p>
    </div>

    <!-- FormTextarea -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">FormTextarea</h2>
      <p class="text-gray-600 mb-4">Textarea with character count and validation</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormTextarea
          v-model="textarea1"
          label="Description"
          placeholder="Enter a description..."
          :rows="4"
          :max-length="200"
          show-count
          required
        />
        
        <FormTextarea
          v-model="textarea2"
          label="Auto-resize Textarea"
          placeholder="This textarea auto-resizes..."
          :auto-resize="true"
          :min-rows="3"
          :max-rows="8"
        />
      </div>
    </section>

    <!-- FormSelect -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">FormSelect</h2>
      <p class="text-gray-600 mb-4">Styled select dropdown</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormSelect
          v-model="select1"
          label="Country"
          :options="countries"
          placeholder="Select a country..."
          required
        />
        
        <FormSelect
          v-model="select2"
          label="Status"
          :options="statuses"
          required
        />
        
        <FormSelect
          v-model="select3"
          label="Disabled"
          :options="countries"
          :disabled="true"
          :model-value="'FR'"
        />
      </div>
    </section>

    <!-- FormCheckbox -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">FormCheckbox</h2>
      <p class="text-gray-600 mb-4">Checkbox with label and description</p>
      
      <div class="space-y-4">
        <FormCheckbox
          v-model="checkbox1"
          label="Accept terms and conditions"
          description="By checking this, you agree to our terms of service"
        />
        
        <FormCheckbox
          v-model="checkbox2"
          label="Subscribe to newsletter"
          description="Receive updates about new features and products"
        />
        
        <FormCheckbox
          v-model="checkbox3"
          label="Enable notifications"
        />
        
        <FormCheckbox
          v-model="indeterminate"
          label="Indeterminate state"
          :indeterminate="true"
        />
        
        <FormCheckbox
          v-model="checkbox4"
          label="Disabled checkbox"
          :disabled="true"
        />
      </div>
    </section>

    <!-- FormRadio -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">FormRadio</h2>
      <p class="text-gray-600 mb-4">Radio button groups</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Payment Method</h3>
          <div class="space-y-3">
            <FormRadio
              v-model="paymentMethod"
              value="card"
              label="Credit Card"
              description="Pay with your credit or debit card"
              name="payment"
            />
            <FormRadio
              v-model="paymentMethod"
              value="bank"
              label="Bank Transfer"
              description="Direct bank transfer"
              name="payment"
            />
            <FormRadio
              v-model="paymentMethod"
              value="wallet"
              label="Mobile Wallet"
              description="Pay using your mobile wallet"
              name="payment"
            />
          </div>
          <p class="mt-3 text-sm text-gray-600">Selected: {{ paymentMethod }}</p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Plan Type</h3>
          <div class="space-y-3">
            <FormRadio
              v-model="planType"
              value="free"
              label="Free"
              name="plan"
            />
            <FormRadio
              v-model="planType"
              value="pro"
              label="Pro"
              name="plan"
            />
            <FormRadio
              v-model="planType"
              value="enterprise"
              label="Enterprise"
              name="plan"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- FormSwitch -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">FormSwitch</h2>
      <p class="text-gray-600 mb-4">Toggle switches in different sizes</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="space-y-3">
            <FormSwitch
              v-model="switch1"
              label="Small switch"
              size="sm"
            />
            <FormSwitch
              v-model="switch2"
              label="Medium switch"
              size="md"
            />
            <FormSwitch
              v-model="switch3"
              label="Large switch"
              size="lg"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">With Descriptions</h3>
          <div class="space-y-4">
            <FormSwitch
              v-model="switch4"
              label="Email notifications"
              description="Receive email notifications for important updates"
            />
            <FormSwitch
              v-model="switch5"
              label="Two-factor authentication"
              description="Add an extra layer of security to your account"
            />
            <FormSwitch
              v-model="switch6"
              label="Auto-save"
              description="Automatically save your changes"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Disabled</h3>
          <FormSwitch
            v-model="switch7"
            label="Disabled switch"
            :disabled="true"
          />
        </div>
      </div>
    </section>

    <!-- Complete Form Example -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Complete Form Example</h2>
      <p class="text-gray-600 mb-4">All form components together</p>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormGroup label="Full Name" required>
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nxGreen-500 focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </FormGroup>
          
          <FormGroup label="Email" required>
            <input
              v-model="formData.email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nxGreen-500 focus:border-transparent"
              placeholder="john@example.com"
              required
            />
          </FormGroup>
        </div>
        
        <FormSelect
          v-model="formData.country"
          label="Country"
          :options="countries"
          required
        />
        
        <FormTextarea
          v-model="formData.bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          :rows="4"
          :max-length="500"
          show-count
        />
        
        <FormCheckbox
          v-model="formData.terms"
          label="I accept the terms and conditions"
          required
        />
        
        <FormSwitch
          v-model="formData.newsletter"
          label="Subscribe to newsletter"
        />
        
        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-nxGreen-500 text-white rounded-lg hover:bg-nxGreen-600"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Textarea
const textarea1 = ref('')
const textarea2 = ref('')

// Select
const select1 = ref('')
const select2 = ref('')
const select3 = ref('FR')

const countries = [
  { label: 'France', value: 'FR' },
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Germany', value: 'DE' },
  { label: 'Spain', value: 'ES' },
]

const statuses = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Inactive', value: 'inactive' },
]

// Checkbox
const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(true)
const checkbox4 = ref(false)
const indeterminate = ref(false)

// Radio
const paymentMethod = ref('card')
const planType = ref('free')

// Switch
const switch1 = ref(false)
const switch2 = ref(true)
const switch3 = ref(false)
const switch4 = ref(true)
const switch5 = ref(false)
const switch6 = ref(true)
const switch7 = ref(false)

// Form data
const formData = ref({
  name: '',
  email: '',
  country: '',
  bio: '',
  terms: false,
  newsletter: false,
})

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
}
</script>

