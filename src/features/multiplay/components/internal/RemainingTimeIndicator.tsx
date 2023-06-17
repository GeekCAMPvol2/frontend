import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

export type RemainingTimeIndicatorProps = {
  dueDate: Date;
};

const styles = {
  container: css`
    min-height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
  `,
  timeWrapper: css`
    text-align: left;
    font-weight: bold;
    font-size: 26px;
    padding-left: 50px;
    padding-top: 10px;
    color: rgb(199 81 250);
    text-shadow: 0 0 5px rgb(199 81 250);
  `,
  time: css`
    text-align: right;
    padding-right: 30px;
    font-size: 50px;
  `,
  timeSec: css`
    margin-left: 20px;
    font-size: 20px;
  `,
};

export const RemainingTimeIndicator = (
  props: RemainingTimeIndicatorProps
) => {
  const dueDateMillis = props.dueDate.getTime();

  const [remainingSeconds, setRemainingSeconds] = useState<
    number | undefined
  >();

  useEffect(() => {
    const timer = setInterval(() => {
      const millis = dueDateMillis - Date.now();
      const seconds = Math.ceil(millis / 1000);
      setRemainingSeconds(seconds);
    }, 250);
    return () => clearInterval(timer);
  }, [dueDateMillis]);

  return (
    <div css={styles.container}>
      <div css={styles.timeWrapper}>Remain</div>
      <div css={styles.time}>
        {remainingSeconds}
        <span css={styles.timeSec}>sec</span>
      </div>
    </div>
  );
};
