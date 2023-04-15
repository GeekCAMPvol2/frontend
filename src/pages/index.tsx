import { MainButton } from '@/components/index/MainButton';
import { Styles } from '@/types/Styles';
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth, functions } from '../../lib/firebaseConfig';
import {
  firebaseAuthLastUpdatedAtState,
  getItemNumState,
  itemData,
} from '@/store/atoms';
import { useRecoilState } from 'recoil';
import { httpsCallable } from 'firebase/functions';
import { getItemData } from './api/game';

export default function Home() {
  const router = useRouter();
  const [
    firebaseAuthLastUpdatedAt,
    setFirebaseAuthLastUpdatedAt,
  ] = useRecoilState(firebaseAuthLastUpdatedAtState);

  const [item, setItem] = useRecoilState(itemData);

  const [getItemNum, setGetItemNum] =
    useRecoilState(getItemNumState);

  const handleSelectTutorial = () => { };

  const resultDataArr: any = [];
  // ゲーム開始ボタン
  const handlePlayGame = async (path: string) => {
    for (let i = 0; i < getItemNum; i++) {
      const resultData = await getItemData();
      resultDataArr.push(resultData);
    }
    setItem(resultDataArr);
    console.log(item);
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

  return (
    <div>
      <main style={styles.main}>
        <h1>
          Price
          <br />
          Quest
        </h1>
        <h3>〜失われた金銭感覚を求めて〜</h3>
        <div style={styles.buttonContainer}>
          <MainButton
            delay={0}
            name="遊び方"
            onClick={handleSelectTutorial}
          />
          <MainButton
            delay={0.1}
            name="一人で遊ぶ"
            onClick={() => handlePlayGame('/solo/quiz')}
          />
          <MainButton
            delay={0.2}
            name="二人で遊ぶ"
            onClick={() => firebaseSignIn()}
          />
        </div>
      </main>
    </div>
  );
}

const styles: Styles = {
  main: {
    width: 1000,
    margin: '0 auto',
    marginTop: 100,
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
};
