import { MainButton } from '@/components/index/MainButton';
import { Styles } from '@/types/Styles';
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth, functions } from '../lib/firebaseConfig';
import {
  crrQuizNumState,
  firebaseAuthLastUpdatedAtState,
  getItemNumState,
  itemData,
} from '@/store/atoms';
import { useRecoilState } from 'recoil';
import { httpsCallable } from 'firebase/functions';
import { getItemData } from './api/game';
import { useEffect, useState } from 'react';
import { Title } from '@/components/index/Title';

export default function Home() {
  const router = useRouter();
  const [
    firebaseAuthLastUpdatedAt,
    setFirebaseAuthLastUpdatedAt,
  ] = useRecoilState(firebaseAuthLastUpdatedAtState);

  const [item, setItem] = useRecoilState(itemData);

  const [hoverdColor, sethoverdColor] = useState<string>() //選択中のボタン

  const handleOnHover = (color: string) => {
    sethoverdColor(color)
  }

  const [getItemNum, setGetItemNum] =
    useRecoilState(getItemNumState);


  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);

  const handleSelectTutorial = () => { };

  // ゲーム開始ボタン
  const handlePlayGame = async (path: string) => {
    const resultData = await getItemData();
    setItem([resultData]);
    router.push(path);
  };

  const firebaseSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential =
      GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    const user = result.user;
    setFirebaseAuthLastUpdatedAt(Date.now());

    const createRoom = httpsCallable(
      functions,
      'createRoom'
    );
    const roomId = await createRoom({
      playerName: 'test',
    });
    console.log(roomId.data);
    // handlePlayGame('');
  };

  // 初期化
  useEffect(() => {
    setItem([]);
    setCrrQuizNum(0);
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
          {/* <MainButton
            delay={0}
            name="遊び方"
            onClick={handleSelectTutorial}
          /> */}
          <MainButton
            delay={0.1}
            color='rgb(199, 81, 250)'
            name="一人で遊ぶ"
            onClick={() => handlePlayGame('/solo/quiz')}
            onHoverStart={() => handleOnHover('rgb(199, 81, 250)')}
          />
          <MainButton
            delay={0.2}
            color='rgb(0, 225, 255)'
            name="二人で遊ぶ"
            onClick={() => firebaseSignIn()}
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
