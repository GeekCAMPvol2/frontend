import { ItemData } from '@/types/Game';
import { atom, atomFamily, selectorFamily } from 'recoil';
import type { AtomEffect } from 'recoil';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Player } from '@/types/Player';
import { MultiQuestion } from '@/types/MultiQuestion';
import { roomSchema } from '@/types/room';
import type {
  GameQuestion,
  Room,
  RoomGameStartedState,
} from '@/types/room';
import {
  collection,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import {
  FirebaseRoomGame,
  calculateGame,
} from '@/features/multi/calculateGame';

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

const subscribeFirebaseRoomState =
  (roomId: string): AtomEffect<Room> =>
  ({ setSelf }) => {
    const unsubscribe = onSnapshot(
      doc(db, 'rooms', roomId),
      (doc) => {
        const roomState = roomSchema.parse(doc.data());
        setSelf(roomState);
      }
    );

    return () => {
      unsubscribe();
    };
  };

export const firebaseRoomState = atomFamily<Room, string>({
  key: 'firebaseRoomState',
  default: (roomId) => ({
    status: 'LOADING',
    members: [],
    membersReadyState: {},
  }),
  effects: (roomId) => [subscribeFirebaseRoomState(roomId)],
});

export const firebaseRoomStatusState = selectorFamily<
  Room['status'],
  string
>({
  key: 'firebaseRoomStatusState',
  get:
    (roomId) =>
    ({ get }) =>
      get(firebaseRoomState(roomId)).status,
});

export const clock100MillisState = atom<number>({
  key: 'clock100MillisState',
  default: 0,
  effects: [
    ({ setSelf }) => {
      setSelf(Date.now());
      const timer = setInterval(
        () => setSelf(Date.now()),
        100
      );
      return () => clearInterval(timer);
    },
  ],
});

export const firebaseRoomGameState = selectorFamily<
  FirebaseRoomGame | undefined,
  string
>({
  key: 'firebaseRoomGameState',
  get:
    (roomId) =>
    ({ get }) => {
      const room = get(firebaseRoomState(roomId));
      if (room.status !== 'GAME_STARTED') return;

      return calculateGame(
        get(clock100MillisState),
        room.timeLimitSeconds,
        room.questions
      );
    },
});

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

// 入力した金額配列
export const keyPadNumArrState = atom<number[]>({
  key: 'crrQuizNumArrState',
  default: [],
});

//
export const roomIdState = atom<string>({
  key: 'roomIdState',
  default: '',
  // effects: [(setSelf)]
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
