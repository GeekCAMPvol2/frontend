import { atom } from 'recoil';

export const textState = atom<string>({
  key: 'textState',
  default: 'Hello World!',
});

interface itemData {
  quiz: string;
  answer: number;
  images: { imageUrl: string }[];
  affiliatelink: string;
}

// APIで取得する商品データ
const defaultItemData: itemData = {
  quiz: '',
  answer: 0,
  images: [{ imageUrl: '/' }],
  affiliatelink: '',
};

export const itemData = atom<itemData>({
  key: 'itemState',
  default: defaultItemData,
});

export const timeLimit = atom<number>({
  key: 'timeLimitState',
  default: 60,
});
