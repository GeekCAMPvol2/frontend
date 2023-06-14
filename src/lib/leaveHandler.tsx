import { functions } from '@/lib/firebase';
import {
  HttpsCallable,
  httpsCallable,
} from 'firebase/functions';

export const leaveRoom = async (roomId: string) => {
  console.log(roomId);
  const leaveRoomCallback: HttpsCallable<{
    roomId: string;
  }> = httpsCallable(functions, 'leaveRoom');
  await leaveRoomCallback({
    roomId: roomId,
  });
};
