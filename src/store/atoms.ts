import { ItemData } from '@/types/Game';
import { atom } from 'recoil';

// APIで取得する商品データ
export const itemData = atom<ItemData>({
  key: 'itemState',
  default: {
    quiz: '',
    answer: 0,
    images: [
      {
        imageUrl: undefined,
      },
    ],
    affiliatelink: '',
  },
});

export const timeLimit = atom<number>({
  key: 'timeLimitState',
  default: 30,
});

export const ansQuizState = atom<string>({
  key: 'ansQuizState',
  default: '',
});

export const keyPadNumState = atom<number>({
  key: 'keyPadNumState',
  default: 0,
});

export const firebaseAuthLastUpdatedAtState = atom<number>({
  key: 'firebaseAuthLastUpdatedAtState',
  default: 0,
});
