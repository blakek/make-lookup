import { get, Path } from '@blakek/deep';

export function makeLookup<T extends Record<string, any>>(
  inputArray: T[],
  lookupProperty: Path
): Record<string, T> {
  return inputArray.reduce(
    (lookup: Record<string, T>, next: T) => ({
      ...lookup,
      [get(lookupProperty, next)]: next
    }),
    {}
  );
}

export default makeLookup;
