const indexMapper = {
  5: 0,
  4: 1,
  3: 2,
  2: 3,
  1: 4,
};

export default function updateRating(
  existing: any[],
  index: 1 | 2 | 3 | 4 | 5
) {
  const updated = [...existing];
  updated[indexMapper[index]] += 1;
  return updated;
}
