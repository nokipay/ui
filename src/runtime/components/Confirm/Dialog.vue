<script setup>
import { ref } from 'vue'
const popup = ref(null)
const title = ref('')
const message = ref('')
const okButton = ref('')
const cancelButton = ref('Annuler')
const resolvePromise = ref()
const rejectPromise = ref()
const show = (opts) => {
  title.value = opts.title
  message.value = opts.message
  okButton.value = opts.okButton
  if (opts.cancelButton) {
    cancelButton.value = opts.cancelButton
  }
  popup.value.open()
  return new Promise((resolve, reject) => {
    resolvePromise.value = resolve
    rejectPromise.value = reject
  })
}
const _confirm = () => {
  popup.value.close()
  resolvePromise.value(true)
}
const _cancel = () => {
  popup.value.close()
  rejectPromise.value(false)
}
defineExpose({
  show,
  _confirm,
  _cancel,
})
</script>

<template>
  <ConfirmPopup ref="popup">
    <template #title>
      <div class="flex justify-between items-center">
        <h1>{{ title }}</h1>

        <UIcon
          class="cursor-pointer"
          color="orange"
          name="i-heroicons-x-mark"
          size="25"
          @click="_cancel"
        />
      </div>
    </template>

    <template #default>
      <p class="flex items-center gap-x-3">
        <UIcon name="heroicons:exclamation-circle" size="30" />
        <span>{{ message }}</span>
      </p>
    </template>

    <template #action>
      <div class="flex justify-end space-x-2">
        <ButtomBaseButton size="lg" color="white" :label="cancelButton" @click="_cancel" />

        <ButtomBaseButton size="lg" color="primary" :label="okButton" @click="_confirm" />
      </div>
    </template>
  </ConfirmPopup>
</template>
