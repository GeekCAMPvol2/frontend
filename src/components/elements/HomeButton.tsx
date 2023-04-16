import Link from 'next/link';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Styles } from '@/types/Styles';
import { motion } from 'framer-motion';

const HomeButton = () => {
  return (
    <Link href={'/'}>
      <motion.button style={styles.button}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 10px #fff",
        }}
      >
        <HomeIcon/>
        ホーム
      </motion.button>
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
    zIndex: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    border: '2px solid white',
    borderRadius: 400,
    padding: '10px 20px',
    margin: '50px',
  },
};
