import { getItemData } from '@/pages/api/game';
import {
  ansQuizState,
  crrQuizNumState,
  getItemNumState,
  itemData,
  keyPadNumArrState,
  keyPadNumState,
} from '@/store/atoms';
import { Styles } from '@/types/Styles';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { hoverTapRed } from '@/animations/variants';
import { useRouter } from 'next/router';

const AnsQuizButton = () => {
  const [ansQuizUrl, setAnsQuizUrl] =
    useRecoilState(ansQuizState);
  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);
  const [getItemNum, setGetItemNum] =
    useRecoilState(getItemNumState);
  const [item, setItem] = useRecoilState(itemData);
  const [keyPadNumArr, setKeyPadNumArr] = useRecoilState(
    keyPadNumArrState
  );
  const [keyPadNum, setKeyPadNum] =
    useRecoilState(keyPadNumState);

  const router = useRouter();

  const handleSubmit = async () => {
    setKeyPadNumArr([
      ...keyPadNumArr,
      item[crrQuizNum].answer - keyPadNum,
    ]);
    router.push('/solo/ans');
  };

  const handleNext = () => {
    router.push(ansQuizUrl);
    // setCrrQuizNum((prev) => prev + 1);
  };

  return (
    <>
      {crrQuizNum === item.length - 1 &&
      ansQuizUrl === '/solo/quiz' ? (
        <Link href={'/solo/fin'}>
          <button style={styles.button}>FINISH</button>
        </Link>
      ) : (
        // <Link href={ansQuizUrl}>
        <>
          {ansQuizUrl === '/solo/ans' ? (
            <motion.button
              style={styles.button}
              onClick={() => handleSubmit()}
              {...hoverTapRed}
            >
              SUBMIT
            </motion.button>
          ) : (
            <motion.button
              style={styles.button}
              {...hoverTapRed}
              onClick={handleNext}
            >
              NEXT
            </motion.button>
          )}
        </>
        // </Link>
      )}
    </>
  );
};

export default AnsQuizButton;

const styles: Styles = {
  button: {
    color: 'rgb(199, 81, 250)',
    border: '3px solid rgb(199, 81, 250)',
    boxShadow: '0 0 5px rgb(199, 81, 250)',
    textShadow: '0 0 5px rgb(199, 81, 250)',
    backgroundColor: 'rgb(255 255 255 /0)',
    borderRadius: '50px',
    width: '100%',
    padding: '10px',
    fontSize: '30px',
    marginBottom: 10,
  },
};
