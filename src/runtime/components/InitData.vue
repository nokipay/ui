<script setup>
import { ref, onMounted, watch } from "vue";
const timer = ref(0);
const counter = ref(0);
const current_load = ref("D\xE9but du chargement");
function update(value) {
  timer.value += 6.67;
  counter.value++;
  current_load.value = `Chargement des ${value}`;
}
async function init() {
}
onMounted(() => {
  init();
});
watch(timer, () => {
  if (timer.value > 100) {
    timer.value = 0;
  }
});
</script>

<template>
  <div
    v-if="timer < 100 && timer !== 0"
    class="flex w-full px-4 my-2 space-x-1 text-xs text-center text-black"
  >
    <div
      class="flex items-center justify-center w-full p-1 space-x-1 bg-white border dark:bg-gray-900 dark:text-white dark:border-gray-800 rounded-xl"
    >
      <UIcon name="heroicons:cloud-arrow-down" size="20" />

      <span>Chargement des données ({{ timer.toFixed(2) }}%)</span>

      <UProgress class="w-1/2" :value="timer" />

      <span>({{ counter }}/17) - {{ current_load }}</span>
    </div>
  </div>
</template>
