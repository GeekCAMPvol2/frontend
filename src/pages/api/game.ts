import { ItemData } from '@/types/Game';

export const getItemData = async (): Promise<ItemData[]> => {
  // https://seaffood.com/quiz
  const url = 'https://seaffood.com/quizlake?hits=5';
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network response error');
  }

  return (await res.json()) as ItemData[];
};
