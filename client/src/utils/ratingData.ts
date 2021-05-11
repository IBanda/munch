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
    Number((overallTotal / totalNumofRatings).toFixed(1)) || 0;

  return {
    overallTotal,
    totalNumofRatings,
    averageRating,
    ratingValue,
  };
}
