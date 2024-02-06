import { useContext } from 'react';
import { DialogContext } from '../store/context';

export function useConfirm() {
  return useContext(DialogContext);
}
