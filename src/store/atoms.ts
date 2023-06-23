import { ItemData } from '@/types/Game';
import { atom, atomFamily } from 'recoil';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Player } from '@/types/Player';
import { MultiQuestion } from '@/types/MultiQuestion';
import {
  MultiplayRoom,
  getAtomEffectsForMultiplayRoomState,
  getMultiplayRoomDefault,
} from '@/features/multiplay/model';

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

export const multiplayRoomState = atomFamily<
  MultiplayRoom,
  string | undefined
>({
  key: 'multiplayRoomState',
  default: (roomId) => getMultiplayRoomDefault(roomId),
  effects: (roomId) =>
    getAtomEffectsForMultiplayRoomState(roomId),
});

// 取得する問題数
export const getItemNumState = atom<number>({
  key: 'getItemNumState',
  default: 5,
});

// 現在の問題番号
export const crrQuizNumState = atom<number>({
  key: 'crrQuizNumState',
  default: -1,
});

// 入力した金額配列
export const keyPadNumArrState = atom<number[]>({
  key: 'crrQuizNumArrState',
  default: [],
});

//
export const roomIdState = atom<string>({
  key: 'roomIdState',
  default: '',
});

//
export const playersState = atom<Player[]>({
  key: 'playersState',
  default: [],
});

//
export const questionsState = atom<MultiQuestion[]>({
  key: 'questionsState',
  default: [],
});

//
export const multiGameStateFlgState = atom<string>({
  key: 'multiGameStateFlgState',
  default: 'quiz',
});
