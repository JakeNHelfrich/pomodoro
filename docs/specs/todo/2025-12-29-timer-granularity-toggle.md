# Timer Granularity Toggle

## Problem Statement

Users need flexibility to set timers for short tasks (e.g., 90-second stretches) without mental math. Currently the setup screen only accepts minutes.

## Requirements

### Must-have

- Press Tab on setup screen to cycle units: minutes → seconds → hours → minutes...
- Display current unit clearly next to the input value
- Show hint about Tab functionality (e.g., `"Tab: change unit"` in dimmed text)
- Convert input value when switching units (25 min → 1500 sec)
- Minutes remains the default

### Nice-to-have

- Shift+Tab to cycle backwards

## Technical Notes

- Modify `DurationInput.tsx`
- Use existing `useInput` hook to handle Tab key (`key.tab`)
- Match existing hint style (dimmed text, similar to "Press Enter to start")

## Open Questions

None
