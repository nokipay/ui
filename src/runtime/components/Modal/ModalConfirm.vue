<script setup lang="ts">
interface Props {
  /** Modal ouvert */
  open?: boolean
  /** Titre */
  title?: string
  /** Message de confirmation */
  message?: string
  /** Texte bouton confirmation */
  confirmText?: string
  /** Texte bouton annulation */
  cancelText?: string
  /** Type de confirmation */
  type?: 'info' | 'warning' | 'danger' | 'success'
  /** Loading state */
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  title: 'Confirmer',
  message: 'Êtes-vous sûr de vouloir continuer ?',
  confirmText: 'Confirmer',
  cancelText: 'Annuler',
  type: 'info',
  loading: false
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'confirm': []
  'cancel': []
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('update:open', false)
  emit('cancel')
}

const typeConfig = computed(() => {
  const configs = {
    info: {
      icon: 'i-heroicons-information-circle',
      iconColor: 'text-blue-500',
      confirmColor: 'primary'
    },
    warning: {
      icon: 'i-heroicons-exclamation-triangle',
      iconColor: 'text-yellow-500',
      confirmColor: 'warning'
    },
    danger: {
      icon: 'i-heroicons-exclamation-circle',
      iconColor: 'text-red-500',
      confirmColor: 'error'
    },
    success: {
      icon: 'i-heroicons-check-circle',
      iconColor: 'text-green-500',
      confirmColor: 'primary'
    }
  }
  return configs[props.type]
})
</script>

<template>
  <UModal 
    v-model="open"
    :prevent-close="loading"
  >
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon 
            :name="typeConfig.icon" 
            class="w-6 h-6"
            :class="typeConfig.iconColor"
          />
          <h3 class="text-lg font-semibold">
            {{ title }}
          </h3>
        </div>
      </template>
      
      <div class="py-2">
        <p class="text-gray-600">
          <slot>{{ message }}</slot>
        </p>
      </div>
      
      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            color="gray"
            variant="ghost"
            :disabled="loading"
            @click="handleCancel"
          >
            {{ cancelText }}
          </UButton>
          
          <UButton
            :color="typeConfig.confirmColor"
            :loading="loading"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

