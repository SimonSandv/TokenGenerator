import { tokens } from './../dist/tokens/tokens';

type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

declare function get<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P>;

export const getTokens = <P extends Path<typeof tokens>>(path: P): PathValue<typeof tokens, P> => {
  return get(tokens, path);
};

//typesafe and suggestive dot notation.

const obj = getTokens("tietoevrySans")
const type = getTokens("tietoevrySans.type")
const val = getTokens("tietoevrySans.value")