import React from 'react';
import { Box, Text } from 'ink';
import figlet from 'figlet';
import { formatTime } from '../utils/formatTime.js';

interface TimerDisplayProps {
  remainingSeconds: number;
  isPaused: boolean;
}

export function TimerDisplay({ remainingSeconds, isPaused }: TimerDisplayProps): React.ReactElement {
  const timeString = formatTime(remainingSeconds);
  const asciiTime = figlet.textSync(timeString, { font: 'Big' });

  return (
    <Box flexDirection="column" alignItems="center">
      <Text color="green">{asciiTime}</Text>
      {isPaused && (
        <Text color="yellow" bold>
          PAUSED
        </Text>
      )}
    </Box>
  );
}
