<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: false, default: '' },
  icon: { type: String, required: false, default: 'i-heroicons-document-text' },
  errorsMessage: { type: [String, Array], required: false, default: () => [] },
  errorMessage: { type: [String, Array], required: false, default: () => [] },
  successMessage: { type: String, required: false, default: '' },
  loading: { type: Boolean, required: false, default: false },
  showBackButton: { type: Boolean, required: false, default: true },
  backButtonLabel: { type: String, required: false, default: 'Retour' },
  showBackground: { type: Boolean, required: false, default: true },
})

const emit = defineEmits(['back', 'submit'])

const hasErrors = computed(() => {
  if (typeof props.errorMessage === 'string' && props.errorMessage.length > 0) return true
  if (typeof props.errorsMessage === 'string' && props.errorsMessage.length > 0) return true
  if (Array.isArray(props.errorMessage) && props.errorMessage.length > 0) return true
  if (Array.isArray(props.errorsMessage) && props.errorsMessage.length > 0) return true
  return false
})

const hasSuccess = computed(() => {
  return props.successMessage && props.successMessage.length > 0
})

const handleBack = () => {
  emit('back')
}
</script>

<template>
  <div :class="showBackground ? 'min-h-screen bg-gray-50' : 'min-h-screen'">
    <!-- Header avec titre, sous-titre et bouton retour -->
    <div class="mx-4 mb-6 pt-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <!-- Bouton retour -->
          <UButton
            v-if="showBackButton"
            icon="i-heroicons-arrow-left"
            size="sm"
            :label="backButtonLabel"
            color="primary"
            variant="soft"
            @click="handleBack"
          />

          <!-- Titre et sous-titre -->
          <div>
            <div class="flex items-center gap-3">
              <UIcon v-if="icon" :name="icon" class="w-6 h-6 text-gray-700" />
              <h1 class="text-2xl font-bold text-gray-800">{{ title }}</h1>
            </div>
            <p v-if="subtitle" class="text-sm text-gray-600 mt-1 ml-9">{{ subtitle }}</p>
          </div>
        </div>

        <!-- Slot pour actions additionnelles dans le header -->
        <div v-if="$slots.headerActions">
          <slot name="headerActions" />
        </div>
      </div>
    </div>

    <!-- Conteneur principal -->
    <div class="mx-4">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Zone de succès -->
        <div v-if="hasSuccess" class="bg-green-50 border-b border-green-200 px-6 py-4">
          <div class="flex items-start space-x-3">
            <UIcon
              name="i-heroicons-check-circle"
              class="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
            />
            <p class="text-sm text-green-700">{{ successMessage }}</p>
          </div>
        </div>

        <!-- Zone des erreurs -->
        <div v-if="hasErrors" class="bg-red-50 border-b border-red-200 px-6 py-4">
          <!-- Message d'erreur simple (string) -->
          <div
            v-if="typeof errorMessage === 'string' && errorMessage.length > 0"
            class="flex items-start space-x-3"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
            />
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>

          <!-- Messages d'erreurs (string) -->
          <div
            v-if="typeof errorsMessage === 'string' && errorsMessage.length > 0"
            class="flex items-start space-x-3"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
            />
            <p class="text-sm text-red-700">{{ errorsMessage }}</p>
          </div>

          <!-- Messages d'erreur multiples -->
          <div
            v-if="Array.isArray(errorMessage) && errorMessage.length > 0"
            class="flex items-start space-x-3"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
            />
            <div class="space-y-1">
              <p v-for="error in errorMessage" :key="error" class="text-sm text-red-700">
                {{ error }}
              </p>
            </div>
          </div>

          <!-- Messages d'erreurs multiples -->
          <div
            v-if="Array.isArray(errorsMessage) && errorsMessage.length > 0"
            class="flex items-start space-x-3"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
            />
            <div class="space-y-1">
              <p v-for="error in errorsMessage" :key="error" class="text-sm text-red-700">
                {{ error }}
              </p>
            </div>
          </div>
        </div>

        <!-- Contenu du formulaire -->
        <div class="p-6">
          <slot />
        </div>

        <!-- Footer optionnel pour boutons d'action -->
        <div v-if="$slots.footer" class="bg-gray-50 border-t border-gray-200 px-6 py-4">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
