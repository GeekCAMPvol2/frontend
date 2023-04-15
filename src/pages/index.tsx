import { MainButton } from '@/components/index/MainButton';
import { Styles } from '@/types/Styles';
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  auth,
  firebaseSignIn,
  firebaseSignOut,
  functions,
} from '../lib/firebase';
import {
  crrQuizNumState,
  getItemNumState,
  itemData,
  keyPadNumArrState,
} from '@/store/atoms';
import { useRecoilState } from 'recoil';
import {
  HttpsCallable,
  httpsCallable,
} from 'firebase/functions';
import { getItemData } from './api/game';
import { useEffect, useRef, useState } from 'react';
import { Title } from '@/components/index/Title';
import { error } from 'console';
import { useFirebaseUserId } from '@/hooks/useFirebaseUserId';
import { motion, useAnimate } from "framer-motion"

export default function Home() {
  const router = useRouter();
  const userId = useFirebaseUserId();
  const playerNameRef = useRef<HTMLInputElement>(null);

  const [item, setItem] = useRecoilState(itemData);

  const [hoverdColor, sethoverdColor] = useState<string>(); //選択中のボタン
  const [countDown, setcountDown] = useState<number>(99)

  const handleOnHover = (color: string) => {
    sethoverdColor(color);
  };
  const controll = useAnimate()

  const [getItemNum, setGetItemNum] =
    useRecoilState(getItemNumState);

  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);

  const [keyPadNumArr, setKeyPadNumArr] = useRecoilState(
    keyPadNumArrState
  );

  const handleSelectTutorial = () => { };

  const fncCountDown = (count: number, path: string) => {
    setcountDown(count);
    if (count > 1) {
      setTimeout(() => {
        fncCountDown(count - 1, path);
      }, 1000);
    } else {
      setTimeout(() => {
        router.push(path);

      }, 500);
    }
  };

  // ゲーム開始ボタン
  const handlePlayGame = async (path: string) => {
    const resultData = await getItemData();
    setItem([resultData]);
    fncCountDown(3, path)
  };

  const handlePlayMultiGame = async () => {
    const roomId = await createRoom(
      playerNameRef.current!.value
    );
    router.push(`multi/${roomId}`);
  };

  const createRoom = async (
    playerName: string
  ): Promise<string> => {
    const createRoomCallback: HttpsCallable<
      { playerName: string },
      { roomId: string }
    > = httpsCallable(functions, 'createRoom');
    const createRoomResponse = await createRoomCallback({
      playerName: playerName,
    });
    console.log(createRoomResponse.data.roomId);
    return createRoomResponse.data.roomId;
  };

  // 初期化
  useEffect(() => {
    setItem([]);
    setCrrQuizNum(0);
    setKeyPadNumArr([]);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        // background: `radial-gradient( #111 50% ,#fff  )`,
        background: `#111`,
        transitionDuration: '5s',
      }}
    >
      <main style={styles.main}>
        <Title />
        <h3>〜失われた金銭感覚を求めて〜</h3>
        <div style={styles.buttonContainer}>
          <input
            type="text"
            style={styles.textInput}
            ref={playerNameRef}
            placeholder='名前を入力'
            maxLength={15}
          />
          {/* {userId !== undefined ? (
            <MainButton
              name="サインアウト"
              onClick={firebaseSignOut}
              delay={0}
              color={''}
            />
          ) : (
            <MainButton
              name="サインイン"
              onClick={firebaseSignIn}
              delay={0}
              color={''}
            />
          )}
          <MainButton
            name="遊び方"
            onClick={handleSelectTutorial}
            delay={0}
            color={''}
          /> */}
          <MainButton
            delay={0.1}
            color="rgb(199, 81, 250)"
            name="一人で遊ぶ"
            onClick={() => handlePlayGame('/solo/quiz')}
            onHoverStart={() =>
              handleOnHover('rgb(199, 81, 250)')
            }
          />
          <MainButton
            delay={0.2}
            color="rgb(0, 225, 255)"
            name="二人で遊ぶ"
            onClick={handlePlayMultiGame}
            disabled={userId === undefined}
            onHoverStart={() =>
              handleOnHover('rgb(0, 225, 255)')
            }
          />
        </div>
      </main>
      {countDown < 4 &&
        <div style={styles.countdown}>
          <motion.div
            initial={{
              scale: 1
            }}
            animate={{
              scale: 1.1
            }}

            transition={{
              duration: 0.5,
              repeatDelay: 0.5,
              repeat: 5
            }}
          >
            <div style={{
              ...styles.countTime,
              border: `20px solid ${hoverdColor}`,
              color: hoverdColor,
              boxShadow: `0 0 30px ${hoverdColor}`,
            }}>{countDown}
            </div>
          </motion.div>
        </div>
      }
    </div >

  );
}

const styles: Styles = {
  htmlDiv: {},
  main: {
    width: 1000,
    margin: '0 auto',
    marginTop: 100,
    textAlign: 'center',
    backgroundColor: 'rgb(0 0 0 /0)',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    backgroundColor: 'rgb(0 0 0 /0)',
  },
  textInput: {
    backgroundColor: "rgb(0 0 0 /0)",
    border: "2px solid #fff",
    boxShadow: "0 0 5px #fff",
    fontSize: 30,
    alignSelf: "center",
    width: 500,
    textAlign: "center",
    borderRadius: 100,
    padding: "10px 20px",
    marginTop: 30,
  },
  countdown: {
    position: "absolute",
    backgroundColor: "rgb(0 0 0 /.5)",
    top: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    verticalAlign: "middle",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  countTime: {
    borderRadius: "50%",
    width: 800,
    height: 800,
    border: "15px solid #fff",
    fontSize: 400,
    lineHeight: 2,
    textAlign: "center"
  }
};
