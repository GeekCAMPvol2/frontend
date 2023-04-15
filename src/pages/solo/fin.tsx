import PlayAgainButton from '@/components/game/solo/PlayAgainButton';
import { itemData, keyPadNumArrState } from '@/store/atoms';
import { Styles } from '@/types/Styles';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

const Fin = () => {
  const [item, setItem] = useRecoilState(itemData);
  const [keyPadNumArr, setKeyPadNumArr] = useRecoilState(
    keyPadNumArrState
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.titleWrapper}>Price Quest</h1>
      <div style={styles.wrapper}>
        <h1>
          あなたの合計差額:
          {keyPadNumArr.reduce(
            (acc, num) => acc + Math.abs(num),
            0
          )}
        </h1>
        {/* 上側 */}
        <div style={styles.topWrapper}>
          {item.map((item, index) => (
            <div style={styles.itemWrapper} key={index}>
              <h1>{item.quiz}</h1>
              <h2>{item.answer}円</h2>
              <div style={styles.itemImageWrapper}>
                <Image
                  src={item.images[0].imageUrl!}
                  alt={item.quiz}
                  width={200}
                  height={200}
                />
              </div>
              <p>
                差額金額:
                {keyPadNumArr[index]}
              </p>
            </div>
          ))}
        </div>

        {/* 下側 */}
        <div style={styles.bottomWrapper}>
          <PlayAgainButton />
        </div>
      </div>
    </div>
  );
};

export default Fin;

const styles: Styles = {
  container: {
    margin: '50px 0',
  },
  titleWrapper: {
    textAlign: 'center',
    color: 'black',
  },
  wrapper: {
    width: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
  },
  topWrapper: {
    fontSize: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  itemWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    color: 'white',
    backgroundColor: 'black',
  },
  itemImageWrapper: {
    border: '2px solid black',
    borderRadius: '10px',
    display: 'flex',
  },
  bottomWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '50px',
  },
};
