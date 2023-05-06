import HomeButton from '@/components/elements/HomeButton';
import { LobbyButton } from '@/components/lobby/LobbyButton';
import { PlayerCard } from '@/components/lobby/PlayerCard';
import { Styles } from '@/types/Styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { db, functions } from '@/lib/firebase';
import { Player } from '@/types/Player';
import LeaveButton from '@/components/multi/LeaveButton';
import useLeavePageConfirmation from '@/hooks/useLeavePageConfirmation';
import {
  HttpsCallable,
  httpsCallable,
} from '@firebase/functions';
import { Background } from '@/components/elements/Background';
import { MultiQuestion } from '@/types/MultiQuestion';
import MultiGame from '@/components/multi/MultiGame';
import Title from '@/components/elements/Title';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  playersState,
  questionsState,
  roomIdState,
} from '@/store/atoms';
import {
  useFirebaseRoom,
  useFirebaseRoomStatus,
} from '@/hooks/roomState';
import { RoomInvitingMembersState } from '@/types/room';
import { useFirebaseUserId } from '@/hooks/useFirebaseUserId';

const RoomPage = () => {
  const router = useRouter();
  const roomId = `${router.query.roomId}`;
  const room = useFirebaseRoom(roomId);

  if (room.status === 'INVITING_MEMBERS')
    return <Lobby roomId={roomId} room={room} />;

  if (room.status === 'GAME_STARTED')
    return (
      <div>
        <MultiGame roomId={roomId} room={room} />
      </div>
    );
};

type LobbyProps = {
  roomId: string;
  room: RoomInvitingMembersState;
};

const Lobby = (props: LobbyProps) => {
  const { roomId, room } = props;
  const { members, membersReadyState } = room;

  const userId = useFirebaseUserId();
  const isReady =
    userId != undefined && !!membersReadyState[userId];
  // const [membersReady, setMembersReady] = useState<
  //   Record<string, boolean> | undefined
  // >(undefined);
  // const [isReady, setIsReady] = useState(false);
  // const isReady = room
  // useLeavePageConfirmation(roomId);

  // useEffect(() => {
  //   if (roomId != '') {
  //     onSnapshot(doc(db, 'rooms', roomId), (doc) => {
  //       console.log(doc.data());
  //       setPlayers(doc.data()!.members);
  //       console.log(doc.data()!.membersReadyState);
  //       if (doc.data()!.status == 'INVITING_MEMBERS')
  //         setMembersReady(doc.data()?.membersReadyState);
  //       setGameStatus(doc.data()!.status);
  //       setQuestions(doc.data()!.questions);
  //     });
  //   }
  // }, [roomId]);

  // .useEffect(() => {
  //   const queryRoomId =
  //     router.query.roomId != null &&
  //     typeof router.query.roomId === 'string'
  //       ? router.query.roomId
  //       : '';
  //   setRoomId(queryRoomId);
  // }, [router]);

  const handleCopy = () => {
    const baseURL = window.location.origin;
    navigator.clipboard.writeText(
      `${baseURL}/multi/lobby/${roomId}`
    );
  };

  const handleReady = () => {
    setMemberReady(roomId, !isReady);
    // setIsReady(true);
  };

  const setMemberReady = async (
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

  return (
    <div>
      <LeaveButton roomId={roomId} />
      <Title />
      <div style={styles.playerContainer}>
        {members.map((player, index) => {
          const userId = player.userId;
          return (
            <PlayerCard
              key={index}
              name={player.playerName}
              checked={membersReadyState![userId]}
            />
          );
        })}
      </div>

      <div style={styles.buttonContainer}>
        <LobbyButton
          name="URLをコピー"
          onClick={handleCopy}
        />
        <LobbyButton
          disabled={isReady}
          name="準備完了"
          onClick={handleReady}
        />
      </div>

      <Background selected={'rgb(0, 225, 255)'} />
    </div>
  );
};
const styles: Styles = {
  titleWrapper: {
    fontSize: 80,
    textAlign: 'center',
    padding: '50px',
  },

  playerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
};

export default RoomPage;
