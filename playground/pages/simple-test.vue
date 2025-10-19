<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold">Test Simple - NxPay UI V3</h1>
    
    <!-- Test 1: Boutons basiques -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4">Boutons Basiques</h2>
      <div class="space-x-4">
        <button class="px-4 py-2 bg-blue-500 text-white rounded">Bleu</button>
        <button class="px-4 py-2 bg-green-500 text-white rounded">Vert</button>
        <button class="px-4 py-2 bg-red-500 text-white rounded">Rouge</button>
      </div>
    </section>

    <!-- Test 2: Badge avec préfixe Noki -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4">Badges (avec préfixe Noki)</h2>
      <div class="space-x-4">
        <Badge color="primary">Primary</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="error">Error</Badge>
      </div>
    </section>

    <!-- Test 3: Modal simple -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4">Modal Test</h2>
      <button 
        @click="showModal = true"
        class="px-4 py-2 bg-purple-500 text-white rounded"
      >
        Ouvrir Modal
      </button>
      
      <!-- Modal simple -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
          <h3 class="text-xl font-bold mb-4">Modal Test</h3>
          <p class="mb-4">Ceci est un modal simple qui fonctionne !</p>
          <button 
            @click="showModal = false"
            class="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Fermer
          </button>
        </div>
      </div>
    </section>

    <!-- Test 4: Dropdown simple -->
    <section class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4">Dropdown Test</h2>
      <div class="relative inline-block">
        <button 
          @click="showDropdown = !showDropdown"
          class="px-4 py-2 bg-gray-200 rounded flex items-center"
        >
          Menu <span class="ml-2">▼</span>
        </button>
        
        <div v-if="showDropdown" class="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10">
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Option 1</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Option 2</a>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100">Option 3</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
const showDropdown = ref(false)
</script>
