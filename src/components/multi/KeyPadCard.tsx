import { css } from '@emotion/react';
import { NumButton } from './NumButton';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { keyPadNumState } from '@/store/atoms';

const styles = {
  container: css`
    text-align: center;
  `,
  input: css`
    width: 80%;
    font-size: 30px;
    text-align: left;
    text-shadow: 0 0 3px #fff;
    padding: 10px;
    padding-bottom: 2px;
    margin-bottom: 15px;
    border-bottom: 3px solid #fff;
    background-color: rgb(0 0 0 /0);
  `,
  keyPadWrapper: css`
    width: 220px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  `,
};

const KeyPadCard = () => {
  const [keyPadNum, setKeyPadNum] =
    useRecoilState(keyPadNumState);

  // 数字を入れる共通の関数
  const functionInsertNumber = (number: number) => {
    number = Math.max(number, 0);
    setKeyPadNum(number);
  };

  // 直接数字を入れる関数
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value) {
        let number = parseInt(value);
        number = Math.max(number, 0);
        setKeyPadNum(number);
      } else {
        setKeyPadNum(0);
      }
    },
    [keyPadNum]
  );

  // キーパッドから数字を入れる関数
  const handleNumButton = (e: number) => {
    const number = keyPadNum! * 10 + e;
    functionInsertNumber(number);
  };

  const handleDelete = () => {
    const number = Math.floor(keyPadNum / 10);
    setKeyPadNum(number);
  };

  return (
    <div css={styles.container}>
      <input
        type="number"
        value={keyPadNum}
        onChange={handleInput}
        css={styles.input}
        maxLength={9}
      />
      <div css={styles.keyPadWrapper}>
        {[...Array(9)].map((e, i) => (
          <NumButton
            key={i}
            number={i + 1}
            onClick={() => handleNumButton(i + 1)}
          />
        ))}
        <NumButton number={'del'} onClick={handleDelete} />
        <NumButton
          number={0}
          onClick={() => handleNumButton(0)}
        />
      </div>
    </div>
  );
};

export default KeyPadCard;
