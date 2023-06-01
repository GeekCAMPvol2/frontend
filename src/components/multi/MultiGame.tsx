import LeaveButton from './LeaveButton';
import { useRecoilState } from 'recoil';
import {
  multiGameStateFlgState,
  playersState,
  roomIdState,
} from '@/store/atoms';
import { questionsState } from '@/store/atoms';
import MultiQuiz from './flgComponents/MultiQuiz';
import MultiAns from './flgComponents/MultiAns';
import MultiFin from './flgComponents/MultiFin';
import { Background } from '../elements/Background';
import { Title } from '@/components/elements/Title';

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
      {multiGameStateFlg == 'quiz' && <MultiQuiz />}
      {/* 解答画面 */}
      {multiGameStateFlg == 'ans' && <MultiAns />}
      {/* 最終結果画面 */}
      {multiGameStateFlg == 'fin' && <MultiFin />}
    </div>
  );
};

export default MultiGame;
