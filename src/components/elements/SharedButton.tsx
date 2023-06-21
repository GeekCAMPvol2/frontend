import { useAffiliateLinks } from '@/hooks/useAffiliateLinks';
import { Styles } from '@/types/Styles';
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import Link from 'next/link';
import { ReactInstance, useEffect, useState } from 'react';
import {
  AiOutlineCopy,
  AiOutlineShareAlt,
} from 'react-icons/ai';

type Props = {
  componentRef: React.RefObject<ReactInstance>;
};

const SharedButton = (props: Props) => {
  const { componentRef } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const affiliateLinks = useAffiliateLinks(); // リンクを取得する
  const affiliateLinksString = affiliateLinks.join('\n'); // ここで改行する
  const linkText = encodeURIComponent(
    `PriceQuest(https://price-quest.netlify.app) の結果を共有するよ!\n\n${affiliateLinksString}`
  ); // リンクをエンコードする
  const [imageDataUrl, setImageDataUrl] = useState('');

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  // 共有ボタンを押したときの処理
  const handleShare = () => {
    handleCreateImageUrl();
    modalOpen ? close() : open();
  };

  // 画像をダウンロードする
  const handleCreateImageUrl = () => {
    const targetElement = document.body; // キャプチャする要素を指定します
    html2canvas(targetElement).then((canvas) => {
      // キャプチャした画像を取得します
      const imageDataUrl = canvas.toDataURL('image/png');

      // 画像を表示するためのimg要素を生成します
      const imageElement = document.createElement('img');
      setImageDataUrl(imageDataUrl);
    });
  };

  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.1,
          border: '2px solid rgb(0, 255, 250)',
          backgroundColor: 'rgb(0, 255, 250)',
          boxShadow: '0 0 15px rgb(0, 255, 250)',
        }}
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
        style={styles.button}
      >
        <AiOutlineShareAlt size="2.5rem" />
        共有する
      </motion.button>
      <Dialog open={modalOpen} onClose={close}>
        <DialogContent>
          <DialogTitle>
            画像をダウンロードして共有しよう！
          </DialogTitle>
          {/* <div
            style={{
              display: 'grid',
              gridTemplateColumns: '5fr, 1fr',
            }}
          >
            <TextField
              value={affiliateLinks}
              disabled
              multiline
              rows={10}
              // style={{ width: '95%' }}
            />
            <Tooltip
              title="Copy to Clipboard"
              placement="top"
              arrow
            >
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleCopy()}
              >
                <AiOutlineCopy color="#333" />
              </IconButton>
            </Tooltip>
          </div> */}
          {/* <Button onClick={handleImageDownload}>
            画像
          </Button> */}
          <Image
            src={imageDataUrl}
            alt="image"
            width={1042}
            height={526}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
          <Link
            href={`https://twitter.com/intent/tweet?hashtag=PriceQuest&text=${linkText}&ref_src=twsrc%5Etfw`}
            className="twitter-hashtag-button"
            data-show-count="false"
            target="_blank"
          >
            Tweet #結果を共有する
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
};

const styles: Styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    height: '3rem',
    color: 'white',
    border: '2px solid #fff',
    backgroundColor: 'rgb(0 0 0 /0)',
    borderRadius: '10px',
    margin: '0 auto',
    marginBottom: 10,
    padding: '10px 4rem',
    fontSize: '30px',
  },
};

export default SharedButton;
