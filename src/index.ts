import { get, Path } from '@blakek/deep';

export function makeLookup<T>(
  inputArray: any[],
  lookupProperty: Path
): Record<string, T> {
  return inputArray.reduce(
    (lookup: Record<string, T>, next: Record<string, any>) => ({
      ...lookup,
      [get(next, lookupProperty)]: next
    }),
    {}
  );
}

export default makeLookup;
