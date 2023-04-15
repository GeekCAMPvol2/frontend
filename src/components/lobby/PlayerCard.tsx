import { Styles } from '@/types/Styles';
import React from 'react';
import { LobbyButton } from './LobbyButton';
import { UserImg } from '../UserImg';

type Props = {
  name: string;
};

export const PlayerCard = (props: Props) => {
  const { name } = props;

  return (
    <div style={styles.container}>
      <UserImg userId={name} />
      <h2>{name}</h2>
    </div>
  );
};

const styles: Styles = {
  container: {
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    borderRadius: '50%',
    margin: '0 60px',
    marginBottom: 20,
  },
};
