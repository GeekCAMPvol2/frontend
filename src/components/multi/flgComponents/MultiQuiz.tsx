import { css } from '@emotion/react';
import Image from 'next/image';
import GameTimeCard from '../GameTimeCard';
import KeyPadCard from '../KeyPadCard';
import AnsQuizButton from '../AnsQuizButton';

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
  `,
  leftContainer: css`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 50px;
  `,
  productTitleWrapper: css``,
  productTitle: css``,

  productImageWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
  `,
  productImage: css`
    width: 100%;
    height: 300px;
    object-fit: contain;
  `,

  rightContainer: css`
    flex: 2;
  `,
};

const MultiQuiz = () => {
  return (
    <div css={styles.container}>
      {/* 左側 */}
      <div css={styles.leftContainer}>
        <div css={styles.productTitleWrapper}>
          {/* 商品名 */}
          <h2>Name</h2>
          <h2 css={styles.productTitle}>
            商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名
          </h2>
        </div>
        <div css={styles.productImageWrapper}>
          {/* 商品画像 */}
          <Image
            css={styles.productImage}
            src={'/flower2.jpg'}
            alt={'テスト画像'}
            width={100}
            height={100}
          />
        </div>
      </div>
      {/* 右側 */}
      <div css={styles.rightContainer}>
        <GameTimeCard />
        {/* <KeyPadCard />
        <AnsQuizButton /> */}
      </div>
    </div>
  );
};

export default MultiQuiz;
