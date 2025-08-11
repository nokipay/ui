<script setup lang="ts">
interface Props {
  acceptFormats?: string[]
  maxSize?: number // en Ko
  multiple?: boolean
  placeholder?: string
  previewSize?: string
  showPreview?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  acceptFormats: () => [], // Par défaut, accepte tous les types de fichiers
  maxSize: 10240, // 10MB par défaut
  multiple: false,
  placeholder: 'Cliquez pour sélectionner un fichier',
  previewSize: 'w-40 h-40',
  showPreview: true
})

const files = defineModel<File | File[] | null>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const previewUrls = ref<string[]>([])
const errorMessage = ref<string>('')
const isDragOver = ref<boolean>(false)

// Calculer l'accept string pour l'input
const acceptString = computed(() => {
  return props.acceptFormats.length > 0 ? props.acceptFormats.join(',') : '*/*'
})

// Détecter si un fichier est une image
function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

// Obtenir l'icône selon le type de fichier
function getFileIcon(file: File): string {
  const type = file.type.toLowerCase()
  const extension = file.name.split('.').pop()?.toLowerCase()

  // Images
  if (type.startsWith('image/')) {
    return 'heroicons:photo'
  }

  // PDF
  if (type === 'application/pdf') {
    return 'heroicons:document-text'
  }

  // Documents Word
  if (type.includes('word') || extension === 'doc' || extension === 'docx') {
    return 'heroicons:document-text'
  }

  // Excel
  if (type.includes('sheet') || extension === 'xls' || extension === 'xlsx' || extension === 'csv') {
    return 'heroicons:table-cells'
  }

  // PowerPoint
  if (type.includes('presentation') || extension === 'ppt' || extension === 'pptx') {
    return 'heroicons:presentation-chart-bar'
  }

  // Archives
  if (type.includes('zip') || type.includes('rar') || extension === 'zip' || extension === 'rar' || extension === '7z') {
    return 'heroicons:archive-box'
  }

  // Vidéos
  if (type.startsWith('video/')) {
    return 'heroicons:video-camera'
  }

  // Audio
  if (type.startsWith('audio/')) {
    return 'heroicons:musical-note'
  }

  // Code
  if (extension === 'js' || extension === 'ts' || extension === 'html' || extension === 'css' ||
      extension === 'vue' || extension === 'php' || extension === 'py' || extension === 'java') {
    return 'heroicons:code-bracket'
  }

  // Texte
  if (type.startsWith('text/') || extension === 'txt') {
    return 'heroicons:document'
  }

  // Par défaut
  return 'heroicons:document'
}

// Formatage de la taille de fichier
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'Ko', 'Mo', 'Go']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Validation d'un fichier
function validateFile(file: File): string | null {
  if (props.acceptFormats.length > 0 && !props.acceptFormats.includes(file.type)) {
    const extensions = props.acceptFormats.map(format => {
      // Convertir les types MIME en extensions lisibles
      if (format === 'application/pdf') return 'PDF'
      if (format.includes('word')) return 'Word'
      if (format.includes('sheet')) return 'Excel'
      if (format.startsWith('image/')) return 'Image'
      return format
    }).join(', ')
    return `Le format ${file.type} n'est pas accepté. Formats autorisés : ${extensions}`
  }

  if (file.size > props.maxSize * 1024) {
    return `La taille du fichier (${formatFileSize(file.size)}) dépasse la limite de ${formatFileSize(props.maxSize * 1024)}`
  }

  return null
}

// Traitement des fichiers sélectionnés
function processFiles(fileList: FileList | File[]) {
  const selectedFiles = Array.from(fileList)
  errorMessage.value = ''

  // Validation
  for (const file of selectedFiles) {
    const error = validateFile(file)
    if (error) {
      errorMessage.value = error
      return
    }
  }

  // Créer les URLs de prévisualisation pour les images uniquement
  previewUrls.value.forEach(url => URL.revokeObjectURL(url))
  previewUrls.value = selectedFiles.map(file => {
    return isImageFile(file) ? URL.createObjectURL(file) : ''
  })

  // Mettre à jour le model
  if (props.multiple) {
    files.value = selectedFiles
  } else {
    files.value = selectedFiles[0] || null
  }
}

// Gestion de la sélection de fichiers
function handleFileSelection(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    processFiles(target.files)
  }
}

// Gestion du drag & drop
function handleDragOver(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = true
}

function handleDragLeave(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false

  if (event.dataTransfer?.files) {
    processFiles(event.dataTransfer.files)
  }
}

// Supprimer un fichier spécifique
function removeFile(index?: number) {
  if (typeof index === 'number' && props.multiple && Array.isArray(files.value)) {
    // Supprimer un fichier spécifique dans le mode multiple
    const currentFiles = [...files.value]
    currentFiles.splice(index, 1)
    files.value = currentFiles.length > 0 ? currentFiles : null

    if (previewUrls.value[index]) {
      URL.revokeObjectURL(previewUrls.value[index])
    }
    previewUrls.value.splice(index, 1)
  } else {
    // Supprimer tous les fichiers
    previewUrls.value.forEach(url => {
      if (url) URL.revokeObjectURL(url)
    })
    previewUrls.value = []
    files.value = null
    errorMessage.value = ''

    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }
  }
}

// Déclencher la sélection de fichier
function triggerFileSelect() {
  fileInputRef.value?.click()
}

// Obtenir les fichiers comme tableau
const filesArray = computed(() => {
  if (!files.value) return []
  return Array.isArray(files.value) ? files.value : [files.value]
})

