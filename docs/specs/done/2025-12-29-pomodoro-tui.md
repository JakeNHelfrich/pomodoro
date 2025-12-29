# Pomodoro Timer TUI

## Problem Statement

A minimal, distraction-free timer that helps maintain focus during work sessions, living in the terminal where developers already spend their time.

## Requirements

### Must-have

- User inputs duration in minutes before starting
- ASCII art countdown display (updates every second)
- Pause/Resume functionality (spacebar)
- Quit option (q)
- macOS notification when timer completes
- "PAUSED" indicator when paused

### Out of scope (for now)

- Break timers
- Sound alerts
- Session history/statistics

## Technical Constraints

- **Language:** TypeScript
- **TUI framework:** Ink
- **ASCII art:** figlet
- **Notifications:** node-notifier
- **Design:** Extensible architecture for future features

## Open Questions

None - proceeding with sensible defaults.
