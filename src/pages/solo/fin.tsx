import { Background } from '@/components/elements/Background';
import HomeButton from '@/components/elements/HomeButton';
import PlayAgainButton from '@/components/game/solo/PlayAgainButton';
import { Title } from '@/components/index/Title';
import { itemData, keyPadNumArrState } from '@/store/atoms';
import { Styles } from '@/types/Styles';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { motion } from "framer-motion"

const Fin = () => {
  const [item, setItem] = useRecoilState(itemData);
  const [keyPadNumArr, setKeyPadNumArr] = useRecoilState(
    keyPadNumArrState
  );

  return (
    <div style={styles.container}>
      <HomeButton />
      <span style={styles.titleWrapper}>
        <Title canBounding={false} />
      </span>
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
              <div style={styles.itemImageWrapper}>
                <Image
                  src={item.images[0].imageUrl!}
                  alt={item.quiz}
                  width={200}
                  height={200}
                />
              </div>
              <h1 style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,

              }}>{item.quiz}</h1>
              <p style={{
                fontSize: 16
              }}>金額：{item.answer}円</p>
              <h1 style={{
                marginTop: 20,
                color: "rgb(199, 81, 250)",
                textShadow: "0 0 5px rgb(199, 81, 250)",
                fontSize: 30
              }}>
                差額金額：<br />
                {keyPadNumArr[index]}円
              </h1>
              <motion.a href={item.affiliatelink} target='_blank'
                style={{
                  border: "2px rgb(199, 81, 250) solid",
                  borderRadius: 40,
                  backgroundColor: "rgb(199, 81, 250)",
                  fontSize: 18,
                  padding: "2px 14px",
                  color: "white"
                }}
                whileHover={{
                  scale: 1.3
                }}
                whileTap={{
                  scale: 1
                }}
              >商品のページへ</motion.a>
            </div>
          ))}
        </div>

        {/* 下側 */}
        <div style={styles.bottomWrapper}>
          <PlayAgainButton />
        </div>
      </div>
      <Background selected='rgb(199, 81, 250)' />

    </div>
  );
};

export default Fin;

const styles: Styles = {
  container: {
    margin: '0px 0',
    overflowX: 'hidden',
    overflowY: "hidden"
  },
  titleWrapper: {
    textAlign: 'center',
    // color: 'black',
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
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    color: 'white',
    backgroundColor: 'rgb(0 0 0 /0)',
    padding: 10,
    border: "2px solid rgb(199, 81, 250)",
    boxShadow: "0 0 5px rgb(199, 81, 250)",
    borderRadius: 10
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
