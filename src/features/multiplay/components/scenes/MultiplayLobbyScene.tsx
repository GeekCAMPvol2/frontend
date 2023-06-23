import { css } from '@emotion/react';
import { Title } from '@/components/elements/Title';
import { useCallback } from 'react';
import { LobbyButton } from '@/components/lobby/LobbyButton';
import { PlayerCard } from '@/components/lobby/PlayerCard';
import { Background } from '@/components/elements/Background';
import {
  getIfImReady,
  updateAmIReady,
} from '@/features/multiplay/clients/room';
import { MultiplayRoomInLobby } from '@/features/multiplay/model';
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
export type MultiplayLobbyProps = {
  room: MultiplayRoomInLobby;
  goBackFromMultiplay: () => void;
};

export const MultiplayLobbyScene = (
  props: MultiplayLobbyProps
) => {
  const { room, goBackFromMultiplay } = props;
  const { roomId } = room;
  const amIReady = getIfImReady(room);

  const handleClickCopyButton = useCallback(() => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(
      `${baseUrl}/multi/lobby/${roomId}`
    );
  }, [roomId]);

  const handleClickReadyButton = useCallback(() => {
    updateAmIReady(roomId, true);
  }, [roomId, amIReady]);

  return (
    <div>
      <LeaveButton {...{ roomId, goBackFromMultiplay }} />
      <div>
        <Title />
      </div>
      <div className={`${styles.playerContainer}`}>
        {room.members.map((member, index) => (
          <PlayerCard
            key={index}
            name={member.displayName}
            checked={room.readyMemberIds.has(member.userId)}
          />
        ))}
      </div>

      <div className={`${styles.buttonContainer}`}>
        <LobbyButton
          name="URLをコピー"
          onClick={handleClickCopyButton}
        />
        <LobbyButton
          // disabled={amIReady}
          name="準備完了"
          onClick={handleClickReadyButton}
        />
      </div>

      <Background selected="rgb(0, 225, 255)" />
    </div>
  );
};
