import { getItemData } from '@/pages/api/game';
import {
  ansQuizState,
  crrQuizNumState,
  getItemNumState,
  itemData,
  keyPadNumArrState,
  keyPadNumState,
} from '@/store/atoms';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { hoverTapRed } from '@/animations/variants';

const styles = {
  container: css`
    display: flex;
    justify-content: center;
  `,
  button: css`
    color: rgb(199, 81, 250);
    border: 3px solid rgb(199, 81, 250);
    box-shadow: 0 0 5px rgb(199, 81, 250);
    text-shadow: 0 0 5px rgb(199, 81, 250);
    background-color: rgb(255 255 255 /0);
    border-radius: 50px;
    width: 80%;
    padding: 10px;
    font-size: 30px;
    margin-top: 50px;
  `,
};

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
    // Todo: クイズを解いたときの処理
  };

  return (
    <div css={styles.container}>
      {/* 最終問題の解答画面の場合 */}
      {/* <button css={styles.button}>FINISH</button> */}

      {/* クイズ画面の場合 */}
      <motion.button
        css={styles.button}
        onClick={() => handleSubmit()}
        {...hoverTapRed}
      >
        SUBMIT
      </motion.button>

      {/* 最終問題以外の解答画面の場合 */}
      {/* <motion.button
        css={styles.button}
        onClick={() =>
          setCrrQuizNum((prevNum) => prevNum + 1)
        }
        {...hoverTapRed}
      >
        NEXT
      </motion.button> */}
    </div>
  );
};

export default AnsQuizButton;
