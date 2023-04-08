import { itemData } from '@/store/atoms';
import { Styles } from '@/types/Styles';
import { useRecoilState } from 'recoil';

const ItemNameCard = () => {
  const [item, setItem] = useRecoilState(itemData);
  return (
    <div style={styles.container}>
      <h1 style={styles.itemName}>{item.quiz}</h1>
    </div>
  );
};

export default ItemNameCard;

const styles: Styles = {
  container: {
    margin: '50px 0',
  },
  itemName: {
    width: '100%',
    textAlign: 'center',
    fontSize: '30px',
    maxHeight: '100px',
  },
};
