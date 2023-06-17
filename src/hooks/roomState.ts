import { multiplayRoomState } from '@/store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useFirebaseRoom = (roomId: string) =>
  useRecoilValue(multiplayRoomState(roomId));

export const useFirebaseRoomStatus = (roomId: string) =>
  useRecoilValue(multiplayRoomState(roomId)).status;
