import { MainButton } from '@/components/index/MainButton';
import { Styles } from '@/types/Styles';

export default function Home() {


  return (
    <div>
      <main style={styles.main}>
        <h1>Price<br />Quest</h1>
        <h3>〜失われた金銭感覚を求めて〜</h3>
        <div style={styles.buttonContainer}>
          <MainButton name="スタート" />
          <MainButton name="一人で遊ぶ" />
          <MainButton name="二人で遊ぶ" />
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
    justifyContent:"space-around",
    textAlign:"center",
  }
}