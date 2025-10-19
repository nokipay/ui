<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold">Test Page - Composants NxPay UI V3</h1>
    
    <!-- Test simple -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4">Test Basique</h2>
      <p class="mb-4">Si vous voyez cette page, le serveur fonctionne ✅</p>
      
      <div class="space-y-4">
        <!-- Test Badge -->
        <div>
          <h3 class="font-semibold mb-2">Badge (avec préfixe Noki)</h3>
          <NokiBadge color="primary">Primary Badge</NokiBadge>
        </div>
        
        <!-- Test Button simple -->
        <div>
          <h3 class="font-semibold mb-2">Button HTML simple</h3>
          <button class="px-4 py-2 bg-blue-500 text-white rounded">Click me</button>
        </div>
      </div>
    </section>
  </div>
</template>


