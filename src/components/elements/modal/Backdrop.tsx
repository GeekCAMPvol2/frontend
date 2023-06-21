import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Backdrop = (props: Props) => {
  const { children, onClick } = props;
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
