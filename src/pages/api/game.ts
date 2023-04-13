import { ItemData } from '@/types/Game';

export const getItemData = async (): Promise<ItemData> => {
  const res = await fetch(
    new URL(`http://seaffood.com:8080/quiz`)
  );
  const data: ItemData = await res.json();
  return data;
};
