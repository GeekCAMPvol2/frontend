import Link from 'next/link';
import React from 'react';

const HomeButton = () => {
  return (
    <Link href={'/'}>
      <button style={styles.button}>ホームへ</button>
    </Link>
  );
};

export default HomeButton;

const styles = {
  button: {
    color: 'black',
    backgroundColor: 'white',
  },
};
