import HomeButton from '@/components/elements/HomeButton';
import { PlayerCard } from '@/components/lobby/PlayerCard';

const Lobby = () => {

  const player1 = { name: "aaa", playerImg: "/flower2.jpg" }

  return (
    <div>
      {/* ホームボタンコンポーネント */}
      <div>
        <HomeButton />

        <div>
          <PlayerCard name={player1.name} playerImg={player1.playerImg} />
          <PlayerCard name={player1.name} playerImg={player1.playerImg} />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
