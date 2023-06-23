import { useMultiplayRoom } from '../hooks/useMultiplayRoom';
import { MultiplayGameResultScene } from './scenes/MultiplayGameResultScene';
import { MultiplayLobbyScene } from './scenes/MultiplayLobbyScene';
import { MultiplayQuizAnswerScene } from './scenes/MultiplayQuizAnswerScene';
import { MultiplayQuizSubmitScene } from './scenes/MultiplayQuizSubmitScene';

export type MultiplayGameScreenProps = {
  roomId: string | undefined;
  goBackFromMultiplay: () => void;
};

export const MultiplayGameScreen = (
  props: MultiplayGameScreenProps
) => {
  const { roomId, goBackFromMultiplay } = props;
  const room = useMultiplayRoom(roomId);

  return (
    <div>
      {room.sceneKind == 'LOBBY' ? (
        <MultiplayLobbyScene
          {...{ room, goBackFromMultiplay }}
        />
      ) : room.sceneKind == 'QUIZ_SUBMIT' ? (
        <MultiplayQuizSubmitScene
          {...{ room, goBackFromMultiplay }}
        />
      ) : room.sceneKind == 'QUIZ_ANSWER' ? (
        <MultiplayQuizAnswerScene
          {...{ room, goBackFromMultiplay }}
        />
      ) : room.sceneKind === 'GAME_RESULT' ? (
        <MultiplayGameResultScene
          {...{ room, goBackFromMultiplay }}
        />
      ) : undefined}
    </div>
  );
};
