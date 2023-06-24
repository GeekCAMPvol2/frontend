import { UserImg } from '../UserImg';
import { css } from '@emotion/react';

type Props = {
  name: string;
  checked?: boolean;
};

export const PlayerCard = (props: Props) => {
  const { name, checked = false } = props;

  return (
    <div css={styles.container}>
      {checked ? (
        <div css={styles.imageChecked}>
          <span css={styles.checkMark} />
        </div>
      ) : (
        <></>
      )}
      <div css={styles.imageWrapper}>
        <UserImg userId={name} />
      </div>

      <h2 css={styles.playerName}>{name}</h2>
    </div>
  );
};

const styles = {
  container: css`
    position: relative;
    text-align: center;
  `,
  imageChecked: css`
    position: absolute;
    top: 0;
    width: 150px;
    height: 150px;
    background-color: #00000067;
    border-radius: 100%;
    margin: 0 50px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  checkMark: css`
    display: block;
    position: absolute;
    width: 80px;
    height: 40px;
    border-left: 10px solid #ffffffb9;
    border-bottom: 10px solid #ffffffb9;
    transform: rotate(-45deg);
  `,
  imageWrapper: css`
    overflow: hidden;
    width: 150px;
    height: 150px;
    background-color: #00000067;
    border-radius: 100%;
    margin: 0 50px;
    margin-bottom: 20px;
  `,
  playerName: css`
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
  `,
};
