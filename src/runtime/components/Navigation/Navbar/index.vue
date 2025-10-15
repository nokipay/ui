<script setup lang="ts">
import { ref } from 'vue'

interface NavbarProps {
  title?: string
  subtitle?: string
  showMobileMenu?: boolean
  showHomeButton?: boolean
  homeLink?: string
}

const props = withDefaults(defineProps<NavbarProps>(), {
  title: 'Tableau de bord',
  subtitle: '',
  showMobileMenu: true,
  showHomeButton: true,
  homeLink: '/dashboard',
})

const emit = defineEmits<{
  toggleMobileMenu: []
}>()

const route = useRoute()

// Utiliser le titre depuis meta.name si disponible
const pageTitle = computed(() => {
  return route.meta?.name || props.title
})
</script>

<template>
  <nav
    class="flex items-center justify-between z-10 top-0 py-4 mb-6 transition-colors ease-in-out duration-200 delay-75"
  >
    <!-- Section gauche: Menu mobile + Titre -->
    <div class="flex items-center gap-4">
      <!-- Bouton menu mobile -->
      <UButton
        v-if="showMobileMenu"
        icon="i-heroicons-bars-3"
        color="gray"
        variant="ghost"
        class="lg:hidden rounded-full"
        size="lg"
        @click="emit('toggleMobileMenu')"
      />

      <!-- Titre et sous-titre -->
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          {{ pageTitle }}
        </h1>
        <p v-if="subtitle" class="text-sm text-gray-600 mt-0.5">{{ subtitle }}</p>
      </div>
    </div>

    <!-- Section droite: Actions -->
    <div class="flex items-center gap-x-4">
      <!-- Bouton home -->
      <UButton
        v-if="showHomeButton"
        icon="i-heroicons-home"
        color="gray"
        variant="ghost"
        class="rounded-full"
        :to="homeLink"
      />

      <!-- Slot pour actions supplémentaires (notifications, profil, etc.) -->
      <slot name="actions" />
    </div>
  </nav>
</template>
