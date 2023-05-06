import { Styles } from '@/types/Styles';

export type GameTimeCardProps = {
  remainMillis: number;
};

const GameTimeCard = (props: GameTimeCardProps) => {
  const { remainMillis } = props;

  return (
    <div style={styles.container}>
      <div
        style={{
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: 26,
          paddingLeft: 20,
          paddingTop: 10,
          color: 'rgb(199 81 250)',
          textShadow: '0 0 5px rgb(199 81 250)',
        }}
      >
        Remain
      </div>
      <div
        style={{
          textAlign: 'right',
          paddingRight: 30,
          fontSize: 50,
        }}
      >
        {Math.ceil(remainMillis / 1000)}
        <span
          style={{
            marginLeft: 20,
            fontSize: 20,
          }}
        >
          sec
        </span>
      </div>
    </div>
  );
};

export default GameTimeCard;

const styles: Styles = {
  container: {
    minHeight: '150px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
};
