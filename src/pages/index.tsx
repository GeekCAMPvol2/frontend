import TestChild from '@/components/TestChild';
import { MainButton } from '@/components/index/MainButton';
import { textState } from '@/store/atoms';
import styles from '@/styles/Home.module.css';
import { useRecoilState } from 'recoil';

export default function Home() {


  return (
    <div>
      <main>
        <h1>タイトル</h1>
        <MainButton name="スタート" />
        <MainButton name="一人で遊ぶ" />
        <MainButton name="二人で遊ぶ" />

      </main>

    </div>
  );
}
