export const formatNumberToJpyString = (
  price: number
): string =>
  Intl.NumberFormat('ja-JP').format(price) + '円';
