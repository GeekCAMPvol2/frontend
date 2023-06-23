import { auth } from '@/lib/firebase';
import { MultiplayRoomInLobby } from '../../model';

export const getIfImReady = (
  room: MultiplayRoomInLobby
): boolean => {
  const userId = auth.currentUser?.uid;
  if (userId == null) {
    return false;
  }
  return room.readyMemberIds.has(userId);
};
