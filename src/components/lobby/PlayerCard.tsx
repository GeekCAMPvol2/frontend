import { Styles } from '@/types/Styles';
import { UserImg } from '../UserImg';
import { after } from 'node:test';

type Props = {
  name: string;
  checked?: boolean;
};

export const PlayerCard = (props: Props) => {
  const { name, checked = false } = props;

  return (
    <div style={styles.container}>
      {checked ? (
        <div style={styles.imageChecked}>
          <span style={styles.checkMark} />
        </div>
      ) : (
        <></>
      )}
      <div style={styles.imageWrapper}>
        <UserImg userId={name} />
      </div>

      <h2>{name}</h2>
    </div>
  );
};

const styles: Styles = {
  container: {
    position: 'relative',
    textAlign: 'center',
  },
  imageChecked: {
    position: 'absolute',
    top: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00000067',
    borderRadius: '100%',
    margin: '0 50px',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    display: 'block',
    position: 'absolute',
    width: '80px',
    height: '40px',
    borderLeft: '10px solid #ffffffb9',
    borderBottom: '10px solid #ffffffb9',
    transform: 'rotate(-45deg)',
  },
  imageWrapper: {
    overflow: 'hidden',
    width: 150,
    height: 150,
    backgroundColor: '#00000067',
    borderRadius: '100%',
    margin: '0 50px',
    marginBottom: 20,
  },
};
