<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <div class="text-center py-12">
      <h1 class="text-5xl font-bold text-gray-900 mb-4">
        NxPay UI <span class="gradient-nxpay-text">v3.0</span>
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Production-ready Fintech UI library for Nuxt
      </p>
      <div class="flex justify-center gap-4">
          <NuxtLink
          to="/fintech-v3"
          class="px-6 py-3 bg-nxGreen-500 text-white rounded-lg font-semibold hover:bg-nxGreen-600 transition-colors"
          >
          View Components
          </NuxtLink>
        <a
          href="https://github.com/nxpay/ui"
          target="_blank"
          class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-nxGreen-500 hover:text-nxGreen-600 transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div class="text-center p-6 bg-white rounded-lg shadow-sm">
        <div class="text-4xl font-bold text-nxGreen-600">37</div>
        <div class="text-sm text-gray-600 mt-2">Components</div>
      </div>
      <div class="text-center p-6 bg-white rounded-lg shadow-sm">
        <div class="text-4xl font-bold text-nxTeal-600">7</div>
        <div class="text-sm text-gray-600 mt-2">Composables</div>
      </div>
      <div class="text-center p-6 bg-white rounded-lg shadow-sm">
        <div class="text-4xl font-bold text-blue-600">258</div>
        <div class="text-sm text-gray-600 mt-2">Tests</div>
      </div>
      <div class="text-center p-6 bg-white rounded-lg shadow-sm">
        <div class="text-4xl font-bold text-purple-600">100%</div>
        <div class="text-sm text-gray-600 mt-2">TypeScript</div>
      </div>
    </div>

    <!-- Component Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Phase 1: Fintech -->
      <NuxtLink to="/fintech-v3" class="group">
        <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent group-hover:border-nxGreen-500">
          <div class="w-12 h-12 bg-nxGreen-100 rounded-lg flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-nxGreen-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Fintech Core</h3>
          <p class="text-sm text-gray-600 mb-3">
            Money precision, currency inputs, fee calculator
          </p>
          <div class="text-sm text-nxGreen-600 font-medium">
            6 components →
          </div>
        </div>
      </NuxtLink>

      <!-- Phase 2: Loading & Empty -->
      <NuxtLink to="/loading-empty" class="group">
        <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent group-hover:border-blue-500">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-blue-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Loading States</h3>
          <p class="text-sm text-gray-600 mb-3">
            Spinners, skeletons, overlays, empty states
          </p>
          <div class="text-sm text-blue-600 font-medium">
            5 components →
          </div>
        </div>
      </NuxtLink>

      <!-- Phase 2: Modals & Alerts -->
      <NuxtLink to="/modals-alerts" class="group">
        <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent group-hover:border-purple-500">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-bell-alert" class="w-6 h-6 text-purple-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Modals & Alerts</h3>
          <p class="text-sm text-gray-600 mb-3">
            Modals, dialogs, alerts, notifications
          </p>
          <div class="text-sm text-purple-600 font-medium">
            4 components →
          </div>
        </div>
      </NuxtLink>

      <!-- Phase 2: UI Components -->
      <NuxtLink to="/ui-components" class="group">
        <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent group-hover:border-nxTeal-500">
          <div class="w-12 h-12 bg-nxTeal-100 rounded-lg flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-squares-2x2" class="w-6 h-6 text-nxTeal-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">UI Components</h3>
          <p class="text-sm text-gray-600 mb-3">
            Dropdown, tabs, tooltip, avatar, cards
          </p>
          <div class="text-sm text-nxTeal-600 font-medium">
            9 components →
          </div>
        </div>
      </NuxtLink>

      <!-- Phase 3: Forms -->
      <NuxtLink to="/forms-v3" class="group">
        <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent group-hover:border-green-500">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Forms V3</h3>
          <p class="text-sm text-gray-600 mb-3">
            Textarea, select, checkbox, radio, switch
          </p>
          <div class="text-sm text-green-600 font-medium">
            5 components →
          </div>
        </div>
      </NuxtLink>

      <!-- Phase 3: Tables -->
      <NuxtLink to="/tables-v3" class="group">
        <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent group-hover:border-orange-500">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-table-cells" class="w-6 h-6 text-orange-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Tables V3</h3>
          <p class="text-sm text-gray-600 mb-3">
            Pagination, search, sorting
          </p>
          <div class="text-sm text-orange-600 font-medium">
            2 components →
          </div>
        </div>
      </NuxtLink>

      <!-- Phase 4: Polish -->
      <NuxtLink to="/polish" class="group">
        <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent group-hover:border-pink-500">
          <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-pink-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Polish</h3>
          <p class="text-sm text-gray-600 mb-3">
            Badge, divider, progress, breadcrumb, chip, stepper
          </p>
          <div class="text-sm text-pink-600 font-medium">
            6 components →
          </div>
        </div>
          </NuxtLink>

      <!-- Old Components -->
      <NuxtLink to="/components" class="group">
        <div class="bg-gray-50 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent group-hover:border-gray-400">
          <div class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <UIcon name="i-heroicons-archive-box" class="w-6 h-6 text-gray-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Old Components</h3>
          <p class="text-sm text-gray-500 mb-3">
            Previous version components (v2)
          </p>
          <div class="text-sm text-gray-600 font-medium">
            View legacy →
          </div>
        </div>
      </NuxtLink>
      </div>

    <!-- Features -->
    <div class="bg-gradient-to-br from-nxGreen-50 to-nxTeal-50 rounded-xl p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Why NxPay UI v3?</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-nxGreen-500 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-calculator" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-1">BigInt Precision</h3>
            <p class="text-sm text-gray-600">Zero floating-point errors with BigInt-based Money class</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-1">Type Safe</h3>
            <p class="text-sm text-gray-600">TypeScript strict + Zod runtime validation</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-beaker" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-1">Well Tested</h3>
            <p class="text-sm text-gray-600">258 tests with 100% coverage (Phase 1)</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-nxTeal-500 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-bolt" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-1">Performance</h3>
            <p class="text-sm text-gray-600">Tree-shakeable, ~45-55 KB gzipped</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-hand-raised" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-1">Accessible</h3>
            <p class="text-sm text-gray-600">WCAG compliant with ARIA labels</p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-1">Documented</h3>
            <p class="text-sm text-gray-600">17 documentation files with examples</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Start -->
    <div class="bg-white rounded-lg shadow-sm p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
      
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-semibold text-gray-700 mb-2">1. Install</h3>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>pnpm add @nxpay/ui</code></pre>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-700 mb-2">2. Configure Nuxt</h3>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>export default defineNuxtConfig({
  modules: ['@nxpay/ui']
})</code></pre>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-700 mb-2">3. Use Components</h3>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>&lt;AmountDisplay :amount="1234.56" currency="EUR" /&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.gradient-nxpay-text {
  background: linear-gradient(135deg, #77F07F 0%, #2DD4BF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
