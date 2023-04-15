import { leaveRoom } from '@/components/multi/leaveHandler';
import { useEffect } from 'react';

const handleBeforeunload = (
  event: BeforeUnloadEvent,
  roomId: string
) => {
  event.preventDefault();
  event.returnValue = '';
  leaveRoom(roomId);
};

const useLeavePageComfirmation = (roomId: string) => {
  useEffect(() => {
    window.addEventListener('beforeunload', (e) =>
      handleBeforeunload(e, roomId)
    );

    return () => {
      window.removeEventListener('beforeunload', (e) =>
        handleBeforeunload(e, roomId)
      );
    };
  }, []);
};

export default useLeavePageComfirmation;
