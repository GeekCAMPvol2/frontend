import { Styles } from '@/types/Styles';
import React from 'react';
import { motion } from 'framer-motion';
import { spinPopUp } from '@/animations/variants';

type Props = {
  delay: number;
  color: string;
  name: string;
  disabled?: boolean;
  onClick: () => void;
  onHoverStart: () => void;
};

export const SigninButton = (props: Props) => {
  const {
    delay,
    color,
    name,
    onClick,
    onHoverStart,
    disabled = false,
  } = props;

  return (
    <motion.button
      {...spinPopUp(delay, color, onHoverStart)}
      style={{
        ...styles.button,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </motion.button>
  );
};

const styles: Styles = {
  button: {
    height: 60,
    width: 200,
    color: '#fff',
    backgroundColor: 'rgb(5 0 0/0)',
    border: '3px solid #fff',
    borderRadius: 400,
    opacity: 0.8,
    marginLeft: 20,
    marginTop: 30,
    fontSize: 30,
  },
};
