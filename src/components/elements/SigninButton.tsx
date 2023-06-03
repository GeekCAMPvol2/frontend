import { Styles } from '@/types/Styles';
import { motion } from 'framer-motion';
import { signInPopUp } from '@/animations/variants';

type Props = {
  name: string;
  disabled?: boolean;
  onClick: () => void;
  onHoverStart: () => void;
};

export const SigninButton = (props: Props) => {
  const {
    name,
    onClick,
    onHoverStart,
    disabled = false,
  } = props;

  return (
    <motion.button
      {...signInPopUp}
      style={{
        ...styles.button,
      }}
      onHoverStart={onHoverStart}
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
    backgroundColor: 'transparent',
    border: '3px solid #fff',
    borderRadius: 400,
    opacity: 0.8,
    marginLeft: 20,
    marginTop: 30,
    fontSize: 30,
  },
};
