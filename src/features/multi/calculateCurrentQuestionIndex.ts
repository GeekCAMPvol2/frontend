import type {
  GameQuestion,
  //   Room,
  //   RoomGameStartedState,
} from '@/types/room';
// import type { Timestamp as FirestoreTimestamp } from 'firebase/firestore';

export const calculateCurrentQuestionIndex = (
  currentMillis: number,
  gameOverMillis: number,
  questions: GameQuestion[]
): number | undefined => {
  if (!Array.isArray(questions)) return;

  let i;
  for (i = 0; i < questions.length; i++) {
    const qMillis = questions[i].presentedAt.toMillis();
    if (currentMillis < qMillis) break;
  }

  // Before first question
  if (i < 1) return;

  // After game over
  if (
    i >= questions.length &&
    currentMillis < gameOverMillis
  ) {
    return;
  }

  return i - 1;
};
