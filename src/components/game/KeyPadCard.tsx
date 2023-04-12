import { Styles } from '@/types/Styles';
import { NumButton } from './NumButton';
import { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { keyPadNumState } from '@/store/atoms';

// type Props = {
//   setNumber: () => void
// }

const KeyPadCard = () => {
  // const { setNumber } = props

  const [keyPadNum, setKeyPadNum] =
    useRecoilState(keyPadNumState);

  // 数字を入れる共通の関数
  const functionInsertNumber = (number: number) => {
    number = Math.max(number, 0);
    // number = Math.min(number, Infinity)
    setKeyPadNum(number);

    // ### 親にinput渡すときは、ここに記載してください
  };

  // 直接数字を入れる関数
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let number = parseInt(e.target.value);
      number = Math.max(number, 0);
      setKeyPadNum(number);
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
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        {[...Array(9)].map((e, i) => (
          <NumButton
            number={i + 1}
            onClick={() => handleNumButton(i + 1)}
          />
        ))}
        <NumButton number={'del'} onClick={handleDelete} />
        <NumButton
          number={0}
          onClick={() => handleNumButton(0)}
        />
        {/* <NumButton number={i + 1} onClick={() => handleNumButton(i + 1)} /> */}
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
    padding: 10,
    paddingBottom: 2,
    marginBottom: 15,
    borderBottom: '1px solid #000',
  },
};

export default KeyPadCard;
