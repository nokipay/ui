<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Modals & Alerts</h1>
      <p class="text-gray-600">Phase 2 - Modal dialogs, alerts, and notifications</p>
    </div>

    <!-- Modal -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Modal</h2>
      <p class="text-gray-600 mb-4">Modal dialogs in different sizes</p>
      
      <div class="flex flex-wrap gap-3">
        <button
          @click="showModal('sm')"
          class="px-4 py-2 bg-nxGreen-500 text-white rounded-lg hover:bg-nxGreen-600"
        >
          Small Modal
        </button>
        
        <button
          @click="showModal('md')"
          class="px-4 py-2 bg-nxGreen-500 text-white rounded-lg hover:bg-nxGreen-600"
        >
          Medium Modal
        </button>
        
        <button
          @click="showModal('lg')"
          class="px-4 py-2 bg-nxGreen-500 text-white rounded-lg hover:bg-nxGreen-600"
        >
          Large Modal
        </button>
        
        <button
          @click="showModal('xl')"
          class="px-4 py-2 bg-nxGreen-500 text-white rounded-lg hover:bg-nxGreen-600"
        >
          XL Modal
        </button>
      </div>
      
      <Modal
        v-model="isModalOpen"
        :size="modalSize"
        title="Example Modal"
      >
        <template #default>
          <p class="text-gray-600">
            This is a {{ modalSize }} modal. You can put any content here.
          </p>
          <div class="mt-4 space-y-2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </template>
        
        <template #footer>
          <div class="flex justify-end gap-3">
            <button
              @click="isModalOpen = false"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              @click="isModalOpen = false"
              class="px-4 py-2 bg-nxGreen-500 text-white rounded-lg hover:bg-nxGreen-600"
            >
              Confirm
            </button>
          </div>
        </template>
      </Modal>
    </section>

    <!-- ConfirmDialog -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">ConfirmDialog</h2>
      <p class="text-gray-600 mb-4">Confirmation dialogs with different variants</p>
      
      <div class="flex flex-wrap gap-3">
        <button
          @click="showConfirm('info')"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Info Confirm
        </button>
        
        <button
          @click="showConfirm('warning')"
          class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Warning Confirm
        </button>
        
        <button
          @click="showConfirm('error')"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Error Confirm
        </button>
        
        <button
          @click="showConfirm('success')"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Success Confirm
        </button>
      </div>
      
      <ConfirmDialog
        v-model="isConfirmOpen"
        :title="confirmConfig.title"
        :message="confirmConfig.message"
        :variant="confirmConfig.variant"
        :confirm-text="confirmConfig.confirmText"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </section>

    <!-- Alert -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Alert</h2>
      <p class="text-gray-600 mb-4">Alert messages in different types</p>
      
      <div class="space-y-4">
        <Alert
          type="info"
          title="Information"
          message="This is an informational alert message."
          :closable="true"
        />
        
        <Alert
          type="success"
          title="Success"
          message="Your operation completed successfully!"
          :closable="true"
        />
        
        <Alert
          type="warning"
          title="Warning"
          message="Please review your input before proceeding."
          :closable="true"
        />
        
        <Alert
          type="error"
          title="Error"
          message="An error occurred while processing your request."
          :closable="true"
        />
      </div>
    </section>

    <!-- Notification -->
    <section class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Notification (Toast)</h2>
      <p class="text-gray-600 mb-4">Toast notifications with auto-dismiss</p>
      
      <div class="flex flex-wrap gap-3">
        <button
          @click="showNotification('info')"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Show Info
        </button>
        
        <button
          @click="showNotification('success')"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Show Success
        </button>
        
        <button
          @click="showNotification('warning')"
          class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Show Warning
        </button>
        
        <button
          @click="showNotification('error')"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Show Error
        </button>
      </div>
      
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :type="notification.type"
        :title="notification.title"
        :message="notification.message"
        :duration="notification.duration"
        @close="removeNotification(notification.id)"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Modal
const isModalOpen = ref(false)
const modalSize = ref<'sm' | 'md' | 'lg' | 'xl'>('md')

const showModal = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  modalSize.value = size
  isModalOpen.value = true
}

// Confirm Dialog
const isConfirmOpen = ref(false)
const confirmConfig = ref({
  title: '',
  message: '',
  variant: 'info' as 'info' | 'warning' | 'error' | 'success',
  confirmText: 'Confirm'
})

const showConfirm = (variant: 'info' | 'warning' | 'error' | 'success') => {
  const configs = {
    info: {
      title: 'Information',
      message: 'Do you want to proceed with this action?',
      confirmText: 'Proceed'
    },
    warning: {
      title: 'Warning',
      message: 'This action requires your confirmation.',
      confirmText: 'Continue'
    },
    error: {
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete'
    },
    success: {
      title: 'Confirm Success',
      message: 'Everything looks good! Proceed?',
      confirmText: 'Yes'
    }
  }
  
  confirmConfig.value = { ...configs[variant], variant }
  isConfirmOpen.value = true
}

const handleConfirm = () => {
  console.log('Confirmed!')
}

const handleCancel = () => {
  console.log('Cancelled!')
}

// Notifications
const notifications = ref<Array<{
  id: number
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  duration: number
}>>([])

let notificationId = 0

const showNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
  const messages = {
    info: { title: 'Info', message: 'This is an information notification' },
    success: { title: 'Success', message: 'Operation completed successfully!' },
    warning: { title: 'Warning', message: 'Please review your actions' },
    error: { title: 'Error', message: 'Something went wrong' }
  }
  
  const notification = {
    id: notificationId++,
    type,
    ...messages[type],
    duration: 3000
  }
  
  notifications.value.push(notification)
  
  setTimeout(() => {
    removeNotification(notification.id)
  }, notification.duration)
}

const removeNotification = (id: number) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}
</script>

