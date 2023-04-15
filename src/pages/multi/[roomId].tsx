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
import { db } from '@/lib/firebase';
import { Player } from '@/types/Player';

const Lobby = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (roomId != '') {
      const unsub = onSnapshot(
        doc(db, 'rooms', roomId),
        (doc) => {
          console.log(doc.data());
          setPlayers(doc.data()!.members);
        }
      );
    }
  }, [roomId]);

  useEffect(() => {
    const queryRoomId =
      router.query.roomId != null &&
      typeof router.query.roomId === 'string'
        ? router.query.roomId
        : '';
    setRoomId(queryRoomId);
  }, [router]);

  const handleCopy = () => {
    const baseURL = 'http://localhost:3000';
    navigator.clipboard.writeText(
      `${baseURL}/multi/lobby/${roomId}`
    );
  };

  return (
    <div>
      {/* ホームボタンコンポーネント */}
      <div>
        <HomeButton />
        <h1 style={styles.title}>PriceQuest</h1>
        <div style={styles.playerContainer}>
          {players.map((player, index) => (
            <PlayerCard key={index} name={player.userId} />
          ))}
        </div>

        <div style={styles.buttonContainer}>
          <LobbyButton
            name="URLをコピー"
            onClick={handleCopy}
          />
          <LobbyButton name="準備完了" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
const styles: Styles = {
  title: {
    textAlign: 'center',
  },

  playerContainer: {
    position: 'absolute',
    top: 300,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    // width: 300,
    // margin: "0 auto"
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

export default Lobby;
