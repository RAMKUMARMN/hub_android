---
applyTo: "**/*.gradle,**/*.kts,**/*.xml,**/*.properties"
---

# Project coding standards for Android (Flutter build config)

Apply the [general coding guidelines](./general-coding.instructions.md) to all code.

## Gradle Guidelines
- Use Kotlin DSL (`.kts`) for Gradle build files
- Define SDK versions in `ext` or `buildscript` block for consistency
- Keep dependency versions in a `versions.toml` catalog when possible
- Never hardcode signing configs — use GitHub Secrets
- Pin dependency versions explicitly (avoid `+`)

## Android Manifest & Config Guidelines
- Declare all permissions explicitly in `AndroidManifest.xml`
- Use `tools:replace` for manifest merging conflicts
- Keep `google-services.json` out of version control — load via CI secrets
- ProGuard/R8 rules in `android/app/proguard-rules.pro`
- Target SDK 34+, min SDK 26+

## Flutter Integration Guidelines
- Do not write Flutter/Dart code here — that lives in `hub_mobile/`
- Gradle wrapper and Flutter-generated config should be committed
- Use `flutter build apk` / `flutter build appbundle` for builds, not direct Gradle
- Debug builds use debug keystore; release builds require manual confirmation
- FCM setup requires `google-services.json` and `firebase_messaging` plugin in pubspec

## Agent Guidelines

This repository uses the following agents:

| Agent | File | Purpose |
|---|---|---|
| `android-agent` | `.github/agents/android-agent.agent.md` | Coordinator — routes to single-task agents |
| `android-gradle` | `.github/agents/android-gradle.agent.md` | Gradle build configuration |
| `android-push` | `.github/agents/android-push.agent.md` | FCM push notifications and deep links |
| `android-platform` | `.github/agents/android-platform.agent.md` | Android permissions and platform features |
| `android-ci` | `.github/agents/android-ci.agent.md` | CI workflows for Android builds |
| `android-planner` | `.github/agents/android-planner.agent.md` | Implementation planning |
| `android-code-reviewer` | `.github/agents/android-code-reviewer.agent.md` | Code review before merge |

Prompts are in `.github/prompts/` and skills in `.agents/skills/`.

When asking for help, prefix your request with the agent name:
- "@android-gradle Update android/app/build.gradle to target SDK 34"
- "@android-push Verify FCM setup for hub_android"
- "@android-platform Add CAMERA permission to AndroidManifest"
- "@android-ci Create android-build.yml workflow"
