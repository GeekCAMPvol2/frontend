import type {
  GameQuestion,
  //   Room,
  //   RoomGameStartedState,
} from '@/types/room';
// import type { Timestamp as FirestoreTimestamp } from 'firebase/firestore';

export type FirebaseRoomGame =
  | { status: 'prepareStart' }
  | {
      status: 'quiz';
      remainMillis: number;
      questionIndex: number;
      question: GameQuestion;
    }
  | {
      status: 'ans';
      questionIndex: number;
      remainMillis: number;
      question: GameQuestion;
    }
  | { status: 'fin' };

export const calculateGame = (
  currentMillis: number,
  timeLimitSeconds: number,
  // gameOverMillis: number,
  questions: GameQuestion[]
): FirebaseRoomGame | undefined => {
  if (!Array.isArray(questions)) return;

  let i;
  for (i = 0; i < questions.length; i++) {
    const qMillis = questions[i].presentedAt.toMillis();
    if (currentMillis < qMillis) break;
  }

  // Before first question
  if (i < 1) return { status: 'prepareStart' };

  // When last question has begun
  if (i >= questions.length) {
    const lastQ = questions[questions.length - 1];
    const lastQMillis = lastQ.presentedAt.toMillis();
    const qDurationSeconds = timeLimitSeconds + 10;
    const gameOverMillis =
      lastQMillis + qDurationSeconds * 1000;
    // After game over
    if (currentMillis < gameOverMillis) {
      return { status: 'fin' };
    }
  }

  const questionIndex = i - 1;
  const question = questions[questionIndex];
  const presentedAtMillis = question.presentedAt.toMillis();

  const hasQuizClosed =
    currentMillis >
    presentedAtMillis + timeLimitSeconds * 1000;

  const nextActionAtMillis =
    presentedAtMillis +
    timeLimitSeconds * 1000 +
    (hasQuizClosed ? 10 : 0) * 1000;

  return {
    status: hasQuizClosed ? 'ans' : 'quiz',
    questionIndex,
    question,
    remainMillis: nextActionAtMillis - currentMillis,
  };
};
