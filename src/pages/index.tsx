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
import { motion, useAnimate } from 'framer-motion';
import { Background } from '@/components/elements/Background';
import { SigninButton } from '@/components/index/SigninButton';
import {
  circularWaves,
  infiniteVibration,
  pagePopup,
  SideFlowing,
} from '@/animations/variants';

export default function Home() {
  const router = useRouter();
  const userId = useFirebaseUserId();
  const playerNameRef = useRef<HTMLInputElement>(null);

  const [item, setItem] = useRecoilState(itemData);

  const [hoverdColor, sethoverdColor] = useState<string>(
    'rgb(199, 81, 250)'
  ); //選択中のボタン
  const [countDown, setCountDown] = useState<
    number | string
  >(99);
  const [isCounting, setIsCounting] =
    useState<boolean>(false);

  const handleOnHover = (color: string) => {
    sethoverdColor(color);
  };
  const controll = useAnimate();

  const [getItemNum, setGetItemNum] =
    useRecoilState(getItemNumState);

  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);

  const [keyPadNumArr, setKeyPadNumArr] = useRecoilState(
    keyPadNumArrState
  );

  const fncCountDown = (count: number, path: string) => {
    if (count === 0) {
      setCountDown('Go');
    } else {
      setCountDown(count);
    }

    if (count > 0) {
      setTimeout(() => {
        fncCountDown(count - 1, path);
      }, 1000);
    } else if (count === 0) {
      setTimeout(() => {
        setIsCounting(false);
        router.push(path);
      }, 800);
    }
  };

  // ゲーム開始ボタン
  const handlePlayGame = async (path: string) => {
    const resultData = await getItemData();
    setItem([resultData]);
    setIsCounting(true);
    fncCountDown(3, path);
  };

  // multiプレイ開始ボタン
  const handlePlayMultiGame = async () => {
    const playerName =
      playerNameRef.current!.value == ''
        ? 'プレイヤー1'
        : playerNameRef.current!.value;
    const roomId = await createRoom(playerName);
    router.push(`/multi/${roomId}`);
  };

  // 部屋作成
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
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: `rgb(0 0 0 /0)`,
        transitionDuration: '5s',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
    >
      <motion.div style={styles.main} {...pagePopup}>
        <motion.div
          animate="visible"
          variants={infiniteVibration}
        >
          <Title />
        </motion.div>
        <h3>〜失われた金銭感覚を求めて〜</h3>
        <div style={styles.buttonContainer}>
          <div
            style={{
              display: 'flex',
              margin: '0 auto',
            }}
          >
            <input
              type="text"
              style={styles.textInput}
              ref={playerNameRef}
              placeholder="名前を入力"
              onFocus={(e) => e.target.select()}
              maxLength={15}
            />
            {userId !== undefined ? (
              <SigninButton
                name="サインアウト"
                onClick={firebaseSignOut}
                delay={0}
                color="rgb(255, 255, 255)"
                onHoverStart={() =>
                  handleOnHover('rgb(199, 81, 250)')
                }
              />
            ) : (
              <SigninButton
                name="サインイン"
                onClick={firebaseSignIn}
                delay={0}
                color="rgb(255, 255, 255)"
                onHoverStart={() =>
                  handleOnHover('rgb(199, 81, 250)')
                }
              />
            )}
          </div>

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
            name="みんなで遊ぶ"
            onClick={handlePlayMultiGame}
            disabled={userId === undefined}
            onHoverStart={() =>
              handleOnHover('rgb(0, 225, 255)')
            }
          />
        </div>
        {/* <!-- Rakuten Web Services Attribution Snippet FROM HERE --> */}
        <motion.a
          {...SideFlowing}
          style={styles.credit}
          href="https://developers.rakuten.com/"
          target="_blank"
        >
          Supported by Rakuten Developers
        </motion.a>
        {/* <!-- Rakuten Web Services Attribution Snippet TO HERE --> */}
      </motion.div>
      {isCounting && (
        <div style={styles.countdown}>
          <motion.div
            {...circularWaves}
            style={{
              ...styles.countTime,
              border: `20px solid ${hoverdColor}`,
              color: hoverdColor,
              boxShadow: `0 0 30px ${hoverdColor}`,
            }}
          >
            {countDown}
          </motion.div>
        </div>
      )}
      <Background selected={hoverdColor} />
    </div>
  );
}

const styles: Styles = {
  htmlDiv: {},
  main: {
    width: 1000,
    height: 900,
    margin: '0 auto',
    marginTop: 100,
    textAlign: 'center',
    backgroundColor: 'rgb(0 0 0 /0)',
    overflow: 'hidden',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    backgroundColor: 'rgb(0 0 0 /0)',
  },
  textInput: {
    backgroundColor: 'rgb(0 0 0 /0)',
    border: '2px solid #fff',
    boxShadow: '0 0 5px #fff',
    fontSize: 30,
    alignSelf: 'center',
    width: 500,
    textAlign: 'center',
    borderRadius: 100,
    padding: '10px 20px',
    marginTop: 30,
  },
  countdown: {
    position: 'absolute',
    backgroundColor: 'rgb(0 0 0 /.5)',
    top: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countTime: {
    backgroundColor: 'rgb(0 0 0 /.5)',
    borderRadius: '50%',

    width: 800,
    height: 800,
    border: '15px solid #fff',
    fontSize: 400,
    lineHeight: 2,
    textAlign: 'center',
  },
  credit: {
    color: '#fff',
    position: 'absolute',
    bottom: 50,
    left: 0,
    width: '100vw',
    textAlign: 'center',
  },
};
