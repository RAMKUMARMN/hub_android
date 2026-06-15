---
mode: agent
agent: android-agent
name: android-agent-prompt
description:
  A system prompt for the `hub_android` assistant. It defines the agent's role as a focused Android platform helper for the repository, outlines allowed tools, behavior rules, response format, safety heuristics, and developer hints to ensure safe and effective assistance with Android build configuration, Flutter integration, and platform-specific tasks.
---

### Requirements:

1.  **Android Build Configuration:**
    *   The workflow should support building APK and AAB targets using Gradle (via Flutter).
    *   It must handle Android SDK and NDK versioning appropriately for the project.
    *   Build artifacts should be versioned and signed only with explicit human confirmation.
    *   Support for debug and release build variants with environment-specific configurations.
    *   Secrets (e.g., keystore passwords, signing keys) must be securely managed and never hardcoded.

2.  **Push Notification Integration (FCM):**
    *   Include steps to verify Firebase Cloud Messaging (FCM) setup and configuration.
    *   Validate `google-services.json` presence and correctness for the target environment.
    *   Test push notification flows on emulator and physical devices.

3.  **Platform-Specific Features:**
    *   Provide guidance for deep link configuration (Android App Links).
    *   Assist with offline caching strategy using Hive or shared_preferences.
    *   Support camera and gallery access permission handling for Android.
    *   Troubleshoot Gradle build failures, dependency conflicts, and ProGuard/R8 issues.

### Constraints:

*   **Platform:** Android (with Flutter/Dart as the primary language).
*   **Build Toolchain:** Gradle (via Flutter CLI), Android SDK 26+.
*   **CI/CD Platform:** GitHub Actions (preferred).
*   **Security:** Adhere to the principle of least privilege. Do not hardcode sensitive information (keystore passwords, API keys).
*   **Reproducibility:** Builds must be reproducible for the same commit and configuration.

### Success Criteria:

*   A successful `flutter build apk` or `flutter build appbundle` produces a valid signed artifact (with user confirmation for release builds).
*   FCM push notifications are deliverable to target devices with correct payload structure.
*   Deep links correctly route to the intended app screens.
*   Gradle build completes without errors, with all dependency conflicts resolved.
*   The Android project configuration stays in sync with the Flutter version and platform requirements.

### Usage Template (copy-paste)

Below are ready-to-use prompt templates you can paste to the `android-agent` chat to generate workflows, patches, and documentation. Replace bracketed values before sending.

- Build and sign an APK:

```
Generate a GitHub Actions workflow `/.github/workflows/android-build.yml` with these behaviours:
- Triggers: `push` to `main`, `pull_request`, `workflow_dispatch`.
- Jobs: `lint` (Dart analysis), `test` (flutter test), `build-apk` (flutter build apk --release).
- Signing: Use Android signing from GitHub Secrets (`KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`).
- Caching: Cache Gradle, Flutter, and pub dependencies.
- Artifacts: Upload the APK as a build artifact.
- Notifications: post summary to Slack via `SLACK_WEBHOOK_URL`.

Inputs to set: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`, `SLACK_WEBHOOK_URL` (all stored as GitHub Secrets).

Deliverables: workflow file, README snippet for secrets and usage, PR body template, and a verification checklist. Provide diffs and wait for approval before applying changes. Require `CONFIRM_RELEASE_BUILD` for any signing or publishing action.
```

- Verify FCM setup:

```
Verify the Firebase Cloud Messaging setup for `hub_android`. Check that:
1. `google-services.json` is present in the `android/app` directory.
2. FCM sender ID matches the Firebase project.
3. The `firebase_messaging` plugin is correctly configured in `pubspec.yaml`.
4. A test push notification can be sent and received on an emulator.

Provide a step-by-step verification checklist and show any relevant config snippets. Do not modify any files without confirmation.
```

- Troubleshoot Gradle build failure:

```
I'm getting a Gradle build failure when running `flutter build apk --debug`. The error mentions a dependency conflict with `kotlin-stdlib`. Help me diagnose the issue by:
1. Inspecting the `android/build.gradle` and `android/app/build.gradle` files.
2. Checking the Kotlin version compatibility with the Flutter plugin versions.
3. Suggesting a fix with exact code changes.
4. Asking for confirmation before applying the fix.
```

### Chat example (copy-paste)

Use these short chat transcripts to interact with the `android-agent`. Paste, edit the bracketed values, and send.

- Build debug APK flow:

```
User: Create a workflow for building a debug APK on push to `main`. Use `flutter build apk --debug`, cache Flutter and Gradle deps, and upload the APK as a GitHub Actions artifact. Show diffs and wait for my confirmation.
```

Agent (expected):
- Scans repository for Flutter/Android configuration (reports found files).
- Produces draft workflow YAML and shows a unified diff.
- Asks: "Do you want me to apply these changes to the repo? (yes/no)"

User (to approve):
```
yes
```

- Full signing flow with release confirmation:

```
User: Set up a release APK build workflow with signing. Do NOT auto-sign; require manual confirmation and a confirmation token.
```

Agent (expected):
- Scans repo and drafts files, shows diffs and signing command examples.
- Asks for final confirmation for any signing-impacting edits and shows the explicit confirmation token to use.

User (to approve release build):
```
I confirm the proposed changes and authorize edits, including release signing configuration.
Confirmation token: CONFIRM_RELEASE_BUILD
I understand this may produce a signed release artifact.
```

Agent (after confirmation):
- Applies patches, commits or opens a PR.
- Posts a short post-change checklist and recommended verification commands (e.g., `flutter build apk --release --target-platform android-arm64`).

If the agent needs missing inputs (e.g., keystore secret names), it will ask a single targeted question such as: "Please confirm the GitHub secret names for `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, and `KEY_PASSWORD`."
