<script setup lang="ts">
import type { SidebarLink } from '../../../utils/models/sidebar-link'

interface MobileSidebarProps {
  logo?: string
  logoAlt?: string
  appName?: string
  links: SidebarLink[]
}

const props = withDefaults(defineProps<MobileSidebarProps>(), {
  logo: '',
  logoAlt: 'Logo',
  appName: 'NxPay',
})

const isOpen = defineModel<boolean>({ default: false })
</script>

<template>
  <USlideover v-model="isOpen">
    <div class="flex flex-col h-full bg-gray-900 text-gray-300">
      <!-- Header mobile -->
      <div class="flex items-center justify-between p-4 border-b border-gray-800">
        <div class="flex items-center gap-3">
          <img v-if="logo" :src="logo" :alt="logoAlt" class="w-10 h-10" />
          <div v-else class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-lg font-bold text-white">{{
              appName.substring(0, 2).toUpperCase()
            }}</span>
          </div>
          <span class="font-bold text-lg text-white">{{ appName }}</span>
        </div>
        <UButton
          icon="i-heroicons-x-mark"
          color="gray"
          variant="ghost"
          size="lg"
          @click="isOpen = false"
        />
      </div>

      <!-- Navigation links -->
      <div class="flex-1 overflow-y-auto p-4">
        <div class="flex flex-col gap-y-1">
          <NavigationLink
            v-for="link in links"
            :key="link.title"
            class="cursor-pointer"
            :children="link.children"
            :title="link.title"
            :icon="link.icon || 'heroicons:document'"
            :link="link.route_link"
            :permission="link.permission"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-800">
        <p class="text-xs text-gray-500 text-center">© 2025 {{ appName }}</p>
      </div>
    </div>
  </USlideover>
</template>
