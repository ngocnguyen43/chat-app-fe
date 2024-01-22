import React from 'react';
import { useResizeObserver } from './useResizeObserver';

export const useSize = (target: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  React.useLayoutEffect(() => {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [target.current]);

  const resizeCallback = React.useCallback((entry: ResizeObserverEntry) => setSize(entry.contentRect), []);
  // Where the magic happens
  useResizeObserver(target, resizeCallback);
  return size;
};
