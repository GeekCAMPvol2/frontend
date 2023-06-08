import { Background } from '@/components/elements/Background';
import { Title } from '@/components/elements/Title';
import MultiAns from '@/components/multi/flgComponents/MultiAns';
import MultiFin from '@/components/multi/flgComponents/MultiFin';
import MultiQuiz from '@/components/multi/flgComponents/MultiQuiz';
import { useState } from 'react';
import { css } from '@emotion/react';

const styles = {
  titleWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
  `,
};

const TestView = () => {
  const [multiGameStateFlg, setMultiGameStateFlg] =
    useState('quiz');
  return (
    <>
      <Background selected={'rgb(0, 225, 255)'} />
      <span css={styles.titleWrapper}>
        <Title />
      </span>
      {/* クイズ画面 */}
      {multiGameStateFlg == 'quiz' && <MultiQuiz />}
      {/* 解答画面 */}
      {multiGameStateFlg == 'ans' && <MultiAns />}
      {/* 最終結果画面 */}
      {multiGameStateFlg == 'fin' && <MultiFin />}
    </>
  );
};

export default TestView;
