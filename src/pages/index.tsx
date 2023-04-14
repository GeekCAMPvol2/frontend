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
import { firebaseAuthLastUpdatedAtState } from '@/store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { httpsCallable } from 'firebase/functions';

export default function Home() {
  const router = useRouter();
  const [
    firebaseAuthLastUpdatedAt,
    setFirebaseAuthLastUpdatedAt,
  ] = useRecoilState(firebaseAuthLastUpdatedAtState);

  const handleSelectTutorial = () => {};

  const handlePlayGame = (path: string) => {
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
            name="遊び方"
            onClick={handleSelectTutorial}
          />
          <MainButton
            name="一人で遊ぶ"
            onClick={() => handlePlayGame('/solo/quiz')}
          />
          <MainButton
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
