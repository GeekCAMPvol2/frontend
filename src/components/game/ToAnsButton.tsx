import Link from 'next/link';
import React from 'react';

const ToAnsButton = () => {
  return (
    <Link href={'/solo/quiz'}>
      <button style={styles.button}>SUBMIT</button>
    </Link>
  );
};

export default ToAnsButton;

const styles = {
  button: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '10px',
    width: '100%',
    padding: '10px',
    fontSize: '30px',
  },
};
