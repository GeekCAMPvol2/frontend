import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import { Styles } from '@/types/Styles';
import { leaveRoom } from '@/lib/firestoreHandler';

type Props = {
  roomId: string;
};

const LeaveButton = (props: Props) => {
  const { roomId } = props;

  const handleLeaveRoom = () => {
    leaveRoom(roomId);
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

export default LeaveButton;

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
