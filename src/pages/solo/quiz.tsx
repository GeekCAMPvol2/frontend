import GameTimeCard from '@/components/game/GameTimeCard';
import ItemNameCard from '@/components/game/ItemNameCard';
import KeyPadCard from '@/components/game/KeyPadCard';
import AnsQuizButton from '@/components/game/AnsQuizButton';
import {
  ansQuizState,
  itemData,
  keyPadNumState,
} from '@/store/atoms';
import { Styles } from '@/types/Styles';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getItemData } from '../api/game';

const Quiz = () => {
  const [item, setItem] = useRecoilState(itemData);

  const [ansQuizUrl, setAnsQuizUrl] =
    useRecoilState(ansQuizState);

  const [keyPadNum, setKeyPadNum] =
    useRecoilState(keyPadNumState);

  // Todo:問題が始まったらAPI取得して新しい商品をセットする + タイマーをセットする
  useEffect(() => {
    const fetchData = async () => {
      const resultData = await getItemData();
      setItem(resultData);
      setKeyPadNum(0);
      setAnsQuizUrl('/solo/ans');
    };
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.titleWrapper}>Price Quest</h1>
      <div style={styles.wrapper}>
        {/* 左側 */}
        <div style={styles.leftWrapper}>
          <ItemNameCard />
          {item.images[0].imageUrl !== undefined && (
            <div style={styles.itemImageWrapper}>
              <Image
                src={item.images[0].imageUrl}
                alt={item.quiz}
                width={400}
                height={400}
              />
            </div>
          )}
        </div>

        {/* 右側 */}
        <div style={styles.rightWrapper}>
          <GameTimeCard />
          <KeyPadCard />
          <AnsQuizButton />
        </div>
      </div>
    </div>
  );
};

export default Quiz;

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
