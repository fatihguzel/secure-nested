export function safeGet<T, D = undefined>(
    obj: any,
    path: string | string[],
    defaultValue?: D
): T | D;

export function safeSet<T = any>(
    obj: any,
    path: string | string[],
    value: T,
    createMissing?: boolean
): boolean;

export function safeDelete(obj: any, path: string | string[]): boolean;

export function safeHas(obj: any, path: string | string[]): boolean;

export default safeGet;
