<script setup lang="ts">
interface Props {
  /** Modal ouvert */
  open?: boolean
  /** Type d'alerte */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** Titre */
  title?: string
  /** Message */
  message?: string
  /** Texte bouton */
  buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  type: 'info',
  title: 'Information',
  buttonText: 'OK'
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'confirm': []
}>()

const handleConfirm = () => {
  emit('update:open', false)
  emit('confirm')
}

const typeConfig = computed(() => {
  const configs = {
    info: {
      icon: 'i-heroicons-information-circle',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    success: {
      icon: 'i-heroicons-check-circle',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    warning: {
      icon: 'i-heroicons-exclamation-triangle',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    error: {
      icon: 'i-heroicons-x-circle',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  }
  return configs[props.type]
})
</script>

<template>
  <UModal v-model="open" :prevent-close="false">
    <UCard>
      <div class="flex gap-4">
        <div 
          :class="['icon-wrapper', typeConfig.iconBg]"
        >
          <UIcon 
            :name="typeConfig.icon"
            :class="['w-6 h-6', typeConfig.iconColor]"
          />
        </div>
        
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ title }}
          </h3>
          
          <p class="text-gray-600">
            <slot>{{ message }}</slot>
          </p>
        </div>
      </div>
      
      <template #footer>
        <div class="flex justify-end">
          <UButton @click="handleConfirm">
            {{ buttonText }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped>
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>

