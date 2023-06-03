import { HTMLMotionProps, Variants } from 'framer-motion';

// exitのアニメーションがある場合は、変数名の先頭にpageをつける

// 横から流れるアニメーション: ホームの楽天の利用規約に使用
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

// 回転しならがら出現するアニメーション: signInボタンに使用
export const signInPopUp: HTMLMotionProps<'button'> = {
  animate: {
    x: 0,
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      duration: 0.3,
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
    backgroundColor: 'rgb(255, 255, 255)',
    color: '#1e1e68',
    border: `5px solid rgb(255, 255, 255)`,
    boxShadow: `0px 0px 15px rgb(255, 255, 255)`,
  },
  whileTap: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      duration: 0.3,
    },
  },
};

// 回転しならがら出現するアニメーション: ホームのゲーム開始ボタンに使用
export const spinPopUp = (
  delay: number,
  color: string
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

// 永遠に振動するアニメーション: ホームのタイトルに使用
export const infiniteVibration: Variants = {
  visible: {
    scale: [1.03, 1, 1, 1, 1, 1, 1],
    transition: {
      repeat: Infinity,
      duration: 0.5,
    },
  },
};

// ポップアップアニメーション: ホーム・問題のページに使用
export const pagePopup: HTMLMotionProps<'div'> = {
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

// フェードインアニメーション: 解答のページに使用
export const pageFadeInUp: HTMLMotionProps<'div'> = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
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

// 円状に波動するアニメーション: ゲーム開始時のカウントダウンに使用
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

export const hoverTapLink: HTMLMotionProps<'a'> = {
  whileHover: {
    scale: 1.3,
  },
  whileTap: {
    scale: 1,
  },
};

export const hoverTapRed: HTMLMotionProps<'button'> = {
  whileHover: {
    scale: 1.1,
    backgroundColor: 'rgb(199, 81, 250)',
    color: 'white',
  },
  whileTap: {
    scale: 0.9,
    backgroundColor: 'rgb(199, 81, 250)',
    color: 'white',
  },
};

// export const hoverTapBlue: HTMLMotionProps<'button'> = {
//   whileHover: {
//     scale: 1.1,
//     backgroundColor: 'rgb(199, 81, 250)',
//     color: 'white',
//   },
//   whileTap: {
//     scale: 0.9,
//     backgroundColor: 'rgb(199, 81, 250)',
//     color: 'white',
//   },
// };

export const hoverTapKeyPad: HTMLMotionProps<'button'> = {
  whileHover: {
    scale: 1.1,
    borderRadius: '10%',
    boxShadow: '0 0 10px #fff',
  },
  whileTap: {
    scale: 0.9,
    borderRadius: '50%',
    rotate: 360,
  },
};

export const hoverRed: HTMLMotionProps<'button'> = {
  whileHover: {
    scale: 1.1,
    width: '100%',
    border: '2px solid rgb(199, 81, 250)',
    backgroundColor: 'rgb(199, 81, 250)',
    boxShadow: '0 0 15px rgb(199, 81, 250)',
  },
};
