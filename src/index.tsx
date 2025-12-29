#!/usr/bin/env node
import React from 'react';
import fs from 'fs';
import { render } from 'ink';
import { App } from './App.js';

// Use alternate screen buffer (like vim, less, etc.)
const enterAltScreen = '\x1b[?1049h\x1b[H';
const exitAltScreen = '\x1b[?1049l';

// Enter alternate screen
fs.writeSync(1, enterAltScreen);

const args = process.argv.slice(2);
const initialDuration = args[0] ? parseInt(args[0], 10) : undefined;

const { unmount, waitUntilExit } = render(<App initialDuration={initialDuration && initialDuration > 0 ? initialDuration : undefined} />);

// Restore screen on normal exit
waitUntilExit().then(() => {
  fs.writeSync(1, exitAltScreen);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  unmount();
  fs.writeSync(1, exitAltScreen);
  process.exit(0);
});
