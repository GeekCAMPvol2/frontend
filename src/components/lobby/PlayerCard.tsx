import { Styles } from '@/types/Styles';
import { UserImg } from '../UserImg';

type Props = {
  name: string;
};

export const PlayerCard = (props: Props) => {
  const { name } = props;

  return (
    <div style={styles.container}>
      <div style={styles.imageWrapper}>
        <UserImg userId={name} />
      </div>
      <h2>{name}</h2>
    </div>
  );
};

const styles: Styles = {
  container: {
    textAlign: 'center',
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
