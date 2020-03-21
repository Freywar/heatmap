export function action<T extends string>(type: T): { type: T };
export function action<T extends string, P extends object>(type: T, payload: P): { type: T; payload: P };
export function action(type: string, payload?: object) { return { type, payload }; }