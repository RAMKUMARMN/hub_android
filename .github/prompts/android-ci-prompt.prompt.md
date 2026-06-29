---
mode: agent
agent: android-ci
name: android-ci-prompt
description: "Prompt for the android-ci agent. Creates or updates GitHub Actions CI workflows for Android builds with lint, test, build, signing, and notifications."
---

### Requirements

1. **Workflow Layout:** Create `.github/workflows/android-build.yml` with jobs for `lint` (flutter analyze), `test` (flutter test), and `build` (APK or AAB).
2. **Caching:** Cache Gradle (`~/.gradle`), Flutter (`~/.pub-cache`), and pub dependencies.
3. **Signing:** Use Android signing from GitHub Secrets (`KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`). Guard release signing behind typed confirmation.
4. **Artifacts:** Upload build artifacts (APK/AAB) as GitHub Actions artifacts.
5. **Notifications:** Post build summary to Slack via `SLACK_WEBHOOK_URL` secret.

### Constraints

- Use `flutter build` commands, not direct Gradle
- Release signing job requires `CONFIRM_RELEASE_BUILD` confirmation token
- Secrets referenced by name — never inline values
- `workflow_dispatch` trigger for manual release builds

### Success Criteria

- Workflow triggers on push, pull_request, and workflow_dispatch
- `flutter analyze` passes
- `flutter test` passes
- Debug APK builds and uploads as artifact
- Release build job exists and is guarded by confirmation token

### Usage Template

```
Create a CI workflow with:
- Build type: [debug | release]
- Triggers: [push, PR, workflow_dispatch]
- [Optional] Signing secrets: [secret names]
- [Optional] Notification: [Slack webhook secret]
Show the diff and wait for my confirmation before applying.
```

### Chat Example

```
User: Create an android-build.yml workflow with lint, test, and
build-apk jobs for debug builds. Cache Gradle and Flutter deps.
Agent: Creates the workflow YAML, shows diff, waits for confirmation.
```
