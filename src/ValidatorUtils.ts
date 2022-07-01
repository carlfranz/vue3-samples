
export type NonEmptyArray<T> = [T, ...T[]];

export function requireNotNull<T>(t: T): asserts t is NonNullable<T>{
    if (t === null || t === undefined) {
        const e = new Error('Object was null or undefined')
        throw e;
    }
}

export function requireNotEmpty<T>(t: T[]) : asserts t is NonEmptyArray<T>{
    if(!t.length && t.length === 0) {
        const e = new Error('Array was empty')
        throw e;
    }
}