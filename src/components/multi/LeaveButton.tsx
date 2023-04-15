import Link from 'next/link';
import React, { useEffect } from 'react';
import HomeButton from '../elements/HomeButton';
import {
  HttpsCallable,
  httpsCallable,
} from 'firebase/functions';
import { functions } from '@/lib/firebase';
import { leaveRoom } from './leaveHandler';

type Props = {
  roomId: string;
};

const LeaveButton = (props: Props) => {
  const { roomId } = props;

  const handleLeaveRoom = () => {
    leaveRoom(roomId);
  };

  return (
    <Link href={'/'}>
      <button
        style={styles.button}
        onClick={handleLeaveRoom}
      >
        ホームへ
      </button>
    </Link>
  );
};

export default LeaveButton;

const styles = {
  button: {
    color: 'black',
    backgroundColor: 'white',
  },
};
