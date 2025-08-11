import type { UseFetchOptions } from 'nuxt/app';
export declare function useApi<T>(url: string | (() => string), options?: UseFetchOptions<T>): any;
