import { errorMessages } from "../utils/constants/errorMessages.js";
export function useApiErrorLabel() {
  const { locale } = useI18n();
  const getErrorLabel = (code) => {
    const lang = locale.value;
    return errorMessages[code]?.[lang] || errorMessages[code]?.en || "Unknown error";
  };
  return { getErrorLabel };
}
