import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';

interface SimpleMerge {
  readField: ReadFieldFunction;
  key: string;
}
export default function simpleMerge(
  existing: any[],
  incoming: any[],
  { readField, key }: SimpleMerge
) {
  const merged = [...existing];
  const exstKeys: any[] = [];
  existing.forEach((item: any) => {
    exstKeys.push(readField(key, item));
  });
  incoming.forEach((incomingItem: any) => {
    const index = exstKeys.findIndex(
      (item) => item === readField(key, incomingItem)
    );
    if (!~index) {
      merged.push(incomingItem);
    } else {
      merged[index] = incomingItem;
    }
  });
  return merged;
}
