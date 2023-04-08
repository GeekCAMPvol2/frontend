import { atom } from 'recoil';

export const textState = atom<string>({
  key: 'textState',
  default: 'Hello World!',
});

interface itemData {
  quiz: string;
  answer: number;
  images: { imageUrl: string | undefined }[];
  affiliatelink: string;
}

// APIで取得する商品データ
export const itemData = atom<itemData>({
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
  default: 60,
});
