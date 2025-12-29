export type TimerStatus = 'idle' | 'running' | 'paused' | 'complete';

export interface TimerState {
  totalSeconds: number;
  remainingSeconds: number;
  status: TimerStatus;
}
