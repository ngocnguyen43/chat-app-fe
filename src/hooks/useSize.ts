import { RefObject, useCallback, useLayoutEffect, useState } from 'react';

import { useResizeObserver } from './useResizeObserver';

export const useSize = (target: RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [target.current]);

  const resizeCallback = useCallback((entry: ResizeObserverEntry) => setSize(entry.contentRect), []);
  // Where the magic happens
  useResizeObserver(target, resizeCallback);
  return size;
};
