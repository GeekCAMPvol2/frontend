import { getItemData } from '@/pages/api/game';
import {
  crrQuizNumState,
  itemData,
  keyPadNumArrState,
} from '@/store/atoms';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { motion } from "framer-motion"
import { Styles } from '@/types/Styles';

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
    <motion.button
      style={styles.button}
      onClick={() => handlePlayAgain()}
      whileHover={{
        scale: 1.1,
        width: '100%',
        border: "2px solid rgb(199, 81, 250)",
        backgroundColor: "rgb(199, 81, 250)",
        boxShadow: "0 0 15px rgb(199, 81, 250)"
      }}

    >
      PLAY AGAIN
    </motion.button>
  );
};

export default PlayAgainButton;

const styles: Styles = {
  button: {
    color: 'white',
    border: "2px solid #fff",
    backgroundColor: 'rgb(0 0 0 /0)',
    borderRadius: '10px',
    width: '50%',
    margin: "0 auto",
    marginBottom: 10,
    padding: '10px',
    fontSize: '30px',
  },
};
