<template>
  <div>
    <!-- Table components are available as individual imports -->
    <slot />
  </div>
</template>

<script>
export { default as TableElementByPage } from "./ElementByPage.vue";
export { default as TablePaginationInfo } from "./PaginationInfo.vue";
export { default as TableWrapper } from "./Wrapper.vue";
</script>