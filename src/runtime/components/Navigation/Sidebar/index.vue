<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SidebarLink } from '../../../utils/models/sidebar-link'

interface SidebarProps {
  logo?: string
  logoAlt?: string
  appName?: string
  links: SidebarLink[]
  showFooter?: boolean
}

const props = withDefaults(defineProps<SidebarProps>(), {
  logo: '',
  logoAlt: 'Logo',
  appName: 'NxPay',
  showFooter: true,
})

const isOverflowing = ref(false)
const linkContainer = ref<HTMLElement | null>(null)

const checkOverflow = () => {
  if (linkContainer.value) {
    isOverflowing.value = linkContainer.value.scrollHeight > linkContainer.value.clientHeight
  }
}

onMounted(() => {
  checkOverflow()
})
</script>

<template>
  <div
    class="overflow-y-auto bg-gray-900 lg:block hidden w-72 m-0 text-gray-300 transition-colors ease-in-out duration-200 delay-75"
  >
    <aside class="sidebar flex flex-col justify-between h-full pt-6">
      <div>
        <!-- Logo -->
        <div class="flex justify-center items-center gap-x-3 my-4 mx-4 px-4">
          <img v-if="logo" :src="logo" :alt="logoAlt" class="w-14 h-14" />
          <div v-else class="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
            <span class="text-2xl font-bold text-white">{{
              appName.substring(0, 2).toUpperCase()
            }}</span>
          </div>
        </div>

        <!-- Nom de l'app -->
        <div class="flex justify-center items-center gap-x-3 mb-6 mx-4 px-4">
          <span class="font-bold text-lg text-white">{{ appName }}</span>
        </div>

        <!-- Navigation links -->
        <div
          ref="linkContainer"
          class="navbar flex mb-3 flex-col gap-y-1 px-4 mt-3 text-sm"
          @scroll="checkOverflow"
        >
          <NavigationLink
            v-for="link in links"
            :key="link.title"
            class="cursor-pointer hover:translate-x-2 duration-200"
            :children="link.children"
            :title="link.title"
            :icon="link.icon || 'heroicons:document'"
            :link="link.route_link"
            :permission="link.permission"
          />
        </div>
      </div>

      <!-- Footer -->
      <div v-if="showFooter" :class="{ 'footer-shadow': isOverflowing }">
        <slot name="footer">
          <div class="px-4 py-3 border-t border-gray-800">
            <p class="text-xs text-gray-500 text-center">© 2025 {{ appName }}</p>
          </div>
        </slot>
      </div>
    </aside>
  </div>
</template>

<style lang="css" scoped>
.navbar {
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.navbar::-webkit-scrollbar {
  display: none;
}

.footer-shadow {
  position: relative;
  z-index: 10;
}

.footer-shadow::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  z-index: -1;
}

/* Masque la barre de défilement mais garde la possibilité de scroller */
.sidebar {
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
