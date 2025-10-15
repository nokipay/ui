<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-900">Formulaires</h2>

    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Exemple de Formulaire</h3>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nom Complet</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="John Doe"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nxGreen-500 focus:border-nxGreen-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="john@example.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nxTeal-500 focus:border-nxTeal-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+237 6 00 00 00 00"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nxBlueTurquoise-500 focus:border-nxBlueTurquoise-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            v-model="form.message"
            rows="4"
            placeholder="Votre message..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nxGreen-500 focus:border-nxGreen-500 transition-all"
          ></textarea>
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            class="px-6 py-3 bg-nxGreen-500 text-white rounded-full hover:bg-nxGreen-600 shadow-nxpay-green transition-all hover:scale-105"
          >
            Envoyer
          </button>
          <button
            type="button"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
            @click="resetForm"
          >
            Réinitialiser
          </button>
        </div>
      </form>

      <div v-if="submitted" class="mt-6 p-4 bg-nxGreen-100 border border-nxGreen-200 rounded-lg">
        <p class="text-nxGreen-800 font-medium">Formulaire soumis avec succès !</p>
      </div>
    </section>

    <section class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-xl font-bold text-gray-900 mb-6">États des Inputs</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Input Normal</label>
          <input
            type="text"
            placeholder="Normal state"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nxGreen-500 focus:border-nxGreen-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Input Succès</label>
          <input
            type="text"
            value="Validation réussie"
            class="w-full px-4 py-3 border-2 border-nxGreen-500 bg-nxGreen-50 rounded-lg"
            readonly
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Input Erreur</label>
          <input
            type="text"
            value="Erreur de validation"
            class="w-full px-4 py-3 border-2 border-red-500 bg-red-50 rounded-lg"
          />
          <p class="mt-1 text-sm text-red-600">Ce champ est requis</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Input Désactivé</label>
          <input
            type="text"
            value="Input désactivé"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    resetForm()
  }, 3000)
}

function resetForm() {
  form.value = {
    name: '',
    email: '',
    phone: '',
    message: '',
  }
}
</script>

