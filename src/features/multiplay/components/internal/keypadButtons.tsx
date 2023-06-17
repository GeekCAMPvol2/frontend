import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { hoverTapKeyPad } from '@/animations/variants';
import { Styles } from '@/types/Styles';

const styles: Styles = {
  button: {
    width: 55,
    height: 55,
    fontSize: 30,
    color: '#000',
    margin: '0 auto',
    marginBottom: 8,
    marginTop: 8,
    borderRadius: '50%',
    userSelect: 'none',
  },
};

export type KeypadButtonProps = {
  label: string;
  onClick: () => void;
};

export const KeypadButton = (props: KeypadButtonProps) => (
  <motion.button
    {...hoverTapKeyPad}
    style={styles.button}
    onClick={props.onClick}
  >
    {props.label}
  </motion.button>
);

export type KeypadNumButtonProps = {
  num: number | string;
  onClick: (buttonNumberStr: string) => void;
};

export const KeypadNumButton = (
  props: KeypadNumButtonProps
) => {
  const { num, onClick } = props;
  const numStr = `${num}`;
  const handleClick = useCallback(() => {
    onClick(numStr);
  }, [num, onClick]);

  return (
    <KeypadButton label={numStr} onClick={handleClick} />
  );
};
