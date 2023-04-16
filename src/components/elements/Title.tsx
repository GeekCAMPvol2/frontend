import { Styles } from '@/types/Styles';

const Title = () => {
  return (
    <h1 style={styles.titleWrapper}>
      <span
        style={{
          color: 'rgb(199,81,250)',
          textShadow: `0px 0px 10px rgb(199,81,250)`,
        }}
      >
        Price
      </span>
      <span
        style={{
          color: '#fff',
          textShadow: `0px 0px 5px #fff`,
        }}
      >
        $
      </span>
      <span
        style={{
          color: 'rgb(0,255,250)',
          textShadow: `0px 0px 10px rgb(0,255,250)`,
        }}
      >
        Quest
      </span>
    </h1>
  );
};

export default Title;

const styles: Styles = {
  titleWrapper: {
    fontSize: 80,
    textAlign: 'center',
    padding: '50px',
  },
};
