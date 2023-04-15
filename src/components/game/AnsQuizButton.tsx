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
import React from 'react';
import { useRecoilState } from 'recoil';
import { motion } from "framer-motion"

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

  const handleSubmit = async () => {
    if (crrQuizNum < getItemNum - 1) {
      const resultData = await getItemData();
      setItem([...item, resultData]);
    }
    setKeyPadNumArr([
      ...keyPadNumArr,
      item[crrQuizNum].answer - keyPadNum,
    ]);
  };

  return (
    <>
      {crrQuizNum === getItemNum - 1 &&
        ansQuizUrl === '/solo/quiz' ? (
        <Link href={'/solo/fin'}>
          <button style={styles.button}>FINISH</button>
        </Link>
      ) : (
        <Link href={ansQuizUrl}>
          {ansQuizUrl === '/solo/ans' ? (
            <motion.button
              style={styles.button}
              onClick={() => handleSubmit()}

              whileHover={{
                scale: 1.1,
                backgroundColor: "rgb(199, 81, 250)",
                color: "white"
              }}
              whileTap={{
                scale: 0.9,
                backgroundColor: "rgb(199, 81, 250)",
                color: "white"
              }}
            >
              SUBMIT
            </motion.button>
          ) : (
            <motion.button
              style={styles.button}
              onClick={() =>
                setCrrQuizNum((prevNum) => prevNum + 1)
              }

              whileHover={{
                scale: 1.1,
                backgroundColor: "rgb(199, 81, 250)",
                color: "white"
              }}
              whileTap={{
                scale: 0.9,
                backgroundColor: "rgb(199, 81, 250)",
                color: "white"
              }}
            >
              NEXT
            </motion.button>
          )}
        </Link>
      )}
    </>
  );
};

export default AnsQuizButton;

const styles: Styles = {
  button: {
    color: 'rgb(199, 81, 250)',
    border: "3px solid rgb(199, 81, 250)",
    boxShadow: "0 0 5px rgb(199, 81, 250)",
    textShadow: "0 0 5px rgb(199, 81, 250)",
    backgroundColor: 'rgb(255 255 255 /0)',
    borderRadius: '50px',
    width: '100%',
    padding: '10px',
    fontSize: '30px',
    marginBottom: 10,
  },
};
