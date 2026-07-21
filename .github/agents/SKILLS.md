---
name: android-agent-skills
description: Skills for the `hub_android` assistant: Gradle build configuration, FCM push notifications, deep links, platform permissions, offline caching, and safe build management. The coordinator routes requests to single-task agents.
---

# Android Agent — Skills Catalog

This document describes the skills, inputs/outputs, tools, safety constraints, and example prompts the `android-agent` (see `android-agent.agent.md`) supports for the `hub_android` repository.

**Purpose**
- Provide a compact, discoverable list of the agent's actionable capabilities so maintainers can quickly know what to ask and what to expect.

**Quick summary**
- **Primary domain:** Android build configuration (Gradle via Flutter), FCM push notifications, deep links, platform permissions, offline caching, CI workflows.
- **Primary outputs:** repository patches/diffs, Gradle build files, AndroidManifest updates, GitHub Actions workflow files, and PR-ready descriptions.
- **Primary safety posture:** Prepare and validate build configuration; never autonomously sign or publish release builds without explicit maintainer confirmation.

## Capabilities

### Gradle Build Configuration (handled by `android-gradle` agent)
- Configure SDK versions (compileSdk, targetSdk, minSdk)
- Set up release signing with GitHub Secrets
- Manage dependencies and version catalogs
- Configure ProGuard/R8 rules
- Manage build variants (debug, release)

### Push Notifications & Deep Links (handled by `android-push` agent)
- FCM setup via google-services.json and firebase_messaging plugin
- Android App Links configuration
- Asset links file generation
- FCM verification and testing

### Platform Features & Permissions (handled by `android-platform` agent)
- Android manifest permission declarations
- File provider setup for camera/gallery
- Offline caching configuration (Hive, shared_preferences)
- Resource configuration

### CI Workflows (handled by `android-ci` agent)
- Flutter analyze, test, and build jobs
- Gradle and Flutter dependency caching
- Release signing with confirmation gates
- Artifact upload and Slack notifications

### Infrastructure Skills (reusable guides in `.agents/skills/`)
- `android-gradle-setup` — Gradle build configuration
- `android-push-setup` — FCM and deep link setup
- `android-platform-setup` — Android permissions and platform features
- `android-ci-workflow` — GitHub Actions CI workflow template
- `android-debug-build` — Build commands and troubleshooting

## Inputs the agent expects (ask if missing)
- `target_sdk` / `min_sdk` / `compile_sdk` — Android SDK versions
- `build_variant` — debug or release
- `signing_config` — secret names for keystore
- `fcm_config` — FCM sender ID, server key secret name
- `deep_link_host` — domain for Android App Links
- `permissions` — list of Android permissions to add

## Outputs the agent produces
- New or modified Gradle build files
- AndroidManifest.xml updates
- FCM configuration and deep link setup
- CI workflow YAML files in `/.github/workflows/`
- README/docs snippets describing required secrets
- PR-ready changelog/summary and verification checklist

## Tools the agent uses
- Repository editing tools for making focused edits
- File search and read tools to inspect repo layout
- Progress tracking tools to manage multi-step tasks

## Safety, boundaries, and policies

- Never request or accept raw secrets in chat messages. Instead, ask for secret *names* (e.g., `KEYSTORE_BASE64`, `KEY_ALIAS`) and instruct maintainers to set them in GitHub Secrets.
- Never perform release signing or Play Store upload without an explicit confirmation token: `CONFIRM_RELEASE_BUILD`.
- No direct Google Play Console API operations.
- No automatic PR merging or repo-level approvals — draft and explain only.

## Confirmation and escalation rules
- Low-risk edits (formatting, docs, dependency version bumps): apply patches after a single maintainer approval.
- Medium-risk edits (build config changes, new Gradle plugins, FCM setup): require explicit approval before applying.
- High-risk edits (changes that enable or run release signing, alter keystore configuration): require `CONFIRM_RELEASE_BUILD` and a second acknowledgment.

## Example prompts (how to ask the agent)

### Gradle Build
- "Update `android/app/build.gradle` to target SDK 34 and min SDK 26."
- "Add Firebase Crashlytics plugin to the Gradle build."

### Push Notifications
- "Verify the FCM setup for hub_android."
- "Configure Android App Links for `app.hub.example.com`."

### Platform Features
- "Add CAMERA and READ_MEDIA_IMAGES permissions to AndroidManifest.xml."
- "Configure Hive for offline caching."

### CI Workflows
- "Create an android-build.yml workflow with lint, test, and build-apk jobs."

## Agent Architecture

The coordinator (`android-agent`) routes to single-task agents:

| Agent | Category | Responsibility |
|---|---|---|
| `android-planner` | Scope/Structure | Implementation planning |
| `android-gradle` | Build Configuration | Gradle build configuration |
| `android-push` | Push Notifications | FCM push notifications and deep links |
| `android-platform` | Platform Features | Android permissions and platform features |
| `android-ci` | CI/CD | CI workflows for Android builds |
| `android-code-reviewer` | Gatekeeper | Code review before merge |

### Architectural Guardrails

| Rule | Description |
|---|---|
| Thin orchestrator | Coordinator never implements, never holds state, never waits. All handoffs use `send: false`. |
| DAG-only delegation | One-way flow, no circular calls (child → coordinator strictly forbidden). |
| Max 2 concurrent agents | No more than two specialized agents active simultaneously. Queue excess and wait for idle. |
| Sequential dispatch | If dependencies exist (e.g., Gradle before CI), dispatch sequentially. Wait between dependent agents. |
| Blocking handoffs | Only child agents may use `send: true` (e.g., code-reviewer → gradle for config validation). |
| One specialist per request | Ambiguous requests ask user to split. Never route to multiple agents for the same request. |

## How progress is reported
- Each agent breaks tasks into steps and reports current/completed steps

## Where to find configuration
- Agent configs: `/.github/agents/*.agent.md`
- Prompts: `/.github/prompts/*.prompt.md`
- Skills: `/.agents/skills/*/SKILL.md`
- Hooks: `/.github/hooks/*.json`
- General guidelines: `/.github/copilot-instructions.md`

## Maintenance notes
- Keep `SKILLS.md` aligned with individual agent files and prompts
- When adding a new skill, create `/.agents/skills/<name>/SKILL.md` and update this catalog
- When adding a new single-task agent, create the agent file, prompt file, register it in the coordinator's handoffs, and add to `opencode.jsonc`
