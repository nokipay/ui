<script setup>
import { computed } from "vue";
import {
  BUTTON_BASE_CLASSES,
  BUTTON_COLOR_STYLES,
  BUTTON_SHADOW_STYLES
} from "../../utils/constants/buttonStyles";
const props = defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: false },
  type: { type: String, required: false },
  color: { type: String, required: false },
  variant: { type: String, required: false },
  size: { type: String, required: false },
  loading: { type: Boolean, required: false },
  onClick: { type: Function, required: false },
  shadowType: { type: String, required: false }
});
const buttonClasses = computed(() => {
  const color = props.color || "black";
  const shadowType = props.shadowType || "soft";
  const colorClass = props.loading ? BUTTON_COLOR_STYLES[color].loading : BUTTON_COLOR_STYLES[color].normal;
  const shadowClass = BUTTON_SHADOW_STYLES[shadowType][color];
  return [BUTTON_BASE_CLASSES, colorClass, shadowClass].join(" ");
});
</script>

<template>
  <UButton
    :icon="props.icon"
    :size="props.size || 'md'"
    :type="props.type || 'button'"
    :variant="props.variant || 'solid'"
    :color="props.color || 'black'"
    :loading="props.loading"
    :class="buttonClasses"
    @click="props.onClick"
  >
    {{ props.label }}
  </UButton>
</template>
