import { useDispatch } from 'react-redux';

import { ApplicationDispatch } from '../store/store';

export const useAppDispatch: () => ApplicationDispatch = useDispatch;
