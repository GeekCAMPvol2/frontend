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
import { calculateCurrentQuestionIndex } from '@/features/multi/calculateCurrentQuestionIndex';

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

export type FirebaseRoomCurrentQuestion =
  | undefined
  | (GameQuestion & {
      questionIndex: number;
    });

export const firebaseRoomCurrentQuestionState =
  selectorFamily<FirebaseRoomCurrentQuestion, string>({
    key: 'firebaseRoomCurrentQuestionState',
    get:
      (roomId) =>
      ({ get }) => {
        const room = get(firebaseRoomState(roomId));
        if (room.status !== 'GAME_STARTED') return;

        const { questions } = room;
        const lastQ = questions[questions.length - 1];
        const lastQMillis = lastQ.presentedAt.toMillis();
        const qDurationSeconds = room.timeLimitSeconds + 10;
        const gameOverMillis =
          lastQMillis + qDurationSeconds * 1000;

        const i = calculateCurrentQuestionIndex(
          Date.now(),
          gameOverMillis,
          questions
        );

        if (i == undefined) return;
        return { questionIndex: i, ...questions[i] };
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
