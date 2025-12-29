import React, { useState, useCallback } from 'react';
import { Box, useApp, useInput, useStdout } from 'ink';
import { TimerDisplay } from './components/TimerDisplay.js';
import { StatusBar } from './components/StatusBar.js';
import { DurationInput } from './components/DurationInput.js';
import { useTimer } from './hooks/useTimer.js';
import { notifyTimerComplete } from './services/notifications.js';

type AppScreen = 'input' | 'timer';

interface AppProps {
  initialDuration?: number;
}

export function App({ initialDuration }: AppProps): React.ReactElement {
  const { exit } = useApp();
  const { stdout } = useStdout();
  const [screen, setScreen] = useState<AppScreen>(initialDuration ? 'timer' : 'input');

  const handleComplete = useCallback(() => {
    notifyTimerComplete();
    exit();
  }, [exit]);

  const { remainingSeconds, status, start, pause, resume, reset } = useTimer(handleComplete);

  const handleDurationSubmit = useCallback(
    (minutes: number) => {
      start(minutes);
      setScreen('timer');
    },
    [start]
  );

  // Start timer immediately if initial duration provided
  React.useEffect(() => {
    if (initialDuration && screen === 'timer' && status === 'idle') {
      start(initialDuration);
    }
  }, [initialDuration, screen, status, start]);

  const handleBack = useCallback(() => {
    reset();
    setScreen('input');
  }, [reset]);

  useInput((input) => {
    if (screen !== 'timer') return;

    if (input === 'q') {
      handleBack();
    } else if (input === ' ') {
      if (status === 'running') {
        pause();
      } else if (status === 'paused') {
        resume();
      }
    }
  });

  const isPaused = status === 'paused';

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={stdout.rows}
      width={stdout.columns}
    >
      {screen === 'input' ? (
        <DurationInput onSubmit={handleDurationSubmit} />
      ) : (
        <>
          <TimerDisplay remainingSeconds={remainingSeconds} isPaused={isPaused} />
          <StatusBar isPaused={isPaused} />
        </>
      )}
    </Box>
  );
}
