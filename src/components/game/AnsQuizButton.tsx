import { getItemData } from '@/pages/api/game';
import {
  ansQuizState,
  crrQuizNumState,
  getItemNumState,
  itemData,
  keyPadNumArrState,
  keyPadNumState,
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
            <button
              style={styles.button}
              onClick={() => handleSubmit()}
            >
              SUBMIT
            </button>
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
