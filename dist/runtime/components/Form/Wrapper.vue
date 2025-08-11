<script setup lang="ts">
interface wrapperAttributes {
    title: string
    errorsMessage: string | string[]
    errorMessage: string | string[]
    loading?: boolean
}

defineProps<wrapperAttributes>()
</script>

<template>
    <div class="min-h-screen">
        <div class="mx-auto">
            <!-- Conteneur principal -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                <!-- Zone des erreurs -->
                <div v-if="(typeof errorMessage === 'string' && errorMessage.length > 0) ||
                    (typeof errorsMessage === 'string' && errorsMessage.length > 0) ||
                    (typeof errorMessage !== 'string' && errorMessage.length > 0) ||
                    (typeof errorsMessage !== 'string' && errorsMessage.length > 0)"
                    class="bg-red-50 border-b border-red-200 px-6 py-4">

                    <!-- Message d'erreur simple (string) -->
                    <div v-if="typeof errorMessage === 'string' && errorMessage.length > 0"
                        class="flex items-start space-x-3">
                        <UIcon name="i-heroicons-exclamation-triangle"
                            class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p class="text-sm text-red-700">{{ errorMessage }}</p>
                    </div>

                    <!-- Messages d'erreurs (string) -->
                    <div v-if="typeof errorsMessage === 'string' && errorsMessage.length > 0"
                        class="flex items-start space-x-3">
                        <UIcon name="i-heroicons-exclamation-triangle"
                            class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <p class="text-sm text-red-700">{{ errorsMessage }}</p>
                    </div>

                    <!-- Messages d'erreur multiples -->
                    <div v-if="typeof errorMessage !== 'string' && errorMessage.length > 0"
                        class="flex items-start space-x-3">
                        <UIcon name="i-heroicons-exclamation-triangle"
                            class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div class="space-y-1">
                            <p v-for="error in errorMessage" :key="error" class="text-sm text-red-700">{{ error }}</p>
                        </div>
                    </div>

                    <!-- Messages d'erreurs multiples -->
                    <div v-if="typeof errorsMessage !== 'string' && errorsMessage.length > 0"
                        class="flex items-start space-x-3">
                        <UIcon name="i-heroicons-exclamation-triangle"
                            class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div class="space-y-1">
                            <p v-for="error in errorsMessage" :key="error" class="text-sm text-red-700">{{ error }}</p>
                        </div>
                    </div>
                </div>

                <!-- Contenu du formulaire -->
                <div class="p-6">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>