import { useState, useCallback } from 'react';
import { useInterval } from './useInterval.js';
import type { TimerStatus } from '../types/index.js';

interface UseTimerReturn {
  remainingSeconds: number;
  status: TimerStatus;
  start: (durationMinutes: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export function useTimer(onComplete: () => void): UseTimerReturn {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [status, setStatus] = useState<TimerStatus>('idle');

  useInterval(
    () => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setStatus('complete');
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    },
    status === 'running' ? 1000 : null
  );

  const start = useCallback((durationMinutes: number) => {
    setRemainingSeconds(durationMinutes * 60);
    setStatus('running');
  }, []);

  const pause = useCallback(() => {
    if (status === 'running') {
      setStatus('paused');
    }
  }, [status]);

  const resume = useCallback(() => {
    if (status === 'paused') {
      setStatus('running');
    }
  }, [status]);

  const reset = useCallback(() => {
    setRemainingSeconds(0);
    setStatus('idle');
  }, []);

  return { remainingSeconds, status, start, pause, resume, reset };
}
