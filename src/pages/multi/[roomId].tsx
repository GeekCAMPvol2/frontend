import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { MultiplayGameScreen } from '@/features/multiplay/components/MultiplayGameScreen';

const MultiplayGamePage = () => {
  const router = useRouter();

  if (
    router.query.roomId != null &&
    typeof router.query.roomId !== 'string'
  ) {
    throw new Error('roomId is not string');
  }
  const roomId = router.query.roomId;

  const goBackFromMultiplay = useCallback(
    () => router.push('/'),
    []
  );

  return (
    <MultiplayGameScreen
      {...{ roomId, goBackFromMultiplay }}
    />
  );
};

export default MultiplayGamePage;
