import {
  firebaseRoomState,
  firebaseRoomGameState,
} from '@/store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useFirebaseRoom = (roomId: string) =>
  useRecoilValue(firebaseRoomState(roomId));

export const useFirebaseRoomStatus = (roomId: string) =>
  useRecoilValue(firebaseRoomState(roomId)).status;

export const useFirebaseRoomCurrentQuestion = (
  roomId: string
) => useRecoilValue(firebaseRoomGameState(roomId));

export const userFirebaseRoomGame = (roomId: string) =>
  useRecoilValue(firebaseRoomGameState(roomId));
