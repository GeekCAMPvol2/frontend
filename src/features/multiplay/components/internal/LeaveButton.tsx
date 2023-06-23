import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { leaveRoom } from '@/features/multiplay/clients/room';
import { Styles } from '@/types/Styles';

export type LeaveButtonProps = {
  roomId: string;
  goBackFromMultiplay: () => void;
};

const styles: Styles = {
  button: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    border: '2px solid white',
    borderRadius: 400,
    padding: '10px 20px',
    margin: '50px',
  },
};
export const LeaveButton = (props: LeaveButtonProps) => {
  const { roomId, goBackFromMultiplay } = props;

  const handleLeaveRoom = async () => {
    await leaveRoom(roomId);
    goBackFromMultiplay();
  };

  return (
    <Link href={'/'}>
      <button
        style={styles.button}
        onClick={handleLeaveRoom}
      >
        <HomeIcon />
        ホーム
      </button>
    </Link>
  );
};
