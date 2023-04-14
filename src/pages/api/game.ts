import { ItemData } from '@/types/Game';

export const getItemData = async (): Promise<ItemData> => {
  const res = await fetch(
    new URL(`https://seaffood.com/quiz`)
  );
  const data: ItemData = await res.json();
  return data;
};
