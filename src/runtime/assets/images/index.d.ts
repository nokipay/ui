export declare const IMAGES: {
    readonly logo: "/logo.png";
    readonly cloudOffline: "/cloud-offline.png";
};
export type ImageKey = keyof typeof IMAGES;
export declare function getImageUrl(key: ImageKey): string;
