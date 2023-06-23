import { useRecoilValue } from 'recoil';
import { MultiplayRoom } from '../model';
import { multiplayRoomState } from '@/store/atoms';

export const useMultiplayRoom = (
  roomId: string | undefined
): MultiplayRoom =>
  useRecoilValue(multiplayRoomState(roomId));
