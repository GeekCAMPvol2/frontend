import { getItemData } from '@/pages/api/game';
import {
  crrQuizNumState,
  itemData,
  keyPadNumArrState,
} from '@/store/atoms';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

const PlayAgainButton = () => {
  const router = useRouter();
  const [item, setItem] = useRecoilState(itemData);

  const [keyPadNumArr, setKeyPadNumArr] = useRecoilState(
    keyPadNumArrState
  );

  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);

  const handlePlayAgain = async () => {
    setCrrQuizNum(0);
    const resultData = await getItemData();
    setItem([resultData]);
    setKeyPadNumArr([]);
    router.push('/solo/quiz');
  };
  return (
    <button
      style={styles.button}
      onClick={() => handlePlayAgain()}
    >
      PLAY AGAIN
    </button>
  );
};

export default PlayAgainButton;

const styles = {
  button: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '10px',
    width: '100%',
    padding: '10px',
    fontSize: '30px',
  },
};
