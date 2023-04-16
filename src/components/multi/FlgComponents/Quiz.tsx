import { Styles } from '@/types/Styles';

const Quiz = () => {
  return (
    <div>
      {/* 左側 */}
      <div>
        {/* 商品名 */}
        {/* 商品画像 */}
      </div>
      {/* 右側 */}
      <div>
        {/* タイマー */}
        {/* キーパッド */}
      </div>
    </div>
  );
};

export default Quiz;

const styles: Styles = {
  container: {
    margin: '50px 0',
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
    border: '2px solid black',
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
