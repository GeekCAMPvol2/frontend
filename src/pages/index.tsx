import { MainButton } from '@/components/index/MainButton';
import { Styles } from '@/types/Styles';

export default function Home() {


  return (
    <div>
      <main style={styles.main}>
        <h1>タイトル</h1>
        <MainButton name="スタート" />
        <MainButton name="一人で遊ぶ" />
        <MainButton name="二人で遊ぶ" />

      </main>

    </div>
  );
}

const styles: Styles = {
  main: {
    width: 1000,
    margin: "0 auto",
    textAlign: "center"
  }
}