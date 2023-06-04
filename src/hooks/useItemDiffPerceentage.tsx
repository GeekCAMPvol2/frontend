import { itemData, keyPadNumArrState } from '@/store/atoms';
import { ItemData } from '@/types/Game';
import { useRecoilValue } from 'recoil';

const calcItemDiffPercentage = (
  itemPrice: number[],
  ansPrice: number[]
) => {
  // itemと入力値の差の割合を出力する
  const diffPercent =
    itemPrice.reduce(
      (prev, curr, index) =>
        prev + Math.abs(ansPrice[index]) / Math.abs(curr),
      0
    ) * 100;

  const ret = Math.round(diffPercent);
  return ret;
};

const getItemToPrice = (item: ItemData[]) => {
  return item.map((itemData) => itemData.answer);
};

export const useItemDiffPercentage = () => {
  const item = useRecoilValue(itemData);
  const keyPadNumArr = useRecoilValue(keyPadNumArrState);

  const itemDiffPercentage = calcItemDiffPercentage(
    getItemToPrice(item),
    keyPadNumArr
  );

  return itemDiffPercentage;
};