// Watcher pour nettoyer les URLs quand le model change
watch(files, (newValue) => {
  if (newValue === null || newValue === undefined) {
    previewUrls.value.forEach(url => {
      if (url) URL.revokeObjectURL(url)
    })
    previewUrls.value = []
  }
})

// Nettoyage lors de la destruction du composant
onUnmounted(() => {
  previewUrls.value.forEach(url => {
    if (url) URL.revokeObjectURL(url)
  })
})
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Zone de drop -->
    <div
      class="relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200"
      :class="{
        'border-primary-400 bg-primary-50': isDragOver,
        'border-gray-300 hover:border-gray-400': !isDragOver,
        'border-red-300': errorMessage
      }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <!-- Zone de sélection quand aucun fichier -->
      <div
        v-if="filesArray.length === 0"
        class="text-center cursor-pointer"
        @click="triggerFileSelect"
      >
        <div class="flex justify-center mb-3">
          <UIcon name="heroicons:cloud-arrow-up" class="w-12 h-12 text-gray-400" />
        </div>
        <p class="text-sm text-gray-600 mb-2">{{ placeholder }}</p>
        <p class="text-xs text-gray-500">
          ou glissez-déposez {{ props.multiple ? 'vos fichiers' : 'votre fichier' }} ici
        </p>
        <p class="text-xs text-gray-400 mt-2">
          <span v-if="props.acceptFormats.length > 0">
            Formats acceptés : {{ props.acceptFormats.join(', ') }}<br>
          </span>
          <span v-else>
            Tous types de fichiers acceptés<br>
          </span>
          Taille max : {{ formatFileSize(props.maxSize * 1024) }}
        </p>
      </div>

      <!-- Aperçu des fichiers -->
      <div v-else class="space-y-3">
        <!-- Mode simple -->
        <div v-if="!props.multiple && filesArray[0]" class="text-center">
          <!-- Aperçu image -->
          <div v-if="isImageFile(filesArray[0]) && previewUrls[0] && props.showPreview">
            <img
              :src="previewUrls[0]"
              :class="props.previewSize"
              class="rounded-lg object-cover mx-auto shadow-md"
              alt="Aperçu du fichier"
            />
          </div>

          <!-- Icône pour autres types de fichiers -->
          <div v-else class="flex justify-center mb-3">
            <div class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <UIcon :name="getFileIcon(filesArray[0])" class="w-10 h-10 text-gray-500" />
            </div>
          </div>

          <div class="mt-3 space-y-2">
            <div class="text-center">
              <p class="text-sm font-medium text-gray-700 truncate">
                {{ filesArray[0].name }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatFileSize(filesArray[0].size) }}
              </p>
            </div>
            <div class="flex justify-center space-x-2">
              <UButton
                @click="triggerFileSelect"
                variant="outline"
                size="sm"
                label="Changer"
              />
              <UButton
                @click="removeFile()"
                color="red"
                variant="outline"
                size="sm"
                label="Supprimer"
              />
            </div>
          </div>
        </div>

        <!-- Mode multiple -->
        <div v-else-if="props.multiple" class="space-y-3">
          <div class="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
            <div
              v-for="(file, index) in filesArray"
              :key="index"
              class="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50"
            >
              <!-- Icône ou image du fichier -->
              <div class="flex-shrink-0 mr-3">
                <img
                  v-if="isImageFile(file) && previewUrls[index] && props.showPreview"
                  :src="previewUrls[index]"
                  class="w-12 h-12 rounded object-cover"
                  alt="Aperçu"
                />
                <div v-else class="w-12 h-12 bg-white rounded flex items-center justify-center border">
                  <UIcon :name="getFileIcon(file)" class="w-6 h-6 text-gray-500" />
                </div>
              </div>

              <!-- Informations du fichier -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-700 truncate">
                  {{ file.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatFileSize(file.size) }}
                </p>
              </div>

              <!-- Bouton supprimer -->
              <button
                @click="removeFile(index)"
                class="flex-shrink-0 ml-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
              >
                <UIcon name="heroicons:x-mark" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Bouton d'ajout en mode multiple -->
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            @click="triggerFileSelect"
          >
            <UIcon name="heroicons:plus" class="w-6 h-6 text-gray-400 mr-2" />
            <span class="text-sm text-gray-500">Ajouter des fichiers</span>
          </div>
        </div>
      </div>

      <!-- Input caché -->
      <input
        ref="fileInputRef"
        type="file"
        :accept="acceptString"
        :multiple="props.multiple"
        class="hidden"
        @change="handleFileSelection"
      />
    </div>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
      <p class="text-sm text-red-600 flex items-center">
        <UIcon name="heroicons:exclamation-triangle" class="w-4 h-4 mr-2" />
        {{ errorMessage }}
      </p>
    </div>

    <!-- Informations sur les fichiers sélectionnés -->
    <div v-if="files && filesArray.length > 0" class="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
      <p class="text-sm text-green-600 flex items-center">
        <UIcon name="heroicons:check-circle" class="w-4 h-4 mr-2" />
        {{ filesArray.length }} fichier{{ filesArray.length > 1 ? 's' : '' }} sélectionné{{ filesArray.length > 1 ? 's' : '' }}
        <span class="ml-2 text-xs">
          ({{ formatFileSize(filesArray.reduce((total, file) => total + file.size, 0)) }})
        </span>
      </p>
    </div>
  </div>
</template>