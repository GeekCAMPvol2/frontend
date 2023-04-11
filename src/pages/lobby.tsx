import HomeButton from '@/components/elements/HomeButton';
import { LobbyButton } from '@/components/lobby/LobbyButton';
import { PlayerCard } from '@/components/lobby/PlayerCard';
import { Styles } from '@/types/Styles';

const Lobby = () => {

  const player1 = { name: "aaa", playerImg: "/flower2.jpg" }

  return (
    <div>
      {/* ホームボタンコンポーネント */}
      <div>
        <HomeButton />
        <h1 style={styles.title}>PriceQuest</h1>
        <div style={styles.playerContainer}>
          <PlayerCard name={player1.name} playerImg={player1.playerImg} />
          <PlayerCard name={player1.name} playerImg={player1.playerImg} />
        </div>

        <div style={styles.buttonContainer}>
          <LobbyButton name='URLをコピー' onClick={() => { }} />
          <LobbyButton name='プレイ！' onClick={() => { }} />
        </div>
      </div>
    </div>
  );
};
const styles: Styles = {
  title: {
    textAlign: "center"
  },

  playerContainer: {
    position: "absolute",
    top: 300,
    width: "100%",
    display: "flex",
    justifyContent: "center"
    // width: 300,
    // margin: "0 auto"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
  }
}


export default Lobby;
