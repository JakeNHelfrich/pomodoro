import React from 'react';
import { Box, Text } from 'ink';

interface StatusBarProps {
  isPaused: boolean;
}

export function StatusBar({ isPaused }: StatusBarProps): React.ReactElement {
  return (
    <Box marginTop={1}>
      <Text dimColor>
        <Text color="cyan">Space</Text>: {isPaused ? 'resume' : 'pause'} | <Text color="cyan">q</Text>: back
      </Text>
    </Box>
  );
}
