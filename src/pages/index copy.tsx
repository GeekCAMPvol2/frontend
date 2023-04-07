import TestChild from '@/components/TestChild';
import { textState } from '@/store/atoms';
import styles from '@/styles/Home.module.css';
import { useRecoilState } from 'recoil';

export default function Home() {
  const [text, setText] = useRecoilState(textState);
  return (
    <>
      <main>
        <p>{text}</p>
        <TestChild />
      </main>
    </>
  );
}
