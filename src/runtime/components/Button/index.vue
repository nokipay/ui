<script setup lang="ts">
defineProps<{
  label: string;
  icon?: string;
  type?: "button" | "submit" | "reset";
  color?: "white" | "yellow" | "black" | "primary";
  variant?: "outline" | "solid";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  onClick?: () => void;
  shadowType?: "dark" | "soft";
}>();

// Classes de couleurs pour les boutons avec ombre foncée (fond clair)
const darkShadowColorClasses = {
  white: "bg-white hover:bg-gray-100 text-gray-600 border",
  yellow: "bg-yellow-400 hover:bg-yellow-500 text-gray-900",
  black: "bg-gray-900 hover:bg-gray-800 text-white",
  primary: "bg-primary hover:bg-primary-600 text-gray-900",
};

// Classes de couleurs pour les boutons avec ombre douce (fond sombre)
const softShadowColorClasses = {
  white: "bg-white hover:bg-gray-100 text-gray-600 border border-black-200",
  yellow: "bg-yellow-400 hover:bg-yellow-500 text-gray-900",
  black: "bg-gray-900 hover:bg-gray-800 text-white border border-gray-700",
  primary: "bg-primary hover:bg-primary-600 text-gray-900",
};

// Classes de couleurs pour l'état de chargement
const loadingColorClasses = {
  white: "bg-white hover:bg-white text-gray-600 border border-black-200",
  yellow: "bg-yellow-400 hover:bg-yellow-400 text-gray-600",
  black: "bg-gray-900 hover:bg-gray-900 text-white border border-gray-700",
  primary: "bg-primary hover:bg-primary text-gray-900 ",
};

// Classes d'ombre conditionnelles selon le type
const shadowClasses = {
  // Ombre foncée et définie
  dark: {
    white: "[box-shadow:0_2px_0_0_#4b5563]",
    yellow: "[box-shadow:0_2px_0_0_#4b5563]",
    black: "[box-shadow:0_2px_0_0_#4b5563]",
    primary: "[box-shadow:0_2px_0_0_#4b5563]",
  },

   // Ombre douce
  soft: {
    white: "shadow-md",
    yellow: "shadow-md",
    black: "shadow-md",
    primary: "shadow-md",
  }
};

// Effet d'agrandissement au survole
const hoverEffectClasses = "hover:scale-105 hover:translate-y-[-2px]";
</script>

<template>
  <UButton
    :icon="icon"
    :size="size || 'md'"
    :type="type || 'button'"
    :variant="variant || 'solid'"
    :color="color || 'black'"
    :loading="loading"
    @click="onClick"
    class="px-4 py-2 rounded-full transition-all duration-300 justify-center font-medium"
    :class="[
      loading
        ? loadingColorClasses[color || 'black'] || loadingColorClasses.black
        : (shadowType === 'dark'
            ? darkShadowColorClasses[color || 'black'] || darkShadowColorClasses.black
            : softShadowColorClasses[color || 'black'] || softShadowColorClasses.black),
      shadowClasses[shadowType || 'soft'][color || 'black'] || shadowClasses[shadowType || 'soft'].black,
      hoverEffectClasses
    ]"
  >
    {{ label }}
  </UButton>
</template>