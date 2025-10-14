<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Tous les Composants</h2>
      <p class="text-gray-600">Bibliothèque complète des composants NxPay UI</p>
    </div>

    <!-- Navigation Rapide -->
    <div
      class="bg-gradient-to-r from-nxGreen-50 to-nxTeal-50 p-6 rounded-xl border border-nxGreen-100"
    >
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Navigation Rapide</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <a href="#buttons" class="text-nxGreen-600 hover:text-nxGreen-700 font-medium">→ Buttons</a>
        <a href="#badges" class="text-nxGreen-600 hover:text-nxGreen-700 font-medium">→ Badges</a>
        <a href="#cards" class="text-nxGreen-600 hover:text-nxGreen-700 font-medium">→ Cards</a>
        <a href="#forms" class="text-nxGreen-600 hover:text-nxGreen-700 font-medium">→ Forms</a>
        <a href="#tables" class="text-nxGreen-600 hover:text-nxGreen-700 font-medium">→ Tables</a>
        <a href="#modals" class="text-nxGreen-600 hover:text-nxGreen-700 font-medium">→ Modals</a>
        <a href="#utility" class="text-nxGreen-600 hover:text-nxGreen-700 font-medium">→ Utility</a>
        <a href="#navigation" class="text-nxGreen-600 hover:text-nxGreen-700 font-medium"
          >→ Navigation</a
        >
      </div>
    </div>

    <!-- Buttons -->
    <section id="buttons" class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900">Button</h3>
        <NuxtLink to="/buttons" class="text-sm text-nxGreen-600 hover:text-nxGreen-700">
          Voir plus →
        </NuxtLink>
      </div>
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
      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
        <code class="text-xs text-gray-700"
          >&lt;NokiButton color="primary" label="Click me" /&gt;</code
        >
      </div>
    </section>

    <!-- Badges -->
    <section id="badges" class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Badge</h3>
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-600 mb-3">Soft Variants</p>
          <div class="flex gap-4 flex-wrap">
            <span
              class="bg-nxGreen-100 text-nxGreen-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              Success
            </span>
            <span class="bg-nxTeal-100 text-nxTeal-800 px-3 py-1 rounded-full text-sm font-medium">
              Info
            </span>
            <span
              class="bg-nxBlueTurquoise-100 text-nxBlueTurquoise-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              Processing
            </span>
            <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Warning
            </span>
            <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Error
            </span>
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-3">Solid Variants</p>
          <div class="flex gap-4 flex-wrap">
            <span class="bg-nxGreen-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Success
            </span>
            <span class="bg-nxTeal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Info
            </span>
            <span class="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Warning
            </span>
            <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Error
            </span>
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-3">Sizes</p>
          <div class="flex gap-4 items-center flex-wrap">
            <span
              class="bg-nxGreen-100 text-nxGreen-800 px-2 py-0.5 rounded-full text-xs font-medium"
            >
              Small
            </span>
            <span
              class="bg-nxGreen-100 text-nxGreen-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              Medium
            </span>
            <span
              class="bg-nxGreen-100 text-nxGreen-800 px-4 py-2 rounded-full text-base font-medium"
            >
              Large
            </span>
          </div>
        </div>
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
        <code class="text-xs text-gray-700"
          >&lt;Badge label="Success" color="success" variant="soft" /&gt;</code
        >
      </div>
    </section>

    <!-- Cards -->
    <section id="cards" class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Card</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="gradient-nxpay p-6 rounded-xl text-white">
          <h4 class="text-lg font-bold mb-2">Card Gradient</h4>
          <p class="opacity-90">Card avec gradient signature NxPay</p>
        </div>
        <div class="bg-white border-2 border-nxGreen-500 p-6 rounded-xl">
          <h4 class="text-lg font-bold text-gray-900 mb-2">Card Border</h4>
          <p class="text-gray-600">Card avec bordure verte épaisse</p>
        </div>
        <div class="bg-nxTeal-50 p-6 rounded-xl border border-nxTeal-200">
          <h4 class="text-lg font-bold text-gray-900 mb-2">Card Background</h4>
          <p class="text-gray-600">Card avec fond teal clair</p>
        </div>
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
        <code class="text-xs text-gray-700"
          >&lt;Card title="Total" :number="1" icon="heroicons:chart-bar" :amount="1000000"
          /&gt;</code
        >
      </div>
    </section>

    <!-- Forms -->
    <section id="forms" class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900">Form Components</h3>
        <NuxtLink to="/forms" class="text-sm text-nxGreen-600 hover:text-nxGreen-700">
          Voir plus →
        </NuxtLink>
      </div>
      <div class="space-y-6">
        <div>
          <p class="text-sm text-gray-600 mb-3">FormInput</p>
          <input
            type="text"
            placeholder="Entrez votre nom"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nxGreen-500 focus:border-nxGreen-500 transition-all"
          />
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-3">FormPhoneInput</p>
          <input
            type="tel"
            placeholder="+237 6 00 00 00 00"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nxTeal-500 focus:border-nxTeal-500 transition-all"
          />
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-3">FormWrapper</p>
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p class="text-sm text-gray-700">Conteneur de formulaire avec gestion d'erreurs</p>
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-3">FormAuth</p>
          <div class="bg-gray-100 p-4 rounded-lg">
            <p class="text-sm text-gray-700 text-center">Formulaire d'authentification avec logo</p>
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-3">FormFileUploader</p>
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-nxGreen-500 transition-colors cursor-pointer"
          >
            <p class="text-sm text-gray-600">Cliquez pour télécharger un fichier</p>
          </div>
        </div>
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
        <code class="text-xs text-gray-700"
          >&lt;FormInput v-model="value" placeholder="..." /&gt;</code
        >
      </div>
    </section>

    <!-- Tables -->
    <section id="tables" class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Table Components</h3>
      <div class="space-y-6">
        <div>
          <p class="text-sm text-gray-600 mb-3">TableWrapper</p>
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="p-4 bg-gray-50 border-b border-gray-200">
              <p class="text-sm font-medium text-gray-700">Header avec titre et actions</p>
            </div>
            <div class="p-6 text-center text-gray-500">Contenu de la table ici</div>
            <div class="p-4 bg-gray-50 border-t border-gray-200">
              <p class="text-sm text-gray-600">Footer avec pagination</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm text-gray-600 mb-3">ElementByPage</p>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-700">Afficher</span>
              <select class="px-3 py-2 border border-gray-300 rounded-lg">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span class="text-sm text-gray-700">éléments</span>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-3">PaginationInfo</p>
            <p class="text-sm text-gray-700">
              Affiche <span class="font-bold">1</span> à <span class="font-bold">10</span> sur
              <span class="font-bold">100</span> éléments
            </p>
          </div>
        </div>
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
        <code class="text-xs text-gray-700"
          >&lt;TableWrapper title="Utilisateurs"&gt;...&lt;/TableWrapper&gt;</code
        >
      </div>
    </section>

    <!-- Modals & Confirm -->
    <section id="modals" class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Modal & Confirm</h3>
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-600 mb-3">ConfirmDialog</p>
          <button
            @click="showConfirm = true"
            class="px-4 py-2 bg-nxGreen-500 text-white rounded-full hover:bg-nxGreen-600 transition-colors"
          >
            Ouvrir Dialog
          </button>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-3">Confirm Modal</p>
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p class="text-sm text-gray-700">Modal de confirmation avec actions</p>
          </div>
        </div>
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
        <code class="text-xs text-gray-700">&lt;ConfirmDialog ref="confirmRef" /&gt;</code>
      </div>
    </section>

    <!-- Utility Components -->
    <section id="utility" class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Utility Components</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-sm text-gray-600 mb-3">Preloader</p>
          <div class="bg-gray-900 p-6 rounded-lg">
            <div class="flex flex-col items-center gap-3">
              <div class="w-12 h-12 bg-nxGreen-500 rounded-lg animate-pulse"></div>
              <p class="text-white text-sm">Chargement...</p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-3">NetworkStatus</p>
          <div
            class="flex items-center gap-2 p-4 bg-nxGreen-50 border border-nxGreen-200 rounded-lg"
          >
            <div class="w-2 h-2 bg-nxGreen-500 rounded-full"></div>
            <p class="text-sm text-nxGreen-700 font-medium">Connecté</p>
          </div>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-3">InitData</p>
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <div class="flex items-center gap-3">
              <div class="flex-1 bg-gray-200 rounded-full h-2">
                <div class="bg-nxGreen-500 h-2 rounded-full" style="width: 75%"></div>
              </div>
              <span class="text-xs text-gray-600">75%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
        <code class="text-xs text-gray-700"
          >&lt;Preloader /&gt; &lt;NetworkStatus /&gt; &lt;InitData /&gt;</code
        >
      </div>
    </section>

    <!-- Header/Navigation -->
    <section id="navigation" class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Header</h3>
      <div class="border border-gray-200 rounded-lg overflow-hidden">
        <div class="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 gradient-nxpay rounded-lg"></div>
            <h4 class="font-semibold text-gray-900">Dashboard</h4>
          </div>
          <div class="flex items-center gap-4">
            <button class="text-gray-600 hover:text-gray-900">
              <i class="text-xl">🔔</i>
            </button>
            <div class="w-8 h-8 bg-nxGreen-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
        <code class="text-xs text-gray-700">&lt;Header title="Dashboard" /&gt;</code>
      </div>
    </section>

    <!-- Récapitulatif -->
    <section
      class="bg-gradient-to-r from-nxGreen-50 to-nxTeal-50 p-8 rounded-xl border border-nxGreen-100"
    >
      <h3 class="text-xl font-bold text-gray-900 mb-4">Composants Disponibles</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Boutons & Actions</h4>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• Button (6 couleurs)</li>
            <li>• ButtonAction</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Badges & Cards</h4>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• Badge (variants)</li>
            <li>• Card (stats)</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Formulaires</h4>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• FormWrapper</li>
            <li>• FormAuth</li>
            <li>• FormInput</li>
            <li>• FormPhoneInput</li>
            <li>• FormFileUploader</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Tables</h4>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• TableWrapper</li>
            <li>• ElementByPage</li>
            <li>• PaginationInfo</li>
            <li>• Table (base)</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Modals</h4>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• Confirm (modal)</li>
            <li>• ConfirmDialog</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-2">Utility</h4>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>• Preloader</li>
            <li>• NetworkStatus</li>
            <li>• InitData</li>
            <li>• Header</li>
          </ul>
        </div>
      </div>
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Total : <span class="font-bold text-nxGreen-600">20+ composants</span> disponibles
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showConfirm = ref(false)
</script>
