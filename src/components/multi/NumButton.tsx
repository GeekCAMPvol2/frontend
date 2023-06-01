import { Styles } from '@/types/Styles';
import { motion } from 'framer-motion';
import { hoverTapKeyPad } from '@/animations/variants';

type Props = {
  number: number | string;
  onClick: () => void;
};

export const NumButton = (props: Props) => {
  const { number, onClick } = props;

  return (
    <motion.button
      {...hoverTapKeyPad}
      style={styles.button}
      onClick={onClick}
    >
      {number}
    </motion.button>
  );
};

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
