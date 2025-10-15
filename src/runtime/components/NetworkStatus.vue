<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getImageUrl } from '../assets/images'
const isOnline = ref(true)
const connectionType = ref('')
function checkInternetConnection() {
  if (typeof navigator !== 'undefined') {
    isOnline.value = navigator.onLine
  }
}
function updateConnectionType() {
  if (typeof navigator !== 'undefined' && navigator.connection) {
    connectionType.value = navigator.connection.effectiveType
  }
}
onMounted(() => {
  if (typeof navigator !== 'undefined') {
    isOnline.value = navigator.onLine
    updateConnectionType()
    window.addEventListener('online', checkInternetConnection)
    window.addEventListener('offline', checkInternetConnection)
  }
})
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('online', checkInternetConnection)
    window.removeEventListener('offline', checkInternetConnection)
  }
})
</script>

<template>
  <div
    v-if="!isOnline"
    class="fixed top-0 left-0 w-full h-full bg-white text-black z-50 flex flex-col items-center justify-center text-center"
  >
    <img
      class="w-52 relative group-hover:scale-75 duration-200"
      :src="getImageUrl('logo')"
      alt="Logo"
    />

    <div class="flex space-x-4 items-center mt-10">
      <img width="50" :src="getImageUrl('cloudOffline')" alt="Cloud Offline" />
      <h1 class="text-4xl font-semibold">Vous êtes hors connexion</h1>
    </div>
  </div>
</template>
