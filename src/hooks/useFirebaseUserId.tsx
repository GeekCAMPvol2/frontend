import { firebaseUserIdState } from '@/store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

export const useFirebaseUserId = () =>
  useRecoilValue(firebaseUserIdState);
