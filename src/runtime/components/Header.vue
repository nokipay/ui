<script setup>
import { computed } from "vue";
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  icon: { type: String, required: false },
  badge: { type: Object, required: false },
  statusBadge: { type: Object, required: false },
  titleSize: { type: String, required: false, default: "2xl" },
  subtitleSize: { type: String, required: false, default: "sm" }
});
const titleSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl"
};
const subtitleSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl"
};
const titleClasses = computed(() => {
  const baseSize = titleSizeClasses[props.titleSize];
  if (props.titleSize === "2xl") {
    return `${baseSize} md:text-3xl`;
  }
  if (props.titleSize === "3xl") {
    return `${baseSize} md:text-4xl`;
  }
  return baseSize;
});
</script>

<template>
  <div
    class="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl shadow-xl mb-8 overflow-hidden"
  >
    <div class="p-6 text-white">
      <div class="flex items-center justify-between">
        <!-- Zone gauche -->
        <div class="flex items-center space-x-4">
          <slot name="left" />
          <div
            v-if="icon"
            class="bg-yellow-400 rounded-full p-3 shadow-lg w-12 h-12 flex items-center justify-center"
          >
            <UIcon :name="icon" class="text-2xl text-slate-800" />
          </div>
          <div>
            <h1 :class="[titleClasses, 'font-bold mb-1 text-white']">
              {{ title }}
            </h1>
            <p v-if="subtitle" :class="[subtitleSizeClasses[subtitleSize], 'text-slate-200']">
              {{ subtitle }}
            </p>
            <slot name="extra" />
          </div>
        </div>
        <!-- Zone droite -->
        <div class="flex items-center space-x-2">
          <NokiBadge v-if="statusBadge" v-bind="statusBadge" />
          <UBadge v-else-if="badge" :class="badge.class" :label="badge.label" />
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>
