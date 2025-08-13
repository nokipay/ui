<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">NokiPay UI Library Playground</h1>



      <!-- Card Component -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Card Component</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NokiCard title="Total Revenue" :number="15750000" icon="heroicons:currency-dollar" currency="FCFA"
            accent-color="primary" />
          <NokiCard title="Active Users" :number="2847" icon="heroicons:users" currency="USD" accent-color="success"
            :show-compact="false" />
          <NokiCard title="Pending Orders" :number="156" icon="heroicons:clock" accent-color="warning"
            :show-compact="false" />
          <NokiCard title="Big Number Test" :number="123456789012" icon="heroicons:chart-bar" accent-color="danger" />
        </div>
      </div>

      <!-- Preloader Demo -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Preloader Component</h2>
        <div class="flex gap-4">
          <button @click="showPreloader = !showPreloader"
            class="px-4 py-2 bg-primary text-gray-900 rounded hover:bg-yellow-500 transition-colors">
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
        <button @click="simulateOffline"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
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

      <!-- Header Component Demo -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">Header Component</h2>

        <div class="space-y-6">
          <!-- Header simple -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Header simple</h3>
            <NokiHeader title="Titre de la page" subtitle="Sous-titre optionnel" icon="heroicons:home" />
          </div>

          <!-- Header avec badge -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Header avec badge</h3>
            <NokiHeader title="Page avec badge" subtitle="Exemple de badge simple" icon="heroicons:star"
              :badge="{ label: 'Nouveau', class: 'bg-blue-100 text-blue-800' }" />
          </div>

          <!-- Header avec statusBadge -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Header avec statusBadge</h3>
            <NokiHeader title="Page avec statut" subtitle="Exemple de badge de statut" icon="heroicons:check-circle"
              :statusBadge="{ status: 'active', size: 'lg' }" />
          </div>

          <!-- Header avec slots -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Header avec slots personnalisés</h3>
            <NokiHeader title="Page avec actions" subtitle="Exemple d'utilisation des slots" icon="heroicons:cog">
              <template #left>
                <NokiButton label="Retour" color="white" icon="heroicons:arrow-left" />
              </template>
              <template #right>
                <NokiButton label="Sauvegarder" color="primary" />
              </template>
              <template #extra>
                <div class="text-yellow-200 text-xs">Information supplémentaire</div>
              </template>
            </NokiHeader>
          </div>

          <!-- Header avec tailles personnalisées -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Header avec tailles personnalisées</h3>
            <div class="space-y-4">
              <!-- Titre petit -->
              <NokiHeader title="Titre petit (xs)" subtitle="Sous-titre moyen (md)" titleSize="xs" subtitleSize="md"
                icon="heroicons:document-text" />

              <!-- Titre moyen -->
              <NokiHeader title="Titre moyen (lg)" subtitle="Sous-titre grand (lg)" titleSize="lg" subtitleSize="lg"
                icon="heroicons:document-text" />

              <!-- Titre très grand -->
              <NokiHeader title="Titre très grand (4xl)" subtitle="Sous-titre extra grand (xl)" titleSize="4xl"
                subtitleSize="xl" icon="heroicons:document-text" />
            </div>
          </div>
        </div>
      </div>

      <!-- StatusBadge Component Demo -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">StatusBadge Component</h2>

        <div class="space-y-6">
          <!-- Status de base -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Status de base</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge status="pending" />
              <NokiBadge status="completed" />
              <NokiBadge status="failed" />
              <NokiBadge status="active" />
              <NokiBadge status="inactive" />
            </div>
          </div>

          <!-- Status de transaction -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Status de transaction</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge status="approved" />
              <NokiBadge status="rejected" />
              <NokiBadge status="cancelled" />
              <NokiBadge status="paid" />
              <NokiBadge status="unpaid" />
            </div>
          </div>

          <!-- Status de terminal -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Status de terminal</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge status="online" />
              <NokiBadge status="offline" />
            </div>
          </div>

          <!-- Valeurs booléennes -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Valeurs booléennes</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge status="true" />
              <NokiBadge status="false" />
              <NokiBadge status="1" />
              <NokiBadge status="0" />
            </div>
          </div>

          <!-- Différentes tailles -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Différentes tailles</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge status="pending" size="sm" />
              <NokiBadge status="completed" size="md" />
              <NokiBadge status="failed" size="lg" />
            </div>
          </div>

          <!-- Différents variants -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Différents variants</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge status="pending" variant="solid" />
              <NokiBadge status="completed" variant="soft" />
              <NokiBadge status="failed" variant="outline" />
            </div>
          </div>

          <!-- Labels personnalisés -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Labels personnalisés</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge label="Personnalisé" customSize="text-lg px-4 py-2 font-bold" />
              <NokiBadge label="Important" customSize="text-xl px-6 py-3 font-semibold" />
              <NokiBadge label="Note" customSize="text-sm px-3 py-1 italic" />
            </div>
          </div>

          <!-- Couleurs automatiques par statut -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Couleurs automatiques par statut (bords arrondis)</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge status="success" />
              <NokiBadge status="pending" />
              <NokiBadge status="failed" />
              <NokiBadge status="inactive" />
              <NokiBadge status="custom_status" />
            </div>
            <p class="text-sm text-gray-500 mt-2">Tous les badges ont maintenant des bords arrondis pour un design
              moderne</p>
          </div>

          <!-- Badges avec statuts -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Badges avec statuts</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge :status="true" label="Actif" color="success" />
              <NokiBadge :status="false" label="Inactif" color="gray" />
              <NokiBadge status="pending" label="En attente" color="warning" />
            </div>
            <p class="text-sm text-gray-500 mt-2">Les labels sont maintenant obligatoires pour un affichage optimal</p>
          </div>

          <!-- Nouvelles fonctionnalités : Couleurs personnalisées -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Couleurs personnalisées</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge label="Succès" color="success" />
              <NokiBadge label="Attention" color="warning" />
              <NokiBadge label="Erreur" color="error" />
              <NokiBadge label="Info" color="info" />
              <NokiBadge label="Violet" color="violet" />
              <NokiBadge label="Orange" color="orange" />
              <NokiBadge label="Teal" color="teal" />
            </div>
          </div>

          <!-- Nouvelles fonctionnalités : Poids de police -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Poids de police</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge label="Normal" fontWeight="normal" />
              <NokiBadge label="Medium" fontWeight="medium" />
              <NokiBadge label="Semibold" fontWeight="semibold" />
              <NokiBadge label="Bold" fontWeight="bold" />
              <NokiBadge label="Italic" fontWeight="italic" />
            </div>
          </div>

          <!-- Combinaisons avancées -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 mb-3">Combinaisons avancées</h3>
            <div class="flex flex-wrap gap-4">
              <NokiBadge label="Premium" color="purple" fontWeight="bold" size="lg" />
              <NokiBadge label="Urgent" color="red" fontWeight="semibold" size="sm" />
              <NokiBadge label="Nouveau" color="green" fontWeight="medium" />
              <NokiBadge label="Beta" color="indigo" fontWeight="italic" />
            </div>
          </div>

          <!-- Badge basique -->
          <NokiBadge label="Nouveau" />

          <!-- Badge avec couleur personnalisée -->
          <NokiBadge label="Personnalisé" color="purple" fontWeight="bold" />
        </div>
      </div>
    </div>
  </div>

  <!-- Network Status (will show when offline) -->
  <NokiNetworkStatus />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showPreloader = ref(false)

const simulateOffline = () => {
  // Simulation basique - dans un vrai projet, vous pourriez modifier navigator.onLine
  alert('Dans une vraie application, ceci simulerait une perte de connexion')
}
</script>