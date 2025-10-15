<script setup lang="ts">
import { ref } from 'vue'

const errorMessage = ref('')
const errorsMessage = ref<string[]>([])
const successMessage = ref('')
const loading = ref(false)

const formData = ref({
  name: '',
  email: '',
  password: '',
})

const handleBack = () => {
  console.log('Retour clicked')
  navigateTo('/forms')
}

const handleSubmit = () => {
  loading.value = true
  errorMessage.value = ''
  errorsMessage.value = []
  successMessage.value = ''

  setTimeout(() => {
    if (!formData.value.name) {
      errorsMessage.value.push('Le nom est requis')
    }
    if (!formData.value.email) {
      errorsMessage.value.push("L'email est requis")
    }
    if (!formData.value.password || formData.value.password.length < 8) {
      errorsMessage.value.push('Le mot de passe doit contenir au moins 8 caractères')
    }

    if (errorsMessage.value.length === 0) {
      successMessage.value = 'Formulaire soumis avec succès !'
      formData.value = { name: '', email: '', password: '' }
    }

    loading.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <FormWrapper
      title="Créer un Compte"
      subtitle="Remplissez le formulaire ci-dessous pour créer votre compte"
      icon="i-heroicons-user-plus"
      :error-message="errorMessage"
      :errors-message="errorsMessage"
      :success-message="successMessage"
      :loading="loading"
      :show-back-button="true"
      back-button-label="Retour aux formulaires"
      @back="handleBack"
    >
      <template #headerActions>
        <UButton
          icon="i-heroicons-question-mark-circle"
          color="gray"
          variant="ghost"
          label="Aide"
        />
      </template>

      <!-- Formulaire -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <UFormGroup label="Nom complet" required>
          <UInput
            v-model="formData.name"
            placeholder="John Doe"
            icon="i-heroicons-user"
            size="lg"
          />
        </UFormGroup>

        <UFormGroup label="Email" required>
          <UInput
            v-model="formData.email"
            type="email"
            placeholder="john.doe@example.com"
            icon="i-heroicons-envelope"
            size="lg"
          />
        </UFormGroup>

        <UFormGroup label="Mot de passe" required help="Minimum 8 caractères">
          <UInput
            v-model="formData.password"
            type="password"
            placeholder="••••••••"
            icon="i-heroicons-lock-closed"
            size="lg"
          />
        </UFormGroup>

        <UFormGroup label="Accepter les conditions">
          <UCheckbox
            label="J'accepte les conditions d'utilisation et la politique de confidentialité"
          />
        </UFormGroup>
      </form>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton color="gray" variant="outline" label="Annuler" @click="handleBack" />
          <UButton
            color="primary"
            label="Créer le compte"
            icon="i-heroicons-check"
            :loading="loading"
            @click="handleSubmit"
          />
        </div>
      </template>
    </FormWrapper>

    <!-- Exemples supplémentaires -->
    <div class="mt-12 mx-4 space-y-6">
      <h2 class="text-xl font-bold text-gray-800">Variantes FormWrapper</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Sans background -->
        <FormWrapper
          title="Sans Background"
          subtitle="FormWrapper sans fond gris"
          icon="i-heroicons-document"
          :show-background="false"
          :show-back-button="false"
        >
          <div class="space-y-4">
            <UFormGroup label="Champ 1">
              <UInput placeholder="Valeur" />
            </UFormGroup>
            <UFormGroup label="Champ 2">
              <UInput placeholder="Valeur" />
            </UFormGroup>
          </div>
        </FormWrapper>

        <!-- Avec erreur -->
        <FormWrapper
          title="Avec Erreur"
          subtitle="Exemple d'affichage d'erreur"
          icon="i-heroicons-exclamation-triangle"
          error-message="Une erreur s'est produite lors de la soumission"
          :show-back-button="false"
        >
          <div class="space-y-4">
            <UFormGroup label="Email">
              <UInput placeholder="email@example.com" />
            </UFormGroup>
          </div>
        </FormWrapper>

        <!-- Avec succès -->
        <FormWrapper
          title="Avec Succès"
          subtitle="Exemple d'affichage de succès"
          icon="i-heroicons-check-circle"
          success-message="Opération réussie avec succès !"
          :show-back-button="false"
        >
          <div class="space-y-4">
            <UFormGroup label="Nom">
              <UInput placeholder="Nom" />
            </UFormGroup>
          </div>
        </FormWrapper>

        <!-- Avec erreurs multiples -->
        <FormWrapper
          title="Erreurs Multiples"
          subtitle="Plusieurs erreurs affichées"
          icon="i-heroicons-exclamation-circle"
          :errors-message="[
            'Erreur 1: Champ requis',
            'Erreur 2: Format invalide',
            'Erreur 3: Valeur trop courte',
          ]"
          :show-back-button="false"
        >
          <div class="space-y-4">
            <UFormGroup label="Champ">
              <UInput placeholder="Valeur" />
            </UFormGroup>
          </div>
        </FormWrapper>
      </div>
    </div>
  </div>
</template>
