import { MainButton } from '@/components/index/MainButton';

export default function Home() {


  return (
    <div>
      <main >
        <h1>タイトル</h1>
        <MainButton name="スタート" />
        <MainButton name="一人で遊ぶ" />
        <MainButton name="二人で遊ぶ" />

      </main>

    </div>
  );
}
