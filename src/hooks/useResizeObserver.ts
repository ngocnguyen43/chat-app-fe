import { RefObject, useLayoutEffect } from 'react';

import useLatest from '@react-hook/latest';

export type UseResizeObserverCallback = (entry: ResizeObserverEntry, observer: ResizeObserver) => unknown;
function createResizeObserver() {
  let ticking = false;
  let allEntries: ResizeObserverEntry[] = [];

  const callbacks: Map<unknown, Array<UseResizeObserverCallback>> = new Map();

  if (typeof window === 'undefined') {
    return;
  }

  const observer = new ResizeObserver((entries: ResizeObserverEntry[], obs: ResizeObserver) => {
    allEntries = allEntries.concat(entries);
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const triggered = new Set<Element>();
        for (let i = 0; i < allEntries.length; i++) {
          if (triggered.has(allEntries[i].target)) continue;
          triggered.add(allEntries[i].target);
          const cbs = callbacks.get(allEntries[i].target);
          cbs?.forEach((cb) => cb(allEntries[i], obs));
        }
        allEntries = [];
        ticking = false;
      });
    }
    ticking = true;
  });

  return {
    observer,
    subscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      observer.observe(target);
      const cbs = callbacks.get(target) ?? [];
      cbs.push(callback);
      callbacks.set(target, cbs);
    },
    unsubscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      const cbs = callbacks.get(target) ?? [];
      if (cbs.length === 1) {
        observer.unobserve(target);
        callbacks.delete(target);
        return;
      }
      const cbIndex = cbs.indexOf(callback);
      if (cbIndex !== -1) cbs.splice(cbIndex, 1);
      callbacks.set(target, cbs);
    },
  };
}
let _resizeObserver: ReturnType<typeof createResizeObserver>;
const getResizeObserver = () => (!_resizeObserver ? (_resizeObserver = createResizeObserver()) : _resizeObserver);
export function useResizeObserver<T extends HTMLElement>(target: RefObject<T>, callback: UseResizeObserverCallback) {
  const resizeObserver = getResizeObserver();
  const storedCallback = useLatest(callback);

  useLayoutEffect(() => {
    let didUnsubscribe = false;

    const targetEl = target.current;
    if (!targetEl) return;

    function cb(entry: ResizeObserverEntry, observer: ResizeObserver) {
      if (didUnsubscribe) return;
      storedCallback.current(entry, observer);
    }

    resizeObserver?.subscribe(targetEl as HTMLElement, cb);

    return () => {
      didUnsubscribe = true;
      resizeObserver?.unsubscribe(targetEl as HTMLElement, cb);
    };
  }, [target.current, resizeObserver, storedCallback]);

  return resizeObserver?.observer;
}
