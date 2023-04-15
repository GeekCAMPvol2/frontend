import { useAtom } from 'jotai';
import { userImgCacheAtom } from '@/atom/userImgCache';
import { toSvg } from 'jdenticon/standalone';
import { LoadingIcon } from '@/assets/LoadingIcon';
import { Styles } from '@/types/Styles';

type props = {
  userId?: string;
};

const UserImg = ({ userId }: props) => {
  const [userImgCache, setUserImgCache] = useAtom(
    userImgCacheAtom
  );
  if (!userId)
    return (
      // <LoadingIcon
      //   className={`${styles.img} ${styles.loading}`}
      // />
      <>userIdないよ～</>
    );
  if (userImgCache[userId])
    return (
      <img
        src={userImgCache[userId]}
        alt={userId}
        style={styles.img}
      />
    );
  const size = 200;
  const svg = `data:image/svg+xml;,${encodeURIComponent(
    toSvg(userId, size)
  )}`;
  setUserImgCache({ ...userImgCache, [userId]: svg });
  return <img src={svg} alt={userId} style={styles.img} />;
};

export { UserImg };

const styles: Styles = {
  img: {
    objectFit: 'contain',
    aspectRatio: '1',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '100%',
  },
  loading: {
    transform: 'scale(75%)',
  },
};
