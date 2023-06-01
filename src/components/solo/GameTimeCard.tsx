import {
  crrQuizNumState,
  getItemNumState,
  itemData,
  keyPadNumArrState,
  keyPadNumState,
  timeLimit,
} from '@/store/atoms';
import { Styles } from '@/types/Styles';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { getItemData } from '@/pages/api/game';

const GameTimeCard = () => {
  const [time, setTime] = useRecoilState(timeLimit);
  const router = useRouter();

  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);
  const [getItemNum, setGetItemNum] =
    useRecoilState(getItemNumState);
  const [item, setItem] = useRecoilState(itemData);
  const [keyPadNumArr, setKeyPadNumArr] = useRecoilState(
    keyPadNumArrState
  );
  const [keyPadNum, setKeyPadNum] =
    useRecoilState(keyPadNumState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (time <= 0) {
        if (crrQuizNum < getItemNum - 1) {
          const resultData = await getItemData();
          setItem([...item, resultData]);
        }
        setKeyPadNumArr([
          ...keyPadNumArr,
          item[crrQuizNum].answer - keyPadNum,
        ]);
        router.push('/solo/ans');
      }
    };
    fetchData();
  }, [time]);

  return (
    <div style={styles.container}>
      {/* <h2>TIME LIMIT</h2> */}
      {/* <h2>{time}</h2> */}
      <div style={{
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 26,
        paddingLeft: 20,
        paddingTop: 10,
        color: "rgb(199 81 250)",
        textShadow: "0 0 5px rgb(199 81 250)"
      }}>Remain</div>
      <div
        style={{
          textAlign: "right",
          paddingRight: 30,
          fontSize: 50,
        }}
      >
        {time}
        <span
          style={{
            marginLeft: 20,
            fontSize: 20
          }}
        >
          sec
        </span>
      </div>
    </div>
  );
};

export default GameTimeCard;

const styles: Styles = {
  container: {
    minHeight: '150px',
    width: '100%',
    // border: '2px solid #000',
    // borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: "left",
  },
};
