import { useRouter } from 'next/router';

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
import { Background } from '../elements/Background';
import { userFirebaseRoomGame } from '@/hooks/roomState';
import { useFirebaseUserId } from '@/hooks/useFirebaseUserId';
import { RoomGameStartedState } from '@/types/room';
import { Styles } from '@/types/Styles';
import { Title } from '../index/Title';

export type MultiGameProps = {
  roomId: string;
  room: RoomGameStartedState;
};

const MultiGame = (props: MultiGameProps) => {
  const { roomId, room } = props;
  const players = room.members;
  const { questions } = room;

  const game = userFirebaseRoomGame(roomId);
  const multiGameStateFlg = game?.status;

  return (
    <div>
      <LeaveButton roomId={roomId} />
      <span style={styles.titleWrapper}>
        <Title canBounding={false} />
      </span>

      <Background selected={'rgb(0, 225, 255)'} />
      {/* クイズ画面 */}
      {game?.status == 'quiz' && (
        <Quiz
          roomId={roomId}
          questionIndex={game?.questionIndex}
          question={game?.question}
        />
      )}
      {/* 解答画面 */}
      {game?.status == 'ans' && (
        <Ans
          questionIndex={game?.questionIndex}
          question={game?.question}
        />
      )}
      {/* 最終結果画面 */}
      {game?.status == 'fin' && <Fin />}
    </div>
  );
};

export default MultiGame;

const styles: Styles = {
  container: {
    margin: '50px 0',
    overflowX: 'hidden',
  },
  titleWrapper: {
    textAlign: 'center',
  },
};
