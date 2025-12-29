import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

type TimeUnit = 'minutes' | 'seconds' | 'hours';

const UNIT_TO_SECONDS: Record<TimeUnit, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
};

const UNIT_CYCLE: TimeUnit[] = ['minutes', 'seconds', 'hours'];

function convertValue(value: number, fromUnit: TimeUnit, toUnit: TimeUnit): number {
  const totalSeconds = value * UNIT_TO_SECONDS[fromUnit];
  return Math.round(totalSeconds / UNIT_TO_SECONDS[toUnit]);
}

interface DurationInputProps {
  onSubmit: (seconds: number) => void;
}

export function DurationInput({ onSubmit }: DurationInputProps): React.ReactElement {
  const [value, setValue] = useState('0');
  const [unit, setUnit] = useState<TimeUnit>('minutes');

  useInput((input, key) => {
    if (key.return) {
      const numValue = parseInt(value, 10);
      if (numValue > 0) {
        const seconds = numValue * UNIT_TO_SECONDS[unit];
        onSubmit(seconds);
      }
    } else if (key.tab) {
      const currentIndex = UNIT_CYCLE.indexOf(unit);
      const nextIndex = key.shift
        ? (currentIndex - 1 + UNIT_CYCLE.length) % UNIT_CYCLE.length
        : (currentIndex + 1) % UNIT_CYCLE.length;
      const nextUnit = UNIT_CYCLE[nextIndex];

      const currentValue = parseInt(value, 10) || 0;
      const converted = convertValue(currentValue, unit, nextUnit);
      setValue(String(converted));
      setUnit(nextUnit);
    } else if (key.backspace || key.delete) {
      setValue((prev) => prev.slice(0, -1));
    } else if (/^\d$/.test(input)) {
      setValue((prev) => prev + input);
    }
  });

  return (
    <Box flexDirection="column" alignItems="center">
      <Text>Enter duration:</Text>
      <Box marginTop={1}>
        <Text color="green" bold>
          {value || '0'}
        </Text>
        <Text dimColor> {unit}</Text>
      </Box>
      <Box marginTop={1}>
        <Text dimColor>
          <Text color="cyan">Tab</Text>: change unit | <Text color="cyan">Enter</Text>: start
        </Text>
      </Box>
    </Box>
  );
}
