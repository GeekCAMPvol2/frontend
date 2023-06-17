import { Title } from '@/components/elements/Title';
import { css } from '@emotion/react';
import { MultiplayRoomInGameResult } from '@/features/multiplay/model';
import { LeaveButton } from '../internal/LeaveButton';

const styles = {
  titleWrapper: css`
    font-size: 80;
    text-align: center;
    padding: '50px';
  `,
  playerContainer: css`
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  buttonContainer: css`
    position: absolute;
    bottom: 100;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
  `,
};
export type MultiplayGameResultSceneProps = {
  room: MultiplayRoomInGameResult;
  goBackFromMultiplay: () => void;
};

export const MultiplayGameResultScene = (
  props: MultiplayGameResultSceneProps
) => {
  const { room, goBackFromMultiplay } = props;
  const { roomId } = room;

  return (
    <div>
      <LeaveButton {...{ roomId, goBackFromMultiplay }} />
      <div>
        <Title />
        <div>Fin</div>
      </div>
    </div>
  );
};
