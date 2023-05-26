import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import { css } from '@emotion/react';

const styles = {
  button: css`
    position: absolute;
    display: flex;
    justify-content: center;
    gap: 10px;
    color: white;
    z-index: 10;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 400px;
    padding: 10px 20px;
    margin: 50px;
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px #fff;
    }
  `,
};

const HomeButton = () => {
  return (
    <Link href={'/'}>
      <button css={styles.button}>
        <HomeIcon />
        ホーム
      </button>
    </Link>
  );
};

export default HomeButton;
