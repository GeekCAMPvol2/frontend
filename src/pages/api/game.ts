import { ItemData } from '@/types/Game';
import {
  HttpsCallable,
  httpsCallable,
} from 'firebase/functions';
import { functions } from '@/lib/firebase';

export const getItemData = async (): Promise<
  ItemData[]
> => {
  const createRoomCallable: HttpsCallable<
    { count: number },
    { questions: ItemData[] }
  > = httpsCallable(functions, 'getSoloQuestions');
  const createRoomResponse = await createRoomCallable({
    count: 5,
  });
  const { questions } = createRoomResponse.data;
  return questions;
};
