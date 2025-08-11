<template>
  <div>
    <!-- Form components are available as individual imports -->
    <slot />
  </div>
</template>

<script>
export { default as FormAuth } from "./Auth.vue";
export { default as FormFileUploader } from "./FileUploader.vue";
export { default as FormInput } from "./Input.vue";
export { default as FormPhoneInput } from "./PhoneInput.vue";
export { default as FormWrapper } from "./Wrapper.vue";
</script>