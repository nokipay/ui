<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">NokiPay UI Library Playground</h1>
      
      <!-- Button Component -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Button Component</h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Colors & Shadow Types</h3>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <h4 class="text-sm font-medium text-gray-600 mb-2">Dark Shadow</h4>
                <div class="flex flex-wrap gap-3">
                  <NokiButton label="Primary" color="primary" shadow-type="dark" :on-click="handleClick" />
                  <NokiButton label="Yellow" color="yellow" shadow-type="dark" :on-click="handleClick" />
                  <NokiButton label="Black" color="black" shadow-type="dark" :on-click="handleClick" />
                  <NokiButton label="White" color="white" shadow-type="dark" :on-click="handleClick" />
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-600 mb-2">Soft Shadow</h4>
                <div class="flex flex-wrap gap-3">
                  <NokiButton label="Primary" color="primary" shadow-type="soft" :on-click="handleClick" />
                  <NokiButton label="Yellow" color="yellow" shadow-type="soft" :on-click="handleClick" />
                  <NokiButton label="Black" color="black" shadow-type="soft" :on-click="handleClick" />
                  <NokiButton label="White" color="white" shadow-type="soft" :on-click="handleClick" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Sizes & States</h3>
            <div class="flex flex-wrap items-center gap-4">
              <NokiButton label="Small" size="sm" :on-click="handleClick" />
              <NokiButton label="Medium" size="md" :on-click="handleClick" />
              <NokiButton label="Large" size="lg" :on-click="handleClick" />
              <NokiButton label="Loading..." :loading="true" />
              <NokiButton label="With Icon" icon="heroicons:star" :on-click="handleClick" />
            </div>
          </div>
        </div>
      </div>

      <!-- Card Component -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Card Component</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NokiCard 
            title="Total Revenue" 
            :number="15750000" 
            icon="heroicons:currency-dollar" 
            currency="FCFA"
            accent-color="primary"
          />
          <NokiCard 
            title="Active Users" 
            :number="2847" 
            icon="heroicons:users" 
            currency="USD"
            accent-color="success"
            :show-compact="false"
          />
          <NokiCard 
            title="Pending Orders" 
            :number="156" 
            icon="heroicons:clock" 
            accent-color="warning"
            :show-compact="false"
          />
          <NokiCard 
            title="Big Number Test" 
            :number="123456789012" 
            icon="heroicons:chart-bar" 
            accent-color="danger"
          />
        </div>
      </div>

      <!-- Preloader Demo -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Preloader Component</h2>
        <div class="flex gap-4">
          <button 
            @click="showPreloader = !showPreloader"
            class="px-4 py-2 bg-primary text-gray-900 rounded hover:bg-yellow-500 transition-colors"
          >
            {{ showPreloader ? 'Hide' : 'Show' }} Preloader
          </button>
        </div>
        
        <div v-if="showPreloader" class="relative h-64 mt-4 bg-gray-900 rounded-lg overflow-hidden">
          <NokiPreloader />
        </div>
      </div>

      <!-- Network Status Demo -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Network Status Component</h2>
        <p class="text-gray-600 mb-4">Ce composant s'affiche automatiquement quand vous êtes hors connexion.</p>
        <button 
          @click="simulateOffline"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Simuler mode hors ligne
        </button>
      </div>

      <!-- InitData Demo -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Init Data Component</h2>
        <p class="text-gray-600 mb-4">Composant de chargement des données initiales.</p>
        <NokiInitData />
      </div>

      <!-- Form Components -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Form Components</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Available Components</h3>
            <ul class="space-y-2 text-gray-600">
              <li>• FormAuth - Formulaire d'authentification</li>
              <li>• FormInput - Champ de saisie</li>
              <li>• FormPhoneInput - Champ téléphone</li>
              <li>• FormFileUploader - Upload de fichiers</li>
              <li>• FormWrapper - Conteneur de formulaire</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Table Components</h3>
            <ul class="space-y-2 text-gray-600">
              <li>• TableWrapper - Conteneur de tableau</li>
              <li>• TableElementByPage - Pagination</li>
              <li>• TablePaginationInfo - Info pagination</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Network Status (will show when offline) -->
  <NokiNetworkStatus />
</template>

<script setup lang="ts">
const showPreloader = ref(false)

const handleClick = (event: MouseEvent) => {
  console.log('Button clicked!', event)
}

const simulateOffline = () => {
  // Simulation basique - dans un vrai projet, vous pourriez modifier navigator.onLine
  alert('Dans une vraie application, ceci simulerait une perte de connexion')
}
</script>