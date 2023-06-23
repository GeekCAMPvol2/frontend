import { Background } from '@/components/elements/Background';
import { Title } from '@/components/elements/Title';
import { css } from '@emotion/react';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { submitAnswer } from '@/features/multiplay/clients/room';
import {
  MultiplayRoomInQuizSubmit,
  getCurrentQuestionAnswersByPlayer,
} from '@/features/multiplay/model';
import { KeypadCard } from '../internal/KeypadCard';
import { LeaveButton } from '../internal/LeaveButton';
import { PlayerCountIndicator } from '../internal/PlayerCountIndicator';
import { QuestionIndexIndicator } from '../internal/QuestionIndexIndicator';
import { QuizAnswerButton } from '../internal/QuizAnswerButton';
import { RemainingTimeIndicator } from '../internal/RemainingTimeIndicator';

export type MultiplayQuizSubmitSceneProps = {
  room: MultiplayRoomInQuizSubmit;
  goBackFromMultiplay: () => void;
};

const styles = {
  absContainer: css`
    position: absolute;
    top: 50px;
    left: 50px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  `,
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

export const MultiplayQuizSubmitScene = (
  props: MultiplayQuizSubmitSceneProps
) => {
  const { room, goBackFromMultiplay } = props;
  const { roomId } = room;
  const {
    members,
    questionCount,
    currentQuestionIndex,
    questions,
    nextTransitionEstimatedDate,
  } = room;
  const currentQ = questions[currentQuestionIndex];

  const answeredPlayerCount = useMemo(
    () => getCurrentQuestionAnswersByPlayer(room).size,
    [room]
  );

  const [inputPrice, setInputPrice] = useState(0);

  const handleKeypadValueUpdate = useCallback(
    (value: number) => setInputPrice(value),
    []
  );

  const handleSubmit = () => {
    submitAnswer(roomId, currentQuestionIndex, inputPrice);
  };

  return (
    <div>
      <LeaveButton {...{ roomId, goBackFromMultiplay }} />
      <Background selected={'rgb(0, 225, 255)'} />
      <Title />
      <div css={styles.container}>
        <div css={styles.absContainer}>
          {/* <HomeButton /> */}
          <QuestionIndexIndicator
            {...{ currentQuestionIndex, questionCount }}
          />
          <PlayerCountIndicator
            answeredPlayerCount={answeredPlayerCount}
            playerCount={members.length}
          />
        </div>
        {/* 左側 */}
        <div css={styles.leftContainer}>
          <div css={styles.productTitleWrapper}>
            {/* 商品名 */}
            <h2>Name</h2>
            <h2 css={styles.productTitle}>
              {currentQ.productTitle}
            </h2>
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
          <RemainingTimeIndicator
            dueDate={nextTransitionEstimatedDate}
          />
          <KeypadCard
            onValueUpdate={handleKeypadValueUpdate}
          />
          <QuizAnswerButton onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
