import { itemData } from '@/store/atoms';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const useAffiliateLinks = () => {
  const item = useRecoilValue(itemData);
  const affiliateLinks = item.map(
    (item) => item.affiliatelink
  );

  return affiliateLinks;
};
