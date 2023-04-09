import { Styles } from "@/types/Styles";
import { NumButton } from "./NumButton";
import { ChangeEvent, useCallback, useState } from "react";

const KeyPadCard = () => {
  const [input, setinput] = useState<number>()


  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const number = parseInt(e.target.value)
    setinput(number)
  }, [input])

  const handleNumButton = () => {

  }

  return (
    <div style={styles.container}>
      <input type="number" value={input} onChange={handleInput} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr"
      }}>
        <NumButton number={1} onClick={handleNumButton} />

      </div>

    </div>
  );
};

const styles: Styles = {
  container: {
    textAlign: "center",
  }
}

export default KeyPadCard;
