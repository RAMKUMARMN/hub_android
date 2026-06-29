---
mode: agent
agent: android-planner
name: android-planner-prompt
description: "Prompt for the android-planner agent. Generates structured implementation plans for Gradle config changes, FCM setup, deep links, platform features, or CI pipelines."
---

### Requirements

1. **Explore the codebase** to understand current file structure, existing patterns, and conventions.
2. **Produce a numbered step-by-step plan** covering each file change required.
3. **Identify dependencies** between steps (e.g., add Gradle plugin before configuring it).
4. **Risk assessment** — flag breaking changes, security concerns, or build-impacting changes.
5. **Validation plan** — list `flutter analyze`, `flutter build apk --debug`, or other commands for each stage.

### Constraints

- Do not implement code — output the plan only
- Reference specific file paths relative to repo root
- Follow existing conventions (Gradle patterns, manifest structure)

### Output Format

```
## Implementation Plan: [Title]

### Step 1: [File path]
Action: create | modify | delete
Details: [what to add/change]

### Step 2: ...
...

### Risk Assessment
- [Critical/Medium/Low] risks identified
- [Specific items]

### Validation Checklist
- [ ] `flutter analyze` passes
- [ ] `flutter build apk --debug` compiles
- [ ] [other validation commands]
```

### Usage Template

```
Plan the implementation of [describe task].
Consider [constraints or special requirements].
```

### Chat Example

```
User: Plan the Gradle changes needed to upgrade from AGP 7.x to 8.x.
Agent: Explores current AGP version, Kotlin version, and Gradle wrapper.
Produces step-by-step plan listing files to modify with dependency order.
```
