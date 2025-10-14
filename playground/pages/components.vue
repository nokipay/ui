<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-900">Composants</h2>

    <!-- Buttons -->
    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Boutons</h3>
      <div class="space-y-4">
        <div class="flex gap-4 flex-wrap">
          <NokiButton color="primary" label="Primary" />
          <NokiButton color="secondary" label="Secondary" />
          <NokiButton color="green" label="Green" />
          <NokiButton color="yellow" label="Yellow" />
          <NokiButton color="white" label="White" />
          <NokiButton color="black" label="Black" />
        </div>
        <div class="flex gap-4 flex-wrap">
          <NokiButton color="primary" label="Loading..." :loading="true" />
          <NokiButton color="secondary" label="Loading..." :loading="true" />
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Badges</h3>
      <div class="flex gap-4 flex-wrap">
        <span class="bg-nxGreen-100 text-nxGreen-800 px-3 py-1 rounded-full text-sm font-medium">
          Success
        </span>
        <span class="bg-nxTeal-100 text-nxTeal-800 px-3 py-1 rounded-full text-sm font-medium">
          Info
        </span>
        <span class="bg-nxBlueTurquoise-100 text-nxBlueTurquoise-800 px-3 py-1 rounded-full text-sm font-medium">
          Processing
        </span>
        <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
          Warning
        </span>
        <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
          Error
        </span>
      </div>
    </section>

    <!-- Cards -->
    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Cards</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="gradient-nxpay p-6 rounded-xl text-white">
          <h4 class="text-lg font-bold mb-2">Card Gradient</h4>
          <p class="opacity-90">Card avec gradient NxPay</p>
        </div>
        <div class="bg-white border border-nxGreen-200 p-6 rounded-xl">
          <h4 class="text-lg font-bold text-gray-900 mb-2">Card Border</h4>
          <p class="text-gray-600">Card avec bordure verte</p>
        </div>
        <div class="bg-nxTeal-50 p-6 rounded-xl">
          <h4 class="text-lg font-bold text-gray-900 mb-2">Card Background</h4>
          <p class="text-gray-600">Card avec fond teal clair</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Composants NxPay UI sont auto-importés
</script>

