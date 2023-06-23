import { MainButton } from '@/components/elements/MainButton';
import { useRouter } from 'next/router';
import {
  firebaseSignIn,
  firebaseSignOut,
} from '../lib/firebase';
import {
  crrQuizNumState,
  getItemNumState,
  itemData,
  keyPadNumArrState,
  timeLimit,
} from '@/store/atoms';
import { useRecoilState } from 'recoil';
import { getItemData } from './api/game';
import { useEffect, useRef, useState } from 'react';
import { Title } from '@/components/elements/Title';
import { useFirebaseUserId } from '@/hooks/useFirebaseUserId';
import { motion, useAnimate } from 'framer-motion';
import { Background } from '@/components/elements/Background';
import { SigninButton } from '@/components/elements/SigninButton';
import {
  circularWaves,
  infiniteVibration,
  pagePopup,
  SideFlowing,
} from '@/animations/variants';
import { css } from '@emotion/react';
import { createRoom } from '@/lib/firestoreHandler';

export default function Home() {
  const router = useRouter();
  const userId = useFirebaseUserId();
  const playerNameRef = useRef<HTMLInputElement>(null);

  const [quizApiError, setQuizApiError] =
    useState<unknown>();

  const [item, setItem] = useRecoilState(itemData);

  const [buttonDisabled, setButtonDisabled] =
    useState<boolean>(false); //ボタンの無効化
  const [time, setTime] = useRecoilState(timeLimit);

  const [hoveredColor, setHoveredColor] = useState<string>(
    'rgb(199, 81, 250)'
  ); //選択中のボタン
  const [countDown, setCountDown] = useState<
    number | string
  >(99);
  const [isCounting, setIsCounting] =
    useState<boolean>(false);

  const handleOnHover = (color: string) => {
    setHoveredColor(color);
  };
  const controll = useAnimate();

  const [getItemNum, setGetItemNum] =
    useRecoilState(getItemNumState);

  const [crrQuizNum, setCrrQuizNum] =
    useRecoilState(crrQuizNumState);

  const [keyPadNumArr, setKeyPadNumArr] = useRecoilState(
    keyPadNumArrState
  );

  const fncCountDown = (count: number, path: string) => {
    if (count === 0) {
      setCountDown('Go');
    } else {
      setCountDown(count);
    }

    if (count > 0) {
      setTimeout(() => {
        fncCountDown(count - 1, path);
      }, 1000);
    } else if (count === 0) {
      setTimeout(() => {
        setIsCounting(false);
        router.push(path);
      }, 800);
    }
  };

  // ゲーム開始ボタン
  const handlePlayGame = async (path: string) => {
    setButtonDisabled(true);
    try {
      const resultData = await getItemData();
      setItem(resultData);
      setIsCounting(true);
      fncCountDown(3, path);
    } catch (err) {
      console.error(err);
      setQuizApiError(err);
    }
  };

  // multiプレイ開始ボタン
  const handlePlayMultiGame = async () => {
    setButtonDisabled(true);
    const playerName =
      playerNameRef.current!.value == ''
        ? 'プレイヤー1'
        : playerNameRef.current!.value;
    const roomId = await createRoom(playerName);
    router.push(`/multi/${roomId}`);
  };

  // 初期化
  useEffect(() => {
    setItem([]);
    setTime(30);
    setCrrQuizNum(-1);
    setKeyPadNumArr([]);
  }, []);

  return (
    <div css={styles.container}>
      <motion.div css={styles.main} {...pagePopup}>
        <motion.div
          animate="visible"
          variants={infiniteVibration}
        >
          <Title />
        </motion.div>
        <h3>〜失われた金銭感覚を求めて〜</h3>
        <div css={styles.buttonContainer}>
          <div css={styles.inputContainer}>
            <input
              type="text"
              css={styles.textInput}
              ref={playerNameRef}
              placeholder="名前を入力"
              onFocus={(e) => e.target.select()}
              maxLength={15}
            />
            {userId !== undefined ? (
              <SigninButton
                name="サインアウト"
                onClick={firebaseSignOut}
                onHoverStart={() =>
                  handleOnHover('rgb(199, 81, 250)')
                }
              />
            ) : (
              <SigninButton
                name="サインイン"
                onClick={firebaseSignIn}
                onHoverStart={() =>
                  handleOnHover('rgb(199, 81, 250)')
                }
              />
            )}
          </div>

          <MainButton
            delay={0.1}
            color="rgb(199, 81, 250)"
            name="一人で遊ぶ"
            onClick={() => handlePlayGame('/solo/quiz')}
            onHoverStart={() =>
              handleOnHover('rgb(199, 81, 250)')
            }
            disabled={buttonDisabled}
          />
          <MainButton
            delay={0.2}
            color="rgb(0, 225, 255)"
            name="みんなで遊ぶ"
            onClick={handlePlayMultiGame}
            disabled={
              userId === undefined || buttonDisabled
                ? true
                : false
            }
            onHoverStart={() =>
              handleOnHover('rgb(0, 225, 255)')
            }
          />
          <MainButton
            delay={0.1}
            color="rgb(18, 255, 34)"
            name="アドベンチャー"
            onClick={() =>
              handlePlayGame('/solo/adventure')
            }
            onHoverStart={() =>
              handleOnHover('rgb(18, 255, 34)')
            }
            disabled={buttonDisabled}
          />
        </div>

        <motion.a
          {...SideFlowing}
          css={styles.credit}
          href="https://developers.rakuten.com/"
          target="_blank"
        >
          Supported by Rakuten Developers
        </motion.a>
      </motion.div>
      {isCounting && (
        <div css={styles.countdown}>
          <motion.div
            {...circularWaves}
            css={styles.countTime}
            style={{
              border: `20px solid ${hoveredColor}`,
              color: hoveredColor,
              boxShadow: `0 0 30px ${hoveredColor}`,
            }}
          >
            {countDown}
          </motion.div>
        </div>
      )}
      <Background selected={hoveredColor} />
    </div>
  );
}

const styles = {
  container: css`
    color: #fff;
  `,
  main: css`
    margin: 0 auto;
    margin-top: 150px;
    text-align: center;
  `,
  buttonContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `,
  inputContainer: css`
    display: flex;
    margin: 0 auto;
  `,
  textInput: css`
    background-color: rgb(0, 0, 0, 0);
    border: 2px solid #fff;
    box-shadow: 0 0 5px #fff;
    font-size: 30px;
    align-self: center;
    width: 500px;
    text-align: center;
    border-radius: 100px;
    padding: 10px 20px;
    margin-top: 30px;
    color: #fff;
  `,
  countdown: css`
    position: absolute;
    background-color: rgb(0, 0, 0, 0.5);
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  countTime: css`
    background-color: rgb(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 800px;
    height: 800px;
    border: 15px solid #fff;
    font-size: 400px;
    line-height: 2;
    text-align: center;
  `,
  credit: css`
    color: #fff;
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    text-align: center;
  `,
};
