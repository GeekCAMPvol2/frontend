import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
import { type } from 'os';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

type Props = {
  handleClose: () => void;
  text: string;
};

const Modal = (props: Props) => {
  const { handleClose, text } = props;
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal orange-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>wbuifbuob</p>
        <p>wbuifbuob</p>
        <p>wbuifbuob</p>
        <p>wbuifbuob</p>
        <p>wbuifbuob</p>
        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
