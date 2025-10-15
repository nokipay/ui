<script setup lang="ts">
import { computed, watch } from 'vue'
import type { SidebarLink } from '../../../utils/models/sidebar-link'

interface LinkProps {
  icon: string
  title: string
  link?: string
  permission?: string | string[]
  children?: SidebarLink[]
}

const props = defineProps<LinkProps>()
const route = useRoute()

// État global partagé pour accordéon
const activeParentId = useState<string | null>('sidebar-active', () => null)

// Filtrer les enfants selon permissions (si implémenté)
const allowedChildren = computed(() => {
  if (!props.children) return []
  // TODO: Implémenter filtrage permissions quand directive v-permission sera créée
  return props.children
})

// Détermine le comportement d'affichage
const displayBehavior = computed(() => {
  if (allowedChildren.value.length === 0) {
    return props.link ? 'single' : 'hidden'
  }
  if (allowedChildren.value.length === 1) {
    return 'direct-child'
  }
  return 'parent-with-children'
})

// Enfant unique si comportement direct-child
const singleChild = computed(() => {
  return displayBehavior.value === 'direct-child' ? allowedChildren.value[0] : null
})

// Vérifie si le lien est actif
const isActive = computed(() => {
  if (displayBehavior.value === 'single') {
    return props.link === route.path
  }
  if (displayBehavior.value === 'direct-child') {
    return singleChild.value?.route_link === route.path
  }
  return (
    props.link === route.path ||
    allowedChildren.value.some((child) => child.route_link === route.path)
  )
})

// Vérifie si l'accordéon est ouvert
const isOpen = computed(() => activeParentId.value === props.title)

// Toggle accordéon
const toggle = () => {
  activeParentId.value = activeParentId.value === props.title ? null : props.title
}

// Ouvrir automatiquement si un enfant est actif
watch(
  () => route.path,
  () => {
    if (
      displayBehavior.value === 'parent-with-children' &&
      allowedChildren.value.some((child) => child.route_link === route.path)
    ) {
      activeParentId.value = props.title
    }
  }
)
</script>

<template>
  <div v-if="displayBehavior !== 'hidden'">
    <li class="mb-1">
      <!-- Lien direct vers enfant unique -->
      <NuxtLink
        v-if="displayBehavior === 'direct-child' && singleChild"
        :to="singleChild.route_link"
        :class="{
          'bg-primary/20 text-primary border-l-4 border-primary': isActive,
        }"
        class="px-4 py-3 gap-x-3 flex items-center hover:bg-gray-800 transition-all font-medium rounded-r-lg"
      >
        <UIcon :name="icon" class="w-5 h-5" />
        <span class="text-sm">{{ singleChild.title }}</span>
      </NuxtLink>

      <!-- Parent avec plusieurs enfants (accordéon) -->
      <div
        v-else-if="displayBehavior === 'parent-with-children'"
        @click="toggle"
        :class="{
          'bg-gray-800 text-white': isActive || isOpen,
        }"
        class="px-4 py-3 gap-x-3 flex items-center justify-between cursor-pointer font-medium hover:bg-gray-800 transition-all rounded-r-lg"
      >
        <div class="flex items-center gap-2">
          <UIcon :name="icon" class="w-5 h-5" />
          <span class="text-sm">{{ title }}</span>
        </div>
        <UIcon
          :name="isOpen ? 'heroicons:chevron-down' : 'heroicons:chevron-right'"
          class="w-4 h-4"
        />
      </div>

      <!-- Lien simple sans enfants -->
      <NuxtLink
        v-else
        :to="link"
        :class="{
          'bg-primary/20 text-primary border-l-4 border-primary': isActive,
        }"
        class="px-4 py-3 gap-x-3 flex items-center hover:bg-gray-800 transition-all rounded-r-lg font-medium"
      >
        <UIcon :name="icon" class="w-5 h-5" />
        <span class="text-sm">{{ title }}</span>
      </NuxtLink>

      <!-- Liste des enfants (accordéon) -->
      <ul
        v-if="isOpen && allowedChildren.length > 0"
        class="pl-10 mt-1 space-y-1 transition-all bg-gray-800/50"
      >
        <li v-for="child in allowedChildren" :key="child.title">
          <NuxtLink
            :to="child.route_link"
            :class="{
              'text-primary font-medium': child.route_link === route.path,
            }"
            class="block text-gray-400 text-xs py-2 ml-4 hover:text-white transition-colors"
          >
            {{ child.title }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </div>
</template>
