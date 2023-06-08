import { ItemData } from '@/types/Game';

export const getItemData = async (): Promise<ItemData> => {
  const url = 'https://seaffood.com/quiz';
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network response error');
  }

  return (await res.json()) as ItemData;
};
