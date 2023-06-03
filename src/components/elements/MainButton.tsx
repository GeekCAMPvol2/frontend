import { Styles } from '@/types/Styles';
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

export const MainButton = (props: Props) => {
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
      {...spinPopUp(delay, color)}
      onHoverStart={onHoverStart}
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
    cursor: 'pointer',
    height: 100,
    width: 500,
    color: '#fff',
    backgroundColor: 'rgb(5 0 0/0)',
    border: '5px solid #fff',
    borderRadius: 400,
    opacity: 0.8,
    margin: '0 auto',
    marginTop: 50,
    fontSize: 50,
  },
};
