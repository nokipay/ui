<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Polish Components</h1>
      <p class="text-gray-600">Phase 4 - Final polish components (Badge, Divider, Progress, etc.)</p>
    </div>

    <!-- Badge -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Badge</h2>
      <p class="text-gray-600 mb-4">Badges in different variants and colors</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Variants</h3>
          <div class="flex flex-wrap gap-3">
            <Badge variant="solid" color="primary">Solid</Badge>
            <Badge variant="subtle" color="primary">Subtle</Badge>
            <Badge variant="outline" color="primary">Outline</Badge>
            <Badge variant="soft" color="primary">Soft</Badge>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Colors</h3>
          <div class="flex flex-wrap gap-3">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="error">Error</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="gray">Gray</Badge>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="flex flex-wrap items-center gap-3">
            <Badge size="xs">Extra Small</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">With Dot</h3>
          <div class="flex flex-wrap gap-3">
            <Badge dot color="success">Online</Badge>
            <Badge dot color="error">Offline</Badge>
            <Badge dot color="warning">Away</Badge>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">With Icons</h3>
          <div class="flex flex-wrap gap-3">
            <Badge icon="i-heroicons-check" color="success">Verified</Badge>
            <Badge icon="i-heroicons-star" color="warning">Featured</Badge>
            <Badge icon-right="i-heroicons-arrow-right" color="primary">Next</Badge>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Rounded</h3>
          <div class="flex flex-wrap gap-3">
            <Badge rounded color="primary">Rounded</Badge>
            <Badge rounded color="success">Pill Shape</Badge>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Divider</h2>
      <p class="text-gray-600 mb-4">Horizontal and vertical dividers with labels</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Horizontal</h3>
          <div class="space-y-4">
            <Divider />
            <Divider label="OR" />
            <Divider label="Section Title" label-position="left" />
            <Divider label="End" label-position="right" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Vertical</h3>
          <div class="flex items-center gap-4" style="height: 100px;">
            <span>Item 1</span>
            <Divider orientation="vertical" />
            <span>Item 2</span>
            <Divider orientation="vertical" />
            <span>Item 3</span>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Custom Color</h3>
          <Divider color="#77F07F" :thickness="2" />
        </div>
      </div>
    </section>

    <!-- ProgressBar -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">ProgressBar</h2>
      <p class="text-gray-600 mb-4">Progress bars with various styles</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Basic</h3>
          <ProgressBar :value="45" :max="100" />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">With Label & Percentage</h3>
          <ProgressBar
            :value="75"
            :max="100"
            label="Upload Progress"
            show-percentage
            show-label
            color="success"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Colors</h3>
          <div class="space-y-3">
            <ProgressBar :value="60" color="primary" />
            <ProgressBar :value="70" color="secondary" />
            <ProgressBar :value="80" color="success" />
            <ProgressBar :value="50" color="warning" />
            <ProgressBar :value="30" color="error" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="space-y-3">
            <ProgressBar :value="50" size="xs" />
            <ProgressBar :value="50" size="sm" />
            <ProgressBar :value="50" size="md" />
            <ProgressBar :value="50" size="lg" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Striped</h3>
          <ProgressBar :value="65" striped color="primary" />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Animated</h3>
          <ProgressBar :value="80" striped animated color="success" />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Indeterminate (Loading)</h3>
          <ProgressBar :value="0" indeterminate color="primary" />
        </div>
      </div>
    </section>

    <!-- Breadcrumb -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Breadcrumb</h2>
      <p class="text-gray-600 mb-4">Navigation breadcrumbs</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Default</h3>
          <Breadcrumb :items="breadcrumbItems1" @click="handleBreadcrumbClick" />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">With Icons</h3>
          <Breadcrumb :items="breadcrumbItems2" />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Custom Separator</h3>
          <Breadcrumb :items="breadcrumbItems1" separator=">" />
        </div>
      </div>
    </section>

    <!-- Chip -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Chip</h2>
      <p class="text-gray-600 mb-4">Chips/Tags with various styles</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Variants</h3>
          <div class="flex flex-wrap gap-3">
            <Chip variant="filled" color="primary">Filled</Chip>
            <Chip variant="outlined" color="primary">Outlined</Chip>
            <Chip variant="light" color="primary">Light</Chip>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Colors</h3>
          <div class="flex flex-wrap gap-3">
            <Chip color="primary">Primary</Chip>
            <Chip color="secondary">Secondary</Chip>
            <Chip color="success">Success</Chip>
            <Chip color="error">Error</Chip>
            <Chip color="warning">Warning</Chip>
            <Chip color="info">Info</Chip>
            <Chip color="gray">Gray</Chip>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="flex flex-wrap items-center gap-3">
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">With Icons</h3>
          <div class="flex flex-wrap gap-3">
            <Chip icon="i-heroicons-star" color="warning">Featured</Chip>
            <Chip icon="i-heroicons-check" color="success">Verified</Chip>
            <Chip icon="i-heroicons-tag" color="primary">Tagged</Chip>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Closable</h3>
          <div class="flex flex-wrap gap-3">
            <Chip
              v-for="tag in tags"
              :key="tag.id"
              closable
              :color="tag.color"
              @close="removeTag(tag.id)"
            >
              {{ tag.label }}
            </Chip>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Clickable</h3>
          <div class="flex flex-wrap gap-3">
            <Chip clickable color="primary" @click="handleChipClick">Click me</Chip>
            <Chip clickable color="secondary" @click="handleChipClick">Click me too</Chip>
          </div>
        </div>
      </div>
    </section>

    <!-- Stepper -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Stepper</h2>
      <p class="text-gray-600 mb-4">Step indicators for multi-step processes</p>
      
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Horizontal Stepper</h3>
          <Stepper
            :steps="horizontalSteps"
            :current-step="currentStep"
            orientation="horizontal"
            :clickable="true"
            @step-click="handleStepClick"
          />
          
          <div class="flex justify-center gap-3 mt-6">
            <button
              @click="currentStep = Math.max(0, currentStep - 1)"
              :disabled="currentStep === 0"
              class="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
            >
              Previous
            </button>
            <button
              @click="currentStep = Math.min(horizontalSteps.length - 1, currentStep + 1)"
              :disabled="currentStep === horizontalSteps.length - 1"
              class="px-4 py-2 bg-nxGreen-500 text-white rounded-lg disabled:opacity-50 hover:bg-nxGreen-600"
            >
              Next
            </button>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Vertical Stepper</h3>
          <Stepper
            :steps="verticalSteps"
            :current-step="1"
            orientation="vertical"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">With Icons</h3>
          <Stepper
            :steps="iconSteps"
            :current-step="2"
            orientation="horizontal"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Breadcrumb
