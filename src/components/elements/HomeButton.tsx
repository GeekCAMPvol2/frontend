import Link from 'next/link';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Styles } from '@/types/Styles';

const HomeButton = () => {
  return (
    <Link href={'/'}>
      <button style={styles.button}>
        <HomeIcon />
        ホーム
      </button>
    </Link>
  );
};

export default HomeButton;

const styles: Styles = {
  button: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    border: '2px solid white',
    borderRadius: 400,
    padding: '10px 20px',
    margin: '50px',
  },
};
