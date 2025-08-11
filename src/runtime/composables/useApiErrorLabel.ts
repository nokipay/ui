import { errorMessages } from '../utils/constants/errorMessages'

export function useApiErrorLabel() {
  const { locale } = useI18n()

  const getErrorLabel = (code: string): string => {
    const lang = locale.value
    return errorMessages[code]?.[lang] || errorMessages[code]?.en || 'Unknown error'
  }

  return { getErrorLabel }
}