/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';

/**
 * Debounce a function
 * @param callback
 * @param delay The delay in milliseconds
 */
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
