import {
  HttpsCallable,
  httpsCallable,
} from 'firebase/functions';
import { functions } from './firebase';

export const joinRoom = async (
  roomId: string,
  playerName: string
) => {
  const joinRoomCallback: HttpsCallable<
    { roomId: string; playerName: string },
    any
  > = httpsCallable(functions, 'joinRoom');
  await joinRoomCallback({
    roomId: roomId,
    playerName: playerName,
  });
};

export const setMemberReady = async (
  roomId: string,
  ready: boolean
) => {
  const setMemberReadyCallback: HttpsCallable<
    { roomId: string; ready: boolean },
    undefined
  > = httpsCallable(functions, 'setMemberReadyState');
  await setMemberReadyCallback({
    roomId: roomId,
    ready: ready,
  });
};

export const createRoom = async (
  playerName: string
): Promise<string> => {
  const createRoomCallback: HttpsCallable<
    { playerName: string },
    { roomId: string }
  > = httpsCallable(functions, 'createRoom');
  const createRoomResponse = await createRoomCallback({
    playerName: playerName,
  });
  console.log(createRoomResponse.data.roomId);
  return createRoomResponse.data.roomId;
};

export const leaveRoom = async (roomId: string) => {
  console.log(roomId);
  const leaveRoomCallback: HttpsCallable<{
    roomId: string;
  }> = httpsCallable(functions, 'leaveRoom');
  await leaveRoomCallback({
    roomId: roomId,
  });
};
