<script setup lang="ts">
interface wrapperAttributes {
    successMessage?: string
    errorsMessage: string
    errorMessage: string
    title: string
}

defineProps<wrapperAttributes>()
</script>

<template>
    <div class="bg-gray-100 ">
        <div class="flex flex-col justify-center items-center min-h-screen">
            <div
                class="relative break-words bg-white shadow-2xl rounded-2xl bg-clip-border w-full max-w-md p-6 m-auto mx-auto">

                <div class="flex justify-center mx-auto mb-5">
                    <NuxtLink to="/">
                        <img src="~~/base/assets/img/NokiPay_Logo.png" alt="Logo" width="70" />
                    </NuxtLink>
                </div>
                <p class="text-center text-2xl font-bold mb-4 text-black-800">
                    {{ title }}
                </p>

                <UAlert icon="i-heroicons-exclamation-triangle" color="red" v-show="errorMessage" :title="errorMessage"
                    class="mt-3" />

                <UAlert v-for="(error, i) in errorsMessage" :key="i" icon="i-heroicons-exclamation-triangle" color="red"
                    v-show="errorsMessage" :title="error" class="mt-3" />

                <UAlert icon="i-heroicons-check" color="green" v-show="successMessage" :title="successMessage"
                    class="mt-3" />
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>