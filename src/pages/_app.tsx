import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

export default function App({
  Component,
  pageProps,
  router
}: AppProps) {
  return (
    <RecoilRoot>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </RecoilRoot>
  );
}
