import { textState } from '@/store/atoms';
import { useRecoilState } from 'recoil';

const TestChild = () => {
  const [text, setText] = useRecoilState(textState);
  return (
    <button onClick={() => setText('にゃっはろー')}>
      click
    </button>
  );
};

export default TestChild;
