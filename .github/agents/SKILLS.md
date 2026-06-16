---
name: android-agent-skills
description: Skills for the `hub_android` assistant: Gradle build configuration, Flutter Android integration, FCM setup, deep links, offline caching, and safe build management. The agent helps maintainers set up and manage Android project configuration in the repository, with a strong emphasis on safety and human oversight for release-signing actions.
---
# Android Agent — Skills Catalog

This document describes the skills, inputs/outputs, tools, safety constraints, and example prompts the `android-agent` (see `android agent.agent.md`) supports for the `hub_android` repository.

**Purpose**
- Provide a compact, discoverable list of the agent's actionable capabilities so maintainers can quickly know what to ask and what to expect.

**Quick summary**
- **Primary domain:** Android build configuration (Gradle via Flutter), FCM push notifications, deep links, offline caching, camera/gallery permissions.
- **Primary outputs:** repository patches/diffs, GitHub Actions workflow files, CI job templates, README snippets, and PR-ready descriptions.
- **Primary safety posture:** Prepare and validate build configuration; never autonomously sign or publish release builds without explicit maintainer confirmation.

## Capabilities

- Generate or update GitHub Actions workflows to run `flutter analyze`, `flutter test`, `flutter build apk`, and (when authorized) `flutter build appbundle --release`.
- Configure Gradle build variants (`debug`, `release`) with environment-specific settings.
- Configure Firebase Cloud Messaging (FCM) via `google-services.json` and verify setup.
- Configure Android App Links (deep linking) with intent filters and asset links.
- Produce repository patches via `apply_patch` (small, focused edits) and provide diffs for review before applying.
- Run static checks in CI: `flutter analyze`, `./gradlew lint`, optional detekt integration.
- Draft PR descriptions, risk notes, and post-build verification checklists.
- Create a safe release build job template guarded by typed confirmation and restricted to manual dispatch.

## Inputs the agent expects (ask if missing)
- `build_variant` -- which build variant to target: `debug`, `release`.
- `target_sdk`, `min_sdk`, `compile_sdk` -- Android SDK versions.
- `signing_config` -- repo secret names for `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.
- `fcm_config` -- repo secret name for `google-services.json` or `FCM_SERVER_KEY`.
- `notification` config -- repo secret name for `SLACK_WEBHOOK_URL` or `NOTIFICATION_EMAIL`.

## Outputs the agent produces
- New or modified workflow YAML files in `/.github/workflows/` (e.g., `android-build.yml`).
- README/docs snippets describing required secrets and how to run the workflow.
- PR-ready changelog/summary and verification checklist.
- Patches (diffs) applied with `apply_patch` when given explicit permission.

## Tools the agent uses
- `apply_patch` -- create or update repo files (used only after human confirmation for impactful changes).
- `read_file`, `file_search`, `grep_search` -- inspect repo layout and find Gradle or config files.
- `manage_todo_list` -- track multi-step tasks and report progress back to the maintainer.
- `run_in_terminal` -- only if explicitly requested; otherwise the agent outputs commands for maintainers to run locally or in CI.

## Safety, boundaries, and policies

- Never request or accept raw secrets in chat messages. Instead, the agent asks for secret *names* (e.g., `KEYSTORE_BASE64`, `KEY_ALIAS`) and instructs maintainers to set them in GitHub Secrets.
- Never perform release signing or Play Store upload without an explicit confirmation token: `CONFIRM_RELEASE_BUILD` (maintainer must provide this token before the agent takes any action that would modify release signing configs or automated build steps).
- No direct Google Play Console API operations.
- No automatic PR merging or repo-level approvals -- the agent drafts, explains, and optionally creates patches/PRs after explicit permission.

## Confirmation and escalation rules
- Low-risk edits (formatting, docs, dependency version bumps): agent may apply patches after a single maintainer approval.
- Medium-risk edits (build config changes, new Gradle plugins, FCM setup changes): require an explicit approval message before applying patches.
- High-risk edits (changes that enable or run release signing, alter keystore configuration, or modify Play Store upload steps): require the typed confirmation `CONFIRM_RELEASE_BUILD` and a second acknowledgment (e.g., "I understand this will produce a signed release artifact").

## Example prompts (how to ask the agent)
- "Create an `android-build.yml` workflow that supports `debug` and `release` variants; use `KEYSTORE_BASE64` and `KEY_ALIAS` repo secrets; require approval for release signing; post results to Slack via `SLACK_WEBHOOK_URL`."
- "Add the `CAMERA` and `READ_MEDIA_IMAGES` permissions to the Android manifest and update the README -- show me the patch before applying."
- "Draft a release build workflow that requires typed confirmation `CONFIRM_RELEASE_BUILD` and logs the operator who invoked it."

## Typical workflows the agent supports

1. Discovery: scan repo for `android/`, `pubspec.yaml`, `build.gradle`, and existing config files.
2. Draft: create a draft build workflow with `analyze`, `test`, `build` stages.
3. Review: produce a PR description, risk summary, and required secrets docs.
4. Apply (human-gated): upon confirmation, the agent can apply small, non-release patches or add CI steps; release builds require `CONFIRM_RELEASE_BUILD`.

## Error handling & troubleshooting behavior
- If `flutter analyze` or `./gradlew lint` fails, the agent returns a concise diagnostics summary and suggests fixes.
- If `flutter build` shows missing SDK or dependency errors, the agent highlights them, explains likely causes, and recommends fixes.

## How progress is reported
- The agent uses `manage_todo_list` to break tasks into steps (discover -> draft -> patch -> verify) and will report the current step and completed steps in chat messages.

## Where to find the agent's configuration and prompts
- Agent behavior is documented in `/.github/agents/android agent.agent.md` and the repository prompt lives at `/.github/prompts/android-prompt.prompt.md`.

## Maintenance notes
- Keep `SKILLS.md` aligned with `android agent.agent.md` and `android-prompt.prompt.md` -- update all three when adding new capabilities (for example, support for a new linter or a different build system).