const breadcrumbItems1 = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Category', to: '/products/category' },
  { label: 'Item', to: '/products/category/item' },
]

const breadcrumbItems2 = [
  { label: 'Home', to: '/', icon: 'i-heroicons-home' },
  { label: 'Dashboard', to: '/dashboard', icon: 'i-heroicons-chart-bar' },
  { label: 'Settings', to: '/settings', icon: 'i-heroicons-cog-6-tooth' },
]

const handleBreadcrumbClick = (item: any, index: number) => {
  console.log('Breadcrumb clicked:', item, index)
}

// Chip
const tags = ref([
  { id: 1, label: 'React', color: 'primary' as const },
  { id: 2, label: 'Vue', color: 'success' as const },
  { id: 3, label: 'Angular', color: 'error' as const },
  { id: 4, label: 'Svelte', color: 'warning' as const },
])

const removeTag = (id: number) => {
  tags.value = tags.value.filter(tag => tag.id !== id)
}

const handleChipClick = () => {
  console.log('Chip clicked!')
}

// Stepper
const currentStep = ref(1)

const horizontalSteps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Complete your profile' },
  { label: 'Verification', description: 'Verify your identity' },
  { label: 'Done', description: 'All set!' },
]

const verticalSteps = [
  { label: 'Order placed', description: 'Your order has been placed', status: 'completed' as const },
  { label: 'Processing', description: 'Your order is being processed', status: 'current' as const },
  { label: 'Shipped', description: 'Your order has been shipped', status: 'pending' as const },
  { label: 'Delivered', description: 'Order delivered to you', status: 'pending' as const },
]

const iconSteps = [
  { label: 'Cart', icon: 'i-heroicons-shopping-cart' },
  { label: 'Details', icon: 'i-heroicons-document-text' },
  { label: 'Payment', icon: 'i-heroicons-credit-card' },
  { label: 'Confirmation', icon: 'i-heroicons-check-circle' },
]

const handleStepClick = (index: number) => {
  currentStep.value = index
}
</script>

