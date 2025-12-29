# Pomodoro App

Terminal UI pomodoro timer for productivity management.

## Feature Development Workflow

### 1. Specs

Feature specifications live in `docs/specs/`:

- `todo/` - Specs ready for implementation
- `done/` - Completed features (for reference)
- `_template.md` - Template for new specs

Naming convention: `YYYY-MM-DD-feature-name.md`

Create a new spec interactively:

```
/new-spec pomodoro timer with breaks and session tracking
```

Or manually copy the template:

```bash
cp docs/specs/_template.md docs/specs/todo/YYYY-MM-DD-feature-name.md
```

### 2. Planning

Use plan mode to generate implementation plans:

```bash
claude --permission-mode plan
> Read docs/specs/todo/YYYY-MM-DD-feature-name.md and follow the planning prompt
```

Or use the slash command:

```
/plan-from-spec docs/specs/todo/YYYY-MM-DD-feature-name.md
```

Plans are saved to `.claude/plans/`

### 3. Implementation

Start a fresh session and reference the plan:

```
> Implement following .claude/plans/feature-name.md
```

### 4. Completion

After merging, move the spec:

```bash
git mv docs/specs/todo/YYYY-MM-DD-feature.md docs/specs/done/
```

## Project Structure

```
.claude/
├── plans/          # AI-generated implementation plans
├── commands/       # Reusable slash commands
└── agents/         # Custom subagents

docs/
└── specs/          # Feature specifications
    ├── todo/
    └── done/
```

## Commands

- Build: `npm run build`
- Test: `npm test`
- Run: `npm run dev` or `npm run dev 25` (with preset minutes)
