import { crrQuizNumState, itemData } from '@/store/atoms';
import { Styles } from '@/types/Styles';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

export type ProductTitleCardProps = {
  productTitle: string;
};

const ProductTitleCard = (props: ProductTitleCardProps) => {
  const router = useRouter();
  const [item, setItem] = useRecoilState(itemData);
  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);

  return (
    <div style={styles.container}>
      {item[crrQuizNum] && (
        <div>
          <div
            style={{
              fontWeight: 'bold',
              textAlign: 'left',
              color: 'rgb(199,81,250)',
              textShadow: '0 0 5px rgb(199,81,250)',
              fontSize: 26,
            }}
          >
            Name{' '}
          </div>
          <h1 style={styles.itemName}>
            {item[crrQuizNum].quiz}
          </h1>
          <h2>????????円</h2>
        </div>
      )}
    </div>
  );
};

export default ProductTitleCard;

const styles: Styles = {
  container: {
    margin: '50px 0',
  },
  itemName: {
    color: '#fff',
    width: '1000px',
    textAlign: 'center',
    fontSize: '30px',
    maxHeight: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};
