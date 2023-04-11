import { MainButton } from '@/components/index/MainButton';
import { Styles } from '@/types/Styles';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()

  const handleSelectTutorial = () => {

  }

  const handlePlayGame = (path: string) => {
    router.push(path)
  }

  return (
    <div>
      <main style={styles.main}>
        <h1>Price<br />Quest</h1>
        <h3>〜失われた金銭感覚を求めて〜</h3>
        <div style={styles.buttonContainer}>
          <MainButton name="遊び方" onClick={handleSelectTutorial} />
          <MainButton name="一人で遊ぶ" onClick={() => handlePlayGame("/solo/quiz")} />
          <MainButton name="二人で遊ぶ" onClick={() => handlePlayGame("/solo/quiz")} />
        </div>


      </main>

    </div>
  );
}

const styles: Styles = {
  main: {
    width: 1000,
    margin: "0 auto",
    marginTop: 100,
    textAlign: "center"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
  }
}