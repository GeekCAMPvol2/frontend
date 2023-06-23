import { css } from '@emotion/react';

export type QuestionIndexIndicatorProps = {
  currentQuestionIndex: number;
  questionCount: number;
};

const styles = {
  container: css`
    font-size: 3rem;
    text-align: center;
    color: white;
    font-weight: 900;
  `,
};

export const QuestionIndexIndicator = (
  props: QuestionIndexIndicatorProps
) => {
  const { currentQuestionIndex, questionCount } = props;
  return (
    <p
      css={styles.container}
    >{`${currentQuestionIndex}/${questionCount}`}</p>
  );
};
