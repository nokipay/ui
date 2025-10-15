<script setup>
import { getImageUrl } from "../../assets/images";
defineProps({
  successMessage: { type: String, required: false },
  errorsMessage: { type: String, required: true },
  errorMessage: { type: String, required: true },
  title: { type: String, required: true }
});
</script>

<template>
  <div class="bg-gray-100">
    <div class="flex flex-col justify-center items-center min-h-screen">
      <div
        class="relative break-words bg-white shadow-2xl rounded-2xl bg-clip-border w-full max-w-md p-6 m-auto mx-auto"
      >
        <div class="flex justify-center mx-auto mb-5">
          <NuxtLink to="/">
            <img :src="getImageUrl('logo')" alt="Logo" width="70" />
          </NuxtLink>
        </div>
        <p class="text-center text-2xl font-bold mb-4 text-black-800">
          {{ title }}
        </p>

        <UAlert
          v-show="errorMessage"
          icon="i-heroicons-exclamation-triangle"
          color="red"
          :title="errorMessage"
          class="mt-3"
        />

        <UAlert
          v-for="(error, i) in errorsMessage"
          v-show="errorsMessage"
          :key="i"
          icon="i-heroicons-exclamation-triangle"
          color="red"
          :title="error"
          class="mt-3"
        />

        <UAlert
          v-show="successMessage"
          icon="i-heroicons-check"
          color="green"
          :title="successMessage"
          class="mt-3"
        />
        <slot />
      </div>
    </div>
  </div>
</template>
