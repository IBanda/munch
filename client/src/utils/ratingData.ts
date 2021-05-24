export default function ratingData(data: number[]) {
  const ratingValue = [5, 4, 3, 2, 1];
  const overallTotal = data.reduce((acc: number, cur: number, idx: number) => {
    return acc + cur * ratingValue[idx];
  }, 0);

  const totalNumofRatings = data.reduce(
    (acc: number, cur: number) => acc + cur,
    0
  );

  const averageRating =
    Number((overallTotal / totalNumofRatings).toPrecision(2)) || 0;

  return {
    overallTotal,
    totalNumofRatings,
    averageRating,
    ratingValue,
  };
}

export function formatRating(avg: number) {
  const avgStr = String(avg);
  if (avgStr[2] !== '0' && avgStr[2] !== '5' && avg && avgStr.length === 3) {
    const standardized = avgStr.slice(0, 2) + '5';
    return Number(standardized);
  }
  return avg;
}
