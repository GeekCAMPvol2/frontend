import { Styles } from '@/types/Styles';
import { NumButton } from './NumButton';
import { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { keyPadNumState } from '@/store/atoms';

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
    <div style={styles.container}>
      <input
        type="number"
        value={keyPadNum}
        onChange={handleInput}
        style={styles.input}
        maxLength={9}
      />
      <div
        style={{
          width: 220,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
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

const styles: Styles = {
  container: {
    textAlign: 'center',
  },
  input: {
    width: '80%',
    fontSize: 30,
    textAlign: 'left',
    textShadow: '0 0 3px #fff',
    padding: 10,
    paddingBottom: 2,
    marginBottom: 15,
    borderBottom: '3px solid #fff',
    backgroundColor: 'rgb(0 0 0 /0)',
  },
};

export default KeyPadCard;
