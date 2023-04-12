import { timeLimit } from '@/store/atoms';
import { Styles } from '@/types/Styles';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const GameTimeCard = () => {
  const [time, setTime] = useRecoilState(timeLimit);
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      router.push('/solo/ans');
    }
  }, [time]);

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
