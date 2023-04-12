import { ansQuizState } from '@/store/atoms';
import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';

const AnsQuizButton = () => {
  const [ansQuizUrl, setAnsQuizUrl] =
    useRecoilState(ansQuizState);

  return (
    <Link href={ansQuizUrl}>
      <button style={styles.button}>SUBMIT</button>
    </Link>
  );
};

export default AnsQuizButton;

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
