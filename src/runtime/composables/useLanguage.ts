import { ref, computed } from 'vue'

export type Language = 'fr' | 'en'

export interface LanguageConfig {
  code: Language
  name: string
  flag: string
  icon: string
}

export const languages: LanguageConfig[] = [
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    icon: 'i-heroicons-flag',
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    icon: 'i-heroicons-flag',
  },
]

export function useLanguage() {
  const currentLanguage = ref<Language>('fr')

  // Récupérer la langue depuis le localStorage ou utiliser la langue par défaut
  if (process.client) {
    const savedLanguage = localStorage.getItem('app-language')
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      currentLanguage.value = savedLanguage as Language
    }
  }

  const currentLanguageConfig = computed(() => {
    return languages.find((lang) => lang.code === currentLanguage.value) || languages[0]
  })

  const nextLanguage = computed(() => {
    const currentIndex = languages.findIndex((lang) => lang.code === currentLanguage.value)
    const nextIndex = (currentIndex + 1) % languages.length
    return languages[nextIndex]
  })

  const switchLanguage = () => {
    currentLanguage.value = nextLanguage.value.code
    if (process.client) {
      localStorage.setItem('app-language', currentLanguage.value)
    }
  }

  const setLanguage = (language: Language) => {
    currentLanguage.value = language
    if (process.client) {
      localStorage.setItem('app-language', currentLanguage.value)
    }
  }

  return {
    currentLanguage,
    currentLanguageConfig,
    nextLanguage,
    languages,
    switchLanguage,
    setLanguage,
  }
}
