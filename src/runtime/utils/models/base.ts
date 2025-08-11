export interface Timestamps {
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    activated_at?: string;
}

export interface JsonResponseArray<T> {
    success: boolean;
    message: string;
    data: T;
}

