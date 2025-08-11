export const IMAGES = {
  logo: "/logo.png",
  cloudOffline: "/cloud-offline.png"
};
export function getImageUrl(key) {
  return IMAGES[key];
}
