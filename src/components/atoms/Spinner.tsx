import clsx from 'clsx';
import React from 'react';

type SpinnerType = {
  size: 'loading-lg' | 'loading-xs' | 'loading-sm' | 'loading-md';
};
const Spinner: React.FC<SpinnerType> = ({ size = 'loading-lg' }) => {
  return <span className={clsx('loading loading-spinner', size)}></span>;
};
export default Spinner;
