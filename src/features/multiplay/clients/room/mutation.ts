import {
  HttpsCallable,
  httpsCallable,
} from 'firebase/functions';
import { functions } from '@/lib/firebase';

export const createRoom = async (
  memberDisplayName: string
): Promise<{ roomId: string }> => {
  const createRoomCallable: HttpsCallable<
    {
      memberDisplayName: string;
      timeLimitSeconds?: number;
      questionCount?: number;
    },
    { roomId: string }
  > = httpsCallable(functions, 'createRoom');
  const createRoomResponse = await createRoomCallable({
    memberDisplayName,
  });
  const { roomId } = createRoomResponse.data;
  return { roomId };
};

export const joinRoom = async (
  roomId: string,
  memberDisplayName: string
) => {
  const joinRoomCallable: HttpsCallable<
    { roomId: string; memberDisplayName: string },
    any
  > = httpsCallable(functions, 'joinRoom');
  await joinRoomCallable({
    roomId,
    memberDisplayName,
  });
};

export const updateAmIReady = async (
  roomId: string,
  ready: boolean
) => {
  const setMemberReadyCallable: HttpsCallable<
    { roomId: string; ready: boolean },
    undefined
  > = httpsCallable(functions, 'updateAmIReady');
  await setMemberReadyCallable({
    roomId,
    ready,
  });
};

export const leaveRoom = async (roomId: string) => {
  const leaveRoomCallable: HttpsCallable<{
    roomId: string;
  }> = httpsCallable(functions, 'leaveRoom');
  await leaveRoomCallable({
    roomId: roomId,
  });
};

export const submitAnswer = async (
  roomId: string,
  questionIndex: number,
  price: number
) => {
  const submitAnswerCallable: HttpsCallable<{
    roomId: string;
    questionIndex: number;
    price: number;
  }> = httpsCallable(functions, 'submitAnswer');
  await submitAnswerCallable({
    roomId,
    questionIndex,
    price,
  });
};
