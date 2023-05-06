import { functions } from '@/lib/firebase';
import {
  HttpsCallable,
  httpsCallable,
} from 'firebase/functions';

export const answerPrice = async (
  roomId: string,
  questionIndex: number,
  price: number
) => {
  const answerPriceCallback: HttpsCallable<{
    roomId: string;
    questionIndex: number;
    answeredPrice: number;
  }> = httpsCallable(functions, 'answerPrice');

  await answerPriceCallback({
    roomId,
    questionIndex,
    answeredPrice: price,
  });
};
