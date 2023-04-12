import { itemData } from '@/store/atoms';
import { useRecoilState } from 'recoil';

const AnswerCard = () => {
  const [item, setItem] = useRecoilState(itemData);

  return (
    <div>
      <p>正解</p>
      <h1>10000円</h1>
      <p>あなたの回答</p>
      <h1>{item.answer}円</h1>
      <p>差額</p>
      <h1>{10000 - item.answer}円</h1>
    </div>
  );
};

export default AnswerCard;
