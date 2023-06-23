import styles from '@/styles/background.module.css';

type Props = {
  selected: string;
};

export const Background = (props: Props) => {
  const { selected } = props;

  return (
    <>
      <div
        className={
          selected == 'rgb(199, 81, 250)'
            ? `${styles.background}`
            : selected == `rgb(18, 255, 34)`
            ? `${styles.background} ${styles.type3}`
            : `${styles.background} ${styles.type2}`
        }
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};
