import { timeLimit } from '@/store/atoms';
import { Styles } from '@/types/Styles';
import { useRecoilState } from 'recoil';

const GameTimeCard = () => {
  const [time, setTime] = useRecoilState(timeLimit);
  return (
    <div style={styles.container}>
      <h2>TIME LIMIT</h2>
      <h2>{time}</h2>
    </div>
  );
};

export default GameTimeCard;

const styles: Styles = {
  container: {
    minHeight: '150px',
    width: '100%',
    border: '2px solid #000',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
