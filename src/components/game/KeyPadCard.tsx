import { Styles } from "@/types/Styles";
import { NumButton } from "./NumButton";
import { ChangeEvent, useCallback, useState } from "react";

// type Props = {
//   setNumber: () => void
// }

const KeyPadCard = () => {
  // const { setNumber } = props

  const [input, setinput] = useState<number>(0)

  // 数字を入れる共通の関数
  const functionInsertNumber = (number: number) => {
    number = Math.max(number, 0)
    // number = Math.min(number, Infinity)
    setinput(number)

    // ### 親にinput渡すときは、ここに記載してください
  }

  // 直接数字を入れる関数
  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let number = parseInt(e.target.value)
    number = Math.max(number, 0)
    setinput(number)
  }, [input])

  // キーパッドから数字を入れる関数
  const handleNumButton = (e: number) => {
    const number = input! * 10 + e
    functionInsertNumber(number)
  }

  return (
    <div style={styles.container}>
      <input type="number" value={input} onChange={handleInput} style={styles.input} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr"
      }}>
        {[...Array(9)].map((e, i) => (
          <NumButton number={i + 1} onClick={() => handleNumButton(i + 1)} />
        ))}

      </div>

    </div>
  );
};

const styles: Styles = {
  container: {
    textAlign: "center",
  },
  input: {
    width: "80%",
    fontSize: 30,
    marginBottom: 10,
    borderBottom: "1px solid #000"
  }
}

export default KeyPadCard;
