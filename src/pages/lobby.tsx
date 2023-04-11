import HomeButton from '@/components/elements/HomeButton';
import { PlayerCard } from '@/components/lobby/PlayerCard';
import { Styles } from '@/types/Styles';

const Lobby = () => {

  const player1 = { name: "aaa", playerImg: "/flower2.jpg" }

  return (
    <div>
      {/* ホームボタンコンポーネント */}
      <div>
        <HomeButton />

        <div style={styles.playerContainer}>
          <PlayerCard name={player1.name} playerImg={player1.playerImg} />
          <PlayerCard name={player1.name} playerImg={player1.playerImg} />
        </div>
      </div>
    </div>
  );
};
const styles: Styles = {
  playerContainer: {
    display: "flex",
    justifyContent:"center"
    // width: 300,
    // margin: "0 auto"
  }
}


export default Lobby;
