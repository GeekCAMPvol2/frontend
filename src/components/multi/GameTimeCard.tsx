import {
  crrQuizNumState,
  getItemNumState,
  itemData,
  keyPadNumArrState,
  keyPadNumState,
  timeLimit,
} from '@/store/atoms';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { getItemData } from '@/pages/api/game';
import { css } from '@emotion/react';

const styles = {
  container: css`
    min-height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
  `,
  timeWrapper: css`
    text-align: left;
    font-weight: bold;
    font-size: 26px;
    padding-left: 50px;
    padding-top: 10px;
    color: rgb(199 81 250);
    text-shadow: 0 0 5px rgb(199 81 250);
  `,
  time: css`
    text-align: right;
    padding-right: 30px;
    font-size: 50px;
  `,
  timeSec: css`
    margin-left: 20px;
    font-size: 20px;
  `,
};

const GameTimeCard = () => {
  const [time, setTime] = useRecoilState(timeLimit);
  const router = useRouter();

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

  // Todo: タイマーの処理
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setTime((prevTime) => prevTime - 1);
  //     }, 1000);
  //     return () => clearInterval(intervalId);
  //   }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       if (time <= 0) {
  //         if (crrQuizNum < getItemNum - 1) {
  //           const resultData = await getItemData();
  //           setItem([...item, resultData]);
  //         }
  //         setKeyPadNumArr([
  //           ...keyPadNumArr,
  //           item[crrQuizNum].answer - keyPadNum,
  //         ]);
  //         // router.push('/solo/ans');
  //       }
  //     };
  //     fetchData();
  //   }, [time]);

  return (
    <div css={styles.container}>
      <div css={styles.timeWrapper}>Remain</div>
      <div css={styles.time}>
        {time}
        <span css={styles.timeSec}>sec</span>
      </div>
    </div>
  );
};

export default GameTimeCard;
