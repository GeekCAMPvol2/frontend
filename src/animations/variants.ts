import { HTMLMotionProps, Variants } from 'framer-motion';

export const SideFlowing: HTMLMotionProps<'a'> = {
  animate: {
    x: 0,
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      duration: 0.3,
      delay: 1,
    },
  },
  initial: {
    scale: 0,
    x: -650,
  },
};

export const spinPopUp = (
  delay: number,
  color: string,
  onHoverStart: () => void
): HTMLMotionProps<'button'> => {
  return {
    animate: {
      x: 0,
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        duration: 0.3,
        delay: delay,
      },
    },
    initial: {
      scale: 0,
      rotate: 200,
    },
    exit: {},
    whileHover: {
      opacity: 1,
      scale: 1.1,
      backgroundColor: color,
      color: '#fff',
      border: `5px solid ${color}`,
      boxShadow: `0px 0px 15px ${color}`,
    },
    onHoverStart: onHoverStart,
    whileTap: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        duration: 0.3,
        delay: delay,
      },
    },
  };
};

export const infiniteVibration: Variants = {
  visible: {
    scale: [1.03, 1, 1, 1, 1, 1, 1],
    transition: {
      repeat: Infinity,
      duration: 0.5,
    },
  },
};

export const pagePopUp: HTMLMotionProps<'main'> = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
  transition: {
    type: 'spring',
    stiffness: 150,
    duration: 0.2,
  },
  exit: {
    scale: 0,
  },
};

export const circularWaves: HTMLMotionProps<'div'> = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.1,
    opacity: [0, 1],
  },
  transition: {
    duration: 0.5,
    repeatDelay: 0.5,
    repeat: 5,
  },
};
