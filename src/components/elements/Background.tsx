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
