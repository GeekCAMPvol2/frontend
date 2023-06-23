import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  RemoteRoom,
  RemoteRoomGameStarted,
  RemoteRoomInvitingMembers,
  remoteRoomSchema,
  RemoteClientSceneSchedule,
} from './schema';
import {
  MultiplayRoom,
  MultiplayRoomInError,
  MultiplayRoomInLobby,
  MultiplayRoomInQuizSubmit,
  MultiplayRoomInQuizAnswer,
  MultiplayRoomInGameResult,
} from '../../model/room';

const ERROR_MESSAGE_SCENE_KIND_AND_SERVER_STATUS_MISMATCH =
  'Condition mismatch with RemoteRoom.status';
const ERROR_MESSAGE_CANT_FIND_CURRENT_SCENE_SCHEDULE =
  'Cannot find a current scene schedule';
const ERROR_MESSAGE_CANT_FIND_NEXT_SCENE_SCHEDULE =
  'Cannot find a next scene schedule';

const getCurrentSceneSchedule = (
  remoteRoom: RemoteRoom,
  now: Date
): RemoteClientSceneSchedule | undefined => {
  let latestSchedule: RemoteClientSceneSchedule | undefined;
  const schedules = remoteRoom.clientSceneSchedules;

  for (let i = 0; i < schedules.length; i++) {
    if (now < schedules[i].startDate.toDate()) {
      break;
    }
    latestSchedule = schedules[i];
  }

  return latestSchedule;
};

const getNextSceneSchedule = (
  remoteRoom: RemoteRoom,
  now: Date
): RemoteClientSceneSchedule | undefined => {
  const schedules = remoteRoom.clientSceneSchedules;

  for (let i = 0; i < schedules.length; i++) {
    if (now < schedules[i].startDate.toDate()) {
      return schedules[i];
    }
  }

  return; // 次のscene切り替えが無い or 配列が空
};

const getNextTransitionEstimatedDate = (
  remoteRoom: RemoteRoom,
  now: Date
): Date | undefined =>
  getNextSceneSchedule(remoteRoom, now)?.startDate.toDate();

const transformBooleanRecordToKeySet = <K extends string>(
  record: Record<K, boolean>
): Set<K> => {
  const keys = Object.keys(record) as K[];
  const set = new Set<K>();

  keys.forEach((k) => {
    if (record[k]) {
      set.add(k);
    }
  });

  return set;
};

const toMultiplayRoomInLobby = (
  remoteRoom: RemoteRoomInvitingMembers,
  roomId: string
): MultiplayRoomInLobby => {
  const { members, questionCount, timeLimitSeconds } =
    remoteRoom;
  const readyMemberIds = transformBooleanRecordToKeySet(
    remoteRoom.membersReadyState
  );

  return {
    sceneKind: 'LOBBY',
    roomId,
    members,
    questionCount,
    readyMemberIds,
    timeLimitSeconds,
  };
};

const toMultiplayRoomInQuizSubmit = (
  remoteRoom: RemoteRoomGameStarted,
  roomId: string,
  currentQuestionIndex: number,
  now: Date
): MultiplayRoomInQuizSubmit | Error => {
  const {
    members,
    questionCount,
    timeLimitSeconds,
    questions,
    playerQuestionAnswerTable,
  } = remoteRoom;
  const nextTransitionEstimatedDate =
    getNextTransitionEstimatedDate(remoteRoom, now);

  if (nextTransitionEstimatedDate == null) {
    return new Error(
      ERROR_MESSAGE_CANT_FIND_NEXT_SCENE_SCHEDULE
    );
  }

  return {
    sceneKind: 'QUIZ_SUBMIT',
    roomId,
    members,
    questionCount,
    currentQuestionIndex,
    questions,
    playerQuestionAnswerTable,
    timeLimitSeconds,
    nextTransitionEstimatedDate,
  };
};

const toMultiplayRoomInQuizAnswer = (
  remoteRoom: RemoteRoomGameStarted,
  roomId: string,
  currentQuestionIndex: number,
  now: Date
): MultiplayRoomInQuizAnswer | Error => {
  const {
    members,
    questionCount,
    timeLimitSeconds,
    questions,
    playerQuestionAnswerTable,
  } = remoteRoom;
  const nextTransitionEstimatedDate =
    getNextTransitionEstimatedDate(remoteRoom, now);

  if (nextTransitionEstimatedDate == null) {
    return new Error(
      ERROR_MESSAGE_CANT_FIND_NEXT_SCENE_SCHEDULE
    );
  }

  return {
    sceneKind: 'QUIZ_ANSWER',
    roomId,
    members,
    questionCount,
    currentQuestionIndex,
    questions,
    playerQuestionAnswerTable,
    timeLimitSeconds,
    nextTransitionEstimatedDate,
  };
};

