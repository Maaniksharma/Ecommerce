import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';

function useToast() {
  return useContext(ToastContext);
}

export default useToast;
