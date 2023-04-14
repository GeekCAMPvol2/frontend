import {
  ansQuizState,
  crrQuizNumState,
  getItemNumState,
} from '@/store/atoms';
import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';

const AnsQuizButton = () => {
  const [ansQuizUrl, setAnsQuizUrl] =
    useRecoilState(ansQuizState);
  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);
  const [getItemNum, setGetItemNum] =
    useRecoilState(getItemNumState);

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
            <button style={styles.button}>SUBMIT</button>
          ) : (
            <button
              style={styles.button}
              onClick={() =>
                setCrrQuizNum((prevNum) => prevNum + 1)
              }
            >
              NEXT
            </button>
          )}
        </Link>
      )}
    </>
  );
};

export default AnsQuizButton;

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
