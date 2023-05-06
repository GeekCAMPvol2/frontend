import HomeButton from '@/components/elements/HomeButton';
import { Styles } from '@/types/Styles';
import { Title } from '@/components/index/Title';
import ItemNameCard from '@/components/game/ItemNameCard';
import Image from 'next/image';
import AnswerCard from '@/components/game/AnswerCard';
import AnsQuizButton from '@/components/game/AnsQuizButton';
import { Background } from '@/components/elements/Background';
import { GameQuestion } from '@/types/room';
import ProductPriceCard from '../ProductPriceCard';

type Props = {
  questionIndex: number;
  question: GameQuestion;
};

const Ans = (props: Props) => {
  const { questionIndex, question } = props;
  const { productTitle, productPrice, productImageUrl } =
    question;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* 左側 */}
        <div style={styles.leftWrapper}>
          <ProductPriceCard
            productTitle={productTitle}
            productPrice={productPrice}
          />
          <div style={styles.itemImageWrapper}>
            <Image
              src={question.productImageUrl}
              alt={question.productTitle}
              width={400}
              height={400}
              style={{
                boxShadow: '0 0 15px rgb(199,81,250)',
              }}
            />
          </div>
        </div>

        {/* 右側 */}
        <div style={styles.rightWrapper}>
          <AnswerCard />
          {/* <AnsQuizButton /> */}
        </div>
      </div>
    </div>
  );
};

export default Ans;

const styles: Styles = {
  container: {
    margin: '50px 0',
    overflowX: 'hidden',
  },
  titleWrapper: {
    textAlign: 'center',
  },
  wrapper: {
    width: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '50px',
  },
  leftWrapper: {
    flex: 3,
    textAlign: 'center',
  },
  itemImageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '50px',
  },
};
