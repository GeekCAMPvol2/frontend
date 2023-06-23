import { css } from '@emotion/react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export type PlayerCountIndicatorProps = {
  answeredPlayerCount: number;
  playerCount: number;
};

const styles = {
  container: css`
    background-color: transparent;
    border-radius: 10rem;
    border: 2px solid white;
    font-size: 2rem;
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    align-items: space-between;
    gap: 10px;
    padding: 10px 20px;
  `,
};

export const PlayerCountIndicator = (
  props: PlayerCountIndicatorProps
) => {
  const { answeredPlayerCount, playerCount } = props;
  return (
    <div>
      <p css={styles.container}>
        <i>
          <CheckCircleIcon />
        </i>
        <span>{`${answeredPlayerCount}/${playerCount}`}</span>
        <span></span>
      </p>
    </div>
  );
};
