import { useRouter } from 'next/router';
import Title from '../elements/Title';
import { Background } from '../elements/background';
import LeaveButton from './LeaveButton';
import { useRecoilState } from 'recoil';
import {
  multiGameStateFlgState,
  playersState,
  roomIdState,
} from '@/store/atoms';
import { questionsState } from '@/store/atoms';
import Quiz from './FlgComponents/Quiz';
import Ans from './FlgComponents/Ans';
import Fin from './FlgComponents/Fin';

const MultiGame = () => {
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  const [players, setPlayers] =
    useRecoilState(playersState);
  const [questions, setQuestions] =
    useRecoilState(questionsState);

  const [multiGameStateFlg, setMultiGameStateFlg] =
    useRecoilState(multiGameStateFlgState);

  return (
    <div>
      <LeaveButton roomId={roomId} />
      <Background selected={'rgb(0, 225, 255)'} />
      <Title />
      {/* クイズ画面 */}
      {multiGameStateFlg == 'quiz' && <Quiz />}
      {/* 解答画面 */}
      {multiGameStateFlg == 'ans' && <Ans />}
      {/* 最終結果画面 */}
      {multiGameStateFlg == 'fin' && <Fin />}
    </div>
  );
};

export default MultiGame;
