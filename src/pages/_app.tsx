import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import { useIsomorphicEffect } from '@/utils/IsomorphicEffect';
import { useState } from 'react';
import { css } from '@emotion/react';

const Wrapper = styled.div.attrs<{ renderScale: number }>(
  (p) => ({
    style: {
      transform: `scale(${p.renderScale}) translate(-50%,-50%)`,
    },
  })
)``;

const styles = {
  body: css`
    width: 100%;
    height: 100%;
  `,
  container: css`
    position: absolute;
    width: 1980px;
    height: 1000px;
    transform-origin: 0 0 0;
    top: 50%;
    left: 50%;
  `,
};

export default function App({
  Component,
  pageProps,
  router,
}: AppProps) {
  const [scale, setScale] = useState(1);
  const IsomorphicEffect = useIsomorphicEffect();
  IsomorphicEffect(() => {
    const onResize = () => {
      const targetScale = Math.min(
        window.innerWidth / 1980,
        window.innerHeight / 1000
      );
      setScale(targetScale);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });
  return (
    <RecoilRoot>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <div css={styles.body}>
          <Wrapper
            css={styles.container}
            {...{ renderScale: scale }}
          >
            <Component {...pageProps} key={router.asPath} />
          </Wrapper>
        </div>
      </AnimatePresence>
    </RecoilRoot>
  );
}
