import HomeButton from '@/components/elements/HomeButton';
import { Styles } from '@/types/Styles';
import { Title } from '@/components/index/Title';
import ItemNameCard from '@/components/game/ItemNameCard';
import Image from 'next/image';
import AnswerCard from '@/components/game/AnswerCard';
import AnsQuizButton from '@/components/game/AnsQuizButton';
import { Background } from '@/components/elements/Background';
import GameTimeCard from '@/components/game/GameTimeCard';
import { ItemData } from '@/types/Game';
import KeyPadCard from '../KeyPadCard';
import { GameQuestion } from '@/types/room';
import ProductTitleCard from '../ProductTitleCard';
import { answerPrice } from '../answerPrice';

type Props = {
  roomId: string;
  questionIndex: number;
  question: GameQuestion;
};

const Quiz = (props: Props) => {
  const { roomId, questionIndex, question } = props;
  const { productTitle, productImageUrl } = question;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* 左側 */}
        <div style={styles.leftWrapper}>
          <ProductTitleCard productTitle={productTitle} />
          <div style={styles.itemImageWrapper}>
            <Image
              src={productImageUrl}
              alt={productTitle}
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
          <GameTimeCard />
          <KeyPadCard
            onPriceChange={(price) =>
              answerPrice(roomId, questionIndex, price)
            }
          />
          {/* <AnsQuizButton /> */}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

const styles: Styles = {
  container: {
    margin: '50px 0',
    overflowX: 'hidden',
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
    // border: '2px solid black',
    borderRadius: '10px',
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
