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
import { useEffect, useState } from 'react';
import { Title } from '@/components/index/Title';
import { useEffect } from 'react';
import { error } from 'console';
import { useFirebaseUserId } from '@/hooks/useFirebaseUserId';

export default function Home() {
  const router = useRouter();
  const userId = useFirebaseUserId();

  const [item, setItem] = useRecoilState(itemData);

  const [hoverdColor, sethoverdColor] = useState<string>() //選択中のボタン

  const handleOnHover = (color: string) => {
    sethoverdColor(color)
  }

  const [getItemNum, setGetItemNum] =
    useRecoilState(getItemNumState);

  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);


  const [keyPadNumArr, setKeyPadNumArr] = useRecoilState(
    keyPadNumArrState
  );

  const handleSelectTutorial = () => {};

  // ゲーム開始ボタン
  const handlePlayGame = async (path: string) => {
    const resultData = await getItemData();
    setItem([resultData]);
    router.push(path);
  };

  const handlePlayMultiGame = () => {};

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
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        // background: `radial-gradient( #111 50% ,#fff  )`,
        background: `#111`,
        transitionDuration: "5s"
      }}
    >
      <main style={styles.main}>
        <Title />
        <h3>〜失われた金銭感覚を求めて〜</h3>
        <div style={styles.buttonContainer}>
          {userId !== undefined ? (
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
          />
          <MainButton
            delay={0.1}
            color="rgb(199, 81, 250)"
            name="一人で遊ぶ"
            onClick={() => handlePlayGame('/solo/quiz')}
            onHoverStart={() => handleOnHover('rgb(199, 81, 250)')}
          />
          <MainButton
            delay={0.2}
            color="rgb(0, 225, 255)"
            name="二人で遊ぶ"

            onClick={() => {}}
            disabled={userId === undefined}
            onHoverStart={() => handleOnHover("rgb(0, 225, 255)")}

          />
        </div>
      </main>
    </div>
  );
}

const styles: Styles = {
  htmlDiv: {

  },
  main: {
    width: 1000,
    margin: '0 auto',
    marginTop: 100,
    textAlign: 'center',
    backgroundColor: "rgb(0 0 0 /0)"
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    backgroundColor: "rgb(0 0 0 /0)"

  },
};
