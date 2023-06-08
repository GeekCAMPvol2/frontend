import { css } from '@emotion/react';

const styles = {
  container: css`
    font-size: 3rem;
    text-align: center;
    color: white;
    font-weight: 900;
  `,
};

const NowQuizNumber = () => {
  return (
    <p
      css={styles.container}
    >{`${'現在の問題番号'}/${'5'}`}</p>
  );
};

export default NowQuizNumber;
