export enum Status {
    INITIAL = 'INITIAL',
    PENDING = 'PENDING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}

// TODO should preserve as much referential identity as possible, in case when changed values as the same as original, should return to as is; should check recursively as well;
export function immutableAssign<T>(to: T, values: Partial<T>) { return { ...to, ...values }; }

export function assertNever(v: never, error: string = 'Unhandled enumeration value ' + v) { throw new Error(error); }