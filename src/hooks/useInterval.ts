import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delayMs: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delayMs !== null) {
      let id = setInterval(tick, delayMs);
      return () => clearInterval(id);
    }
  }, [delayMs]);
}