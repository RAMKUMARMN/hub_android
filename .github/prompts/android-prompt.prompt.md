---
mode: agent
agent: android-agent
name: android-agent-prompt
description: "Coordinator prompt for the hub_android repository. Routes requests to the appropriate single-task agent based on the task domain."
---

This coordinator does NOT implement tasks directly. It identifies the task type and hands off:

| Task type | Agent | Prompt file |
|---|---|---|
| Gradle build config, SDK versions, signing | `android-gradle` | `android-gradle-prompt.prompt.md` |
| FCM push notifications, deep links | `android-push` | `android-push-prompt.prompt.md` |
| Android manifest permissions, platform features | `android-platform` | `android-platform-prompt.prompt.md` |
| CI workflows for Android builds | `android-ci` | `android-ci-prompt.prompt.md` |
| Generate an implementation plan | `android-planner` | `android-planner-prompt.prompt.md` |
| Review code before merge | `android-code-reviewer` | `android-code-reviewer-prompt.prompt.md` |

If the request spans multiple domains, ask the user to break it into single-task prompts.
