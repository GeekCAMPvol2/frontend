import AnsQuizButton from '@/components/game/AnsQuizButton';
import AnswerCard from '@/components/game/AnswerCard';
import ItemNameCard from '@/components/game/ItemNameCard';
import {
  ansQuizState,
  crrQuizNumState,
  itemData,
  timeLimit,
} from '@/store/atoms';
import { Styles } from '@/types/Styles';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const Ans = () => {
  const [item, setItem] = useRecoilState(itemData);

  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);

  const [time, setTime] = useRecoilState(timeLimit);
  const [ansQuizUrl, setAnsQuizUrl] =
    useRecoilState(ansQuizState);

  useEffect(() => {
    setTime(30);
    setAnsQuizUrl('/solo/quiz');
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.titleWrapper}>Price Quest</h1>
      <div style={styles.wrapper}>
        {/* 左側 */}
        <div style={styles.leftWrapper}>
          <ItemNameCard />
          <div style={styles.itemImageWrapper}>
            <Image
              src={item[crrQuizNum].images[0].imageUrl!}
              alt={item[crrQuizNum].quiz}
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* 右側 */}
        <div style={styles.rightWrapper}>
          <AnswerCard />
          <AnsQuizButton />
        </div>
      </div>
    </div>
  );
};

export default Ans;

const styles: Styles = {
  container: {
    margin: '50px 0',
  },
  titleWrapper: {
    textAlign: 'center',
  },
  wrapper: {
    width: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '50px',
  },
  leftWrapper: {
    flex: 3,
    textAlign: 'center',
  },
  itemImageWrapper: {
    border: '2px solid black',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '50px',
  },
};
