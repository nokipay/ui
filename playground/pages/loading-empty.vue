<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Loading & Empty States</h1>
      <p class="text-gray-600">Phase 2 - Loading indicators and empty state components</p>
    </div>

    <!-- LoadingSpinner -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">LoadingSpinner</h2>
      <p class="text-gray-600 mb-4">Animated loading spinners in different sizes and colors</p>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="flex flex-col items-center gap-3">
          <LoadingSpinner size="sm" />
          <p class="text-sm text-gray-600">Small</p>
        </div>
        
        <div class="flex flex-col items-center gap-3">
          <LoadingSpinner size="md" />
          <p class="text-sm text-gray-600">Medium</p>
        </div>
        
        <div class="flex flex-col items-center gap-3">
          <LoadingSpinner size="lg" />
          <p class="text-sm text-gray-600">Large</p>
        </div>
        
        <div class="flex flex-col items-center gap-3">
          <LoadingSpinner size="md" color="secondary" />
          <p class="text-sm text-gray-600">Secondary</p>
        </div>
      </div>
    </section>

    <!-- LoadingOverlay -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">LoadingOverlay</h2>
      <p class="text-gray-600 mb-4">Full-screen loading overlay with backdrop</p>
      
      <div class="space-y-4">
        <button
          @click="showOverlay = true"
          class="px-4 py-2 bg-nxGreen-500 text-white rounded-lg hover:bg-nxGreen-600 transition-colors"
        >
          Show Loading Overlay
        </button>
        
        <LoadingOverlay
          :show="showOverlay"
          message="Loading your data..."
        />
      </div>
    </section>

    <!-- Skeleton -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Skeleton</h2>
      <p class="text-gray-600 mb-4">Skeleton loaders for content placeholders</p>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Basic Shapes</h3>
          <div class="space-y-3">
            <Skeleton width="100%" height="20px" />
            <Skeleton width="80%" height="20px" />
            <Skeleton width="60%" height="20px" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Circle (Avatar)</h3>
          <Skeleton shape="circle" width="64px" height="64px" />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Card Layout</h3>
          <div class="border rounded-lg p-4 space-y-3">
            <div class="flex items-center gap-3">
              <Skeleton shape="circle" width="40px" height="40px" />
              <div class="flex-1 space-y-2">
                <Skeleton width="60%" height="16px" />
                <Skeleton width="40%" height="14px" />
              </div>
            </div>
            <Skeleton width="100%" height="100px" />
            <div class="space-y-2">
              <Skeleton width="100%" height="12px" />
              <Skeleton width="90%" height="12px" />
              <Skeleton width="80%" height="12px" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">No Animation</h3>
          <Skeleton width="100%" height="40px" :animated="false" />
        </div>
      </div>
    </section>

    <!-- EmptyState -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">EmptyState</h2>
      <p class="text-gray-600 mb-4">Empty state component with icon and action</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border rounded-lg p-6">
          <EmptyState
            icon="i-heroicons-inbox"
            title="No messages"
            description="You don't have any messages yet. Start a conversation to get started."
          />
        </div>
        
        <div class="border rounded-lg p-6">
          <EmptyState
            icon="i-heroicons-document-text"
            title="No transactions"
            description="You haven't made any transactions yet."
            action-label="Make a transaction"
            @action="handleAction"
          />
        </div>
        
        <div class="border rounded-lg p-6">
          <EmptyState
            icon="i-heroicons-user-group"
            title="No team members"
            description="Invite team members to collaborate on this project."
            action-label="Invite members"
          />
        </div>
        
        <div class="border rounded-lg p-6">
          <EmptyState
            icon="i-heroicons-chart-bar"
            title="No data available"
            description="Start collecting data to see analytics here."
          />
        </div>
      </div>
    </section>

    <!-- NoData -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">NoData</h2>
      <p class="text-gray-600 mb-4">Simple "no data" message component</p>
      
      <div class="border rounded-lg p-6">
        <NoData message="No results found for your search" />
      </div>
    </section>

    <!-- Loading States Demo -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Loading States Demo</h2>
      <p class="text-gray-600 mb-4">Toggle between loading, empty, and loaded states</p>
      
      <div class="space-y-4">
        <div class="flex gap-3">
          <button
            @click="currentState = 'loading'"
            :class="[
              'px-4 py-2 rounded-lg transition-colors',
              currentState === 'loading' ? 'bg-nxGreen-500 text-white' : 'bg-gray-200 text-gray-700'
            ]"
          >
            Loading
          </button>
          <button
            @click="currentState = 'empty'"
            :class="[
              'px-4 py-2 rounded-lg transition-colors',
              currentState === 'empty' ? 'bg-nxGreen-500 text-white' : 'bg-gray-200 text-gray-700'
            ]"
          >
            Empty
          </button>
          <button
            @click="currentState = 'loaded'"
            :class="[
              'px-4 py-2 rounded-lg transition-colors',
              currentState === 'loaded' ? 'bg-nxGreen-500 text-white' : 'bg-gray-200 text-gray-700'
            ]"
          >
            Loaded
          </button>
        </div>
        
        <div class="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
          <div v-if="currentState === 'loading'" class="text-center">
            <LoadingSpinner size="lg" />
            <p class="mt-4 text-gray-600">Loading your data...</p>
          </div>
          
          <EmptyState
            v-else-if="currentState === 'empty'"
            icon="i-heroicons-folder-open"
            title="No data"
            description="There's nothing to show here yet."
          />
          
          <div v-else class="w-full space-y-3">
            <div v-for="i in 5" :key="i" class="border rounded-lg p-4">
              <h3 class="font-semibold">Item {{ i }}</h3>
              <p class="text-sm text-gray-600">This is some loaded content</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showOverlay = ref(false)
const currentState = ref<'loading' | 'empty' | 'loaded'>('loading')

const handleAction = () => {
  console.log('Action clicked')
}

// Auto-hide overlay after 2 seconds
watch(() => showOverlay.value, (value) => {
  if (value) {
    setTimeout(() => {
      showOverlay.value = false
    }, 2000)
  }
})
</script>

