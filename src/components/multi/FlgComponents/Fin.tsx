import { Styles } from '@/types/Styles';

const Fin = () => {
  return <div>Fin</div>;
};

export default Fin;

const styles: Styles = {
  container: {
    margin: '50px 0',
  },
  titleWrapper: {
    textAlign: 'center',
    color: 'black',
  },
  wrapper: {
    width: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
  },
  topWrapper: {
    fontSize: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  itemWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    color: 'white',
    backgroundColor: 'black',
  },
  itemImageWrapper: {
    border: '2px solid black',
    borderRadius: '10px',
    display: 'flex',
  },
  bottomWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '50px',
  },
};
