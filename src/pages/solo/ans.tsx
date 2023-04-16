import { Background } from '@/components/elements/Background';
import HomeButton from '@/components/elements/HomeButton';
import AnsQuizButton from '@/components/game/AnsQuizButton';
import AnswerCard from '@/components/game/AnswerCard';
import ItemNameCard from '@/components/game/ItemNameCard';
import { Title } from '@/components/index/Title';
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
      <HomeButton />
      <span style={styles.titleWrapper}>
        <Title canBounding={true} />
      </span>
      <div style={styles.wrapper}>
        {/* 左側 */}
        <div style={styles.leftWrapper}>
          <ItemNameCard />
          <div style={styles.itemImageWrapper}>
            {item[crrQuizNum] && (
              <Image
                src={item[crrQuizNum].images[0].imageUrl!}
                alt={item[crrQuizNum].quiz}
                width={400}
                height={400}
                style={{
                  boxShadow: "0 0 15px rgb(199,81,250)"
                }}
              />
            )}
          </div>
        </div>

        {/* 右側 */}
        <div style={styles.rightWrapper}>
          <AnswerCard />
          <AnsQuizButton />
        </div>
      </div>
      <Background selected='rgb(199, 81, 250)' />
    </div>
  );
};

export default Ans;

const styles: Styles = {
  container: {
    margin: '50px 0',
    overflowX: 'hidden'

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
