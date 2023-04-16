import { firebaseRoomState } from '@/store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useFirebaseRoom = (roomId: string) =>
  useRecoilValue(firebaseRoomState(roomId));

export const useFirebaseRoomStatus = (roomId: string) =>
  useRecoilValue(firebaseRoomState(roomId)).status;
