import { useContext } from 'react';
import { SellerAuthContext } from '../contexts/SellerAuthContext';

export function useSeller() {
  return useContext(SellerAuthContext);
}
