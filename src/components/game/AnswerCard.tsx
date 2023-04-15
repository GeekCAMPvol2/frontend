import {
  crrQuizNumState,
  itemData,
  keyPadNumState,
} from '@/store/atoms';
import { Styles } from '@/types/Styles';
import { useRecoilState } from 'recoil';

const AnswerCard = () => {
  const [item, setItem] = useRecoilState(itemData);
  const [keyPadNum, setKeyPadNum] =
    useRecoilState(keyPadNumState);
  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);
  return (
    <div style={styles.container}>
      {item[crrQuizNum] && (
        <div style={styles.wrapper}>
          <p>正解</p>
          <h1>{item[crrQuizNum].answer}円</h1>
          <p>あなたの回答</p>
          <h1>{keyPadNum}円</h1>
          <p>差額</p>
          <h1>{item[crrQuizNum].answer - keyPadNum}円</h1>
        </div>
      )}
    </div>
  );
};

export default AnswerCard;

const styles: Styles = {
  container: {
    // margin: '50px 0',
  },
  wrapper: {
    color: 'black',
  },
};
