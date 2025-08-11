<script setup lang="ts">
import { 
  BUTTON_BASE_CLASSES, 
  BUTTON_COLOR_STYLES, 
  BUTTON_SHADOW_STYLES,
  type ButtonColor,
  type ButtonShadowType
} from '../../utils/constants/buttonStyles';

interface ButtonProps {
  label: string;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: ButtonColor;
  variant?: 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  onClick?: () => void;
  shadowType?: ButtonShadowType;
}

const props = defineProps<ButtonProps>();

const buttonClasses = computed(() => {
  const color = props.color || 'black';
  const shadowType = props.shadowType || 'soft';
  
  const colorClass = props.loading 
    ? BUTTON_COLOR_STYLES[color].loading 
    : BUTTON_COLOR_STYLES[color].normal;
    
  const shadowClass = BUTTON_SHADOW_STYLES[shadowType][color];
  
  return [BUTTON_BASE_CLASSES, colorClass, shadowClass].join(' ');
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