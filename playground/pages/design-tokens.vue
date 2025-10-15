<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-900">Design Tokens</h2>

    <!-- Gradients -->
    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Gradients</h3>
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-600 mb-2">Gradient Primary (135deg)</p>
          <div class="h-24 gradient-nxpay rounded-xl"></div>
          <code class="text-xs text-gray-500 mt-2 block">
            linear-gradient(135deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)
          </code>
        </div>

        <div>
          <p class="text-sm text-gray-600 mb-2">Gradient Vertical (180deg)</p>
          <div class="h-24 gradient-nxpay-vertical rounded-xl"></div>
          <code class="text-xs text-gray-500 mt-2 block">
            linear-gradient(180deg, #77F07F 0%, #3FC995 100%)
          </code>
        </div>
      </div>
    </section>

    <!-- Shadows -->
    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Shadows</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-nxpay-green border border-gray-100">
          <h4 class="font-semibold text-gray-900 mb-2">Shadow NxPay Green</h4>
          <code class="text-xs text-gray-500">shadow-nxpay-green</code>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-nxpay-teal border border-gray-100">
          <h4 class="font-semibold text-gray-900 mb-2">Shadow NxPay Teal</h4>
          <code class="text-xs text-gray-500">shadow-nxpay-teal</code>
        </div>
      </div>
    </section>

    <!-- Border Radius -->
    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Border Radius</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="w-20 h-20 bg-nxGreen-500 rounded-sm mx-auto mb-2"></div>
          <code class="text-xs">rounded-sm</code>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-nxGreen-500 rounded-lg mx-auto mb-2"></div>
          <code class="text-xs">rounded-lg</code>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-nxGreen-500 rounded-xl mx-auto mb-2"></div>
          <code class="text-xs">rounded-xl</code>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-nxGreen-500 rounded-full mx-auto mb-2"></div>
          <code class="text-xs">rounded-full</code>
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Typography</h3>
      <div class="space-y-3">
        <p class="text-xs text-gray-600">text-xs - 12px</p>
        <p class="text-sm text-gray-600">text-sm - 14px</p>
        <p class="text-base text-gray-600">text-base - 16px</p>
        <p class="text-lg text-gray-600">text-lg - 18px</p>
        <p class="text-xl text-gray-600">text-xl - 20px</p>
        <p class="text-2xl text-gray-600">text-2xl - 24px</p>
        <p class="text-3xl text-gray-600">text-3xl - 30px</p>
      </div>
    </section>
  </div>
</template>
