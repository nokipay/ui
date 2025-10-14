<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="gradient-nxpay rounded-2xl p-12 text-white">
      <div class="text-center">
        <h2 class="text-4xl font-bold mb-4">Bienvenue sur NxPay UI</h2>
        <p class="text-xl opacity-90 mb-8">
          Bibliothèque de composants moderne avec une palette de 5 couleurs harmonieuses
        </p>
        <div class="flex gap-4 justify-center">
          <NuxtLink 
            to="/components" 
            class="bg-white text-nxGreen-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Explorer les Composants
          </NuxtLink>
          <NuxtLink 
            to="/design-tokens" 
            class="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
          >
            Design Tokens
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Palette de Couleurs -->
    <section>
      <h3 class="text-2xl font-bold text-gray-900 mb-6">Palette de Couleurs</h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div class="text-center">
          <div class="w-full h-32 bg-nxGreen-500 rounded-xl mb-3 shadow-nxpay-green"></div>
          <h4 class="font-semibold text-gray-900">Vert Clair</h4>
          <p class="text-sm text-gray-500">#77F07F</p>
          <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Primary</span>
        </div>
        
        <div class="text-center">
          <div class="w-full h-32 bg-nxTeal-500 rounded-xl mb-3 shadow-nxpay-teal"></div>
          <h4 class="font-semibold text-gray-900">Teal</h4>
          <p class="text-sm text-gray-500">#3FC995</p>
          <span class="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">Secondary</span>
        </div>
        
        <div class="text-center">
          <div class="w-full h-32 bg-nxBlueTurquoise-500 rounded-xl mb-3"></div>
          <h4 class="font-semibold text-gray-900">Bleu Turquoise</h4>
          <p class="text-sm text-gray-500">#40A0AE</p>
          <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Tertiary</span>
        </div>
        
        <div class="text-center">
          <div class="w-full h-32 bg-nxBlue-500 rounded-xl mb-3"></div>
          <h4 class="font-semibold text-gray-900">Bleu Moyen</h4>
          <p class="text-sm text-gray-500">#37669C</p>
          <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Quaternary</span>
        </div>
        
        <div class="text-center">
          <div class="w-full h-32 bg-nxPurple-500 rounded-xl mb-3"></div>
          <h4 class="font-semibold text-gray-900">Violet Foncé</h4>
          <p class="text-sm text-gray-500">#3A2F6B</p>
          <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Accent</span>
        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section>
      <h3 class="text-2xl font-bold text-gray-900 mb-6">Statistiques</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="text-3xl font-bold text-nxGreen-500">20+</div>
          <div class="text-gray-600 mt-1">Composants</div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="text-3xl font-bold text-nxTeal-500">55</div>
          <div class="text-gray-600 mt-1">Couleurs</div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="text-3xl font-bold text-nxBlueTurquoise-500">10+</div>
          <div class="text-gray-600 mt-1">Design Tokens</div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="text-3xl font-bold text-nxBlue-500">100%</div>
          <div class="text-gray-600 mt-1">TypeScript</div>
        </div>
      </div>
    </section>
  </div>
</template>

