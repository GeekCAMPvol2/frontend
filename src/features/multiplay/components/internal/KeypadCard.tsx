import { css } from '@emotion/react';
import { ChangeEvent, useCallback, useState } from 'react';
import {
  KeypadButton,
  KeypadNumButton,
} from './keypadButtons';

export type KeyPadCardProps = {
  onValueUpdate: (value: number) => void;
};

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

export const KeypadCard = (props: KeyPadCardProps) => {
  const { onValueUpdate } = props;
  const [valueStr, setValueStr] = useState('');

  // 数字を入れる共通の関数
  const updateValue = useCallback(
    (number: number) => {
      const nanChecked = isNaN(number) ? 0 : number;
      const zeroOrGreater = Math.max(number, 0);
      const intValue = Math.floor(zeroOrGreater);
      onValueUpdate(intValue);
    },
    [onValueUpdate]
  );

  const updateValueStr = useCallback(
    (next: string) => {
      setValueStr(next);
      const intOrNan = parseInt(next);
      updateValue(intOrNan);
    },
    [updateValue]
  );

  // 直接数字を入れる関数
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateValueStr(e.target.value);
    },
    [updateValueStr]
  );

  // キーパッドから数字を入れる関数
  const handleNumButtonClick = useCallback(
    (numStr: string) => {
      updateValueStr(valueStr + numStr);
    },
    [valueStr, updateValueStr]
  );

  const handleDeleteButtonClick = useCallback(() => {
    const next = valueStr.slice(0, -1);
    updateValueStr(next);
  }, [valueStr, updateValueStr]);

  return (
    <div css={styles.container}>
      <input
        type="number"
        value={valueStr}
        placeholder="0"
        onChange={handleInputChange}
        css={styles.input}
        maxLength={9}
      />
      <div css={styles.keyPadWrapper}>
        {[...Array(9)].map((e, i) => (
          <KeypadNumButton
            key={i}
            num={i + 1}
            onClick={handleNumButtonClick}
          />
        ))}
        <KeypadButton
          label="del"
          onClick={handleDeleteButtonClick}
        />
        <KeypadNumButton
          num={0}
          onClick={handleNumButtonClick}
        />
      </div>
    </div>
  );
};
