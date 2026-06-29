---
mode: agent
agent: android-gradle
name: android-gradle-prompt
description: "Prompt for the android-gradle agent. Configures Gradle build files, SDK versions, signing configs, dependency management, and ProGuard/R8 rules."
---

### Requirements

1. **SDK Versions:** Set `compileSdk`, `minSdk`, `targetSdk` in `android/app/build.gradle`. Use `ext` or version catalog for consistency.
2. **Signing Config:** Define signing configs using GitHub Secrets (`KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`). Never hardcode secrets.
3. **Dependencies:** Pin dependency versions explicitly (avoid `+`). Use Kotlin DSL (`.kts`) where possible.
4. **ProGuard/R8:** Maintain `android/app/proguard-rules.pro`. Add keep rules for new dependencies.
5. **Build Variants:** Support `debug` and `release` variants with environment-specific configs.

### Constraints

- Gradle via Flutter CLI — do not bypass Flutter's build system
- All signing configs use GitHub Secrets — never hardcode
- Release signing requires `CONFIRM_RELEASE_BUILD` token
- Keep Gradle wrapper version aligned with Flutter's requirements

### Success Criteria

- `flutter build apk --debug` compiles without errors
- `flutter build appbundle --release` compiles with signing config (with user confirmation)
- Gradle dependency conflicts are resolved
- ProGuard/R8 rules cover all new dependencies

### Usage Template

```
Update [file] with:
- compileSdk: [version], minSdk: [version], targetSdk: [version]
- [Optional] Signing config using secrets: [secret names]
- [Optional] Dependency: [name:version]
Show the diff and wait for my confirmation before applying.
```

### Chat Example

```
User: Update android/app/build.gradle to target SDK 34, min SDK 26.
Agent: Updates compileSdk, targetSdk to 34, minSdk to 26.
Shows the diff and waits for confirmation before applying.
```
