import { AtomEffect } from 'recoil';
import {
  joinRoom,
  leaveRoom,
  subscribeMultiplayRoom,
} from '../clients/room';

export type MultiplaySceneKind =
  | 'LOADING'
  | 'LOBBY'
  | 'QUIZ_SUBMIT'
  | 'QUIZ_ANSWER'
  | 'GAME_RESULT';

// ルームにjoinしたユーザー1人分の情報
export type MultiplayRoomMember = {
  userId: string;
  displayName: string;
};

export type MultiplayRoomInLoading = {
  sceneKind: 'LOADING';
  roomId: string;
};

export type MultiplayRoomInLobby = {
  sceneKind: 'LOBBY';
  roomId: string;
  members: MultiplayRoomMember[];
  questionCount: number;
  timeLimitSeconds: number;
  readyMemberIds: Set<string>;
};

export type MultiplayQuestion = {
  productTitle: string;
  productPrice: number;
  productImageUrl: string;
  productLinkUrl: string;
};

export type MultiplayPlayerQuestionAnswerTable = Record<
  string, // userId
  number[] // MultiplayRoom["questions"] と同じ添字
>;

export type MultiplayRoomInQuizSubmit = {
  sceneKind: 'QUIZ_SUBMIT';
  roomId: string;
  members: MultiplayRoomMember[];
  questionCount: number;
  timeLimitSeconds: number;
  currentQuestionIndex: number;
  questions: MultiplayQuestion[];
  playerQuestionAnswerTable: MultiplayPlayerQuestionAnswerTable;
  nextTransitionEstimatedDate: Date;
};

export type MultiplayRoomInQuizAnswer = {
  sceneKind: 'QUIZ_ANSWER';
  roomId: string;
  members: MultiplayRoomMember[];
  questionCount: number;
  timeLimitSeconds: number;
  currentQuestionIndex: number;
  questions: MultiplayQuestion[];
  playerQuestionAnswerTable: MultiplayPlayerQuestionAnswerTable;
  nextTransitionEstimatedDate: Date;
};

export type MultiplayRoomInGameResult = {
  sceneKind: 'GAME_RESULT';
  roomId: string;
  members: MultiplayRoomMember[];
  questionCount: number;
  timeLimitSeconds: number;
  questions: MultiplayQuestion[];
  playerQuestionAnswerTable: MultiplayPlayerQuestionAnswerTable;
};

export type MultiplayRoomInError = {
  sceneKind: 'ERROR';
  roomId?: string;
  error: Error;
};

export type MultiplayRoom =
  | MultiplayRoomInLoading
  | MultiplayRoomInLobby
  | MultiplayRoomInQuizSubmit
  | MultiplayRoomInQuizAnswer
  | MultiplayRoomInGameResult
  | MultiplayRoomInError;

export const getMultiplayRoomDefault = (
  roomId: string | undefined
): MultiplayRoom => {
  if (roomId == null) {
    return {
      sceneKind: 'ERROR',
      error: new Error('Invalid roomId'),
    } satisfies MultiplayRoomInError;
  }
  return {
    sceneKind: 'LOADING',
    roomId,
  } satisfies MultiplayRoomInLoading;
};

const subscribeMultiplayRoomAndPushToAtom =
  (roomId: string): AtomEffect<MultiplayRoom> =>
  ({ setSelf }) => {
    const unsubscribe = subscribeMultiplayRoom(
      roomId,
      (room) => {
        setSelf(room);
      }
    );

    return () => {
      unsubscribe();
    };
  };

const joinAndLeaveRoomEffect =
  (roomId: string): AtomEffect<MultiplayRoom> =>
  () => {
    joinRoom(roomId, 'プレイヤー');
    return () => {
      leaveRoom(roomId);
    };
  };

export const getAtomEffectsForMultiplayRoomState = (
  roomId: string | undefined
): AtomEffect<MultiplayRoom>[] => {
  if (roomId == null) {
    return [];
  }
  return [
    subscribeMultiplayRoomAndPushToAtom(roomId),
    joinAndLeaveRoomEffect(roomId),
  ];
};

export const getCurrentQuestionAnswersByPlayer = (
  room:
    | MultiplayRoomInQuizSubmit
    | MultiplayRoomInQuizAnswer
): Map<string, number> => {
  const map = new Map<string, number>();
  Object.entries(room.playerQuestionAnswerTable).forEach(
    ([userId, playerAnswers]) => {
      map.set(
        userId,
        playerAnswers[room.currentQuestionIndex] ?? 0
      );
    }
  );
  return map;
};
