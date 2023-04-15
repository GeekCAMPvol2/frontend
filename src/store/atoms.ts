import { ItemData } from '@/types/Game';
import { atom } from 'recoil';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// APIで取得する商品データ
export const itemData = atom<ItemData[]>({
  key: 'itemState',
  default: [],
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

export const firebaseUserIdState = atom<string | undefined>(
  {
    key: 'firebaseUserIdState',
    default: undefined,
    effects: [
      ({ setSelf }) =>
        onAuthStateChanged(auth, (user) =>
          setSelf(user?.uid)
        ),
    ],
  }
);

// 取得する問題数
export const getItemNumState = atom<number>({
  key: 'getItemNumState',
  default: 5,
});

// 現在の問題番号
export const crrQuizNumState = atom<number>({
  key: 'crrQuizNumState',
  default: 0,
});
