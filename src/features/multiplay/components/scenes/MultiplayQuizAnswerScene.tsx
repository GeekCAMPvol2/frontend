import { css } from '@emotion/react';
import Image from 'next/image';
import { useMemo } from 'react';
import { Background } from '@/components/elements/Background';
import { Title } from '@/components/elements/Title';
import {
  MultiplayRoomInQuizAnswer,
  getCurrentQuestionAnswersByPlayer,
} from '@/features/multiplay/model';
import { AnswerCard } from '../internal/AnswerCard';
import { LeaveButton } from '../internal/LeaveButton';

export type MultiplayQuizAnswerSceneProps = {
  room: MultiplayRoomInQuizAnswer;
  goBackFromMultiplay: () => void;
};

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
    height: 500px;
    object-fit: contain;
  `,

  rightContainer: css`
    flex: 2;
  `,
};

export const MultiplayQuizAnswerScene = (
  props: MultiplayQuizAnswerSceneProps
) => {
  const { room, goBackFromMultiplay } = props;
  const { roomId, members, questions } = room;
  const currentQ = questions[room.currentQuestionIndex];

  const currentQAnswerByPlayer = useMemo(
    () => getCurrentQuestionAnswersByPlayer(room),
    [room]
  );

  return (
    <div>
      <LeaveButton {...{ roomId, goBackFromMultiplay }} />
      <Background selected={'rgb(0, 225, 255)'} />
      <Title />
      <div css={styles.container}>
        {/* <HomeButton /> */}
        {/* 左側 */}
        <div css={styles.leftContainer}>
          <div css={styles.productTitleWrapper}>
            {/* 商品名 */}
            <h2>Name</h2>
            <h2 css={styles.productTitle}>
              {currentQ.productTitle}
            </h2>
            <h2>{currentQ.productPrice}円</h2>
          </div>
          <div css={styles.productImageWrapper}>
            {/* 商品画像 */}
            <Image
              css={styles.productImage}
              src={currentQ.productImageUrl}
              alt={currentQ.productTitle}
              width={100}
              height={100}
            />
          </div>
        </div>
        {/* 右側 */}
        <div css={styles.rightContainer}>
          <AnswerCard
            players={members}
            correctPrice={currentQ.productPrice}
            answersByPlayer={currentQAnswerByPlayer}
          />
        </div>
      </div>
    </div>
  );
};
