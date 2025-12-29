import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

interface DurationInputProps {
  onSubmit: (minutes: number) => void;
}

export function DurationInput({ onSubmit }: DurationInputProps): React.ReactElement {
  const [value, setValue] = useState('25');

  useInput((input, key) => {
    if (key.return) {
      const minutes = parseInt(value, 10);
      if (minutes > 0) {
        onSubmit(minutes);
      }
    } else if (key.backspace || key.delete) {
      setValue((prev) => prev.slice(0, -1));
    } else if (/^\d$/.test(input)) {
      setValue((prev) => prev + input);
    }
  });

  return (
    <Box flexDirection="column" alignItems="center">
      <Text>Enter duration in minutes:</Text>
      <Box marginTop={1}>
        <Text color="green" bold>
          {value || '0'}
        </Text>
        <Text dimColor> minutes</Text>
      </Box>
      <Box marginTop={1}>
        <Text dimColor>Press Enter to start</Text>
      </Box>
    </Box>
  );
}
