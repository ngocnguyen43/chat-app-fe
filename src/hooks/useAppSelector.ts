import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { ApplicationState } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