const toMultiplayRoomInGameResult = (
  remoteRoom: RemoteRoomGameStarted,
  roomId: string
): MultiplayRoomInGameResult => {
  const {
    members,
    questionCount,
    timeLimitSeconds,
    questions,
    playerQuestionAnswerTable,
  } = remoteRoom;

  return {
    sceneKind: 'GAME_RESULT',
    roomId,
    members,
    questionCount,
    questions,
    playerQuestionAnswerTable,
    timeLimitSeconds,
  };
};

const newMultiplayRoomInError = (
  error: Error,
  roomId?: string
): MultiplayRoomInError => ({
  sceneKind: 'ERROR',
  roomId,
  error,
});

const toMultiplayRoom = (
  remoteRoom: RemoteRoom,
  roomId: string,
  now: Date
): MultiplayRoom => {
  const sch = getCurrentSceneSchedule(remoteRoom, now);
  if (sch == null) {
    const error = new Error(
      ERROR_MESSAGE_CANT_FIND_CURRENT_SCENE_SCHEDULE
    );
    return newMultiplayRoomInError(error);
  }

  const { scene } = sch;
  const serverStatus = remoteRoom.status;

  let roomOrError: MultiplayRoom | Error;

  // LOBBY
  if (
    scene.kind === 'LOBBY' &&
    serverStatus === 'INVITING_MEMBERS'
  ) {
    roomOrError = toMultiplayRoomInLobby(
      remoteRoom,
      roomId
    );
  } else if (scene.kind === 'LOBBY') {
    roomOrError = new Error(
      ERROR_MESSAGE_SCENE_KIND_AND_SERVER_STATUS_MISMATCH
    );
  }
  // QUIZ_SUBMIT
  else if (
    scene.kind === 'QUIZ_SUBMIT' &&
    serverStatus === 'GAME_STARTED'
  ) {
    roomOrError = toMultiplayRoomInQuizSubmit(
      remoteRoom,
      roomId,
      scene.currentQuestionIndex,
      now
    );
  } else if (scene.kind === 'QUIZ_SUBMIT') {
    roomOrError = new Error(
      ERROR_MESSAGE_SCENE_KIND_AND_SERVER_STATUS_MISMATCH
    );
  }
  // QUIZ_SUBMIT
  else if (
    scene.kind === 'QUIZ_ANSWER' &&
    serverStatus === 'GAME_STARTED'
  ) {
    roomOrError = toMultiplayRoomInQuizAnswer(
      remoteRoom,
      roomId,
      scene.currentQuestionIndex,
      now
    );
  } else if (scene.kind === 'QUIZ_ANSWER') {
    roomOrError = new Error(
      ERROR_MESSAGE_SCENE_KIND_AND_SERVER_STATUS_MISMATCH
    );
  }
  // GAME_RESULT
  else if (
    scene.kind === 'GAME_RESULT' &&
    serverStatus === 'GAME_STARTED'
  ) {
    roomOrError = toMultiplayRoomInGameResult(
      remoteRoom,
      roomId
    );
  } else if (scene.kind === 'GAME_RESULT') {
    roomOrError = new Error(
      ERROR_MESSAGE_SCENE_KIND_AND_SERVER_STATUS_MISMATCH
    );
  }
  // else
  else {
    // scene.kindのチェックに不足があると型チェックでエラーが発生する
    const isSceneExhaustive: never = scene;
    roomOrError = new Error(
      'toMultiplayRoom function is not exhaustive'
    );
  }

  return roomOrError instanceof Error
    ? newMultiplayRoomInError(roomOrError, roomId)
    : roomOrError;
};

export type OnMultiplayRoomUpdate = (
  room: MultiplayRoom
) => void;

export type Unsubscribe = () => void;

export const subscribeMultiplayRoom = (
  roomId: string,
  onUpdate: OnMultiplayRoomUpdate
): Unsubscribe => {
  let timerId: NodeJS.Timeout | undefined;

  const handler = (remote: RemoteRoom) => {
    const now = new Date();
    const multi = toMultiplayRoom(remote, roomId, now);
    const nextSchedule = getNextSceneSchedule(remote, now);
    if (nextSchedule != null) {
      const ms =
        nextSchedule.startDate.toMillis() -
        now.getMilliseconds();
      timerId = setTimeout(() => handler(remote), ms);
    }
    onUpdate(multi);
  };

  const docRef = doc(db, 'rooms', roomId);

  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    clearTimeout(timerId);
    const remoteRoom = remoteRoomSchema.parse(
      docSnap.data()
    );
    handler(remoteRoom);
  });

  return unsubscribe;
};
