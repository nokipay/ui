// Image assets for the UI library
export const IMAGES = {
  logo: '/logo.png',
  cloudOffline: '/cloud-offline.png',
} as const;

export type ImageKey = keyof typeof IMAGES;

// Helper function to get image URL
export function getImageUrl(key: ImageKey): string {
  return IMAGES[key];
}